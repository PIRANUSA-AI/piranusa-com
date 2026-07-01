// tests/app/sitemap.test.ts
import sitemap from '@/app/sitemap'
import { describe, it, expect } from 'vitest'

describe('sitemap', () => {
  it('includes homepage for both locales and product urls', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/id'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/en'))).toBe(true)
    expect(urls.some((u) => u.includes('/products/'))).toBe(true)
  })
})
