import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'

const {
  RESEND_API_KEY,
  FROM_EMAIL = 'cheaply.ie <onboarding@resend.dev>',
  CORS_ORIGIN = '*',
  PORT = '3000',
} = process.env

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY env var')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)
const app = new Hono()

app.use('*', cors({ origin: CORS_ORIGIN }))

app.get('/', (c) => c.json({ ok: true, service: 'cheaply-api' }))

app.post('/subscribe', async (c) => {
  const body = await c.req.json().catch(() => null) as { email?: string } | null
  const email = body?.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Invalid email' }, 400)
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
        You're on the list 🎉
      </h1>
      <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 24px;">
        Thanks for signing up to <strong>cheaply.ie</strong> — Ireland's smartest shopping companion.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 24px;">
        We'll ping you the moment we launch with price tracking, deal alerts, and the best prices across Irish retailers.
      </p>
      <p style="font-size: 14px; color: #999; margin: 32px 0 0;">
        — The cheaply.ie team · Made in Ireland 🇮🇪
      </p>
    </div>
  </body>
</html>
`.trim()
}

serve({ fetch: app.fetch, port: Number(PORT) }, (info) => {
  console.log(`api listening on :${info.port}`)
})
