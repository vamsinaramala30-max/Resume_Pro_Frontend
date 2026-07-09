import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Sparkles, ShieldCheck, Target, Wand2, Settings, BarChart3, LayoutGrid } from 'lucide-react'
import { TEMPLATE_LIST, TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { readJSON, STORAGE_KEYS } from '../../lib/storage.js'

function Meter({ label, value, hint }) {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-foreground">{label}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1 font-medium">{hint}</div>}
        </div>
        <div className="text-primary font-black text-xl">{value}%</div>
      </div>
      <div className="mt-4 h-2 bg-surface-elevated rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-card p-5">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <div>
          <div className="text-sm font-bold text-foreground">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
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
    <div className="relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card p-8 lg:p-12"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-border">
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">Premium Dashboard</span>
            </div>
            <h1 className="mt-6 text-h2 md:text-h1 font-black tracking-tight text-foreground">Luxury tools for your next resume</h1>
            <p className="mt-4 text-body-large text-muted-foreground max-w-2xl">
              AI scoring, ATS optimization, premium templates, and smarter resume decisions for every application.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <Meter label="Completion" value={completion} hint="Form coverage based on your draft" />
              <Meter label="Resume Strength" value={strength} hint="Content depth + keyword signals" />
            </div>
          </div>

          {/* Right sidebar info cards */}
          <div className="md:w-[320px]">
            <div className="grid gap-4">
              <InfoCard icon={LayoutGrid} title="Premium Templates" subtitle="Multiple design styles">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Modern, Creative, Corporate, and Executive layouts with richer typography and visual hierarchy.
                </p>
              </InfoCard>

              <InfoCard icon={Sparkles} title="AI Resume Scoring" subtitle="Quality and clarity">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-xs rounded-2xl bg-surface-elevated border border-border p-3">
                    <div className="font-black text-primary">{Math.max(65, completion)}%</div>
                    <div className="mt-1 text-muted-foreground">Clarity score</div>
                  </div>
                  <div className="text-xs rounded-2xl bg-surface-elevated border border-border p-3">
                    <div className="font-black text-primary">{Math.max(55, strength)}%</div>
                    <div className="mt-1 text-muted-foreground">Impact score</div>
                  </div>
                </div>
              </InfoCard>

              <InfoCard icon={ShieldCheck} title="ATS Optimization" subtitle="Keyword readiness">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Learn which sections are strongest and where to improve for a higher application pass rate.
                </p>
              </InfoCard>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: Target, title: 'AI ATS Checker', subtitle: 'Actionable fixes for hiring systems' },
            { icon: Wand2, title: 'Grammar Improvement', subtitle: 'Sharper sentences, stronger impact' },
            { icon: Settings, title: 'Customization', subtitle: 'Colors, fonts, and section layout' },
          ].map(({ icon: Icon, title, subtitle }) => (
            <motion.div
              key={title}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-border bg-surface-elevated shadow-card p-5 hover:border-primary/30 hover:shadow-card-hover transition-all"
            >
              <Icon className="w-6 h-6 text-primary" />
              <div className="text-sm font-bold mt-3 text-foreground">{title}</div>
              <div className="text-xs text-muted-foreground mt-2">{subtitle}</div>
            </motion.div>
          ))}
        </div>

        {/* Resume Snapshot + AI Assist */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface-elevated p-5">
            <div className="text-sm font-bold text-foreground uppercase tracking-[0.18em]">Resume Snapshot</div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Explore premium template previews, polished spacing, and live output for every application. High-end design helps your resume stand out.
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {TEMPLATE_LIST.slice(0, 3).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <div
                    className="h-24 bg-cover bg-center"
                    style={{ backgroundImage: `url(${TEMPLATE_SAMPLES[item.id]?.image || TEMPLATE_SAMPLES.modern?.bg})` }}
                  />
                  <div className="p-2 text-xs text-muted-foreground truncate">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-elevated p-5">
            <div className="text-sm font-bold text-foreground uppercase tracking-[0.18em]">AI Assist</div>
            <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Use built-in AI suggestions to strengthen your career summary, sharpen project bullets, and refine keyword language for hiring managers.
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Personalization</div>
                <div className="mt-2 text-sm text-foreground">Align sections to your target role with tailored wording.</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Impact</div>
                <div className="mt-2 text-sm text-foreground">Add metrics-focused phrasing for stronger results.</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA bar */}
      <div className="mt-8 rounded-3xl border border-border bg-card shadow-card p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Premium Next Steps
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Continue editing your premium resume to keep boosting the score, then export a polished file with our premium templates.
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/premium')}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground hover:brightness-110 transition shrink-0"
          >
            Open Premium Builder
          </button>
        </div>
      </div>
    </div>
  )
}
