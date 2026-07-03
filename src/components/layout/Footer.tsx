import Image from 'next/image'
import { ArrowUpRight, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'

type NavItem = { label: string; href: string }
type Office = { name: string; lines: string[] }

const COPY: Record<
  Locale,
  {
    tagline: string[]
    offices: Office[]
    productsHeading: string
    products: NavItem[]
    menu: NavItem[]
    hiring: string
    phone: string
    phoneHref: string
    email: string
    rights: string
  }
> = {
  id: {
    tagline: ['Solusi Software Desain', 'Untuk Proyek Profesional'],
    offices: [
      {
        name: 'Kantor Jakarta',
        lines: ['Cityloft Sudirman Jakarta', 'Jl. K.H. Mas Mansyur No.121', 'Jakarta 10250'],
      },
      {
        name: 'Kantor Surabaya',
        lines: ['Cityloft Sudirman Jakarta', 'Jl. K.H. Mas Mansyur No.121', 'Jakarta 10250'],
      },
    ],
    productsHeading: 'Produk',
    products: [
      { label: 'ZWCAD', href: '/products/zwcad' },
      { label: 'ZW3D', href: '/products/zw3d' },
      { label: 'ARCHICAD', href: '/products/archicad' },
      { label: 'ENSCAPE', href: '/products' },
      { label: 'SKETCHUP', href: '/products' },
      { label: 'D5 RENDER', href: '/products' },
      { label: 'ADOBE', href: '/products' },
      { label: 'KASPERSKY', href: '/products' },
      { label: 'MICROSOFT', href: '/products' },
    ],
    menu: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Training & Layanan', href: '/training' },
      { label: 'Event & Promosi', href: '/#promo' },
      { label: 'Testimoni', href: '/#testimonials' },
      { label: 'Artikel', href: '/blog' },
      { label: 'Hubungi Kami', href: '/contact' },
    ],
    hiring: 'We Are Hiring',
    phone: '0811 1085 850',
    phoneHref: 'https://wa.me/628111085850',
    email: 'info@piranusa.com',
    rights: 'PT PIRANTI NUSANTARA TEKNOLOGI © 2026 ALL RIGHTS RESERVED',
  },
  en: {
    tagline: ['Design Software Solutions', 'For Professional Projects'],
    offices: [
      {
        name: 'Jakarta Office',
        lines: ['Cityloft Sudirman Jakarta', 'Jl. K.H. Mas Mansyur No.121', 'Jakarta 10250'],
      },
      {
        name: 'Surabaya Office',
        lines: ['Cityloft Sudirman Jakarta', 'Jl. K.H. Mas Mansyur No.121', 'Jakarta 10250'],
      },
    ],
    productsHeading: 'Products',
    products: [
      { label: 'ZWCAD', href: '/products/zwcad' },
      { label: 'ZW3D', href: '/products/zw3d' },
      { label: 'ARCHICAD', href: '/products/archicad' },
      { label: 'ENSCAPE', href: '/products' },
      { label: 'SKETCHUP', href: '/products' },
      { label: 'D5 RENDER', href: '/products' },
      { label: 'ADOBE', href: '/products' },
      { label: 'KASPERSKY', href: '/products' },
      { label: 'MICROSOFT', href: '/products' },
    ],
    menu: [
      { label: 'About Us', href: '/about' },
      { label: 'Training & Services', href: '/training' },
      { label: 'Events & Promos', href: '/#promo' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Articles', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
    hiring: 'We Are Hiring',
    phone: '0811 1085 850',
    phoneHref: 'https://wa.me/628111085850',
    email: 'info@piranusa.com',
    rights: 'PT PIRANTI NUSANTARA TEKNOLOGI © 2026 ALL RIGHTS RESERVED',
  },
}

const AWARDS = [
  { src: '/images/zwsoft-2019.svg', alt: 'ZWSOFT Partner Award 2019' },
  { src: '/images/zwsoft-2020.svg', alt: 'ZWSOFT Partner Award 2020' },
  { src: '/images/zwsoft-2023.svg', alt: 'ZWSOFT Partner of the Year' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/zwcad.piranusa', Icon: Instagram },
  { label: 'YouTube', href: '#', Icon: Youtube },
]

const menuItemClass =
  'group flex items-center justify-between gap-3 border-l-2 border-orange bg-white/[0.03] py-2.5 pl-3 pr-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white'

export function Footer({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <footer className="relative isolate overflow-hidden bg-navy text-white">
      {/* warm gradient glow bleeding in from the bottom-right, per Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-[440px] w-[55%] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 78% 55%, rgba(255,151,6,0.38) 0%, rgba(255,111,6,0.16) 45%, rgba(0,25,66,0) 74%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">
        {/* top hairline with orange accent segment */}
        <div className="relative mb-12 h-px w-full bg-white/15">
          <span className="absolute left-[20%] top-0 h-px w-24 bg-orange" />
        </div>

        {/* brand + awards row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" className="flex items-center leading-none">
              <Image
                src="/images/piranusa-logo.svg"
                alt="Piranusa"
                width={158}
                height={65}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              {t.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="flex items-center gap-5">
            {AWARDS.map((award) => (
              <Image
                key={award.src}
                src={award.src}
                alt={award.alt}
                width={78}
                height={64}
                className="h-16 w-auto opacity-90"
              />
            ))}
          </div>
        </div>

        {/* three-column body */}
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* offices + contact */}
          <div className="flex flex-col gap-7">
            {t.offices.map((office) => (
              <div key={office.name}>
                <h3 className="text-sm font-bold text-orange">{office.name}</h3>
                <address className="mt-2 flex flex-col gap-0.5 text-sm not-italic leading-relaxed text-white/75">
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            ))}

            <div className="mt-2 flex flex-col gap-3 text-sm text-white/85">
              <a
                href={t.phoneHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-orange">
                  <WhatsAppGlyph />
                </span>
                {t.phone}
              </a>
              <a
                href={`mailto:${t.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-orange">
                  <MailGlyph />
                </span>
                {t.email}
              </a>
            </div>

            <div className="mt-1 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-navy transition-transform hover:scale-105"
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </div>

          {/* products */}
          <div>
            <Link
              href="/products"
              className="mb-4 flex items-center justify-between gap-3 border-l-2 border-orange bg-white/[0.03] py-2.5 pl-3 pr-3 text-[11px] font-bold uppercase tracking-[0.2em] text-orange transition-colors hover:bg-white/[0.06]"
            >
              <span>{t.productsHeading}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <ul className="flex flex-col gap-2 pl-3">
              {t.products.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* menu + hiring */}
          <div>
            <ul className="flex flex-col gap-2.5">
              {t.menu.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={menuItemClass}>
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-white/50 transition-colors group-hover:text-orange" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center bg-orange px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-navy transition-colors hover:bg-orange/90"
            >
              {t.hiring}
            </Link>
          </div>
        </div>

        {/* bottom credit */}
        <div className="mt-16 text-center text-[10px] uppercase tracking-[0.25em] text-white/45">
          {t.rights}
        </div>
      </div>
    </footer>
  )
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.02 2C6.5 2 2.03 6.47 2.03 11.99c0 1.76.46 3.48 1.34 5L2 22l5.14-1.35c1.46.8 3.11 1.22 4.88 1.22 5.52 0 9.99-4.47 9.99-9.99C22.01 6.47 17.54 2 12.02 2z" />
    </svg>
  )
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
