import { getProducts, getProduct, getPosts } from '@/lib/content'
import { describe, it, expect } from 'vitest'

describe('content accessors', () => {
  it('returns products localized to id', () => {
    const products = getProducts('id')
    expect(products.length).toBeGreaterThan(0)
    expect(typeof products[0].name.id).toBe('string')
    expect(products[0].slug).toBeTruthy()
  })
  it('gets a single product by slug', () => {
    const all = getProducts('id')
    const one = getProduct(all[0].slug, 'id')
    expect(one?.slug).toBe(all[0].slug)
  })
  it('returns posts localized to en', () => {
    expect(getPosts('en').length).toBeGreaterThan(0)
  })
})
