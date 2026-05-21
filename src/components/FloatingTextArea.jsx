import clsx from 'clsx'

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
    <label className="block relative">
      <span
        className={clsx(
          'absolute left-4 top-4 text-xs font-bold transition-all pointer-events-none',
          hasValue ? '-top-2.5 text-royal-gold' : 'text-slate-300',
        )}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={
          'w-full rounded-2xl bg-black/20 border px-4 pt-6 pb-3 text-white outline-none transition-all resize-y ' +
          (error ? 'border-red-500/80 focus:border-red-500/80' : 'border-white/15 focus:border-royal-gold')
        }
      />
      {error ? <div className="mt-2 text-xs text-red-300">{error}</div> : null}
    </label>
  )
}

