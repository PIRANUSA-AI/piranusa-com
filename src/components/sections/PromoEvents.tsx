import Link from 'next/link'
import type { Locale } from '@/types/content'

type EventItem = {
  title: string
  href: string
}

// Placeholder events — real content/images provided later.
const EVENTS: EventItem[] = [
  { title: 'Event 1', href: '#' },
  { title: 'Event 2', href: '#' },
  { title: 'Event 3', href: '#' },
]

const COPY: Record<
  Locale,
  { eyebrow: string; heading: string; cta: string }
> = {
  id: {
    eyebrow: 'EVENT & PROMOSI',
    heading: 'Promo & Event Mendatang',
    cta: 'SEMUA EVENT',
  },
  en: {
    eyebrow: 'EVENTS & PROMOS',
    heading: 'Upcoming Promos & Events',
    cta: 'ALL EVENTS',
  },
}

export function PromoEvents({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative z-10 overflow-hidden bg-navy text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* header: eyebrow left, heading right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.28em] text-orange">
              {t.eyebrow}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-sans text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </div>

        {/* event cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, i) => (
            <Link
              key={`${event.title}-${i}`}
              href={event.href}
              className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-lg bg-orange transition-transform duration-300 hover:-translate-y-1"
            >
              {/* image placeholder — solid orange until asset provided */}
              <span
                aria-hidden
                className="absolute right-4 top-4 text-navy/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
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
