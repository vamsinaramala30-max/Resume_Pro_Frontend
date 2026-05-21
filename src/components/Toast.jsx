import { useEffect, useState } from 'react'

export default function Toast({ toasts, onRemove }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 z-[2000] flex flex-col gap-3"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            'rounded-2xl border border-white/20 bg-black/50 backdrop-blur-xl shadow-2xl px-4 py-3 text-sm text-white flex items-start gap-3 transition-all ' +
            (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
          }
        >
          <div className="mt-0.5 text-royal-gold">{t.type === 'success' ? '✅' : t.type === 'error' ? '⚠️' : 'ℹ️'}</div>
          <div className="flex-1">
            <div className="font-bold">{t.title}</div>
            {t.message ? <div className="text-slate-200">{t.message}</div> : null}
          </div>
          <button
            onClick={() => onRemove(t.id)}
            className="text-slate-300 hover:text-white transition px-2"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

