/** Server-side exchange through the Host Connection's public browser-auth API. */
export interface UpstreamAuth {
    authenticatedUrl(baseUrl: string): string;
    authorizeIndex(request: {
        method: string;
        url: string;
        headers: Record<string, string>;
    }, response: {
        writeHead(status: number, headers?: Readonly<Record<string, string>>): unknown;
        end(body?: string): unknown;
    }): boolean;
}
/** Mint an upstream-only cookie; neither the launch token nor cookie leaves the proxy. */
export declare function upstreamCookie(auth: UpstreamAuth, origin: string): string;
