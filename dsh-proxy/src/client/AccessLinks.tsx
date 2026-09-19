/** Browser URLs and credential-free QR codes for the active LAN listener. */
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

function AddressCode({ url, errorText }: { url: string; errorText: string }) {
  const [image, setImage] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let active = true
    setImage(null)
    setFailed(false)
    void QRCode.toDataURL(url, { width: 180, margin: 4, errorCorrectionLevel: 'M' }).then(
      data => { if (active) setImage(data) },
      () => { if (active) setFailed(true) },
    )
    return () => { active = false }
  }, [url])
  return <div style={{ display: 'grid', justifyItems: 'start', gap: '10px' }}>
    <a href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--dsw-alias-brand-primary)', overflowWrap: 'anywhere' }}>{url}</a>
    {image ? <img src={image} alt={url} width={180} height={180} /> : null}
    {failed ? <span>{errorText}</span> : null}
  </div>
}

/** Render exactly the addresses reported by the Host; no credentials are encoded. */
export function AccessLinks({ urls, errorText }: { urls: readonly string[]; errorText: string }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {urls.map(url => <AddressCode key={url} url={url} errorText={errorText} />)}
  </div>
}
