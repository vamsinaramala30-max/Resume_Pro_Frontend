import { forwardRef } from 'react'

const LoadingButton = forwardRef(function LoadingButton(
  { loading, children, className = '', disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={
        'relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-bold transition-all shadow-2xl ' +
        (disabled || loading
          ? 'bg-slate-700/60 text-slate-200 cursor-not-allowed'
          : 'bg-royal-gold text-royal-navy hover:brightness-110') +
        ' ' +
        className
      }
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-royal-navy border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
      <span className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </button>
  )
})

export default LoadingButton

