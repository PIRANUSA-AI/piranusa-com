import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Piranusa — Distributor Resmi ZWCAD & Archicad Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #16233a 100%)',
          padding: '80px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Piranusa
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 900 }}>
            Distributor Resmi ZWCAD &amp; Archicad
          </div>
          <div style={{ fontSize: 34, color: '#9db2d4' }}>
            Software CAD &amp; BIM untuk industri Indonesia
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#6b7f9e' }}>
          piranusa.com
        </div>
      </div>
    ),
    { ...size },
  )
}
