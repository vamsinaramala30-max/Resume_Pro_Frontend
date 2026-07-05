import { useMemo } from 'react'

type ParticleSpec = {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  hue: 'gold' | 'sky' | 'purple'
}

function makeParticles(count: number): ParticleSpec[] {
  const out: ParticleSpec[] = []
  let seed = 1337 + count * 17
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  const hues: ParticleSpec['hue'][] = ['gold', 'sky', 'purple']

  for (let i = 0; i < count; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2.6,
      delay: rand() * 6,
      duration: 8 + rand() * 12,
      hue: hues[i % hues.length] || 'gold',
    })
  }

  return out
}

export default function BackgroundParticles() {
  const particles = useMemo(() => makeParticles(28), [])

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-6 overflow-hidden bb-particles-layer">
      <div className="absolute inset-0 opacity-80 bb-particles">
        {particles.map((p, i) => {
          const color =
            p.hue === 'gold'
              ? 'rgba(244,185,66,0.55)'
              : p.hue === 'sky'
                ? 'rgba(56,189,248,0.45)'
                : 'rgba(139,92,246,0.42)'

          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: color,
                animation: `bb-particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                transform: 'translate3d(0,0,0)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
