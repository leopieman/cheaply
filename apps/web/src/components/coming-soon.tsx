import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

const features = [
  { icon: '🛒', label: 'Price tracking' },
  { icon: '🇮🇪', label: 'Irish retailers' },
  { icon: '🔔', label: 'Deal alerts' },
]

const API_URL = import.meta.env.VITE_API_URL ?? ''

export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-primary/6 blur-3xl animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center flex flex-col gap-10">
        <div className="flex justify-center sm:justify-end animate-fade-in">
          <ThemeToggle />
        </div>

        {/* Badge */}
        <div className="flex justify-center animate-fade-in">
          <Badge
            variant="outline"
            className="text-primary border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
          >
            Launching soon · Ireland
          </Badge>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col gap-4 animate-fade-in [animation-delay:100ms]">
          <h1 className="text-7xl font-bold tracking-tight leading-none">
            <span className="text-foreground/20">cheaply</span>
            <span className="text-primary">.ie</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Track prices. Catch deals. Buy better across Irish retailers.
          </p>
        </div>

        {/* Email capture */}
        <div className="flex flex-col gap-2 animate-fade-in [animation-delay:200ms]">
          {submitted ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center space-y-1 animate-fade-in">
              <p className="text-primary font-semibold text-sm">You're on the list. Sound. 🎉</p>
              <p className="text-muted-foreground text-xs">We’ll give you a shout when cheaply.ie goes live.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11"
                required
                disabled={loading}
              />
              <Button type="submit" className="h-11 px-5 shrink-0" disabled={loading}>
                {loading ? 'Joining…' : 'Join the waitlist'}
              </Button>
            </form>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
          {!error && <p className="text-xs text-muted-foreground/60">No spam. No messing. Just useful updates.</p>}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in [animation-delay:300ms]">
          {features.map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-2xl border bg-card/60 backdrop-blur-sm p-4 flex flex-col items-center gap-2 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-5 text-xs text-muted-foreground/50 animate-fade-in [animation-delay:400ms]">
        © {new Date().getFullYear()} cheaply.ie · Made in Ireland
      </footer>
    </div>
  )
}
