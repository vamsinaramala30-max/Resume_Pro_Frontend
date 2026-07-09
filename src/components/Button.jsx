import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Button variant configurations
const VARIANTS = {
  primary: {
    base: 'bg-gradient-to-r from-primary to-amber-500 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:brightness-110',
    focus: 'focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:bg-surface-elevated disabled:text-muted disabled:cursor-not-allowed disabled:shadow-none',
    icon: 'text-primary-foreground',
  },
  secondary: {
    base: 'bg-surface-elevated border border-border text-foreground hover:bg-surface-hover hover:border-border-muted transition-all duration-200',
    focus: 'focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:bg-surface-elevated disabled:opacity-50 disabled:cursor-not-allowed',
    icon: 'text-foreground',
  },
  outline: {
    base: 'border border-border text-foreground bg-transparent hover:bg-surface-hover hover:border-border-muted',
    focus: 'focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    icon: 'text-foreground',
  },
  ghost: {
    base: 'bg-transparent text-muted hover:bg-surface-hover hover:text-foreground',
    focus: 'focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    icon: 'text-muted',
  },
  danger: {
    base: 'bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:brightness-110',
    focus: 'focus-visible:ring-2 focus-visible:ring-red-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:bg-surface-elevated disabled:text-muted disabled:cursor-not-allowed disabled:shadow-none',
    icon: 'text-white',
  },
  success: {
    base: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:brightness-110',
    focus: 'focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:bg-surface-elevated disabled:text-muted disabled:cursor-not-allowed disabled:shadow-none',
    icon: 'text-white',
  },
  premium: {
    base: 'bg-gradient-to-r from-primary via-yellow-300 to-primary text-primary-foreground font-bold shadow-xl shadow-primary/30 animate-gradient hover:shadow-2xl hover:shadow-primary/50',
    focus: 'focus-visible:ring-2 focus-visible:ring-yellow-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    disabled: 'disabled:bg-surface-elevated disabled:text-muted disabled:cursor-not-allowed disabled:shadow-none disabled:animate-none',
    icon: 'text-primary-foreground',
  },
  icon: {
    base: 'bg-surface-elevated border border-border text-muted hover:bg-surface-hover hover:border-border-muted hover:text-foreground transition-all duration-200',
    focus: 'focus-visible:ring-2 focus-visible:ring-primary/70',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    icon: 'text-muted',
  },
}

// Size configurations
const SIZES = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-6 py-3 text-base rounded-2xl',
  xl: 'px-8 py-4 text-lg rounded-3xl',
  icon: 'p-2.5',
  'icon-sm': 'p-2',
  'icon-lg': 'p-3',
}

// Animation variants for ripple effect
const rippleVariants = {
  initial: { scale: 0, opacity: 0.6 },
  animate: { scale: 2.5, opacity: 0 },
}

/**
 * Premium Button Component
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost, danger, success, premium, icon)
 * - Loading state with spinner
 * - Disabled state
 * - Focus state with proper ring
 * - Keyboard accessible
 * - ARIA labels support
 * - Ripple animation effect
 * - Link support (React Router)
 * - Icon support
 * - Size variants
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    children,
    href,
    to,
    ripple = true,
    type = 'button',
    ariaLabel,
    ...props
  },
  ref,
) {
  const config = VARIANTS[variant] || VARIANTS.primary
  const sizeConfig = SIZES[size] || SIZES.md

  // Handle link wrapping
  const LinkComponent = to ? Link : href ? 'a' : null
  const linkProps = to
    ? { to, component: null }
    : href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const linkClassName = to || href ? 'inline-flex items-center justify-center' : ''

  const isDisabled = disabled || loading
  const isLink = !!LinkComponent

  const handleClick = (e) => {
    if (loading || disabled) {
      e.preventDefault()
      return
    }
    props.onClick?.(e)
  }

  const content = (
    <>
      {/* Ripple effect */}
      {ripple && !isDisabled && (
        <motion.span
          className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
          initial="initial"
          whileHover="animate"
          variants={rippleVariants}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-transparent" />
        </motion.span>
      )}

      {/* Icon */}
      {Icon && (
        <span
          className={clsx(
            'inline-flex items-center justify-center shrink-0',
            iconPosition === 'left' ? 'mr-2' : 'ml-2 order-1',
          )}
        >
          {loading ? (
            <Loader2 className={clsx('w-4 h-4 animate-spin', config.icon)} />
          ) : (
            <Icon className={clsx('w-4 h-4', config.icon)} />
          )}
        </span>
      )}


      {/* Children */}
      {children && !loading && (
        <span className="inline-flex items-center justify-center">
          {children}
        </span>
      )}

      {/* Loading text */}
      {loading && children && (
        <span className="ml-2">
          {'Processing...'}
        </span>
      )}
    </>
  )

  const buttonClass = clsx(
    // Base styles
    'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
    'focus:outline-none focus-visible:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none',
    'active:scale-[0.98]',
    // Variant & size
    config.base,
    config.focus,
    config.disabled,
    sizeConfig,
    // Hover lift effect for primary variants
    variant === 'primary' && 'hover:-translate-y-0.5',
    variant === 'premium' && 'hover:-translate-y-1',
    variant === 'success' && 'hover:-translate-y-0.5',
    variant === 'danger' && 'hover:-translate-y-0.5',
    // Custom className
    className,
  )

  const ariaLabelText = ariaLabel || (typeof children === 'string' ? children : undefined)

  if (isLink) {
    return (
      <LinkComponent
        ref={ref}
        to={to}
        href={href}
        className={clsx(buttonClass, linkClassName)}
        aria-label={ariaLabelText}
        tabIndex={isDisabled ? -1 : 0}
        {...linkProps}
        {...props}
        onClick={handleClick}
      >
        {content}
      </LinkComponent>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={buttonClass}
      aria-label={ariaLabelText}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
      onClick={handleClick}
    >
      {content}
    </button>
  )
})

export default Button
