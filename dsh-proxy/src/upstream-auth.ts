/** Server-side exchange through the Host Connection's public browser-auth API. */
export interface UpstreamAuth {
  authenticatedUrl(baseUrl: string): string
  authorizeIndex(
    request: { method: string; url: string; headers: Record<string, string> },
    response: { writeHead(status: number, headers?: Readonly<Record<string, string>>): unknown; end(body?: string): unknown },
  ): boolean
}

/** Mint an upstream-only cookie; neither the launch token nor cookie leaves the proxy. */
export function upstreamCookie(auth: UpstreamAuth, origin: string): string {
  const url = new URL(auth.authenticatedUrl(origin))
  let cookie: string | undefined
  auth.authorizeIndex({ method: 'GET', url: url.pathname + url.search, headers: { host: new URL(origin).host } }, {
    writeHead(status, headers) {
      if (status === 303) cookie = headers?.['set-cookie']?.split(';', 1)[0]
    },
    end() {},
  })
  if (!cookie) throw new Error('DSH browser authentication exchange failed')
  return cookie
}
