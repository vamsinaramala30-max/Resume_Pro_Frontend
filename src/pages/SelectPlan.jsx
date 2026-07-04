import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Sparkles, BadgeCheck, Zap, ShieldCheck } from 'lucide-react'

function PlanCard({ title, subtitle, badge, glow, onClick, icon, features }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/85 p-7 text-left shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-royal-gold/40"
    >
      {glow ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_40%)]" />
      ) : null}

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-slate-400">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-white/10 text-royal-gold">{icon}</span>
              <span className="font-bold text-white">{badge}</span>
            </div>
            <div className="text-3xl font-black text-white">{title}</div>
          </div>
          {glow ? <Zap className="h-7 w-7 text-royal-gold" /> : <ShieldCheck className="h-7 w-7 text-slate-300" />}
        </div>

        <p className="text-slate-300 leading-7">{subtitle}</p>

        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
              <BadgeCheck className={glow ? 'h-4 w-4 text-royal-gold' : 'h-4 w-4 text-slate-400'} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {glow ? 'AI + luxury' : 'Solid resume workflow'}
          </span>
        </div>

      </div>
    </motion.button>
  )
}

export default function SelectPlan() {
  const navigate = useNavigate()

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_25%)]" />
      <div className="relative z-10 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-[36px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-3xl">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Crown className="h-5 w-5 text-royal-gold" /> Pick the workflow that fits your career.
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-white">Choose your resume experience.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                From fast form-based creation to premium AI-guided resume design, select the plan that brings your story to life.
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Why choose</div>
              <div className="mt-4 space-y-3 text-slate-300">
                <p>⟶ Speed through setup with structured flow.</p>
                <p>⟶ Unlock richer resume formats and premium visuals.</p>
                <p>⟶ Keep your workflow modern and production-ready.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PlanCard
            title="Normal Resume"
            subtitle="Clean templates, fast form workflow, and export-ready preview for every job application."
            badge="Standard"
            glow={false}
            icon={<Sparkles className="h-6 w-6" />}
            features={['3-step builder flow', 'Trusted ATS-friendly structure', 'PDF + print export', 'Responsive resume previews']}
            onClick={() => navigate('/normal')}
          />
          <PlanCard
            title="Premium Resume"
            subtitle="Luxury design system with AI suggestions, fast customization, and exclusive templates."
            badge="Premium"
            glow
            icon={<Crown className="h-6 w-6" />}
            features={['AI writing assistance', 'Premium visual templates', 'Keyword optimization', 'Advanced export options']}
            onClick={() => navigate('/premium')}
          />
        </div>
      </div>
    </div>
  )
}

