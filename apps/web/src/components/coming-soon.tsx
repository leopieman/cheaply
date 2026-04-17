import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Logo / wordmark */}
        <div className="space-y-3">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-3 py-1">
            Ireland's smartest shopping companion
          </Badge>

          <h1 className="text-6xl font-bold tracking-tight text-foreground">
            cheaply<span className="text-primary">.ie</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Find the best deals across Irish retailers — grocery, tech, fashion and more.
            Save more. Stress less.
          </p>
        </div>

        {/* Email capture */}
        <div className="space-y-3">
          {submitted ? (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-4">
              <p className="text-primary font-medium">You're on the list 🎉</p>
              <p className="text-muted-foreground text-sm mt-1">We'll let you know when cheaply.ie goes live.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit">
                Notify me
              </Button>
            </form>
          )}
          <p className="text-xs text-muted-foreground">No spam. Just the launch date.</p>
        </div>

        {/* Decorative feature hints */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          {[
            { icon: '🛒', label: 'Price tracking' },
            { icon: '🇮🇪', label: 'Irish retailers' },
            { icon: '🔔', label: 'Deal alerts' },
          ].map(({ icon, label }) => (
            <div key={label} className="rounded-lg border bg-card p-3 text-center space-y-1">
              <span className="text-2xl">{icon}</span>
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} cheaply.ie · Made in Ireland
      </footer>
    </div>
  )
}
