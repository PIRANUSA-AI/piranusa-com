import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getProducts, getCategories } from '@/lib/content'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Link } from '@/i18n/routing'
import { JsonLd } from '@/components/JsonLd'
import { ProductGrid } from '@/components/sections/ProductGrid'

const META = {
  id: {
    title: 'Produk — Software CAD, BIM & Rendering | Piranusa',
    description:
      'Jelajahi katalog lengkap software CAD, BIM, dan rendering dari PIRANUSA, distributor resmi ZWCAD, Archicad, ZW3D, dan brand terkemuka dunia lainnya.',
  },
  en: {
    title: 'Products — CAD, BIM & Rendering Software | Piranusa',
    description:
      'Browse the full catalog of CAD, BIM, and rendering software from PIRANUSA, official distributor of ZWCAD, Archicad, ZW3D, and other leading world brands.',
  },
} as const

const COPY: Record<Locale, { eyebrow: string; heading: string; subhead: string; ctaHeading: string; ctaButton: string }> = {
  id: {
    eyebrow: 'PRODUK',
    heading: 'Solusi Software CAD, BIM & Rendering',
    subhead:
      'PIRANUSA adalah distributor resmi untuk software desain 2D/3D, BIM, dan rendering terkemuka dunia. Temukan solusi yang tepat untuk industri Anda.',
    ctaHeading: 'Butuh bantuan memilih software yang tepat?',
    ctaButton: 'KONSULTASI GRATIS',
  },
  en: {
    eyebrow: 'PRODUCTS',
    heading: 'CAD, BIM & Rendering Software Solutions',
    subhead:
      'PIRANUSA is the official distributor for world-leading 2D/3D design, BIM, and rendering software. Find the right solution for your industry.',
    ctaHeading: 'Need help choosing the right software?',
    ctaButton: 'FREE CONSULTATION',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale]
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/products',
    locale: locale as Locale,
  })
}

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const t = COPY[typedLocale]
  const products = getProducts(typedLocale)
  const categories = getCategories(typedLocale)

  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'
  const productsName = typedLocale === 'id' ? 'Produk' : 'Products'

  return (
    <main className="bg-navy text-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: productsName, url: `/${typedLocale}/products` },
        ])}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange">{t.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold md:text-5xl">
          {t.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/80">{t.subhead}</p>

        <div className="mt-14">
          <ProductGrid locale={typedLocale} products={products} categories={categories} />
        </div>
      </section>

      <section className="bg-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl font-sans text-2xl font-extrabold md:text-3xl">
            {t.ctaHeading}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-orange px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-navy transition-colors hover:bg-orange/90"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  )
}
