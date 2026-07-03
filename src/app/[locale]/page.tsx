import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPosts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Hero } from '@/components/sections/Hero'
import { IndustrySolutions } from '@/components/sections/IndustrySolutions'
import { BrandPartners } from '@/components/sections/BrandPartners'
import { WhyPiranusa } from '@/components/sections/WhyPiranusa'
import { StickyImageReveal } from '@/components/sections/StickyImageReveal'
import { ImageSectionTwo } from '@/components/sections/ImageSectionTwo'
import { TrainingServices } from '@/components/sections/TrainingServices'

import { PromoEvents } from '@/components/sections/PromoEvents'
import { VideoTestimonials } from '@/components/sections/VideoTestimonials'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { FaqSection } from '@/components/sections/FaqSection'

import { ConsultationCta } from '@/components/sections/ConsultationCta'

const META = {
  id: {
    title: 'Piranusa — Distributor Resmi ZWCAD & Archicad Indonesia',
    description:
      'Piranusa adalah mitra teknologi yang mendampingi Anda dari implementasi hingga sertifikasi. Distributor resmi ZWCAD, Archicad, dan ZW3D untuk industri arsitektur dan manufaktur di Indonesia.',
  },
  en: {
    title: 'Piranusa — Official ZWCAD & Archicad Distributor in Indonesia',
    description:
      'Piranusa is a technology partner that supports you from implementation through certification. Official distributor of ZWCAD, Archicad, and ZW3D for architecture and manufacturing in Indonesia.',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale]
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/',
    locale: locale as Locale,
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const posts = getPosts(typedLocale)

  return (
    <main>
      <Hero locale={typedLocale} />
      <WhyPiranusa locale={typedLocale} />
      <StickyImageReveal />
      <IndustrySolutions locale={typedLocale} />
      <BrandPartners locale={typedLocale} />
      <ImageSectionTwo />
      <TrainingServices locale={typedLocale} />
      <PromoEvents locale={typedLocale} />
      <VideoTestimonials locale={typedLocale} />
      <TrustedBy locale={typedLocale} />
      <FaqSection locale={typedLocale} />
      <ConsultationCta locale={typedLocale} />
    </main>
  )
}
