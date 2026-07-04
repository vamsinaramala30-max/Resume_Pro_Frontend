import { useEffect, useMemo, useRef, useState } from 'react'

export default function LandingBackground() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const apply = () => setEnabled(!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  const noiseSvg = useMemo(() => {
    // Lightweight inline noise (no external assets)
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter>` +
      `<rect width='180' height='180' filter='url(#n)' opacity='.35'/></svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const onMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 2 - 1
      const y = (clientY / window.innerHeight) * 2 - 1
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x.toFixed(3)}`)
        el.style.setProperty('--my', `${y.toFixed(3)}`)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  // Theme switching relies on the <html class="dark"> that AppShell already toggles.
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // used by mouse-follow glows
        ['--mx']: 0,
        ['--my']: 0,
      }}
    >
      {/* Theme-aware hero background images */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-100 opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage: "url('/hero-bg-dark.png')",
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-0 opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: "url('/hero-bg-light.png')",
        }}
      />

      {/* Subtle overlays to keep text readable while preserving the PNG composition */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35)_0%,rgba(2,6,23,0.55)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.70)_100%)]" />

      {/* Mouse-follow radial lights */}
      <div
        className="absolute inset-0 opacity-80 blur-2xl"
        style={{
          background:
            'radial-gradient(600px circle at calc(50% + (var(--mx) * 40%)) calc(35% + (var(--my) * 20%)), rgba(197,160,89,0.20), transparent 60%), radial-gradient(560px circle at calc(55% + (var(--mx) * 30%)) calc(60% + (var(--my) * 25%)), rgba(59,130,246,0.15), transparent 58%)',
        }}
      />

      {/* Subtle grid (very light, over PNG for enterprise texture) */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:64px_64px] animate-[grid-breathe_9s_ease-in-out_infinite]" />

      {/* Particles (animated dots) */}
      <div className="absolute inset-0 opacity-60 blur-[0.2px]" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, i) => {
          const size = 2 + (i % 4)
          const left = (i * 37) % 100
          const top = (i * 53) % 100
          const delay = (i % 7) * 0.55
          const dur = 7 + (i % 5) * 1.4
          const color =
            i % 3 === 0 ? 'rgba(197,160,89,0.55)' : i % 3 === 1 ? 'rgba(56,189,248,0.45)' : 'rgba(124,58,237,0.40)'
          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                background: color,
                animation: `particle-drift ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          )
        })}
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url(${noiseSvg})`, backgroundSize: '260px 260px' }}
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.9)_100%)]" />

      {/* Animated gradient wash */}
      <div
        className="absolute inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(248,250,252,0.02),transparent_25%),linear-gradient(240deg,rgba(248,250,252,0.04),transparent_30%)]"
        style={{ backgroundSize: '320% 320%', animation: 'gradient-pan 16s ease infinite' }}
      />
    </div>
  )
}

