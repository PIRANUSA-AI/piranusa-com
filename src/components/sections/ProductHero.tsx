import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Locale, Product } from '@/types/content'

const COPY: Record<
  Locale,
  { home: string; products: string; ctaPrimary: string; ctaSecondary: string; waMessage: (name: string) => string }
> = {
  id: {
    home: 'Beranda',
    products: 'Produk',
    ctaPrimary: 'MINTA PENAWARAN',
    ctaSecondary: 'LIHAT SEMUA PRODUK',
    waMessage: (name) => `Halo Piranusa, saya tertarik dengan ${name}`,
  },
  en: {
    home: 'Home',
    products: 'Products',
    ctaPrimary: 'REQUEST QUOTE',
    ctaSecondary: 'VIEW ALL PRODUCTS',
    waMessage: (name) => `Hello Piranusa, I'm interested in ${name}`,
  },
}

const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  cad: { id: 'CAD', en: 'CAD' },
  bim: { id: 'BIM', en: 'BIM' },
  '3d': { id: 'Pemodelan 3D', en: '3D Modeling' },
  rendering: { id: 'Rendering', en: 'Rendering' },
}

export function ProductHero({ product, locale }: { product: Product; locale: Locale }) {
  const t = COPY[locale]
  const categoryLabel = CATEGORY_LABELS[product.category]?.[locale] ?? product.category
  const waHref = `https://wa.me/628111085850?text=${encodeURIComponent(t.waMessage(product.name[locale]))}`
  const image = product.gallery[0] ?? product.logo

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <nav aria-label="breadcrumb" className="font-mono text-xs uppercase tracking-[0.15em] text-white/60">
          <Link href="/" className="hover:text-white">
            {t.home}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white">
            {t.products}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name[locale]}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange">{categoryLabel}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <h1 className="font-sans text-3xl font-extrabold leading-tight md:text-5xl">
                {product.name[locale]}
              </h1>
              <span className="whitespace-nowrap rounded-full border border-orange/40 px-3 py-1 font-mono text-xs uppercase text-orange">
                v{product.version}
              </span>
            </div>
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
              {product.description[locale]}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-orange px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-navy hover:bg-orange/90"
              >
                {t.ctaPrimary}
              </a>
              <Link
                href="/products"
                className="rounded border border-white/30 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white hover:border-white/60"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/5">
            <Image
              src={image}
              alt={product.name[locale]}
              width={640}
              height={480}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
