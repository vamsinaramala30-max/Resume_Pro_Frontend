export default function BackgroundMeshes() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-9 overflow-hidden">
      {/* Mesh gradients (CSS gradients, GPU-friendly) */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(900px circle at 20% 20%, rgba(139,92,246,0.10), transparent 55%), radial-gradient(800px circle at 80% 30%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(800px circle at 50% 85%, rgba(244,185,66,0.08), transparent 55%)',
          filter: 'saturate(1.15)',
          animation: 'bb-mesh-drift 18s ease-in-out infinite',
          transform: 'translate3d(calc(var(--px) * 14px), calc(var(--py) * 10px), 0)',
        }}
      />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          background:
            'radial-gradient(700px circle at 30% 70%, rgba(139,92,246,0.08), transparent 55%), radial-gradient(650px circle at 70% 60%, rgba(59,130,246,0.08), transparent 55%)',
          filter: 'saturate(1.25)',
          animation: 'bb-mesh-drift 26s ease-in-out infinite reverse',
          transform: 'translate3d(calc(var(--px) * -10px), calc(var(--py) * 8px), 0)',
        }}
      />
    </div>
  )
}
