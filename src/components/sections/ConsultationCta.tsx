import { Phone, ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/types/content'

const COPY: Record<Locale, { heading: string; phone: string }> = {
  id: {
    heading: 'Konsultasikan kebutuhan teknologi Anda sekarang juga',
    phone: '0811 1085 850',
  },
  en: {
    heading: 'Consult your technology needs with us right now',
    phone: '0811 1085 850',
  },
}

export function ConsultationCta({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-[#001126] py-20 md:py-28">
      {/* warm gradient glow bottom-right, matching the design */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(255,151,6,0.35),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <div />
        <div>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {t.heading}
          </h2>

          <a
            href="https://wa.me/628111085850"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-md bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e6870a]"
          >
            <Phone className="h-4 w-4" />
            <span>{t.phone}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
