# Changelog

## 0.1.4

- Bridge successful Basic Auth logins to the current DSH Host Connection browser authentication for HTTP and WebSocket forwarding.
- Mint upstream credentials through the public Host API; keep launch tokens and session cookies on the server. Reject failed exchanges and remove incoming credentials before forwarding.
- Preserve the existing settings page, configurable port, username and password, and persisted settings file.
- Fork of smanx/dsh-proxy. Install from the fixed Git commit of this repository; no registry publication is required.
- Validation: typecheck, 81 unit/component tests and committed host/client builds.
