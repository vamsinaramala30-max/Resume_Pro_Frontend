export default function BackgroundOrbits() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-7 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(244,185,66,0.55)" />
            <stop offset="45%" stopColor="rgba(56,189,248,0.35)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.35)" />
          </linearGradient>
          <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Curved paths / orbital lines */}
        <g filter="url(#orbitGlow)" className="bb-orbits">
          <path
            d="M-50,560 C180,380 420,360 650,430 C860,490 1020,600 1250,520"
            fill="none"
            stroke="url(#orbitStroke)"
            strokeWidth="1.2"
            strokeDasharray="6 10"
            opacity="0.65"
          />
          <path
            d="M-70,290 C160,210 320,190 520,220 C760,260 920,370 1230,310"
            fill="none"
            stroke="rgba(56,189,248,0.35)"
            strokeWidth="1.1"
            strokeDasharray="10 14"
            opacity="0.55"
          />
          <path
            d="M80,850 C240,650 420,560 600,560 C820,560 980,680 1160,820"
            fill="none"
            stroke="rgba(244,185,66,0.28)"
            strokeWidth="1"
            strokeDasharray="14 20"
            opacity="0.5"
          />
          <circle cx="780" cy="220" r="120" fill="none" stroke="rgba(139,92,246,0.28)" strokeWidth="1.05" />
        </g>
      </svg>

      {/* subtle parallax shimmer overlay */}
      <div className="absolute inset-0 opacity-30 bb-orbit-shimmer" />
    </div>
  )
}
