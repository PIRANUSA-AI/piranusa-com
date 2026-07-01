import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav, type NavLinkItem } from './MobileNav'

const NAV_LINKS: Record<Locale, NavLinkItem[]> = {
  id: [
    { href: '/products', label: 'PRODUK' },
    { href: '/about', label: 'TENTANG KAMI' },
    { href: '/blog', label: 'ARTIKEL' },
    { href: '/contact', label: 'HUBUNGI KAMI' },
  ],
  en: [
    { href: '/products', label: 'PRODUCTS' },
    { href: '/about', label: 'ABOUT' },
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
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 md:py-0 md:h-[104px]"
      >
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-sans text-[28px] font-extrabold tracking-[0.15em] text-white">
            PIRANUSA
          </span>
          <span className="font-sans text-[9px] tracking-[0.15em] text-white/60">
            we get IT done
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
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
