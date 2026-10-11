import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import http from 'node:http'
import type { AddressInfo } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import { expect, it, vi } from 'vitest'
import type { FetchRegistry } from '../src/rpc-routes.ts'
import type { UpstreamAuth } from '../src/upstream-auth.ts'

const files = vi.hoisted(() => ({ path: '' }))
vi.mock('@deepseek-ai/dsh-home-paths', () => ({ dshHomePath: () => files.path }))
import { apply, Config } from '../src/index.ts'

it('the host entry uses its bound web port despite a reachable legacy target', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-proxy-entry-'))
  files.path = join(dir, 'dsh-proxy.json')
  const servers: http.Server[] = []
  const start = async (marker: string) => {
    const server = http.createServer((_request, response) => response.end(marker))
    servers.push(server)
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
    return (server.address() as AddressInfo).port
  }
  const routes = new Map<string, (request: Request) => Promise<Response>>()
  const fetchRegistry: FetchRegistry = { register(route) {
    routes.set(route.path, route.fetch)
    return async () => { routes.delete(route.path) }
  } }
  const auth: UpstreamAuth = {
    authenticatedUrl: origin => origin + '/?token=test',
    authorizeIndex(_request, response) {
      response.writeHead(303, { 'set-cookie': 'test-auth=test; Path=/' })
      return true
    },
  }
  const connection = { ...auth, fetch: fetchRegistry }
  const effects: Array<() => (() => Promise<void> | void) | Promise<() => Promise<void> | void>> = []
  const disposers: Array<() => Promise<void> | void> = []
  try {
    const webPort = await start('CURRENT')
    const legacyPort = await start('LEGACY')
    writeFileSync(files.path, JSON.stringify({ upstreamPort: legacyPort, username: 'user', password: 'pass' }))
    const ctx = {
      webServer: { port: webPort }, get: () => connection,
      logger: { info() {}, warn() {}, error() {} },
      effect: (effect: typeof effects[number]) => { effects.push(effect) },
    } as Context
    apply(ctx, Config({ listenHost: '127.0.0.1', listenPort: 0 }))
    for (const effect of effects) disposers.push(await effect())
    const route = routes.get('/api/dsh-proxy/status')!
    const response = await route(new Request('http://localhost/api/dsh-proxy/status', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'client-request', rpcId: 'entry-test', method: 'dsh-proxy/status', payload: {} }),
    }))
    const envelope = await response.json()
    expect(envelope.result.ok).toBe(true)
    expect(envelope.result.value.upstreamPort).toBe(webPort)
    const forwarded = await fetch(`http://127.0.0.1:${envelope.result.value.listenPort}/`, {
      headers: { Authorization: 'Basic ' + Buffer.from('user:pass').toString('base64') },
    })
    expect(forwarded.status).toBe(200)
    expect(await forwarded.text()).toBe('CURRENT')
  } finally {
    for (const dispose of disposers.reverse()) await dispose()
    for (const server of servers) {
      server.closeAllConnections()
      await new Promise<void>(resolve => server.close(() => resolve()))
    }
    rmSync(dir, { recursive: true, force: true })
  }
})
