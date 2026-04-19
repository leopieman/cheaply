import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'
import postgres from 'postgres'

const {
  RESEND_API_KEY,
  FROM_EMAIL = 'cheaply.ie <onboarding@resend.dev>',
  CORS_ORIGIN = '*',
  PORT = '3000',
  DATABASE_URL,
  FRONTEND_URL = 'https://cheaply.ie',
  SUPABASE_URL,
} = process.env

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY env var')
  process.exit(1)
}
if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL env var')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)
const sql = postgres(DATABASE_URL, { ssl: 'require', prepare: false })

try {
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
} catch (err) {
  console.error('DB init failed (will retry on first request):', err)
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of hits) if (entry.resetAt < now) hits.delete(ip)
}, RATE_LIMIT_WINDOW_MS).unref()

const app = new Hono()

app.use('*', cors({ origin: CORS_ORIGIN }))

app.get('/', (c) => c.json({ ok: true, service: 'cheaply-api' }))

app.get('/health', async (c) => {
  const [db, supabase, frontend] = await Promise.all([
    sql`SELECT 1`.then(() => ({ ok: true })).catch((err: unknown) => ({ ok: false, error: String(err) })),
    SUPABASE_URL
      ? fetch(`${SUPABASE_URL}/auth/v1/health`, { signal: AbortSignal.timeout(5000) })
          .then(async (r) => ({ ok: r.ok, status: r.status }))
          .catch((err: unknown) => ({ ok: false, error: String(err) }))
      : { ok: false, error: 'SUPABASE_URL not configured' },
    fetch(FRONTEND_URL, { signal: AbortSignal.timeout(5000) })
      .then((r) => ({ ok: r.ok, status: r.status }))
      .catch((err: unknown) => ({ ok: false, error: String(err) })),
  ])

  const healthy = db.ok && supabase.ok && frontend.ok
  return c.json({ ok: healthy, api: true, db, supabase, frontend }, healthy ? 200 : 503)
})

app.post('/subscribe', async (c) => {
  const ip = c.req.header('cf-connecting-ip') ?? c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(ip)) {
    return c.json({ error: 'Too many requests' }, 429)
  }

  const body = await c.req.json().catch(() => null) as { email?: string } | null
  const email = body?.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Invalid email' }, 400)
  }

  let inserted
  try {
    inserted = await sql`
      INSERT INTO subscribers (email) VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `
  } catch (err) {
    console.error('DB error:', err)
    return c.json({ error: 'Service temporarily unavailable' }, 503)
  }

  if (inserted.length === 0) {
    return c.json({ ok: true, alreadySubscribed: true })
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the cheaply.ie waitlist 🎉",
    html: confirmationEmail(),
  })

  if (error) {
    console.error('Resend error:', error)
    return c.json({ error: 'Failed to send confirmation' }, 502)
  }

  return c.json({ ok: true })
})

function confirmationEmail() {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, -apple-system, sans-serif; background: #fafafa; margin: 0; padding: 40px 20px;">
    <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 40px; border: 1px solid #eee;">
      <h1 style="font-size: 28px; margin: 0 0 16px; color: #08060d; letter-spacing: -0.5px;">
        You're on the list. Sound. 🎉
      </h1>
      <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 24px;">
        Thanks for signing up to <strong>cheaply.ie</strong>.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 24px;">
        We'll give you a shout when we launch with price tracking, deal alerts, and a handier way to spot better prices across Irish retailers.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 24px;">
        No spam. No messing. Just the useful bits.
      </p>
      <p style="font-size: 14px; color: #999; margin: 32px 0 0;">
        Cheers,<br />
        The cheaply.ie team · Made in Ireland 🇮🇪
      </p>
    </div>
  </body>
</html>
`.trim()
}

serve({ fetch: app.fetch, port: Number(PORT) }, (info) => {
  console.log(`api listening on :${info.port}`)
})
