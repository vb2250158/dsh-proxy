import { afterEach, expect, it } from 'vitest'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { startLanProxy } from '../src/proxy.ts'
import { upstreamCookie, type UpstreamAuth } from '../src/upstream-auth.ts'

const cleanups: (() => Promise<void>)[] = []
afterEach(async () => { for (const close of cleanups.splice(0).reverse()) await close() })

it('gates upstream cookie exchange on Basic login and keeps both credentials off the browser response', async () => {
  let exchanges = 0
  const auth: UpstreamAuth = {
    authenticatedUrl: origin => `${origin}/?token=test-launch-token`,
    authorizeIndex(request, response) {
      expect(request.url).toBe('/?token=test-launch-token')
      exchanges++
      response.writeHead(303, { 'set-cookie': 'dsh-auth-test=server-only; HttpOnly; Path=/' })
      response.end()
      return false
    },
  }
  const upstream = http.createServer((req, res) => {
    expect(req.headers.authorization).toBeUndefined()
    expect(req.headers.cookie).toBe('dsh-auth-test=server-only')
    expect(req.url).toBe('/')
    res.writeHead(req.headers.cookie === 'dsh-auth-test=server-only' ? 200 : 401, {
      'set-cookie': 'dsh-auth-test=server-only', 'content-type': 'text/html',
    })
    res.end('<html><head></head><body>chat</body></html>')
  })
  await new Promise<void>(resolve => upstream.listen(0, '127.0.0.1', resolve))
  cleanups.push(() => new Promise<void>(resolve => upstream.close(() => resolve())))
  const proxy = startLanProxy({ listenHost: '127.0.0.1', listenPort: 0,
    upstreamHost: '127.0.0.1', upstreamPort: (upstream.address() as AddressInfo).port,
    username: 'test-user', password: 'test-password', upstreamAuth: auth })
  cleanups.push(proxy.close)
  const base = `http://127.0.0.1:${await proxy.ready}`
  expect((await fetch(base)).status).toBe(401)
  expect((await fetch(base, { headers: { authorization: 'Basic invalid' } })).status).toBe(401)
  expect(exchanges).toBe(0)
  const response = await fetch(base, { headers: {
    authorization: `Basic ${Buffer.from('test-user:test-password').toString('base64')}`,
    cookie: 'untrusted=client-value',
  } })
  expect(response.status).toBe(200)
  expect(await response.text()).toContain('chat')
  expect(response.headers.get('set-cookie')).toBeNull()
  expect(exchanges).toBe(1)
})

it('rejects a failed Host exchange without returning a browser credential', () => {
  const auth: UpstreamAuth = { authenticatedUrl: origin => origin,
    authorizeIndex: (_request, response) => { response.writeHead(401); return false } }
  expect(() => upstreamCookie(auth, 'http://127.0.0.1:1234')).toThrow('exchange failed')
})
