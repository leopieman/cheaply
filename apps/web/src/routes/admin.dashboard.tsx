import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminDashboardLayout,
})

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/dashboard/subscribers', label: 'Subscribers', icon: Users, exact: false },
] as const

function AdminDashboardLayout() {
  const { session, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    if (!loading && !session) navigate({ to: '/admin' })
  }, [loading, session, navigate])

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    )
  }

  async function handleSignOut() {
    await signOut()
    navigate({ to: '/admin' })
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-60 border-r flex flex-col p-4 gap-1 shrink-0">
        <div className="px-2 py-3 mb-2">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-foreground/20">cheaply</span>
            <span className="text-primary">.ie</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Admin</p>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t pt-3 mt-3 flex flex-col gap-2">
          <p className="text-xs text-muted-foreground truncate px-3">{session.user.email}</p>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start gap-2 text-muted-foreground">
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
