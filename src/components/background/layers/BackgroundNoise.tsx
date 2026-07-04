import { useMemo } from 'react'

export default function BackgroundNoise() {
  const noiseSvg = useMemo(() => {
    // Inline noise texture (no external assets)
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/></filter>` +
      `<rect width='220' height='220' filter='url(#n)' opacity='.55'/></svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-5 opacity-[0.06] mix-blend-overlay bb-noise">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${noiseSvg})`,
          backgroundSize: '260px 260px',
          animation: 'bb-noise-drift 11s ease-in-out infinite',
          transform: 'translate3d(0,0,0)',
        }}
      />
    </div>
  )
}
