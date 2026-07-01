import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getProduct, getProducts } from '@/lib/content'
import { buildMetadata, productSchema, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Link } from '@/i18n/routing'
import { JsonLd } from '@/components/JsonLd'
import { ProductHero } from '@/components/sections/ProductHero'
import { ProductFeatures } from '@/components/sections/ProductFeatures'

const LOCALES: Locale[] = ['id', 'en']

const COPY: Record<Locale, { ctaHeading: (name: string) => string; ctaButton: string }> = {
  id: {
    ctaHeading: (name) => `Siap meningkatkan produktivitas tim Anda dengan ${name}?`,
    ctaButton: 'HUBUNGI KAMI',
  },
  en: {
    ctaHeading: (name) => `Ready to boost your team's productivity with ${name}?`,
    ctaButton: 'CONTACT US',
  },
}

export async function generateStaticParams() {
  const products = getProducts('id')
  return LOCALES.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const typedLocale = locale as Locale
  const product = getProduct(slug, typedLocale)

  if (!product) {
    return { title: 'Piranusa' }
  }

  return buildMetadata({
    title: `${product.name[typedLocale]} ${product.version} — Piranusa`,
    description: product.description[typedLocale],
    path: `/products/${slug}`,
    locale: typedLocale,
  })
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const product = getProduct(slug, typedLocale)

  if (!product) {
    notFound()
  }

  const t = COPY[typedLocale]
  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'
  const productsName = typedLocale === 'id' ? 'Produk' : 'Products'

  return (
    <main className="bg-navy text-white">
      <JsonLd data={productSchema(product, typedLocale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: productsName, url: `/${typedLocale}/products` },
          { name: product.name[typedLocale], url: `/${typedLocale}/products/${slug}` },
        ])}
      />

      <ProductHero product={product} locale={typedLocale} />
      <ProductFeatures product={product} locale={typedLocale} />

      <section className="bg-orange">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 text-navy md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl font-sans text-2xl font-extrabold md:text-3xl">
            {t.ctaHeading(product.name[typedLocale])}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-navy/90"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  )
}
