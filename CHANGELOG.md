# Changelog

## 0.1.8

- Show live LAN browser URLs and locally generated QR codes in proxy settings. Codes contain only the URL; browser login still uses the configured username and password.
- Exclude loopback, link-local and duplicate addresses; hide links when the proxy stops.

## 0.1.7

- Replace the shared /api interceptor with four exact POST routes. Version 0.1.6 prevented Typert methods such as webviewArchive/setup and session/list from dispatching, leaving the frontend on its plugin-loading error screen.
- Preserve request-envelope validation and caller RPC IDs. Route teardown removes only proxy-owned registrations.
- Validation: typecheck, 82 tests including unrelated endpoint delegation, and rebuilt artifacts.

## 0.1.6

- Register settings endpoints under /api/dsh-proxy through the shared Connection interceptor. Dedicated-channel registration in 0.1.4 and 0.1.5 fails against current Cordis; use 0.1.6 or later.
- Host and client endpoint constants move together; unrelated API methods remain delegated.
- Validation: typecheck, 81 tests and rebuilt host/client artifacts.

## 0.1.5

- Resolve the Connection service through the caller context before registering RPC routes, preserving the webServer injection on current Cordis.
- Validation: typecheck, 81 tests and rebuilt artifacts.

## 0.1.4

- Bridge successful Basic Auth logins to the current DSH Host Connection browser authentication for HTTP and WebSocket forwarding.
- Mint upstream credentials through the public Host API; keep launch tokens and session cookies on the server. Reject failed exchanges and remove incoming credentials before forwarding.
- Preserve the existing settings page, configurable port, username and password, and persisted settings file.
- Fork of smanx/dsh-proxy. Install from the fixed Git commit of this repository; no registry publication is required.
- Validation: typecheck, 81 unit/component tests and committed host/client builds.
