import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin/dashboard/subscribers')({
  component: SubscribersPage,
})

type Subscriber = { id: number; email: string; created_at: string }

function SubscribersPage() {
  const [rows, setRows] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('subscribers')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRows(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscribers</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {loading ? 'Loading…' : `${rows.length} total`}
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-center text-muted-foreground">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-5 py-3">{r.email}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
