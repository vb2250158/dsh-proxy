/** Minimal public Connection Fetch registration surface used by this plugin. */
export interface FetchRegistry {
  register(route: {
    path: string; methods: readonly ['POST']; requestBody: 'buffered';
    fetch(request: Request): Promise<Response>;
  }): () => Promise<void>
}

/** Register only owned paths, leaving the shared Typert interceptor untouched. */
export function registerProxyRoutes(
  registry: FetchRegistry,
  endpoints: readonly string[],
  handler: (endpoint: string, payload: unknown) => Promise<unknown>,
): () => Promise<void> {
  const disposers = endpoints.map(endpoint => registry.register({
    path: `/api/${endpoint}`, methods: ['POST'], requestBody: 'buffered',
    async fetch(request) {
      if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
        return new Response('content type must be application/json', { status: 415 })
      }
      let message: unknown
      try { message = await request.json() } catch { return new Response('invalid JSON', { status: 400 }) }
      if (!message || typeof message !== 'object' || !('type' in message) || message.type !== 'client-request'
        || !('rpcId' in message) || typeof message.rpcId !== 'string'
        || !('method' in message) || message.method !== endpoint || !('payload' in message)) {
        return new Response('invalid RPC request', { status: 400 })
      }
      try {
        const result = await handler(endpoint, message.payload)
        return Response.json({ type: 'server-response', rpcId: message.rpcId, result })
      } catch {
        return Response.json({ type: 'server-response', rpcId: message.rpcId,
          result: { ok: false, error: { code: 'gateway/internal', message: 'Proxy operation failed', details: { issues: [] } } } })
      }
    },
  }))
  return async () => { await Promise.all(disposers.map(dispose => dispose())) }
}
