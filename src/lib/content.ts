import type { Category, Locale, Product, Post, Testimonial } from '@/types/content'
import { products } from '@/data/products'
import { posts } from '@/data/posts'
import { testimonials } from '@/data/testimonials'
import { categories } from '@/data/categories'

export function getProducts(_locale: Locale): Product[] { return products }
export function getCategories(_locale: Locale): Category[] { return categories }
export function getProduct(slug: string, _locale: Locale): Product | undefined {
  return products.find((p) => p.slug === slug)
}
export function getPosts(_locale: Locale): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
export function getPost(slug: string, _locale: Locale): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
export function getTestimonials(_locale: Locale): Testimonial[] { return testimonials }
