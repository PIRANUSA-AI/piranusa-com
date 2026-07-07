import { render, screen } from '@testing-library/react'
import Home from '@/app/[locale]/page'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/i18n/routing', () => ({
  Link: (p: any) => <a href={p.href}>{p.children}</a>,
}))

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}))

describe('Homepage', () => {
  it('renders the real hero headline (id)', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getByText(/Solusi CAD & BIM/i)).toBeTruthy()
    expect(screen.getByText(/WE'll GET IT DONE/i)).toBeTruthy()
  })

  it('renders the EN hero headline', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'en' }) } as any)
    render(ui)
    expect(screen.getByText(/Trusted CAD & BIM Solutions/i)).toBeTruthy()
  })

  it('renders featured products from mock data', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getAllByText('ZWCAD').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Archicad').length).toBeGreaterThan(0)
  })

  it('renders testimonials with client names', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getByText('PT Indovickers Furnitama')).toBeTruthy()
  })

  it('renders latest posts with titles', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getByText(/Dari 2D CAD ke BIM/i)).toBeTruthy()
  })
})
