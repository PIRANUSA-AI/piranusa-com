import { Check } from 'lucide-react'
import type { Locale, Product } from '@/types/content'

const COPY: Record<Locale, { eyebrow: string; heading: (name: string) => string }> = {
  id: {
    eyebrow: 'FITUR UTAMA',
    heading: (name) => `Mengapa ${name}?`,
  },
  en: {
    eyebrow: 'KEY FEATURES',
    heading: (name) => `Why ${name}?`,
  },
}

export function ProductFeatures({ product, locale }: { product: Product; locale: Locale }) {
  const t = COPY[locale]
  const features = product.features[locale]

  return (
    <section className="bg-navy-800">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange">{t.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold text-white md:text-4xl">
          {t.heading(product.name[locale])}
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
              <span className="text-base text-white/85">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
