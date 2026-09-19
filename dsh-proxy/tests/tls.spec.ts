import { expect, it } from 'vitest'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'
import type { AddressInfo } from 'node:net'
import { generate } from 'selfsigned'
import { startLanProxy } from '../src/proxy.ts'

async function reserve() {
  const server = net.createServer()
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = (server.address() as AddressInfo).port
  return { port, server, close: () => new Promise<void>(resolve => server.close(() => resolve())) }
}
async function certificate() {
  const pem = await generate([{ name: 'commonName', value: 'localhost' }], { keySize: 2048, extensions: [{ name: 'basicConstraints', cA: true }, { name: 'subjectAltName', altNames: [{ type: 7, ip: '127.0.0.1' }] }] })
  return { cert: Buffer.from(pem.cert), key: Buffer.from(pem.private), ca: Buffer.from(pem.cert) }
}
function get(port: number, ca: Buffer, auth?: string) {
  return new Promise<{status:number;body:string}>((resolve,reject)=>{
    https.get({host:'127.0.0.1',port,ca,headers:auth?{authorization:auth}:{}},res=>{
      let body='';res.on('data',chunk=>{body+=chunk});res.on('end',()=>resolve({status:res.statusCode!,body}))
    }).on('error',reject)
  })
}
it('serves authenticated HTTPS with certificate verification and a public CA download',async()=>{
  const upstream=http.createServer((_req,res)=>res.end('upstream'))
  await new Promise<void>(resolve=>upstream.listen(0,'127.0.0.1',resolve))
  const reservation=await reserve();await reservation.close()
  const tls={...await certificate(),port:reservation.port}
  const proxy=startLanProxy({listenHost:'127.0.0.1',listenPort:0,upstreamHost:'127.0.0.1',upstreamPort:(upstream.address() as AddressInfo).port,username:'test',password:'secret',tls})
  try{
    const port=await proxy.ready
    expect((await get(tls.port,tls.ca)).status).toBe(401)
    expect(await get(tls.port,tls.ca,'Basic '+Buffer.from('test:secret').toString('base64'))).toEqual({status:200,body:'upstream'})
    const ca=await fetch(`http://127.0.0.1:${port}/dsh-proxy-ca.crt`)
    expect(await ca.text()).toBe(tls.ca.toString())
    await expect(get(tls.port,Buffer.from('invalid CA'))).rejects.toThrow()
  }finally{await proxy.close();await new Promise<void>(resolve=>upstream.close(()=>resolve()))}
})
it('closes the HTTP listener if the HTTPS port cannot bind',async()=>{
  const occupied=await reserve(),plain=await reserve();await plain.close()
  const proxy=startLanProxy({listenHost:'127.0.0.1',listenPort:plain.port,upstreamHost:'127.0.0.1',upstreamPort:1,username:'test',password:'secret',tls:{...await certificate(),port:occupied.port}})
  try{await expect(proxy.ready).rejects.toThrow();await expect(fetch(`http://127.0.0.1:${plain.port}`)).rejects.toThrow()}
  finally{await proxy.close();await occupied.close()}
})
