export default function BackgroundRadialGlows() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-8">
      {/* Top-right golden glow */}
      <div
        className="absolute right-[-12%] top-[-16%] h-[520px] w-[520px] rounded-full blur-[60px] opacity-80"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(244,185,66,0.55), rgba(244,185,66,0.10) 45%, transparent 70%)',
          animation: 'bb-glow-breathe 7.5s ease-in-out infinite',
          transform: 'translate3d(calc(var(--px) * 8px), calc(var(--py) * 6px), 0)',
        }}
      />

      {/* Bottom-left purple glow */}
      <div
        className="absolute left-[-18%] bottom-[-18%] h-[560px] w-[560px] rounded-full blur-[70px] opacity-75"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.55), rgba(139,92,246,0.10) 42%, transparent 70%)',
          animation: 'bb-glow-breathe 9.25s ease-in-out infinite reverse',
          transform: 'translate3d(calc(var(--px) * -10px), calc(var(--py) * -8px), 0)',
        }}
      />

      {/* Center blue glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] opacity-70"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.50), rgba(59,130,246,0.10) 48%, transparent 72%)',
          animation: 'bb-glow-breathe 8.25s ease-in-out infinite',
          transform: 'translate3d(calc(var(--px) * 6px), calc(var(--py) * -4px), 0)',
        }}
      />
    </div>
  )
}
