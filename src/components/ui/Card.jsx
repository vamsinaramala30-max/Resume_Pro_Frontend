<<<<<<< HEAD
﻿import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Premium Card Component
 * Features:
 * - Hover lift animation
 * - Glassmorphism options
 * - Border gradient effect
 * - Focus states
 */
const Card = forwardRef(function Card(
  {
    children,
    className = '',
    variant = 'default',
    hover = true,
    glow = false,
    padding = 'md',
    ...props
  },
  ref,
) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const variants = {
    default: 'bg-slate-900/60 border border-white/10',
    glass: 'bg-white/5 border border-white/10 backdrop-blur-xl',
    elevated: 'bg-slate-800/60 border border-white/15 shadow-elevated',
    premium: 'bg-gradient-to-br from-slate-900/80 to-slate-800/40 border border-royal-gold/20 shadow-card-hover',
  }

  return (
    <motion.div
      ref={ref}
      className={clsx(
        'relative rounded-3xl transition-all duration-300',
        variants[variant],
        paddingSizes[padding],
        hover && 'hover:-translate-y-1 hover:shadow-card-hover',
        glow && 'hover:shadow-glow-gold/20',
        className,
      )}
      {...props}
    >
      {/* Gradient overlay for premium variant */}
      {variant === 'premium' && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-royal-gold/5 to-transparent pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
})

export default Card
=======
import * as React from "react"
import { cn } from "./Button"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-white/10 bg-surface/70 text-foreground shadow-elevation-2 backdrop-blur-xl",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-h4", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-foreground/70", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
