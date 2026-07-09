import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Glass Card Component
 * Features:
 * - Full glassmorphism effect
 * - Animated shine effect
 * - Multiple color variants
 */
const GlassCard = forwardRef(function GlassCard(
  {
    children,
    className = '',
    variant = 'default',
    hover = true,
    ...props
  },
  ref,
) {
  const variants = {
    default: 'bg-card border border-border shadow-card',
    gold: 'bg-primary/5 border border-primary/20',
    blue: 'bg-sky-500/5 border border-sky-400/20',
    purple: 'bg-purple-500/5 border border-purple-400/20',
    emerald: 'bg-emerald-500/5 border border-emerald-400/20',
  }

  const hoverStyles = {
    default: 'hover:bg-surface-elevated hover:border-border-muted hover:shadow-card-hover',
    gold: 'hover:bg-primary/10 hover:border-primary/30',
    blue: 'hover:bg-sky-500/10 hover:border-sky-400/30',
    purple: 'hover:bg-purple-500/10 hover:border-purple-400/30',
    emerald: 'hover:bg-emerald-500/10 hover:border-emerald-400/30',
  }

  return (
    <motion.div
      ref={ref}
      className={clsx(
        'relative rounded-3xl backdrop-blur-xl p-6 transition-all duration-300',
        'shadow-glass',
        variants[variant],
        hover && hoverStyles[variant],
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
})

export default GlassCard
