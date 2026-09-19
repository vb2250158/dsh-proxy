import os from 'node:os'
import { afterEach, expect, it, vi } from 'vitest'
import { lanAddresses } from '../src/proxy.ts'

function ipv4(address: string, internal = false): os.NetworkInterfaceInfoIPv4 {
  return { address, internal, family: 'IPv4', netmask: '255.255.255.0', mac: '00:00:00:00:00:00', cidr: null }
}

afterEach(() => vi.restoreAllMocks())

it('lists unique non-loopback IPv4 URLs without link-local addresses', () => {
  vi.spyOn(os, 'networkInterfaces').mockReturnValue({
    loopback: [ipv4('127.0.0.1', true)],
    ethernet: [ipv4('192.168.1.10'), ipv4('169.254.1.1')],
    duplicate: [ipv4('192.168.1.10')],
    vpn: [ipv4('10.0.0.2')],
    missing: undefined,
  })
  expect(lanAddresses(18081)).toEqual(['http://192.168.1.10:18081', 'http://10.0.0.2:18081'])
})
