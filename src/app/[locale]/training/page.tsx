import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { GraduationCap, Wrench, BadgeCheck, Headphones } from 'lucide-react'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { JsonLd } from '@/components/JsonLd'
import { TrainingServices } from '@/components/sections/TrainingServices'
import { ConsultationCta } from '@/components/sections/ConsultationCta'

const META = {
  id: {
    title: 'Training & Layanan — Sertifikasi CAD & BIM | Piranusa',
    description:
      'Program training dan layanan PIRANUSA: sertifikasi CAD 2D & 3D, implementasi BIM end-to-end, instalasi software, dan dukungan teknis oleh instruktur berpengalaman.',
  },
  en: {
    title: 'Training & Services — CAD & BIM Certification | Piranusa',
    description:
      "PIRANUSA training programs and services: 2D & 3D CAD certification, end-to-end BIM implementation, software installation, and technical support by experienced instructors.",
  },
} as const

type Service = {
  icon: React.ReactNode
  title: string
  body: string
}

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    subhead: string
    servicesHeading: string
    services: Service[]
  }
> = {
  id: {
    eyebrow: 'TRAINING & LAYANAN',
    heading: 'Software, Training, dan Dukungan dalam Satu Atap',
    subhead:
      'Kami tidak berhenti di penjualan lisensi. PIRANUSA memastikan tim Anda menguasai software melalui training bersertifikat, implementasi terpandu, dan dukungan teknis berkelanjutan.',
    servicesHeading: 'Yang Kami Sediakan',
    services: [
      {
        icon: <GraduationCap className="h-6 w-6" />,
        title: 'Training Bersertifikat',
        body: 'Kelas CAD 2D & 3D dan BIM dengan kurikulum praktis, dipandu instruktur berpengalaman, dan sertifikat kompetensi resmi.',
      },
      {
        icon: <Wrench className="h-6 w-6" />,
        title: 'Implementasi & Instalasi',
        body: 'Pendampingan instalasi software, konfigurasi lisensi, dan integrasi alur kerja BIM end-to-end di lingkungan kerja Anda.',
      },
      {
        icon: <BadgeCheck className="h-6 w-6" />,
        title: 'Sertifikasi Tim',
        body: 'Uji kompetensi dan sertifikasi tim untuk memenuhi standar profesional dan meningkatkan kredibilitas proyek.',
      },
      {
        icon: <Headphones className="h-6 w-6" />,
        title: 'Dukungan Teknis',
        body: 'Bantuan teknis pasca-pembelian, troubleshooting, dan konsultasi berkelanjutan agar investasi Anda maksimal.',
      },
    ],
  },
  en: {
    eyebrow: 'TRAINING & SERVICES',
    heading: 'Software, Training, and Support Under One Roof',
    subhead:
      "We don't stop at selling licenses. PIRANUSA makes sure your team masters the software through certified training, guided implementation, and ongoing technical support.",
    servicesHeading: 'What We Provide',
    services: [
      {
        icon: <GraduationCap className="h-6 w-6" />,
        title: 'Certified Training',
        body: 'Practical CAD 2D & 3D and BIM classes, led by experienced instructors, with official competency certificates.',
      },
      {
        icon: <Wrench className="h-6 w-6" />,
        title: 'Implementation & Installation',
        body: 'Software installation guidance, license configuration, and end-to-end BIM workflow integration in your work environment.',
      },
      {
        icon: <BadgeCheck className="h-6 w-6" />,
        title: 'Team Certification',
        body: 'Competency assessment and team certification to meet professional standards and boost project credibility.',
      },
      {
        icon: <Headphones className="h-6 w-6" />,
        title: 'Technical Support',
        body: 'Post-purchase technical assistance, troubleshooting, and ongoing consultation to maximize your investment.',
      },
    ],
  },
}

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }]
}

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
    path: '/training',
    locale: locale as Locale,
  })
}

export default async function Training({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const t = COPY[typedLocale]
  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'

  return (
    <main className="bg-white text-navy">
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: t.eyebrow, url: `/${typedLocale}/training` },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold tracking-widest text-orange">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-sans text-4xl font-extrabold leading-tight md:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">{t.subhead}</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <h2 className="font-sans text-2xl font-extrabold md:text-3xl">{t.servicesHeading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map((service) => (
            <div key={service.title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                {service.icon}
              </div>
              <h3 className="mt-5 font-sans text-lg font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed training section (reused from homepage) */}
      <TrainingServices locale={typedLocale} />

      {/* Consultation CTA */}
      <ConsultationCta locale={typedLocale} />
    </main>
  )
}
