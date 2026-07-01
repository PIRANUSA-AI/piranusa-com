import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getProducts, getPosts } from '@/lib/content'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/products', '/about', '/contact', '/blog']
  const entries: MetadataRoute.Sitemap = []
  for (const locale of routing.locales) {
    for (const p of staticPaths) entries.push({ url: `${SITE_URL}/${locale}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.8 })
    for (const prod of getProducts(locale)) entries.push({ url: `${SITE_URL}/${locale}/products/${prod.slug}`, changeFrequency: 'monthly', priority: 0.7 })
    for (const post of getPosts(locale)) entries.push({ url: `${SITE_URL}/${locale}/blog/${post.slug}`, lastModified: post.publishedAt, changeFrequency: 'monthly', priority: 0.6 })
  }
  return entries
}
