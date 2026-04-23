import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/')({
  component: DashboardOverview,
})

function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground text-sm mt-1">Welcome back.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Status</p>
          <p className="text-2xl font-semibold mt-2">Live</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Stage</p>
          <p className="text-2xl font-semibold mt-2">Waitlist</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Region</p>
          <p className="text-2xl font-semibold mt-2">🇮🇪 Ireland</p>
        </div>
      </div>
    </div>
  )
}
