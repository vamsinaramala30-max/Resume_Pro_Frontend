import { cn } from './ui/Button'

export default function FloatingInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = ' ',
  error,
  name,
  inputMode,
  autoComplete,
  accept,
  icon: Icon,
  disabled,
  maxLength,
}) {
  const hasValue = String(value ?? '').length > 0
  const iconOffset = Icon ? 'pl-12 pr-4' : 'pl-4'

  return (
    <label className="block relative w-full">
      <span
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-all pointer-events-none z-10',
          hasValue ? '-top-2.5 text-primary' : 'text-foreground/50',
        )}
      >
        {label}
      </span>
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        accept={accept}
        disabled={disabled}
        maxLength={maxLength}
        className={cn(
          'w-full rounded-xl bg-surface border px-4 pt-6 pb-3 text-foreground outline-none transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
          iconOffset,
          error
            ? 'border-error focus-visible:ring-error focus:border-error'
            : 'border-border focus:border-primary focus-visible:ring-primary',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      />
      {error && <div className="mt-1 text-xs text-error font-medium">{error}</div>}
    </label>
  )
}

