import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { IrelandPriceMap } from '@/components/ireland-price-map'
import { Bell, MapPinned, ShoppingBasket } from 'lucide-react'

const features = [
  { icon: ShoppingBasket, label: 'Track basket staples' },
  { icon: MapPinned, label: 'Local Irish retailers' },
  { icon: Bell, label: 'Catch real price drops' },
]

const API_URL = import.meta.env.VITE_API_URL ?? ''

type HealthStatus = 'loading' | 'ok' | 'degraded' | 'down'

function useHealth() {
  const [status, setStatus] = useState<HealthStatus>('loading')
  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((r) => r.json())
      .then((d) => setStatus(d.ok ? 'ok' : 'degraded'))
      .catch(() => setStatus('down'))
  }, [])
  return status
}

const statusConfig: Record<HealthStatus, { color: string; label: string }> = {
  loading: { color: 'bg-muted-foreground/40', label: 'Checking status…' },
  ok:      { color: 'bg-green-500',           label: 'All systems operational' },
  degraded:{ color: 'bg-yellow-500',          label: 'Degraded' },
  down:    { color: 'bg-red-500',             label: 'Service disruption' },
}

export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const health = useHealth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <div className="text-left text-xl font-bold tracking-tight">
            <span className="text-foreground/25">cheaply</span>
            <span className="text-primary">.ie</span>
          </div>
          <ThemeToggle />
        </header>

        <section className="grid flex-1 items-center gap-5 py-6 md:grid-cols-[minmax(420px,1.05fr)_minmax(0,0.95fr)] md:gap-x-10 md:gap-y-8 md:py-8 lg:gap-x-16">
          <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3 md:mx-0 md:justify-self-start">
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="text-primary border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
              >
                Launching soon · Ireland
              </Badge>
            </div>
            <IrelandPriceMap />
          </div>

          <div className="mx-auto flex w-full max-w-xl flex-col gap-5 text-center md:mx-0 md:text-left">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tight leading-[1.02] sm:text-5xl lg:text-6xl">
                Track prices across Ireland.
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0">
                Catch deal alerts and buy better across the retailers already in your weekly shop.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {submitted ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-center md:text-left">
                  <p className="text-primary font-semibold text-sm">You're on the list. Sound.</p>
                  <p className="text-muted-foreground text-xs">We’ll give you a shout when cheaply.ie goes live.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 min-w-0"
                    required
                    disabled={loading}
                  />
                  <Button type="submit" className="h-12 px-5" disabled={loading}>
                    {loading ? 'Joining…' : 'Join waitlist'}
                  </Button>
                </form>
              )}
              {error && <p className="text-xs text-destructive">{error}</p>}
              {!error && <p className="text-xs text-muted-foreground/60">No spam. Just useful launch updates.</p>}
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border bg-card/60 px-3 py-3 text-left"
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  <p className="text-xs font-medium leading-snug text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t py-4 text-xs text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} cheaply.ie · Made in Ireland</span>
          <span className="flex items-center justify-center gap-1.5 sm:justify-start">
            <span className="relative flex h-2 w-2">
              {health === 'ok' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${statusConfig[health].color}`} />
            </span>
            <span>{statusConfig[health].label}</span>
          </span>
        </footer>
      </div>
    </main>
  )
}
