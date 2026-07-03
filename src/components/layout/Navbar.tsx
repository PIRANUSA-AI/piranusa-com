import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav, type NavLinkItem } from './MobileNav'

const NAV_LINKS: Record<Locale, NavLinkItem[]> = {
  id: [
    { href: '/products', label: 'PRODUK' },
    { href: '/about', label: 'TENTANG KAMI' },
    { href: '/training', label: 'TRAINING & LAYANAN' },
    { href: '/blog', label: 'ARTIKEL' },
    { href: '/contact', label: 'HUBUNGI KAMI' },
  ],
  en: [
    { href: '/products', label: 'PRODUCTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/training', label: 'TRAINING & SERVICES' },
    { href: '/blog', label: 'ARTICLES' },
    { href: '/contact', label: 'CONTACT' },
  ],
}

export function Navbar({ locale }: { locale: Locale }) {
  const links = NAV_LINKS[locale]

  return (
    <header className="relative bg-navy">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 lg:grid lg:h-[104px] lg:grid-cols-[2fr_3fr] lg:gap-0 lg:py-0"
      >
        <Link href="/" className="flex items-center leading-none">
          <Image
            src="/images/piranusa-logo.svg"
            alt="Piranusa"
            width={158}
            height={65}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden items-center justify-end gap-8 lg:flex lg:h-full lg:border-l lg:border-orange/60 lg:pl-10">
          <ul className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher locale={locale} />
        </div>

        <MobileNav links={links} locale={locale} />
      </nav>
    </header>
  )
}
