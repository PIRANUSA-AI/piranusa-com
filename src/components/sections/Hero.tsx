import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'

const COPY: Record<
  Locale,
  {
    eyebrow: string
    headline: string
    accent: string
    body: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { value: string; label: string }[]
  }
> = {
  id: {
    eyebrow: 'SOLUSI BERDASARKAN INDUSTRI',
    headline: 'Solusi CAD & BIM Terpercaya untuk Industri Indonesia',
    accent: "WE'll GET IT DONE!",
    body:
      'Piranusa adalah mitra teknologi yang mendampingi Anda dari implementasi hingga sertifikasi. Piranusa hadir sebagai distributor resmi ZWCAD, Archicad, dan ZW3D. Kami membantu perusahaan arsitektur dan manufaktur mengoptimalkan desain dan mempercepat alur kerja tanpa kompromi kualitas.',
    ctaPrimary: 'HUBUNGI KAMI',
    ctaSecondary: 'LIHAT PRODUK',
    stats: [
      { value: '8+', label: 'Principal Global mempercayai kami sebagai distributor' },
      { value: '500+', label: 'Perusahaan dari berbagai sektor industri' },
      { value: '17+', label: 'Tahun melayani kebutuhan software Indonesia' },
    ],
  },
  en: {
    eyebrow: 'INDUSTRY-BASED SOLUTIONS',
    headline: 'Trusted CAD & BIM Solutions for Indonesian Industry',
    accent: "WE'll GET IT DONE!",
    body:
      'Piranusa is a technology partner that supports you from implementation through certification. Piranusa is the official distributor of ZWCAD, Archicad, and ZW3D. We help architecture and manufacturing companies optimize design and speed up workflows without compromising quality.',
    ctaPrimary: 'CONTACT US',
    ctaSecondary: 'VIEW PRODUCTS',
    stats: [
      { value: '8+', label: 'Global principals trust us as distributor' },
      { value: '500+', label: 'Companies across industry sectors' },
      { value: '17+', label: "Years serving Indonesia's software needs" },
    ],
  },
}

export function Hero({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange">{t.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-sans text-[32px] font-extrabold leading-tight md:text-[50px]">
          {t.headline}
        </h1>
        <p className="mt-2 font-sans text-2xl font-extrabold text-orange md:text-4xl">{t.accent}</p>
        <p className="mt-6 max-w-2xl font-sans text-base text-white/80 md:text-lg">{t.body}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded bg-orange px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-navy hover:bg-orange/90"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href="/products"
            className="rounded border border-white/30 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white hover:border-white/60"
          >
            {t.ctaSecondary}
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {t.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-sans text-4xl font-extrabold text-orange">{stat.value}</dt>
              <dd className="mt-2 max-w-xs text-sm text-white/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
