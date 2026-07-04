export default function BackgroundGlass() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-4">
      {/* Glassmorphism overlay with vignette + subtle opacity transitions */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_30%,transparent_65%)] opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.15)_0%,rgba(2,6,23,0.55)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.72)_100%]" />

      {/* Soft “glass” sweep */}
      <div className="absolute inset-0 opacity-70 bb-glass-sweep" />

      {/* Backdrop blur simulation (no backdrop-filter on huge area to avoid perf hit) */}
      <div className="absolute inset-0 pointer-events-none bb-glass-noise" />
    </div>
  )
}
