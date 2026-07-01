import type { Metadata } from 'next'
import type { Locale, Product, Post } from '@/types/content'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const COMPANY = 'PT Piranti Nusantara Teknologi'

export function buildMetadata(opts: {
  title: string; description: string; path: string; locale: Locale; image?: string
}): Metadata {
  const { title, description, path, locale, image } = opts
  const clean = path.startsWith('/') ? path : `/${path}`
  const url = `${SITE_URL}/${locale}${clean === '/' ? '' : clean}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_URL}/id${clean === '/' ? '' : clean}`,
        en: `${SITE_URL}/en${clean === '/' ? '' : clean}`,
      },
    },
    openGraph: {
      title, description, url, siteName: 'Piranusa', locale,
      type: 'website', images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
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
