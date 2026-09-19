/** Minimal public Connection Fetch registration surface used by this plugin. */
export interface FetchRegistry {
    register(route: {
        path: string;
        methods: readonly ['POST'];
        requestBody: 'buffered';
        fetch(request: Request): Promise<Response>;
    }): () => Promise<void>;
}
/** Register only owned paths, leaving the shared Typert interceptor untouched. */
export declare function registerProxyRoutes(registry: FetchRegistry, endpoints: readonly string[], handler: (endpoint: string, payload: unknown) => Promise<unknown>): () => Promise<void>;
