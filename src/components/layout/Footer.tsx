import { Facebook, Youtube, Linkedin, Instagram } from 'lucide-react'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'

const COPY: Record<
  Locale,
  {
    tagline: string
    productsHeading: string
    products: { label: string; href: string }[]
    seeAll: string
    companyHeading: string
    companyLinks: { label: string; href: string }[]
    contactHeading: string
    addressLabel: string
    address: string
    phoneLabel: string
    whatsappLabel: string
    emailLabel: string
    rights: string
  }
> = {
  id: {
    tagline: 'Distributor resmi ZWCAD & Archicad di Indonesia.',
    productsHeading: 'Produk',
    products: [
      { label: 'ZWCAD', href: '/products/zwcad' },
      { label: 'Archicad', href: '/products/archicad' },
      { label: 'ZW3D', href: '/products/zw3d' },
    ],
    seeAll: 'Lihat semua',
    companyHeading: 'Perusahaan',
    companyLinks: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Artikel', href: '/blog' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
    contactHeading: 'Kontak',
    addressLabel: 'Alamat',
    address: 'JL. K.H. Mas Mansyur No.121, Jakarta 10220, Indonesia',
    phoneLabel: 'Telepon',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    rights: '© 2026 PT Piranti Nusantara Teknologi. All rights reserved.',
  },
  en: {
    tagline: 'Official distributor of ZWCAD & Archicad in Indonesia.',
    productsHeading: 'Products',
    products: [
      { label: 'ZWCAD', href: '/products/zwcad' },
      { label: 'Archicad', href: '/products/archicad' },
      { label: 'ZW3D', href: '/products/zw3d' },
    ],
    seeAll: 'See all',
    companyHeading: 'Company',
    companyLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Articles', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
    contactHeading: 'Contact',
    addressLabel: 'Address',
    address: 'JL. K.H. Mas Mansyur No.121, Jakarta 10220, Indonesia',
    phoneLabel: 'Phone',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    rights: '© 2026 PT Piranti Nusantara Teknologi. All rights reserved.',
  },
}

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'YouTube', href: '#', Icon: Youtube },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/zwcad.piranusa', Icon: Instagram },
]

export function Footer({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-sans text-[24px] font-extrabold tracking-[0.15em] text-white">
              PIRANUSA
            </span>
            <span className="font-sans text-[9px] tracking-[0.15em] text-white/60">
              we get IT done
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/70">{t.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.1em]">{t.productsHeading}</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {t.products.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-white hover:text-white/80">
                {t.seeAll}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.1em]">{t.companyHeading}</h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {t.companyLinks.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.1em]">{t.contactHeading}</h2>
          <dl className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <div>
              <dt className="sr-only">{t.addressLabel}</dt>
              <dd>{t.address}</dd>
            </div>
            <div>
              <dt className="sr-only">{t.phoneLabel}</dt>
              <dd>
                <a href="tel:+622125558805" className="hover:text-white">
                  (021) 25558805
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t.whatsappLabel}</dt>
              <dd>
                <a
                  href="https://wa.me/628111085850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  +62 811-1085-850
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t.emailLabel}</dt>
              <dd>
                <a href="mailto:info@piranusa.com" className="hover:text-white">
                  info@piranusa.com
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/70 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        {t.rights}
      </div>
    </footer>
  )
}
