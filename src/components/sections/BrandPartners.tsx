import Link from 'next/link'
import type { Locale } from '@/types/content'

type Partner = {
  name: string
  href: string
}

const PARTNERS: Partner[] = [
  { name: 'ZWCAD', href: '#' },
  { name: 'ZW3D', href: '#' },
  { name: 'Archicad', href: '#' },
  { name: 'Enscape', href: '#' },
  { name: 'SketchUp', href: '#' },
  { name: 'V-Ray', href: '#' },
  { name: 'Enscape', href: '#' },
  { name: 'D5 Render', href: '#' },
]

const COPY: Record<
  Locale,
  { eyebrow: string; heading: string; cta: string }
> = {
  id: {
    eyebrow: 'PRINCIPAL KAMI',
    heading: 'Mitra resmi brand software desain terkemuka di dunia',
    cta: 'KATALOG LENGKAP',
  },
  en: {
    eyebrow: 'OUR PRINCIPALS',
    heading: 'Official partner of the world’s leading design software brands',
    cta: 'FULL CATALOG',
  },
}

export function BrandPartners({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative z-10 overflow-hidden bg-navy text-white">
      {/* warm radial glow, bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-[60%] w-[45%] bg-[radial-gradient(circle_at_80%_80%,rgba(255,151,6,0.32),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* left: eyebrow */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.28em] text-orange">
              {t.eyebrow}
            </p>
          </div>

          {/* right: heading */}
          <div className="lg:col-span-8">
            <h2 className="font-sans text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </div>

        {/* partner grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner, i) => (
            <Link
              key={`${partner.name}-${i}`}
              href={partner.href}
              className="group relative flex aspect-[16/9] items-center justify-center rounded-lg border border-white/15 bg-white/[0.02] transition-colors duration-300 hover:border-orange/60 hover:bg-white/[0.05]"
            >
              {/* arrow top-right */}
              <span
                aria-hidden
                className="absolute right-4 top-4 text-white/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </span>

              {/* logo placeholder */}
              <span className="font-sans text-xl font-bold tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
                {partner.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="#"
            className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
          >
            <span aria-hidden className="h-4 w-1 flex-none bg-orange" />
            {t.cta}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
