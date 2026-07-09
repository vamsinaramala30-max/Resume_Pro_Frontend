import { clsx } from 'clsx'

/**
 * Badge Component
 * Features:
 * - Multiple visual variants
 * - Icon support
 * - Accessibility ready
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-surface-elevated text-foreground border-border',
    gold: 'bg-primary/10 text-primary border-primary/20',
    blue: 'bg-sky-500/15 text-sky-200 border-sky-400/30',
    purple: 'bg-purple-500/15 text-purple-200 border-purple-400/30',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
    red: 'bg-red-500/15 text-red-200 border-red-400/30',
    outline: 'bg-transparent text-muted border-border',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs rounded-lg',
    md: 'px-3 py-1 text-sm rounded-xl',
    lg: 'px-4 py-1.5 text-base rounded-2xl',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium border transition-all',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}

/**
 * Status Badge Component
 * For showing online/offline/dnd status
 */
export function StatusBadge({ status = 'online', size = 'md' }) {
  const statusConfig = {
    online: { color: 'bg-emerald-500', label: 'Online' },
    offline: { color: 'bg-slate-500', label: 'Offline' },
    dnd: { color: 'bg-red-500', label: 'Do Not Disturb' },
    away: { color: 'bg-yellow-500', label: 'Away' },
  }

  const { color, label } = statusConfig[status] || statusConfig.online

  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  }

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`Status: ${label}`}
    >
      <span
        className={clsx(
          'rounded-full animate-pulse',
          color,
          sizes[size],
        )}
        aria-hidden="true"
      />
      <span className="text-xs text-muted">{label}</span>
    </span>
  )
}

export default Badge
