import { cn } from './ui/Button'

export default function FloatingTextArea({
  label,
  value,
  onChange,
  placeholder = ' ',
  error,
  rows = 4,
}) {
  const hasValue = String(value ?? '').length > 0

  return (
    <label className="block relative w-full">
      <span
        className={cn(
          'absolute left-4 top-4 text-xs font-bold transition-all pointer-events-none',
          hasValue ? '-top-2.5 text-primary' : 'text-foreground/50'
        )}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full rounded-xl bg-surface border px-4 pt-6 pb-3 text-foreground outline-none transition-all resize-y focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
          error 
            ? 'border-error focus-visible:ring-error focus:border-error' 
            : 'border-border focus:border-primary focus-visible:ring-primary'
        )}
      />
      {error && <div className="mt-1 text-xs text-error font-medium">{error}</div>}
    </label>
  )
}
