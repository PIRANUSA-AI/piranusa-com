// tests/i18n/routing.test.ts
import { routing } from '@/i18n/routing'
import { describe, it, expect } from 'vitest'

describe('i18n routing', () => {
  it('supports id and en with id default', () => {
    expect(routing.locales).toEqual(['id', 'en'])
    expect(routing.defaultLocale).toBe('id')
  })
})
