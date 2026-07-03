import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piranusa — Distributor Resmi ZWCAD & Archicad Indonesia',
    short_name: 'Piranusa',
    description: 'Software CAD & BIM untuk industri Indonesia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}
