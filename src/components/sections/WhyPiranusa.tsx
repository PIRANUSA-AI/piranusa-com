import Image from 'next/image'
import type { Locale } from '@/types/content'

type Reason = {
  num: string
  title: string
  body: string
}

type Award = {
  src: string
  year: string
  label: string
}

const AWARDS: Award[] = [
  { src: '/images/zwsoft-2019.svg', year: '2019', label: 'ZWSOFT Partner Award 2019' },
  { src: '/images/zwsoft-2020.svg', year: '2020', label: 'ZWSOFT Partner Award 2020' },
  { src: '/images/zwsoft-2023.svg', year: '2023', label: 'ZWSOFT Partner of the Year 2023' },
]

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    reasons: Reason[]
    zwsoftTitle: string
    zwsoftBody: string
  }
> = {
  id: {
    eyebrow: 'MENGAPA MEMILIH PIRANUSA',
    heading: 'Bukan sekadar distributor, kami adalah mitra solusi teknologi Anda',
    reasons: [
      {
        num: '01',
        title: 'Distributor Resmi',
        body: 'PIRANUSA adalah distributor resmi ZWCAD, ArchiCAD, Enscape, SketchUp, dan principal terkemuka lainnya untuk seluruh wilayah Indonesia.',
      },
      {
        num: '02',
        title: 'Konsultasi & Implementasi BIM',
        body: 'Tim konsultan kami mendampingi implementasi BIM dari awal hingga akhir, termasuk penyesuaian workflow untuk kebutuhan perusahaan Anda.',
      },
      {
        num: '03',
        title: 'Tersertifikasi ISO 9001:2015',
        body: 'Sistem manajemen mutu kami tersertifikasi — jaminan standar layanan dan kualitas yang konsisten untuk setiap klien.',
      },
    ],
    zwsoftTitle: 'ZWSOFT Partner of the Year 2024',
    zwsoftBody:
      'Penghargaan tertinggi dari principal global kami atas dedikasi dalam memperluas ekosistem solusi CAD/CAM di Indonesia.',
  },
  en: {
    eyebrow: 'WHY CHOOSE PIRANUSA',
    heading: 'More than a distributor, we are your technology solution partner',
    reasons: [
      {
        num: '01',
        title: 'Official Distributor',
        body: 'PIRANUSA is the official distributor of ZWCAD, ArchiCAD, Enscape, SketchUp, and other leading principals across Indonesia.',
      },
      {
        num: '02',
        title: 'BIM Consulting & Implementation',
        body: 'Our consultants guide your BIM implementation from start to finish, including workflow tailoring for your company needs.',
      },
      {
        num: '03',
        title: 'ISO 9001:2015 Certified',
        body: 'Our quality management system is certified — a guarantee of consistent service standards and quality for every client.',
      },
    ],
    zwsoftTitle: 'ZWSOFT Partner of the Year 2024',
    zwsoftBody:
      'The highest award from our global principal for our dedication to expanding the CAD/CAM solution ecosystem in Indonesia.',
  },
}

export function WhyPiranusa({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative z-10 overflow-hidden bg-white text-navy">
      {/* soft warm blob, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-orange/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* top block: eyebrow (left) + heading (right, orange bar) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.28em] text-orange lg:col-span-4">
            {t.eyebrow}
          </p>
          <h2 className="border-l-[3px] border-orange pl-6 font-sans text-3xl font-extrabold leading-[1.15] text-navy sm:text-4xl md:text-5xl lg:col-span-8">
            {t.heading}
          </h2>
        </div>

        {/* reason columns */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3 md:mt-24">
          {t.reasons.map((reason) => (
            <div key={reason.num} className="border-l border-navy/15 pl-6">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-orange">
                {reason.num}
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold text-navy md:text-xl">
                {reason.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-navy/60">
                {reason.body}
              </p>
            </div>
          ))}
        </div>

        {/* ZWSOFT partner award card */}
        <div className="mt-16 rounded-2xl bg-navy/[0.03] p-8 md:mt-20 md:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* left: title + body */}
            <div className="lg:col-span-5">
              <h3 className="font-sans text-xl font-bold leading-snug text-navy md:text-2xl">
                {t.zwsoftTitle}
              </h3>
              <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-navy/60">
                {t.zwsoftBody}
              </p>
            </div>

            {/* right: 3 award badges */}
            <div className="grid grid-cols-3 items-center gap-6 lg:col-span-7 lg:gap-8">
              {AWARDS.map((award) => (
                <Image
                  key={award.year}
                  src={award.src}
                  alt={award.label}
                  width={160}
                  height={116}
                  className="h-auto w-full max-w-[150px] justify-self-center"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
