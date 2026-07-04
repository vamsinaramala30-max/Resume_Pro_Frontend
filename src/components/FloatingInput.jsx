import clsx from 'clsx'

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
    <label className="block relative">
      <span
        className={clsx(
          'absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-all pointer-events-none z-10',
          hasValue ? '-top-2.5 text-royal-gold' : 'text-slate-300',
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
        className={clsx(
          'w-full rounded-2xl bg-black/20 border px-4 pt-6 pb-3 text-white outline-none transition-all',
          iconOffset,
          error
            ? 'border-red-500/80 focus:border-red-500/80'
            : 'border-white/15 focus:border-royal-gold',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  )
}