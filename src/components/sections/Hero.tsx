import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'

const COPY: Record<
  Locale,
  {
    eyebrow: string
    headline: string
    accent: string
    body: string
    commitment: string
    stats: { value: string; label: string }[]
  }
> = {
  id: {
    eyebrow: 'SOLUSI BERDASARKAN INDUSTRI',
    headline: 'Solusi CAD & BIM Terpercaya untuk Industri Indonesia',
    accent: "WE'll GET IT DONE!",
    body:
      'Piranusa adalah mitra teknologi yang mendampingi Anda dari implementasi hingga sertifikasi. Piranusa hadir sebagai distributor resmi ZWCAD, Archicad, dan ZW3D. Kami membantu perusahaan arsitektur dan manufaktur mengoptimalkan desain dan mempercepat alur kerja tanpa kompromi kualitas.',
    commitment: 'KENALI KOMITMEN KAMI',
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
    commitment: 'GET TO KNOW OUR COMMITMENT',
    stats: [
      { value: '8+', label: 'Global principals trust us as distributor' },
      { value: '500+', label: 'Companies across industry sectors' },
      { value: '17+', label: "Years serving Indonesia's software needs" },
    ],
  },
}

export function Hero({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const stats = [...t.stats].reverse()

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* bottom gradient band — sits behind the stats row */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-r from-orange/25 via-navy to-blue-900/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[42%] w-[45%] bg-[radial-gradient(circle_at_25%_60%,rgba(255,151,6,0.35),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* one grid, two rows: [image | copy] / [gradient | stats].
            a single continuous divider runs full height at the 40/60 boundary */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
          {/* continuous vertical divider — straight, no gap, spans hero + stats */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[40%] hidden w-px bg-orange/60 lg:block"
          />

          {/* ROW 1 LEFT — wireframe render, centered against the copy */}
          <div className="flex items-center justify-center py-16 lg:py-24 lg:pr-12">
            <div className="animate-float relative aspect-square w-full max-w-md">
              <Image
                src="/images/homepage.png"
                alt="Render wireframe engine CAD"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* ROW 1 RIGHT — copy */}
          <div className="py-16 lg:py-24 lg:pl-12">
            <h1 className="font-sans text-[34px] font-extrabold leading-[1.1] md:text-[52px]">
              {t.headline}
            </h1>
            <p className="accent-bar mt-6 font-mono text-xs font-bold uppercase tracking-[0.25em] text-orange">
              {t.accent}
            </p>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/75 md:text-lg">
              {t.body}
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-stretch overflow-hidden rounded border border-white/15 transition-colors hover:border-white/30"
              >
                <span aria-hidden className="w-1.5 shrink-0 bg-orange" />
                <span className="flex items-center gap-4 py-4 pl-5 pr-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {t.commitment}
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-orange transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12 12 4M6 4h6v6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* ROW 2 LEFT — empty; orange gradient glow shows through */}
          <div className="hidden lg:block" />

          {/* ROW 2 RIGHT — stats, confined to the 60% column */}
          <dl className="grid grid-cols-1 divide-y divide-orange/60 pb-16 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:pl-12">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-4 first:pl-0 sm:py-0">
                <dt className="font-sans text-4xl font-extrabold text-orange md:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 max-w-[16ch] text-sm text-white/70">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
