export default function SectionCard({ icon, title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-royal-gold text-lg font-black flex items-center gap-3">
            <span className="inline-flex w-10 h-10 rounded-2xl bg-white/5 border border-white/15 items-center justify-center">
              {icon}
            </span>
            <h2 className="m-0">{title}</h2>
          </div>
          {subtitle ? <p className="text-slate-200/90 text-sm mt-2">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

