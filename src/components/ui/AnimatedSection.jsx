import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'

/**
 * Animated Section Component
 * Features:
 * - Scroll-triggered animations
 * - Stagger animations for lists
 * - Customizable animation directions
 * - Reduced motion support
 */
export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  margin = '-20% 0px -20% 0px',
  once = true,
  duration = 0.5,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin, once })

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    scale: { scale: 0.9, x: 0, y: 0 },
    none: { x: 0, y: 0, scale: 1 },
  }

  const offset = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      className={clsx(className)}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered List Animation
 * Animates list items with staggered delay
 */
export function StaggeredList({
  children,
  className = '',
  staggerDelay = 0.08,
  containerClassName = '',
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-10% 0px -10% 0px', once: true })

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div
      ref={ref}
      className={clsx('flex flex-col', containerClassName)}
      {...props}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Reveal Animation
 * Simple reveal on scroll
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-10% 0px -10% 0px', once: true })

  return (
    <motion.div
      ref={ref}
      className={clsx(className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
