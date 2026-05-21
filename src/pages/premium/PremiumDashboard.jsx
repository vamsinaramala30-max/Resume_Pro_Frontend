import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Sparkles, ShieldCheck, Target, Wand2, Settings, BarChart3, LayoutGrid } from 'lucide-react'
import { TEMPLATE_LIST, TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { readJSON, STORAGE_KEYS } from '../../lib/storage.js'

function Meter({ label, value, hint }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">{label}</div>
          {hint ? <div className="text-xs text-slate-200/70 mt-1">{hint}</div> : null}
        </div>
        <div className="text-royal-gold font-black text-xl">{value}%</div>
      </div>
      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-royal-gold to-yellow-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function PremiumDashboard() {
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    const raw = readJSON(STORAGE_KEYS.resume, null)
    if (raw) setDraft(raw)
  }, [])

  const completion = useMemo(() => {
    const d = draft || {}
    const checks = [
      Boolean(d.fullName?.trim()),
      Boolean(d.email?.trim()),
      Boolean(d.phone?.trim()),
      Boolean(d.careerObjective?.trim()),
      Boolean(d.projects1?.trim() || d.projects2?.trim() || d.projects3?.trim()),
      Boolean(d.experienceWorkDetails?.trim()),
      Boolean(d.skillsTechnical?.trim() || d.skillsTools?.trim() || d.skillsSoft?.trim()),
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [draft])

  const strength = useMemo(() => {
    const d = draft || {}
    const text = `${d.careerObjective || ''} ${d.experienceWorkDetails || ''} ${d.projects1 || ''} ${d.projects2 || ''} ${d.projects3 || ''}`
    const lenScore = Math.min(40, Math.floor(text.length / 120))
    const hasKeywords = /(lead|built|shipped|optimized|improved|implemented|reduced|increased)/i.test(text)
    const bonus = hasKeywords ? 20 : 0
    return Math.min(100, 35 + lenScore + bonus)
  }, [draft])

  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/10 backdrop-blur-xl shadow-2xl p-8"
        style={{
          background:
            'radial-gradient(circle at 20% 0%, rgba(197,160,89,0.22), rgba(197,160,89,0) 40%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10">
              <Crown className="w-4 h-4 text-royal-gold" />
              <span className="text-xs font-bold text-slate-200/90">Premium Dashboard</span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight">Luxury tools for your next resume</h1>
            <p className="mt-3 text-slate-200/90 max-w-2xl leading-relaxed">
              AI scoring, ATS optimization, premium templates, and smarter resume decisions for every application.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Meter label="Completion" value={completion} hint="Form coverage based on your draft" />
              <Meter label="Resume Strength" value={strength} hint="Content depth + keyword signals" />
            </div>
          </div>

          <div className="md:w-[320px]">
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-5 h-5 text-royal-gold" />
                  <div>
                    <div className="text-sm font-bold text-white">Premium Templates</div>
                    <div className="text-xs text-slate-200/70 mt-1">Multiple design styles</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-slate-200/80 leading-relaxed">
                  Modern, Creative, Corporate, and Executive layouts with richer typography and visual hierarchy.
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-royal-gold" />
                  <div>
                    <div className="text-sm font-bold text-white">AI Resume Scoring</div>
                    <div className="text-xs text-slate-200/70 mt-1">Quality and clarity</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="text-xs rounded-2xl bg-white/5 border border-white/10 p-3">
                    <div className="font-black text-royal-gold">{Math.max(65, completion)}%</div>
                    <div className="mt-1">Clarity score</div>
                  </div>
                  <div className="text-xs rounded-2xl bg-white/5 border border-white/10 p-3">
                    <div className="font-black text-royal-gold">{Math.max(55, strength)}%</div>
                    <div className="mt-1">Impact score</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-royal-gold" />
                  <div>
                    <div className="text-sm font-bold text-white">ATS Optimization</div>
                    <div className="text-xs text-slate-200/70 mt-1">Keyword readiness</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-slate-200/80 leading-relaxed">
                  Learn which sections are strongest and where to improve for a higher application pass rate.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5"
          >
            <Target className="w-6 h-6 text-royal-gold" />
            <div className="text-sm font-bold mt-3">AI ATS Checker</div>
            <div className="text-xs text-slate-200/70 mt-2">Actionable fixes for hiring systems</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5"
          >
            <Wand2 className="w-6 h-6 text-royal-gold" />
            <div className="text-sm font-bold mt-3">Grammar Improvement</div>
            <div className="text-xs text-slate-200/70 mt-2">Sharper sentences, stronger impact</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5"
          >
            <Settings className="w-6 h-6 text-royal-gold" />
            <div className="text-sm font-bold mt-3">Customization</div>
            <div className="text-xs text-slate-200/70 mt-2">Colors, fonts, and section layout</div>
          </motion.div>
        </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
          <div className="text-sm font-bold text-white uppercase tracking-[0.18em]">Resume Snapshot</div>
          <div className="mt-4 text-sm text-slate-300 leading-relaxed">
            Explore premium template previews, polished spacing, and live output for every application. High-end design helps your resume stand out.
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {TEMPLATE_LIST.slice(0, 3).map((item) => (
              <div key={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90">
                <div
                  className="h-24 bg-cover bg-center"
                  style={{ backgroundImage: `url(${TEMPLATE_SAMPLES[item.id]?.image || TEMPLATE_SAMPLES.modern.bg})` }}
                />
                <div className="p-3 text-xs text-slate-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
          <div className="text-sm font-bold text-white uppercase tracking-[0.18em]">AI Assist</div>
          <div className="mt-4 text-sm text-slate-300 leading-relaxed">
            Use built-in AI suggestions to strengthen your career summary, sharpen project bullets, and refine keyword language for hiring managers.
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Personalization</div>
              <div className="mt-2 text-sm text-slate-100">Align sections to your target role with tailored wording.</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Impact</div>
              <div className="mt-2 text-sm text-slate-100">Add metrics-focused phrasing for stronger results.</div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>

      <div className="mt-8 rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-royal-gold" />
              Premium Next Steps
            </div>
            <div className="text-xs text-slate-200/70 mt-2">
              Continue editing your premium resume to keep boosting the score, then export a polished file with our premium templates.
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/premium')}
            className="inline-flex items-center justify-center rounded-2xl bg-royal-gold px-5 py-3 text-sm font-black text-royal-navy hover:brightness-110 transition"
          >
            Open Premium Builder
          </button>
        </div>
      </div>
    </div>
  )
}

