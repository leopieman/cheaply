import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme, type Theme } from '@/lib/theme'

const themeOptions: Array<{
  value: Theme
  label: string
  icon: typeof Sun
}> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/85 p-1 shadow-sm backdrop-blur-sm"
    >
      {themeOptions.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value

        return (
          <Button
            key={value}
            type="button"
            size="xs"
            variant={isActive ? 'default' : 'ghost'}
            aria-pressed={isActive}
            onClick={() => setTheme(value)}
            className={cn(
              'rounded-full px-3 text-[11px]',
              !isActive && 'text-muted-foreground',
            )}
          >
            <Icon className="size-3.5" />
            <span>{label}</span>
            {value === 'system' && isActive ? (
              <span className="text-[10px] opacity-70">({resolvedTheme})</span>
            ) : null}
          </Button>
        )
      })}
    </div>
  )
}
