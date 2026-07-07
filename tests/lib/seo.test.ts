import { buildMetadata, organizationSchema, productSchema, breadcrumbSchema } from '@/lib/seo'
import { describe, it, expect } from 'vitest'

describe('seo', () => {
  it('builds metadata with canonical + hreflang', () => {
    const m = buildMetadata({ title: 'X', description: 'd', path: '/products', locale: 'id' })
    expect(m.title).toEqual({ absolute: 'X' })
    expect(m.alternates?.canonical).toContain('/id/products')
    expect(m.alternates?.languages?.['en']).toContain('/en/products')
    expect(m.openGraph?.title).toBe('X')
  })
  it('organization schema has @type Organization', () => {
    expect(organizationSchema()['@type']).toBe('Organization')
  })
  it('product schema uses localized name', () => {
    const p = { slug: 'zwcad', name: { id: 'ZWCAD', en: 'ZWCAD' }, description: { id: 'a', en: 'b' }, version: '2026', logo: '/l.png', gallery: [], category: 'cad', features: { id: [], en: [] }, ctaWhatsapp: '' }
    expect(productSchema(p as any, 'id').name).toBe('ZWCAD')
  })
  it('breadcrumb schema lists items', () => {
    const b = breadcrumbSchema([{ name: 'Home', url: '/id' }])
    expect(b.itemListElement[0].position).toBe(1)
  })
})
