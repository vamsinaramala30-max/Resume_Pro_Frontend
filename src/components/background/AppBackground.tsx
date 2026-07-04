import { useEffect, useMemo, useRef, useState } from 'react'
import BackgroundDeepGradient from './layers/BackgroundDeepGradient'
import BackgroundMeshes from './layers/BackgroundMeshes'
import BackgroundRadialGlows from './layers/BackgroundRadialGlows'
import BackgroundOrbits from './layers/BackgroundOrbits'
import BackgroundParticles from './layers/BackgroundParticles'
import BackgroundNoise from './layers/BackgroundNoise'
import BackgroundGlass from './layers/BackgroundGlass'

export type BackgroundVariant = 'home' | 'plans' | 'builder' | 'premium' | 'dashboard' | 'auth'

type Props = {
  variant?: BackgroundVariant
  className?: string
}

/**
 * Global premium background system.
 * - Uses layered CSS/SVG (no heavy canvas / bitmap assets)
 * - GPU-friendly: transforms/opacity only
 * - Respects prefers-reduced-motion
 * - Theme-aware via Tailwind `dark:` (html.dark toggled in AppShell)
 */
export default function AppBackground({ variant = 'home', className = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const apply = () => setEnabled(!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // Gentle parallax: only on desktop and only when animations enabled.
  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 2 - 1
      const y = (clientY / window.innerHeight) * 2 - 1
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', x.toFixed(3))
        el.style.setProperty('--py', y.toFixed(3))
      })
    }

    const opts = { passive: true } as AddEventListenerOptions
    window.addEventListener('mousemove', onMove, opts)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  const variantConfig = useMemo(() => {
    // Variant tuning for performance + visual hierarchy.
    const base = {
      particles: 1,
      orbits: 1,
      meshes: 1,
      radial: 1,
      glass: 1,
      shimmer: 1,
    }

    switch (variant) {
      case 'plans':
        return { ...base, particles: 0.6, orbits: 0.7, shimmer: 0.7 }
      case 'builder':
        return { ...base, particles: 0.45, orbits: 0.5, meshes: 0.85, shimmer: 0.6 }
      case 'premium':
        return { ...base, particles: 0.9, radial: 1.1, glass: 1.05, shimmer: 1.1 }
      case 'dashboard':
        return { ...base, particles: 0.35, orbits: 0.35, meshes: 0.75, shimmer: 0.5 }
      case 'auth':
        return { ...base, particles: 0.55, orbits: 0.55, meshes: 0.9, radial: 0.85 }
      case 'home':
      default:
        return base
    }
  }, [variant])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden',
        'select-none',
        className,
      ].join(' ')}
      style={
        {
          // Defaults for parallax vars.
          ['--px' as any]: 0,
          ['--py' as any]: 0,

          // Variant tuning vars.
          ['--bb-particles' as any]: variantConfig.particles,
          ['--bb-orbits' as any]: variantConfig.orbits,
          ['--bb-meshes' as any]: variantConfig.meshes,
          ['--bb-radial' as any]: variantConfig.radial,
          ['--bb-glass' as any]: variantConfig.glass,
          ['--bb-shimmer' as any]: variantConfig.shimmer,
          ['--bb-enabled' as any]: enabled ? 1 : 0,
        } as React.CSSProperties
      }
    >
      <BackgroundDeepGradient />
      <BackgroundMeshes />
      <BackgroundRadialGlows />
      <BackgroundOrbits />
      <BackgroundParticles />
      <BackgroundNoise />
      <BackgroundGlass />
    </div>
  )
}
