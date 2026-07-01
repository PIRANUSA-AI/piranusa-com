import type { Category, Locale, Product } from '@/types/content'
import { ProductCard } from '@/components/ui/ProductCard'

export function ProductGrid({
  locale,
  products,
  categories,
}: {
  locale: Locale
  products: Product[]
  categories: Category[]
}) {
  const groups = categories
    .map((category) => ({
      category,
      items: products.filter((product) => product.category === category.slug),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="space-y-16">
      {groups.map(({ category, items }) => (
        <section key={category.slug}>
          <h2 className="font-sans text-xl font-bold text-white md:text-2xl">
            {category.name[locale]}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
