'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/types/content'
import { LocaleSwitcher } from './LocaleSwitcher'

export interface NavLinkItem {
  href: string
  label: string
}

export function MobileNav({ links, locale }: { links: NavLinkItem[]; locale: Locale }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-white"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-4 bg-navy px-6 py-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
        </div>
      )}
    </div>
  )
}
