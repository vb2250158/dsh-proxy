# Changelog

## 0.1.15 — 2026-10-07

- Open this plugin from the Plugins list to access its existing configuration and controls. Settings no longer duplicates its navigation entry.
- 在插件列表中点击本插件进入详情页，即可使用原有配置和操作界面；设置菜单不再重复显示该插件入口。

## 0.1.14 (2026-10-07)

- 为插件列表提供中英文名称与说明，并发布独立的 SVG 图标。
- Publish English and Chinese plugin display metadata and a dedicated SVG icon.

## 0.1.12

- Align maintenance lockfiles and peer versions with the DSH 0.2 runtime.

## 0.1.11

- Update DSH compatibility requirements and interfaces for 0.2.1-alpha.1.

## 0.1.10 — 2026-10-03

- Add a collapsible bilingual ZeroTier installation guide to LAN Proxy settings, with official downloads, network authorization, HTTPS access and mobile-data verification.
- Keep network IDs and device addresses out of shipped guidance; explain that ONLINE does not guarantee P2P connectivity.
- Validation: typecheck, 87 tests and rebuilt client artifacts. No configuration migration.

## 0.1.9

- Add an optional authenticated HTTPS listener for LAN browser microphone access, with HTTPS QR codes and a public CA download/fingerprint.
- Close both listeners atomically on start failure and stop. Keep certificate private keys outside profile responses and repositories.

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
