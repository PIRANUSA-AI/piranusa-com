import { NextResponse } from 'next/server'

// Basic in-memory rate limiting per IP (best-effort; resets on redeploy/restart).
const RATE_LIMIT = 5 // requests
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  message?: unknown
  // Honeypot field — real users leave it empty.
  website?: unknown
}

function isNonEmptyString(v: unknown, max = 5000): v is string {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= max
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    )
  }

  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot: silently accept but drop bot submissions.
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const errors: Record<string, string> = {}
  if (!isNonEmptyString(body.name, 200)) errors.name = 'required'
  if (!isNonEmptyString(body.email, 320) || !EMAIL_RE.test(String(body.email).trim())) {
    errors.email = 'invalid'
  }
  if (!isNonEmptyString(body.message, 5000)) errors.message = 'required'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 422 })
  }

  const submission = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: isNonEmptyString(body.phone, 50) ? String(body.phone).trim() : null,
    company: isNonEmptyString(body.company, 200) ? String(body.company).trim() : null,
    message: String(body.message).trim(),
    ip,
    at: new Date().toISOString(),
  }

  // PLACEHOLDER: wire real delivery (email/CRM) here later.
  // For now, log server-side so submissions aren't lost during development.
  console.info('[contact] new submission', submission)

  return NextResponse.json({ ok: true })
}
