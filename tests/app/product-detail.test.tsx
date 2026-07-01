import { render, screen } from '@testing-library/react'
import Detail, { generateStaticParams } from '@/app/[locale]/products/[slug]/page'
import { getProducts } from '@/lib/content'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/i18n/routing', () => ({
  Link: (p: any) => <a href={p.href}>{p.children}</a>,
}))

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}))

describe('Product detail', () => {
  it('generates params for all products x locales', async () => {
    const params = await generateStaticParams()
    expect(params.length).toBe(getProducts('id').length * 2)
  })

  it('renders product name', async () => {
    const slug = getProducts('id')[0].slug
    const ui = await Detail({ params: Promise.resolve({ locale: 'id', slug }) } as any)
    render(ui)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      getProducts('id')[0].name.id,
    )
  })

  it('renders features list', async () => {
    const slug = getProducts('id')[0].slug
    const ui = await Detail({ params: Promise.resolve({ locale: 'id', slug }) } as any)
    render(ui)
    const firstFeature = getProducts('id')[0].features.id[0]
    expect(screen.getByText(firstFeature)).toBeTruthy()
  })

  it('renders WhatsApp CTA link', async () => {
    const slug = getProducts('id')[0].slug
    const ui = await Detail({ params: Promise.resolve({ locale: 'id', slug }) } as any)
    render(ui)
    const links = screen.getAllByRole('link') as HTMLAnchorElement[]
    const waLink = links.find((l) => l.getAttribute('href')?.startsWith('https://wa.me/'))
    expect(waLink).toBeTruthy()
  })
})
