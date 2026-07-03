import type { Locale, Product } from '@/types/content'
import { ProductCard } from '@/components/ui/ProductCard'

const COPY: Record<Locale, { eyebrow: string; heading: string }> = {
  id: { eyebrow: 'PRODUK UNGGULAN', heading: 'Mitra Resmi Brand Terkemuka Dunia' },
  en: { eyebrow: 'FEATURED PRODUCTS', heading: 'Official Partner of World-Leading Brands' },
}

const PARTNER_BRANDS = [
  'ZWCAD',
  'ZW3D',
  'ARCHICAD',
  'ENSCAPE',
  'SKETCHUP',
  'D5 RENDER',
  'KASPERSKY',
  'ADOBE',
  'MICROSOFT',
]

export function FeaturedProducts({ locale, products }: { locale: Locale; products: Product[] }) {
  const t = COPY[locale]

  return (
    <section className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold md:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-10 text-center font-mono text-xs uppercase tracking-[0.15em] text-white/60">
          {PARTNER_BRANDS.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
