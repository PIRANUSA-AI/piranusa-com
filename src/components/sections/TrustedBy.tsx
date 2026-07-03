import type { Locale } from '@/types/content'

// Placeholder client names — swap for real logo images later.
const CLIENTS: string[] = [
  'Waskita',
  'HK',
  'Alfamidi',
  'PLN',
  'Siloam Hospitals',
  'Nippon Koei',
  'PP',
  'Berca Buana Sakti',
  'Indosat',
  'Intiland',
  'WIKA',
  'Yamaha',
]

const COPY: Record<Locale, { heading: string }> = {
  id: { heading: 'Dipercaya oleh Banyak perusahaan terkemuka di Indonesia' },
  en: { heading: 'Trusted by many leading companies in Indonesia' },
}

export function TrustedBy({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="bg-white text-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h2 className="mx-auto max-w-2xl text-center font-sans text-2xl font-bold leading-snug text-blue md:text-3xl">
          {t.heading}
        </h2>

        <div className="mt-14 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-16 items-center justify-center rounded-md border border-navy/5 bg-grey-light/40 px-4 grayscale transition-all duration-300 hover:grayscale-0"
            >
              {/* logo placeholder */}
              <span className="text-center font-sans text-sm font-bold tracking-tight text-navy/40">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
