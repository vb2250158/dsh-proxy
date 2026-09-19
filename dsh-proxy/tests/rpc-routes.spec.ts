import { expect, it } from 'vitest'
import { registerProxyRoutes, type FetchRegistry } from '../src/rpc-routes.ts'
import { RPC_STATUS_ENDPOINT, RPC_UPDATE_ENDPOINT, RPC_START_ENDPOINT, RPC_STOP_ENDPOINT } from '../src/contract.ts'

it('coexists with session and browser-archive dispatch and removes only its own routes', async () => {
  const routes = new Map<string, (request: Request) => Promise<Response>>()
  const registry: FetchRegistry = { register(route) {
    expect(route.methods).toEqual(['POST'])
    expect(route.requestBody).toBe('buffered')
    routes.set(route.path, route.fetch)
    return async () => { routes.delete(route.path) }
  } }
  const dispose = registerProxyRoutes(registry,
    [RPC_STATUS_ENDPOINT, RPC_UPDATE_ENDPOINT, RPC_START_ENDPOINT, RPC_STOP_ENDPOINT],
    async () => ({ ok: true, value: { proxyListening: true } }))
  const dispatch = async (endpoint: string, body: unknown) => {
    const request = new Request(`http://localhost/api/${endpoint}`, { method: 'POST',
      headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    return routes.get(`/api/${endpoint}`)?.(request) ?? Response.json({ owner: 'typert' })
  }
  for (const endpoint of ['session/list', 'webviewArchive/setup', 'privatePluginManager/status']) {
    expect(await (await dispatch(endpoint, {})).json()).toEqual({ owner: 'typert' })
  }
  const response = await dispatch(RPC_STATUS_ENDPOINT, { type: 'client-request', rpcId: 'test', method: RPC_STATUS_ENDPOINT, payload: {} })
  expect(await response.json()).toEqual({ type: 'server-response', rpcId: 'test', result: { ok: true, value: { proxyListening: true } } })
  expect((await dispatch(RPC_STATUS_ENDPOINT, { type: 'client-request', rpcId: 'test', method: 'session/list', payload: {} })).status).toBe(400)
  expect(routes.size).toBe(4)
  await dispose()
  expect(routes.size).toBe(0)
})
