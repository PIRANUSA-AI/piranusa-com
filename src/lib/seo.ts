import type { Metadata } from 'next'
import type { Locale, Product, Post } from '@/types/content'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const COMPANY = 'PT Piranti Nusantara Teknologi'
const DEFAULT_OG = '/opengraph-image'

export function buildMetadata(opts: {
  title: string; description: string; path: string; locale: Locale; image?: string
  type?: 'website' | 'article'
}): Metadata {
  const { title, description, path, locale, image, type = 'website' } = opts
  const clean = path.startsWith('/') ? path : `/${path}`
  const suffix = clean === '/' ? '' : clean
  const url = `${SITE_URL}/${locale}${suffix}`
  const ogImage = image ?? `${SITE_URL}${DEFAULT_OG}`
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_URL}/id${suffix}`,
        en: `${SITE_URL}/en${suffix}`,
        'x-default': `${SITE_URL}/id${suffix}`,
      },
    },
    openGraph: {
      title, description, url, siteName: 'Piranusa',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type, images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: COMPANY, alternateName: 'Piranusa', url: SITE_URL,
    sameAs: ['https://www.linkedin.com/', 'https://www.instagram.com/zwcad.piranusa'],
  }
}
export function productSchema(p: Product, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name[locale], description: p.description[locale], brand: { '@type': 'Brand', name: p.name[locale] },
  }
}
export function articleSchema(post: Post, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title[locale], description: post.metaDescription[locale],
    datePublished: post.publishedAt, image: `${SITE_URL}${post.coverImage}`,
    publisher: { '@type': 'Organization', name: COMPANY },
  }
}
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.url}`,
    })),
  }
}
