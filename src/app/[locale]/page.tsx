import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getProducts, getTestimonials, getPosts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { Testimonials } from '@/components/sections/Testimonials'
import { LatestPosts } from '@/components/sections/LatestPosts'

const META = {
  id: {
    title: 'Piranusa — Distributor Resmi ZWCAD & Archicad Indonesia',
    description:
      'Piranusa adalah mitra teknologi yang mendampingi Anda dari implementasi hingga sertifikasi. Distributor resmi ZWCAD, Archicad, dan ZW3D untuk industri arsitektur dan manufaktur di Indonesia.',
  },
  en: {
    title: 'Piranusa — Official ZWCAD & Archicad Distributor in Indonesia',
    description:
      'Piranusa is a technology partner that supports you from implementation through certification. Official distributor of ZWCAD, Archicad, and ZW3D for architecture and manufacturing in Indonesia.',
  },
} as const

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
    path: '/',
    locale: locale as Locale,
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const products = getProducts(typedLocale)
  const testimonials = getTestimonials(typedLocale)
  const posts = getPosts(typedLocale)

  return (
    <main>
      <Hero locale={typedLocale} />
      <FeaturedProducts locale={typedLocale} products={products} />
      <Testimonials locale={typedLocale} testimonials={testimonials} />
      <LatestPosts locale={typedLocale} posts={posts} />
    </main>
  )
}
