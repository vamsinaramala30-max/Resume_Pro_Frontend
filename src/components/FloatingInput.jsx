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
}) {
  const hasValue = String(value ?? '').length > 0

  return (
    <label className="block relative">
      <span
        className={clsx(
          'absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-all pointer-events-none',
          hasValue ? '-top-2.5 text-royal-gold' : 'text-slate-300',
        )}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        accept={accept}
        className={
          'w-full rounded-2xl bg-black/20 border px-4 pt-6 pb-3 text-white outline-none transition-all ' +
          (error ? 'border-red-500/80 focus:border-red-500/80' : 'border-white/15 focus:border-royal-gold')
        }
      />
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  )
}

