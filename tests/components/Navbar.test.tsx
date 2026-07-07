import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/i18n/routing', () => ({
  Link: (p: any) => <a href={p.href}>{p.children}</a>,
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}))

describe('Navbar', () => {
  it('renders nav links', () => {
    render(<Navbar locale="id" />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('renders all five nav links including Training & Layanan', () => {
    render(<Navbar locale="id" />)
    expect(screen.getByText('PRODUK')).toBeTruthy()
    expect(screen.getByText('TENTANG KAMI')).toBeTruthy()
    expect(screen.getByText('TRAINING & LAYANAN')).toBeTruthy()
    expect(screen.getByText('ARTIKEL')).toBeTruthy()
    expect(screen.getByText('HUBUNGI KAMI')).toBeTruthy()
  })

  it('renders EN labels for locale en', () => {
    render(<Navbar locale="en" />)
    expect(screen.getByText('PRODUCTS')).toBeTruthy()
    expect(screen.getByText('ABOUT')).toBeTruthy()
    expect(screen.getByText('ARTICLES')).toBeTruthy()
    expect(screen.getByText('CONTACT')).toBeTruthy()
  })
})
