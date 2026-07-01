export type Locale = 'id' | 'en'
export type Localized<T> = Record<Locale, T>

export interface Category { slug: string; name: Localized<string> }

export interface Product {
  slug: string
  name: Localized<string>
  description: Localized<string>
  version: string
  logo: string          // /images path
  gallery: string[]
  category: string      // category slug
  features: Localized<string[]>
  ctaWhatsapp: string
}

export interface Post {
  slug: string
  title: Localized<string>
  excerpt: Localized<string>
  content: Localized<string>   // markdown/html for now
  coverImage: string
  category: string
  metaDescription: Localized<string>
  publishedAt: string          // ISO
}

export interface Testimonial {
  clientName: string
  logo: string
  quote: Localized<string>
  youtubeUrl?: string
}
