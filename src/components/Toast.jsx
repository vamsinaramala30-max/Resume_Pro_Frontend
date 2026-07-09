import { useEffect, useState } from 'react'

export default function Toast({ toasts, onRemove }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const typeStyles = {
    success: 'border-l-4 border-l-green-500',
    error: 'border-l-4 border-l-red-500',
    warning: 'border-l-4 border-l-amber-500',
    info: 'border-l-4 border-l-blue-500',
  }

  const typeIcons = {
    success: '✅',
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 z-[2000] flex flex-col gap-3 max-w-sm w-full"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            'rounded-2xl border border-border bg-card shadow-card-hover px-4 py-3 text-sm text-foreground flex items-start gap-3 transition-all duration-300 ' +
            (typeStyles[t.type] || '') + ' ' +
            (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
          }
        >
          <div className="mt-0.5 shrink-0">{typeIcons[t.type] || 'ℹ️'}</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-foreground">{t.title}</div>
            {t.message ? <div className="text-muted-foreground text-xs mt-0.5">{t.message}</div> : null}
          </div>
          <button
            onClick={() => onRemove(t.id)}
            className="text-muted-foreground hover:text-foreground transition shrink-0 p-1 rounded-lg hover:bg-surface-elevated"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
