'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import type { Locale } from '@/types/content'

const LOCALES: Locale[] = ['id', 'en']

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-white">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/40">|</span>}
          <button
            type="button"
            aria-current={locale === l ? 'true' : undefined}
            onClick={() => router.replace(pathname, { locale: l })}
            className={locale === l ? 'text-white' : 'text-white/50 hover:text-white'}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
