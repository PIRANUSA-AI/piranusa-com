import { render, screen } from '@testing-library/react'
import Products from '@/app/[locale]/products/page'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/i18n/routing', () => ({
  Link: (p: any) => <a href={p.href}>{p.children}</a>,
}))

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}))

describe('Product overview', () => {
  it('renders product cards for locale id', async () => {
    const ui = await Products({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
    expect(screen.getAllByText('ZWCAD').length).toBeGreaterThan(0)
  })

  it('renders bilingual heading for EN locale', async () => {
    const ui = await Products({ params: Promise.resolve({ locale: 'en' }) } as any)
    render(ui)
    expect(screen.getByText(/CAD, BIM & Rendering Software Solutions/i)).toBeTruthy()
  })

  it('groups products under category headings', async () => {
    const ui = await Products({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getByText('CAD')).toBeTruthy()
    expect(screen.getByText('BIM')).toBeTruthy()
  })
})
