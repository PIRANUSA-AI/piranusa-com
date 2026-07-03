import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { fontSans, fontMono } from '../fonts'
import '../globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsappButton } from '@/components/ui/WhatsappButton'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, SITE_URL } from '@/lib/seo'
import type { Locale } from '@/types/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Piranusa — Distributor Resmi ZWCAD & Archicad Indonesia',
    template: '%s | Piranusa',
  },
  applicationName: 'Piranusa',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/favicon.ico' },
}

export const viewport = {
  themeColor: '#0a0a0a',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <html lang={locale} className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as Locale} />
          {children}
          <Footer locale={locale as Locale} />
          <WhatsappButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
