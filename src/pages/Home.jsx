import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Download, Zap, ShieldCheck, Sparkles, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    icon: Crown,
    title: 'Premium Templates',
    desc: 'Luxury resume layouts that look elegant and scan cleanly for ATS.',
  },
  {
    icon: Zap,
    title: 'AI Smart Assist',
    desc: 'Auto-suggestions for skills, summaries, keywords, and job-ready phrasing.',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    desc: 'PDF, DOCX, print-ready pages, and shareable resume snapshots.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Workflow',
    desc: 'Secure forms, polished preview, and fast resume iteration.',
  },
]

const STATS = [
  { value: '10K+', label: 'resumes created', highlight: true },
  { value: '98%', label: 'client success rate' },
  { value: '3.8s', label: 'average build time' },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative text-white">
      <div className="absolute inset-0 bg-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_25%)]" />
      <div className="absolute inset-0 opacity-60 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.02))]" style={{ backgroundSize: '300% 300%', animation: 'gradient-pan 18s ease infinite' }} />

      <div className="relative z-10">
        <section className="pt-28 pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-3 rounded-full border border-royal-gold/20 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl shadow-lg">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-royal-gold/20 text-royal-gold">⚡</span>
                Build resumes faster with modern AI workflow.
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-tight">
                Create premium resumes with a <span className="bg-gradient-to-r from-royal-gold to-yellow-300 bg-clip-text text-transparent">future-forward workflow</span>.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="max-w-2xl text-lg sm:text-xl leading-8 text-slate-300">
                Launch your career with polished resume templates, smart content suggestions, and instant preview — all in a modern app experience built for ambitious professionals.
              </motion.p>

              <div className="grid gap-4 sm:grid-cols-2 sm:max-w-xl">
                <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/auth" className="inline-flex items-center justify-center rounded-3xl bg-royal-gold px-8 py-4 font-semibold text-royal-navy shadow-2xl shadow-royal-gold/20 transition hover:brightness-105">
                    Get Started
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/select" className="inline-flex items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-royal-gold hover:bg-white/10">
                    Explore Plans
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:max-w-lg">
                {STATS.map((stat) => (
                  <div key={stat.label} className={`rounded-3xl border border-white/10 bg-white/5 p-5 text-center ${stat.highlight ? 'shadow-2xl shadow-royal-gold/15' : ''}`}>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative rounded-[40px] border border-white/10 bg-slate-950/75 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
              <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-royal-gold/10 blur-3xl" />
              <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-lg shadow-black/20">
                  <div className="text-sm uppercase tracking-[0.35em] text-slate-400">Resume Snapshot</div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-black text-white">Royal Resume</div>
                      <div className="mt-1 text-sm text-slate-400">Modern template, instant preview, export ready</div>
                    </div>
                    <div className="rounded-3xl bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.28em] text-royal-gold">Live</div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {['Modern layout', 'ATS optimization', 'AI-assisted content', 'Instant export'].map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 transition hover:border-royal-gold hover:bg-white/10">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/75 p-5">
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                    <span>Progress</span>
                    <span className="font-semibold text-white">92%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-royal-gold" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
                  <Sparkles className="h-5 w-5 text-royal-gold" />
                  Create resumes faster with a premium production-ready workflow.
                </div>

                <h2 className="text-4xl font-black tracking-tight">Design, build, and ship your resume like a product.</h2>
                <p className="max-w-xl text-lg leading-8 text-slate-300">
                  The new standard for resume builders: glassmorphism UI, smooth motion, responsive layout, and modern interactions built for professionals.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {FEATURES.map((feature, idx) => (
                  <motion.div key={feature.title} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-royal-gold">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-3 text-slate-300 leading-7">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-black tracking-tight mb-6">Built to outshine every resume tool.</h2>
            <p className="mx-auto max-w-2xl text-slate-300 leading-8 mb-10">
              A polished end-to-end experience designed to feel premium, fast, and accessible across desktop and mobile.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {['Responsive layouts', 'Glassmorphism blur', 'Motion-driven UX'].map((item) => (
                <motion.div key={item} whileHover={{ y: -5 }} className="rounded-3xl border border-white/10 bg-slate-900/85 p-6 text-left">
                  <div className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">{item}</div>
                  <div className="text-xl font-bold text-white">{item}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-[36px] border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.35em] text-slate-400">Ready to upgrade your resume?</div>
                <h3 className="mt-3 text-3xl font-black text-white">Start building your premium resume today.</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/auth" className="inline-flex items-center justify-center rounded-3xl bg-royal-gold px-6 py-4 text-sm font-semibold text-royal-navy shadow-2xl shadow-royal-gold/20 transition hover:brightness-110">
                  Start Now
                </Link>
                <Link to="/select" className="inline-flex items-center justify-center rounded-3xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  Explore Plans
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
