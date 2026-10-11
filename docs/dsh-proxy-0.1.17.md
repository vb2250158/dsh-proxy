# Upgrade to 0.1.17

When the profile omits `upstreamPort` or sets it to `0`, the proxy now uses the DSH web server's actual bound port on every launch. A legacy `upstreamPort` in `$DSH_HOME/dsh-proxy.json` is ignored in this mode, including when that legacy target is still reachable. Saving the proxy listen port or credentials removes the obsolete target field; other saved values are preserved.

Automatic mode rejects RPC updates containing `upstreamPort` before saving or restarting. To retain a manually selected target and legacy target-port RPC updates, configure a nonzero `upstreamPort` in the profile. Restart DSH after updating the plugin or profile. No session or attachment migration is needed.

## 升级说明

profile 未填写 `upstreamPort` 或设为 `0` 时，代理在每次启动时使用 DSH 实际监听端口。自动模式忽略 `$DSH_HOME/dsh-proxy.json` 的旧目标端口，即使旧目标仍可访问；保存代理端口或账号密码时移除旧目标字段，其余值保留。

自动模式拒绝带 `upstreamPort` 的 RPC 更新，不保存或重启。如需保留手工目标及旧接口，在 profile 中明确设置非零 `upstreamPort`，然后重启 DSH。无需迁移会话或附件。
