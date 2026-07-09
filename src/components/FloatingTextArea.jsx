import { cn } from './ui/Button'

export default function FloatingTextArea({
  label,
  value,
  onChange,
  placeholder = '',
  error,
  rows = 4,
}) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        <label className="text-xs font-semibold text-muted uppercase tracking-wider">{label}</label>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full rounded-xl bg-background border py-3 px-4 text-sm text-foreground placeholder:text-muted/65 outline-none transition duration-200 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y',
          error
            ? 'border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
            : 'border-border focus:border-primary focus:ring-1 focus:ring-primary/20'
        )}
      />
      {error && <div className="mt-1.5 text-xs text-rose-400 font-medium px-0.5">{error}</div>}
    </div>
  )
}
