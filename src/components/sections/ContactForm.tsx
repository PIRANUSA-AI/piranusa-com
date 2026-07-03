'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import type { Locale } from '@/types/content'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const COPY: Record<
  Locale,
  {
    name: string
    email: string
    phone: string
    company: string
    message: string
    optional: string
    submit: string
    submitting: string
    successTitle: string
    successBody: string
    errorGeneric: string
    errorRate: string
    reqName: string
    reqEmail: string
    reqMessage: string
  }
> = {
  id: {
    name: 'Nama Lengkap',
    email: 'Email',
    phone: 'Nomor Telepon',
    company: 'Perusahaan',
    message: 'Pesan Anda',
    optional: 'opsional',
    submit: 'Kirim Pesan',
    submitting: 'Mengirim...',
    successTitle: 'Pesan terkirim!',
    successBody: 'Terima kasih. Tim kami akan menghubungi Anda dalam 1x24 jam kerja.',
    errorGeneric: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.',
    errorRate: 'Terlalu banyak percobaan. Silakan coba lagi beberapa menit lagi.',
    reqName: 'Nama wajib diisi',
    reqEmail: 'Masukkan email yang valid',
    reqMessage: 'Pesan wajib diisi',
  },
  en: {
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    company: 'Company',
    message: 'Your Message',
    optional: 'optional',
    submit: 'Send Message',
    submitting: 'Sending...',
    successTitle: 'Message sent!',
    successBody: 'Thank you. Our team will reach out to you within 1 business day.',
    errorGeneric: 'Failed to send message. Please try again or contact us via WhatsApp.',
    errorRate: 'Too many attempts. Please try again in a few minutes.',
    reqName: 'Name is required',
    reqEmail: 'Enter a valid email',
    reqMessage: 'Message is required',
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      website: String(data.get('website') ?? ''), // honeypot
    }

    // Client-side validation for instant feedback.
    const errs: Record<string, string> = {}
    if (!payload.name) errs.name = t.reqName
    if (!payload.email || !EMAIL_RE.test(payload.email)) errs.email = t.reqEmail
    if (!payload.message) errs.message = t.reqMessage
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('submitting')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        return
      }
      if (res.status === 429) {
        setStatus('error')
        setErrorMsg(t.errorRate)
        return
      }
      if (res.status === 422) {
        const body = (await res.json()) as { fields?: Record<string, string> }
        const mapped: Record<string, string> = {}
        if (body.fields?.name) mapped.name = t.reqName
        if (body.fields?.email) mapped.email = t.reqEmail
        if (body.fields?.message) mapped.message = t.reqMessage
        setFieldErrors(mapped)
        setStatus('idle')
        return
      }
      setStatus('error')
      setErrorMsg(t.errorGeneric)
    } catch {
      setStatus('error')
      setErrorMsg(t.errorGeneric)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-orange/30 bg-orange/5 px-8 py-14 text-center">
        <CheckCircle2 className="h-14 w-14 text-orange" />
        <h3 className="mt-6 text-xl font-bold text-navy">{t.successTitle}</h3>
        <p className="mt-2 max-w-sm text-navy/70">{t.successBody}</p>
      </div>
    )
  }

  const inputBase =
    'w-full rounded-lg border bg-white px-4 py-3 text-navy placeholder:text-navy/40 outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, ignored by users, filled by bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          id="name"
          label={t.name}
          error={fieldErrors.name}
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`${inputBase} ${fieldErrors.name ? 'border-red-400' : 'border-navy/15'}`}
          />
        </Field>

        <Field
          id="email"
          label={t.email}
          error={fieldErrors.email}
          required
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${inputBase} ${fieldErrors.email ? 'border-red-400' : 'border-navy/15'}`}
          />
        </Field>

        <Field id="phone" label={t.phone} optional={t.optional}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${inputBase} border-navy/15`}
          />
        </Field>

        <Field id="company" label={t.company} optional={t.optional}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`${inputBase} border-navy/15`}
          />
        </Field>
      </div>

      <Field id="message" label={t.message} error={fieldErrors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${inputBase} resize-y ${fieldErrors.message ? 'border-red-400' : 'border-navy/15'}`}
        />
      </Field>

      {errorMsg && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e6870a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t.submit}
          </>
        )}
      </button>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  optional?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
        {optional && <span className="font-normal text-navy/40"> ({optional})</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
