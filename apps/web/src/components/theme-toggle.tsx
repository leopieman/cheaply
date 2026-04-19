import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme, type Theme } from '@/lib/theme'

const cycle: Theme[] = ['light', 'dark', 'system']
const icons = { light: Sun, dark: Moon, system: Monitor }

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = icons[theme]
  const next = cycle[(cycle.indexOf(theme) + 1) % cycle.length]

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
      className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
    >
      <Icon className="size-4" />
    </Button>
  )
}
