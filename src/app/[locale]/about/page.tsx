import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { JsonLd } from '@/components/JsonLd'
import { ConsultationCta } from '@/components/sections/ConsultationCta'

const META = {
  id: {
    title: 'Tentang Kami — Distributor Software CAD & BIM Resmi | Piranusa',
    description:
      'PT Piranti Nusantara Teknologi (PIRANUSA) adalah distributor resmi software CAD, BIM, dan rendering terkemuka dunia di Indonesia. Kenali visi, misi, dan komitmen kami.',
  },
  en: {
    title: 'About Us — Official CAD & BIM Software Distributor | Piranusa',
    description:
      'PT Piranti Nusantara Teknologi (PIRANUSA) is the official distributor of world-leading CAD, BIM, and rendering software in Indonesia. Get to know our vision, mission, and commitment.',
  },
} as const

type Copy = {
  eyebrow: string
  // 2. Intro
  introHeading: string
  introSidebar: string[]
  introBody: string[]
  // 3. Mission block
  missionEyebrow: string
  missionHeading: string
  missionBody: string
  // 4. Values
  valuesHeading: string
  values: { title: string; body: string }[]
  // 6. Timeline
  timelineEyebrow: string
  timelineHeading: string
  timeline: { year: string; title: string; body: string }[]
  // 7. Everything you need
  offerEyebrow: string
  offerHeading: string
  offerBody: string
  offers: { title: string; body: string }[]
  offerCta: string
  // 9. Strategic steps
  stepsEyebrow: string
  stepsHeading: string
  steps: { title: string; body: string }[]
}

const COPY: Record<Locale, Copy> = {
  id: {
    eyebrow: 'TENTANG KAMI',
    introHeading: 'Mitra Teknologi Desain Terpercaya di Indonesia',
    introSidebar: ['Visi & Misi', 'Nilai Kami', 'Perjalanan', 'Layanan', 'Strategi'],
    introBody: [
      'PT Piranti Nusantara Teknologi (PIRANUSA) menghadirkan solusi software CAD, BIM, dan rendering kelas dunia untuk industri arsitektur, engineering, manufaktur, dan konstruksi di Indonesia.',
      'Sebagai distributor resmi ZWSOFT, Archicad, dan brand terkemuka lainnya, kami tidak sekadar menjual lisensi. Kami menjadi partner jangka panjang — mulai dari konsultasi pemilihan software, implementasi, training bersertifikat, hingga dukungan teknis purna jual.',
    ],
    missionEyebrow: 'MISI KAMI',
    missionHeading: 'Memberdayakan profesional desain Indonesia tanpa batas',
    missionBody:
      'Menyediakan solusi software desain terbaik dengan harga terjangkau dan dukungan teknis lokal yang responsif, sehingga setiap profesional Indonesia dapat berkarya tanpa batas dan bersaing di panggung global.',
    valuesHeading: 'Pedoman Kami dalam Bekerja',
    values: [
      { title: 'Resmi & Legal', body: 'Setiap lisensi 100% resmi dan bergaransi langsung dari principal.' },
      { title: 'Dukungan Lokal', body: 'Tim teknis berbahasa Indonesia siap membantu implementasi Anda.' },
      { title: 'Harga Kompetitif', body: 'Penawaran terbaik untuk perusahaan, pemerintah, dan pendidikan.' },
      { title: 'Training Bersertifikat', body: 'Program pelatihan resmi untuk memaksimalkan investasi software Anda.' },
    ],
    timelineEyebrow: 'PERJALANAN KAMI',
    timelineHeading: 'Jejak Pertumbuhan & Inovasi Digital',
    timeline: [
      { year: '2013', title: 'Awal Perjalanan', body: 'PIRANUSA berdiri sebagai distributor software desain dengan fokus dukungan lokal.' },
      { year: '2019', title: 'Kemitraan ZWSOFT', body: 'Menjadi distributor resmi ZWSOFT untuk memperkuat portofolio CAD di Indonesia.' },
      { year: '2020', title: 'Ekspansi BIM', body: 'Menambah lini Archicad dan solusi BIM untuk industri arsitektur & konstruksi.' },
      { year: '2023', title: 'Pusat Training Bersertifikat', body: 'Meluncurkan program pelatihan resmi bersertifikat bagi ribuan profesional.' },
    ],
    offerEyebrow: 'LAYANAN KAMI',
    offerHeading: 'Semua yang Anda Butuhkan dalam Satu Mitra',
    offerBody:
      'Dari pemilihan software hingga dukungan purna jual, kami mendampingi setiap tahap perjalanan digital Anda.',
    offers: [
      { title: 'Software Resmi', body: 'Lisensi CAD, BIM, dan rendering resmi dengan garansi principal.' },
      { title: 'Implementasi & Konsultasi', body: 'Pendampingan teknis agar software terintegrasi mulus ke alur kerja Anda.' },
      { title: 'Training & Sertifikasi', body: 'Kelas resmi bersertifikat untuk tim Anda, online maupun tatap muka.' },
    ],
    offerCta: 'Lihat Semua Layanan',
    stepsEyebrow: 'CARA KERJA KAMI',
    stepsHeading: 'Langkah Strategis Kami Bersama Anda',
    steps: [
      { title: 'Konsultasi', body: 'Memahami kebutuhan dan tantangan spesifik industri Anda.' },
      { title: 'Rekomendasi', body: 'Menyusun solusi software yang tepat sesuai skala dan anggaran.' },
      { title: 'Implementasi', body: 'Instalasi, migrasi data, dan integrasi ke alur kerja tim.' },
      { title: 'Dukungan', body: 'Training, pemeliharaan, dan dukungan teknis jangka panjang.' },
    ],
  },
  en: {
    eyebrow: 'ABOUT US',
    introHeading: 'Indonesia’s Trusted Design Technology Partner',
    introSidebar: ['Vision & Mission', 'Our Values', 'Journey', 'Services', 'Strategy'],
    introBody: [
      'PT Piranti Nusantara Teknologi (PIRANUSA) delivers world-class CAD, BIM, and rendering software solutions for architecture, engineering, manufacturing, and construction industries across Indonesia.',
      'As the official distributor of ZWSOFT, Archicad, and other leading brands, we do more than sell licenses. We become a long-term partner — from software selection consulting and implementation to certified training and after-sales technical support.',
    ],
    missionEyebrow: 'OUR MISSION',
    missionHeading: 'Empowering Indonesian design professionals without limits',
    missionBody:
      'To provide the best design software solutions at affordable prices with responsive local technical support, so every Indonesian professional can create without limits and compete on the global stage.',
    valuesHeading: 'The Principles That Guide Our Work',
    values: [
      { title: 'Official & Legal', body: 'Every license is 100% official and warranted directly by the principal.' },
      { title: 'Local Support', body: 'An Indonesian-speaking technical team ready to help with your implementation.' },
      { title: 'Competitive Pricing', body: 'The best offers for corporate, government, and educational sectors.' },
      { title: 'Certified Training', body: 'Official training programs to maximize your software investment.' },
    ],
    timelineEyebrow: 'OUR JOURNEY',
    timelineHeading: 'A Track Record of Growth & Digital Innovation',
    timeline: [
      { year: '2013', title: 'The Beginning', body: 'PIRANUSA was founded as a design software distributor focused on local support.' },
      { year: '2019', title: 'ZWSOFT Partnership', body: 'Became the official ZWSOFT distributor, strengthening our CAD portfolio in Indonesia.' },
      { year: '2020', title: 'BIM Expansion', body: 'Added Archicad and BIM solutions for the architecture & construction industries.' },
      { year: '2023', title: 'Certified Training Center', body: 'Launched official certified training programs for thousands of professionals.' },
    ],
    offerEyebrow: 'OUR SERVICES',
    offerHeading: 'Everything You Need in One Partner',
    offerBody:
      'From software selection to after-sales support, we accompany every stage of your digital journey.',
    offers: [
      { title: 'Official Software', body: 'Official CAD, BIM, and rendering licenses with principal warranty.' },
      { title: 'Implementation & Consulting', body: 'Technical guidance to integrate software seamlessly into your workflow.' },
      { title: 'Training & Certification', body: 'Official certified classes for your team, online or in person.' },
    ],
    offerCta: 'View All Services',
    stepsEyebrow: 'HOW WE WORK',
    stepsHeading: 'Our Strategic Steps Alongside You',
    steps: [
      { title: 'Consultation', body: 'Understanding the specific needs and challenges of your industry.' },
      { title: 'Recommendation', body: 'Crafting the right software solution for your scale and budget.' },
      { title: 'Implementation', body: 'Installation, data migration, and integration into team workflows.' },
      { title: 'Support', body: 'Training, maintenance, and long-term technical support.' },
    ],
  },
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
    path: '/about',
    locale: locale as Locale,
  })
}

/** Placeholder photo block — swap `src` in once real office/team assets arrive. */
function PhotoPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 to-blue ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-white/40">
        {label}
      </span>
    </div>
  )
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const t = COPY[typedLocale]
  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'

  return (
    <main className="bg-navy text-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: t.eyebrow, url: `/${typedLocale}/about` },
        ])}
      />

      {/* 1. Hero — full-bleed photo */}
      <section className="relative">
        <PhotoPlaceholder
          label={typedLocale === 'id' ? 'Foto Kantor' : 'Office Photo'}
          className="h-[52vh] min-h-[380px] w-full md:h-[62vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
            <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold leading-tight md:text-5xl">
              {t.introHeading}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Intro — sidebar list + body (white) */}
      <section className="bg-grey-light text-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[220px_1fr] md:py-24">
          <ul className="space-y-3 border-l-2 border-orange/30 pl-5">
            {t.introSidebar.map((item) => (
              <li key={item} className="font-sans text-sm font-semibold text-navy/70">
                {item}
              </li>
            ))}
          </ul>
          <div className="space-y-5 text-lg leading-relaxed text-navy/80">
            {t.introBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission + wireframe image (navy) */}
      <section className="border-t border-white/10 bg-navy-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
              {t.missionEyebrow}
            </p>
            <h2 className="mt-4 font-sans text-2xl font-extrabold md:text-3xl">{t.missionHeading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{t.missionBody}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-navy">
            <Image
              src="/images/image-section-1.svg"
              alt={t.missionHeading}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Values — 4 columns (navy) */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h2 className="max-w-2xl font-sans text-2xl font-extrabold md:text-3xl">{t.valuesHeading}</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <CheckCircle2 className="h-6 w-6 text-orange" />
                <h3 className="font-sans text-lg font-bold">{v.title}</h3>
                <p className="text-sm text-white/70">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Full-width photo */}
      <PhotoPlaceholder
        label={typedLocale === 'id' ? 'Foto Kantor / Tim' : 'Office / Team Photo'}
        className="h-[38vh] min-h-[280px] w-full"
      />

      {/* 6. Timeline (white) */}
      <section className="bg-grey-light text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
            {t.timelineEyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold md:text-3xl">
            {t.timelineHeading}
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.timeline.map((item) => (
              <li key={item.year} className="border-t-2 border-orange pt-5">
                <p className="font-sans text-3xl font-extrabold text-orange">{item.year}</p>
                <h3 className="mt-3 font-sans text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Everything you need — 3 columns + CTA (white) */}
      <section className="border-t border-navy/10 bg-white text-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
            {t.offerEyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold md:text-3xl">
            {t.offerHeading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-navy/70">{t.offerBody}</p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.offers.map((o) => (
              <div key={o.title} className="rounded-lg border border-navy/10 bg-grey-light p-8">
                <h3 className="font-sans text-lg font-bold">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">{o.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href={`/${typedLocale}/training`}
              className="inline-flex items-center gap-2 rounded-md bg-orange px-6 py-3 font-sans text-sm font-bold text-navy transition-colors hover:bg-orange/90"
            >
              {t.offerCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Full-width photo */}
      <PhotoPlaceholder
        label={typedLocale === 'id' ? 'Foto Tim' : 'Team Photo'}
        className="h-[38vh] min-h-[280px] w-full"
      />

      {/* 9. Strategic steps — 4 numbered steps + thumbnail (navy) */}
      <section className="border-t border-white/10 bg-navy-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1fr_360px] md:items-start md:py-24">
          <div>
            <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
              {t.stepsEyebrow}
            </p>
            <h2 className="mt-4 max-w-xl font-sans text-2xl font-extrabold md:text-3xl">
              {t.stepsHeading}
            </h2>
            <ol className="mt-10 space-y-8">
              {t.steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange font-sans text-base font-extrabold text-navy">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-navy">
            <Image
              src="/images/image-section-2.svg"
              alt={t.stepsHeading}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <ConsultationCta locale={typedLocale} />
    </main>
  )
}
