import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { AddressInfo } from 'node:net'
import http from 'node:http'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ProxyController, type EffectiveProxyOptions } from '../src/controller.ts'

const dirs: string[] = []
const servers: http.Server[] = []
let controller: ProxyController | null = null
const logs: string[] = []

function tempSettingsFile(): string {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-proxy-controller-'))
  dirs.push(dir)
  return join(dir, 'dsh-proxy.json')
}

/** An upstream that answers every path with its marker text. */
async function startUpstream(marker: string): Promise<number> {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(marker)
  })
  servers.push(server)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  return (server.address() as AddressInfo).port
}

function baseOptions(upstreamPort: number): EffectiveProxyOptions {
  return {
    listenHost: '127.0.0.1',
    listenPort: 0,
    upstreamHost: '127.0.0.1',
    upstreamPort,
    username: 'admin',
    password: 'admin',
  }
}

/** OS-assigned test ports may fall in Fetch's reserved list on a custom ephemeral range. */
async function fetchThrough(url: string, headers: Record<string, string> = {}): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const request = http.get(url, { headers }, response => {
      const status = response.statusCode
      if (status === undefined) { response.resume(); reject(new Error('Missing proxy response status')); return }
      let text = ''
      response.setEncoding('utf8')
      response.on('data', (chunk: string) => { text += chunk })
      response.on('error', reject)
      response.on('end', () => resolve({ status, text }))
    })
    request.on('error', reject)
  })
}

beforeEach(() => {
  logs.length = 0
})

afterEach(async () => {
  if (controller !== null) {
    await controller.stop()
    controller = null
  }
  for (const server of servers.splice(0)) {
    await new Promise<void>((resolve) => {
      server.closeAllConnections()
      server.close(() => resolve())
    })
  }
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

describe('ProxyController automatic upstream port', () => {
  it('ignores a legacy target and follows the web server across launches', async () => {
    const oldPort = await startUpstream('OLD')
    const firstPort = await startUpstream('FIRST')
    const secondPort = await startUpstream('SECOND')
    const settingsFile = tempSettingsFile()
    writeFileSync(settingsFile, JSON.stringify({ upstreamPort: oldPort, username: 'bob', password: 'pw' }))

    for (const [port, marker] of [[firstPort, 'FIRST'], [secondPort, 'SECOND']] as const) {
      controller = new ProxyController({
        upstreamPortSource: 'web-server', base: baseOptions(port), settingsFile,
        log: (_level, message) => logs.push(message),
      })
      await controller.start()
      const status = await controller.refreshStatus()
      expect(status.upstreamPort).toBe(port)
      expect(status.upstreamReachable).toBe(true)
      const response = await fetchThrough(`http://127.0.0.1:${status.listenPort}/`, { authorization: basic('bob', 'pw') })
      expect(response).toEqual({ status: 200, text: marker })
      await controller.stop()
    }
    expect(logs.some(message => message.includes('ignoring persisted upstreamPort'))).toBe(true)
  })

  it('rejects target overrides without saving or restarting in automatic mode', async () => {
    const port = await startUpstream('CURRENT')
    const otherPort = await startUpstream('OTHER')
    const settingsFile = tempSettingsFile()
    const original = JSON.stringify({ username: 'admin', password: 'admin' })
    writeFileSync(settingsFile, original)
    controller = new ProxyController({ upstreamPortSource: 'web-server', base: baseOptions(port), settingsFile, log: () => {} })
    await controller.start()
    const before = controller.status()
    const outcome = await controller.update({ upstreamPort: otherPort, username: 'changed' })
    expect(outcome.ok).toBe(false)
    expect(readFileSync(settingsFile, 'utf8')).toBe(original)
    expect(controller.status()).toEqual(before)
    const response = await fetchThrough(`http://127.0.0.1:${before.listenPort}/`, { authorization: basic('admin', 'admin') })
    expect(response).toEqual({ status: 200, text: 'CURRENT' })
  })

  it('drops the legacy target when saving other settings in automatic mode', async () => {
    const port = await startUpstream('CURRENT')
    const settingsFile = tempSettingsFile()
    writeFileSync(settingsFile, JSON.stringify({ upstreamPort: port + 1, username: 'admin', password: 'admin' }))
    controller = new ProxyController({ upstreamPortSource: 'web-server', base: baseOptions(port), settingsFile, log: () => {} })
    const outcome = await controller.update({ username: 'bob' })
    expect(outcome.ok).toBe(true)
    expect(controller.status().upstreamPort).toBe(port)
    expect(JSON.parse(readFileSync(settingsFile, 'utf8'))).toEqual({ username: 'bob', password: 'admin' })
  })

  it('preserves legacy target overrides when an explicit target is configured', async () => {
    const port = await startUpstream('CURRENT')
    const explicitPort = await startUpstream('EXPLICIT')
    const settingsFile = tempSettingsFile()
    writeFileSync(settingsFile, JSON.stringify({ upstreamPort: explicitPort }))
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(port), settingsFile, log: () => {} })
    await controller.start()
    const response = await fetchThrough(`http://127.0.0.1:${controller.status().listenPort}/`, { authorization: basic('admin', 'admin') })
    expect(response).toEqual({ status: 200, text: 'EXPLICIT' })
  })
})

describe('ProxyController status', () => {
  it('does not expose the Host when integrated login credentials are missing', async () => {
    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: { ...baseOptions(1), password: '' },
      settingsFile: tempSettingsFile(), log: () => {},
      upstreamAuth: { authenticatedUrl: origin => origin, authorizeIndex: () => false },
    })
    expect((await controller.start()).ok).toBe(false)
    expect(controller.status().proxyListening).toBe(false)
  })
  it('starts and reports the bound port and effective options', async () => {
    const upstreamPort = await startUpstream('A')
    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: baseOptions(upstreamPort),
      settingsFile: tempSettingsFile(),
      log: (level, message) => logs.push(`${level}:${message}`),
    })
    await controller.start()
    const status = controller.status()
    expect(status.lanUrls).toEqual([])
    expect(status.listenHost).toBe('127.0.0.1')
    expect(status.listenPort).toBeGreaterThan(0)
    expect(status.proxyListening).toBe(true)
    expect(status.upstreamPort).toBe(upstreamPort)
    expect(status.username).toBe('admin')
    expect(status.authEnabled).toBe(true)
    expect(status.persisted).toBe(false)
    expect(status.password).toBe('admin')
    expect(logs.some((line) => line.includes('listening'))).toBe(true)

    const fresh = await controller.refreshStatus()
    expect(fresh.upstreamReachable).toBe(true)
  })

  it('lights the proxy red when the listen port is taken and the target red when nothing listens upstream', async () => {
    // Occupy a concrete port so the controller cannot bind it.
    const blocker = http.createServer(() => {})
    servers.push(blocker)
    await new Promise<void>((resolve) => blocker.listen(0, '127.0.0.1', resolve))
    const takenPort = (blocker.address() as AddressInfo).port

    // Reserve a port and release it, so the upstream probe finds no listener.
    const probe = http.createServer(() => {})
    await new Promise<void>((resolve) => probe.listen(0, '127.0.0.1', resolve))
    const deadPort = (probe.address() as AddressInfo).port
    await new Promise<void>((resolve) => probe.close(() => resolve()))

    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: { ...baseOptions(deadPort), listenPort: takenPort },
      settingsFile: tempSettingsFile(),
      log: () => {},
    })
    await controller.start()
    expect(controller.status().proxyListening).toBe(false)
    const fresh = await controller.refreshStatus()
    expect(fresh.upstreamReachable).toBe(false)
  })
})

describe('ProxyController update', () => {
  it('changes the proxy listen port and rebinds the service', async () => {
    const upstreamPort = await startUpstream('UPSTREAM')
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile: tempSettingsFile(), log: () => {} })
    await controller.start()
    const oldPort = controller.status().listenPort

    // Reserve a concrete port and release it so the proxy can bind it.
    const probe = http.createServer(() => {})
    await new Promise<void>((resolve) => probe.listen(0, '127.0.0.1', resolve))
    const newPort = (probe.address() as AddressInfo).port
    await new Promise<void>((resolve) => probe.close(() => resolve()))

    const out = await controller.update({ listenPort: newPort })
    expect(out.ok).toBe(true)
    if (!out.ok) return
    expect(out.result.status.listenPort).toBe(newPort)
    expect(out.result.status.proxyListening).toBe(true)
    expect(out.result.message).toContain('重启')

    const after = await fetchThrough(`http://127.0.0.1:${newPort}/`, { authorization: basic('admin', 'admin') })
    expect(after.status).toBe(200)
    expect(after.text).toBe('UPSTREAM')

    // The old OS-assigned listener is gone.
    let oldStatus = 0
    try {
      const r = await fetch(`http://127.0.0.1:${oldPort}/`, { redirect: 'manual' })
      oldStatus = r.status
    } catch {
      oldStatus = 0
    }
    expect(oldStatus).toBe(0)
  })

  it('rotates credentials and restarts', async () => {
    const upstreamPort = await startUpstream('UPSTREAM')
    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: baseOptions(upstreamPort),
      settingsFile: tempSettingsFile(),
      log: () => {},
    })
    await controller.start()
    const listenPort = controller.status().listenPort

    const out = await controller.update({ username: 'alice', password: 's3cret' })
    expect(out.ok).toBe(true)
    if (!out.ok) return

    const oldCreds = await fetchThrough(`http://127.0.0.1:${out.result.status.listenPort}/`, { authorization: basic('admin', 'admin') })
    expect(oldCreds.status).toBe(401)
    const newCreds = await fetchThrough(`http://127.0.0.1:${out.result.status.listenPort}/`, { authorization: basic('alice', 's3cret') })
    expect(newCreds.status).toBe(200)
    expect(newCreds.text).toBe('UPSTREAM')
    expect(controller.status().username).toBe('alice')
    expect(controller.status().authEnabled).toBe(true)
  })

  it('disables password login when credentials are cleared to empty (set-empty semantics)', async () => {
    const upstreamPort = await startUpstream('UPSTREAM')
    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: baseOptions(upstreamPort),
      settingsFile: tempSettingsFile(),
      log: () => {},
    })
    await controller.start()
    const listenPort = controller.status().listenPort

    const cleared = await controller.update({ username: '', password: '' })
    expect(cleared.ok).toBe(true)
    if (!cleared.ok) return
    expect(cleared.result.status.authEnabled).toBe(false)
    expect(cleared.result.status.username).toBe('')
    expect(cleared.result.status.password).toBe('')
    expect(cleared.result.notice, cleared.result.message).toBe('saved-restarted')
    expect(cleared.result.status.proxyListening).toBe(true)
    expect(cleared.result.status.listenPort).toBeGreaterThan(0)

    // The gate is open again: an anonymous request passes through.
    const anon = await fetchThrough(`http://127.0.0.1:${cleared.result.status.listenPort}/`)
    expect(anon.status).toBe(200)
    expect(anon.text).toBe('UPSTREAM')

    // Setting only one credential keeps password login off and warns.
    const partial = await controller.update({ username: 'half', password: '' })
    expect(partial.ok).toBe(true)
    if (!partial.ok) return
    expect(partial.result.status.authEnabled).toBe(false)
    expect(partial.result.message).toContain('需同时设置用户名和密码')
    expect(listenPort).toBeGreaterThan(0)
  })

  it('persists the listen port and credentials across controller instances', async () => {
    const upstreamPort = await startUpstream('A')
    const settingsFile = tempSettingsFile()

    const probe = http.createServer(() => {})
    await new Promise<void>((resolve) => probe.listen(0, '127.0.0.1', resolve))
    const fixedPort = (probe.address() as AddressInfo).port
    await new Promise<void>((resolve) => probe.close(() => resolve()))

    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile, log: () => {} })
    await controller.start()
    const out = await controller.update({ listenPort: fixedPort, username: 'bob', password: 'pw' })
    expect(out.ok).toBe(true)
    await controller.stop()
    controller = null

    const restarted = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile, log: () => {} })
    controller = restarted
    await restarted.start()
    const status = restarted.status()
    expect(status.listenPort).toBe(fixedPort)
    expect(status.username).toBe('bob')
    expect(status.persisted).toBe(true)
    const res = await fetchThrough(`http://127.0.0.1:${status.listenPort}/`, { authorization: basic('bob', 'pw') })
    expect(res.text).toBe('A')
  })

  it('rejects invalid patches without touching the running proxy', async () => {
    const upstreamPort = await startUpstream('A')
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile: tempSettingsFile(), log: () => {} })
    await controller.start()
    const before = controller.status()

    const listenPort = before.listenPort
    const conflict = await controller.update({ listenPort: upstreamPort })
    expect(conflict.ok).toBe(false)
    if (conflict.ok) return

    const empty = await controller.update({})
    expect(empty.ok).toBe(false)
    if (empty.ok) return

    const stillUp = await fetchThrough(`http://127.0.0.1:${listenPort}/`, { authorization: basic('admin', 'admin') })
    expect(stillUp.status).toBe(200)
    expect(stillUp.text).toBe('A')
    expect(controller.status()).toEqual(before)
  })

  it('reports a failed rebind after save when the new listen port is taken', async () => {
    const upstreamPort = await startUpstream('A')
    const settingsFile = tempSettingsFile()
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile, log: () => {} })
    await controller.start()

    // Reserve a concrete port and keep it occupied so the proxy cannot rebind.
    const blocker = http.createServer(() => {})
    servers.push(blocker)
    await new Promise<void>((resolve) => blocker.listen(0, '127.0.0.1', resolve))
    const takenPort = (blocker.address() as AddressInfo).port

    const out = await controller.update({ listenPort: takenPort })
    expect(out.ok).toBe(true)
    if (!out.ok) return
    expect(out.result.notice).toBe('saved-restart-failed')
    expect(out.result.status.listenPort).toBe(takenPort)
    expect(out.result.status.proxyListening).toBe(false)
    expect(out.result.message).toContain('无法监听')
    // The save itself still landed on disk.
    const persisted = JSON.parse(readFileSync(settingsFile, 'utf8'))
    expect(persisted.listenPort).toBe(takenPort)
  })

  it('saves without restarting when the proxy is stopped', async () => {
    const upstreamPort = await startUpstream('A')
    const settingsFile = tempSettingsFile()
    // Occupy a port so the proxy cannot bind; the proxy stays stopped.
    const blocker = http.createServer(() => {})
    servers.push(blocker)
    await new Promise<void>((resolve) => blocker.listen(0, '127.0.0.1', resolve))
    const takenPort = (blocker.address() as AddressInfo).port

    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: { ...baseOptions(upstreamPort), listenPort: takenPort },
      settingsFile,
      log: () => {},
    })
    const startOutcome = await controller.start()
    expect(startOutcome.ok).toBe(false)
    expect(controller.status().proxyListening).toBe(false)

    const out = await controller.update({ username: 'alice' })
    expect(out.ok).toBe(true)
    if (!out.ok) return
    expect(out.result.notice).toBe('saved')
    // The service stayed stopped and was not restarted.
    expect(out.result.status.proxyListening).toBe(false)
    expect(out.result.status.username).toBe('alice')
    expect(out.result.message).toBe('已保存')
    // The save still persisted.
    const persisted = JSON.parse(readFileSync(settingsFile, 'utf8'))
    expect(persisted.username).toBe('alice')
  })
})

describe('ProxyController start failure', () => {
  it('logs loudly but keeps the controller alive when the port is taken', async () => {
    const upstreamPort = await startUpstream('A')
    // Occupy a concrete port so the controller cannot bind it.
    const blocker = http.createServer(() => {})
    servers.push(blocker)
    await new Promise<void>((resolve) => blocker.listen(0, '127.0.0.1', resolve))
    const takenPort = (blocker.address() as AddressInfo).port

    controller = new ProxyController({ upstreamPortSource: 'settings',
      base: { ...baseOptions(upstreamPort), listenPort: takenPort },
      settingsFile: tempSettingsFile(),
      log: (level, message) => logs.push(`${level}:${message}`),
    })
    const outcome = await controller.start()
    expect(controller.status().listenPort).toBe(takenPort)
    expect(controller.status().proxyListening).toBe(false)
    expect(outcome.ok).toBe(false)
    if (!outcome.ok) expect(outcome.message).toContain(String(takenPort))
    expect(logs.some((line) => line.includes('failed to listen'))).toBe(true)
  })
})

describe('ProxyController start/stop controls', () => {
  it('stops and restarts the service, keeping the target probe independent', async () => {
    const upstreamPort = await startUpstream('A')
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile: tempSettingsFile(), log: () => {} })
    await controller.start()
    expect(controller.status().proxyListening).toBe(true)

    await controller.stop()
    expect(controller.status().proxyListening).toBe(false)
    const probed = await controller.refreshStatus()
    expect(probed.upstreamReachable).toBe(true)

    await controller.start()
    expect(controller.status().proxyListening).toBe(true)
  })

  it('stopDeferred reports stopped immediately and closes the listener shortly after', async () => {
    const upstreamPort = await startUpstream('A')
    controller = new ProxyController({ upstreamPortSource: 'settings', base: baseOptions(upstreamPort), settingsFile: tempSettingsFile(), log: () => {} })
    await controller.start()
    const status = controller.stopDeferred(0)
    expect(status.lanUrls).toEqual([])
    expect(status.proxyListening).toBe(false)
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(controller.status().proxyListening).toBe(false)
  })
})

function basic(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
}
