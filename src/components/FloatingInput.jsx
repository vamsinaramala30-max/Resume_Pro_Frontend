import { cn } from './ui/Button'

export default function FloatingInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  name,
  inputMode,
  autoComplete,
  accept,
  icon: Icon,
  disabled,
  maxLength,
}) {
  const iconOffset = Icon ? 'pl-11 pr-4' : 'pl-4'

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      </div>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition duration-200">
            <Icon className="h-4 w-4" />
          </div>
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
            'w-full rounded-xl bg-slate-950/80 border py-3 px-4 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20',
            iconOffset,
            error
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
              : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        />
      </div>
      {error && <div className="mt-1.5 text-xs text-rose-400 font-medium px-0.5">{error}</div>}
    </div>
  )
}

