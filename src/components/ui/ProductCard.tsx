import { Link } from '@/i18n/routing'
import type { Locale, Product } from '@/types/content'

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:border-orange/60 hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-sans text-lg font-bold text-white">{product.name[locale]}</span>
        <span className="whitespace-nowrap rounded-full border border-orange/40 px-2 py-0.5 font-mono text-[10px] uppercase text-orange">
          v{product.version}
        </span>
      </div>
      <p className="line-clamp-3 text-sm text-white/70">{product.description[locale]}</p>
    </Link>
  )
}
