import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { JsonLd } from '@/components/JsonLd'
import { ContactForm } from '@/components/sections/ContactForm'

const META = {
  id: {
    title: 'Hubungi Kami — Konsultasi Software CAD & BIM | Piranusa',
    description:
      'Hubungi PIRANUSA untuk konsultasi, penawaran harga, dan dukungan software CAD, BIM, dan rendering. Tim kami siap membantu kebutuhan desain dan engineering Anda.',
  },
  en: {
    title: 'Contact Us — CAD & BIM Software Consultation | Piranusa',
    description:
      'Contact PIRANUSA for consultation, pricing, and support on CAD, BIM, and rendering software. Our team is ready to help your design and engineering needs.',
  },
} as const

const CONTACT = {
  phone: '0811 1085 850',
  phoneHref: 'https://wa.me/628111085850',
  email: 'info@piranusa.com',
  office: {
    lines: ['Cityloft Sudirman Jakarta', 'Jl. K.H. Mas Mansyur No.121', 'Jakarta 10250'],
  },
} as const

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    subhead: string
    formHeading: string
    infoHeading: string
    phoneLabel: string
    emailLabel: string
    officeLabel: string
    hoursLabel: string
    hours: string
    officeName: string
  }
> = {
  id: {
    eyebrow: 'HUBUNGI KAMI',
    heading: 'Mari Bicarakan Kebutuhan Anda',
    subhead:
      'Punya pertanyaan tentang software, harga, atau training? Isi formulir di bawah atau hubungi kami langsung. Tim kami akan merespons dalam 1x24 jam kerja.',
    formHeading: 'Kirim Pesan',
    infoHeading: 'Informasi Kontak',
    phoneLabel: 'Telepon / WhatsApp',
    emailLabel: 'Email',
    officeLabel: 'Kantor',
    hoursLabel: 'Jam Operasional',
    hours: 'Senin – Jumat, 09.00 – 17.00 WIB',
    officeName: 'Kantor Jakarta',
  },
  en: {
    eyebrow: 'CONTACT US',
    heading: "Let's Talk About Your Needs",
    subhead:
      'Have questions about software, pricing, or training? Fill out the form below or contact us directly. Our team will respond within 1 business day.',
    formHeading: 'Send a Message',
    infoHeading: 'Contact Information',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
    officeLabel: 'Office',
    hoursLabel: 'Business Hours',
    hours: 'Monday – Friday, 09:00 – 17:00 WIB',
    officeName: 'Jakarta Office',
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
    path: '/contact',
    locale: locale as Locale,
  })
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
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
          { name: t.eyebrow, url: `/${typedLocale}/contact` },
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

      {/* Form + Info */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-2xl font-extrabold md:text-3xl">{t.formHeading}</h2>
            <div className="mt-8">
              <ContactForm locale={typedLocale} />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="font-sans text-2xl font-extrabold md:text-3xl">{t.infoHeading}</h2>
            <div className="mt-8 space-y-8">
              <InfoItem icon={<Phone className="h-5 w-5" />} label={t.phoneLabel}>
                <a
                  href={CONTACT.phoneHref}
                  className="text-navy/80 transition-colors hover:text-orange"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONTACT.phone}
                </a>
              </InfoItem>

              <InfoItem icon={<Mail className="h-5 w-5" />} label={t.emailLabel}>
                <a href={`mailto:${CONTACT.email}`} className="text-navy/80 transition-colors hover:text-orange">
                  {CONTACT.email}
                </a>
              </InfoItem>

              <InfoItem icon={<MapPin className="h-5 w-5" />} label={t.officeLabel}>
                <p className="font-medium text-navy">{t.officeName}</p>
                <address className="not-italic text-navy/70">
                  {CONTACT.office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </InfoItem>

              <InfoItem icon={<Clock className="h-5 w-5" />} label={t.hoursLabel}>
                <p className="text-navy/80">{t.hours}</p>
              </InfoItem>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-navy/50">{label}</p>
        <div className="mt-1 space-y-0.5">{children}</div>
      </div>
    </div>
  )
}
