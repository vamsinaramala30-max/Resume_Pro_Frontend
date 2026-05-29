import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Sparkles, Target, Brain, Palette, Award, Pin } from 'lucide-react'
import SectionCard from '../../components/SectionCard.jsx'
import FloatingInput from '../../components/FloatingInput.jsx'
import FloatingTextArea from '../../components/FloatingTextArea.jsx'
import LoadingButton from '../../components/LoadingButton.jsx'
import TemplateSelector from '../../components/TemplateSelector.jsx'
import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { isValidEmail } from '../../lib/validators.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../../lib/storage.js'
import AIAssistantButton from '../../components/ai/AIAssistantButton.jsx'
import { apiSaveResume } from '../../lib/apiResume.js'


const DRAFT_KEY = STORAGE_KEYS.resumeDraftPremium ?? 'royalResumeDraftPremium'


function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function useAutosaveDraft({ data, enabled, delayMs = 1600 }) {
  useEffect(() => {
    if (!enabled) return
    const t = setTimeout(() => writeJSON(DRAFT_KEY, data), delayMs)
    return () => clearTimeout(t)
  }, [data, enabled, delayMs])
}

export default function PremiumForm() {
  const [templateId, setTemplateId] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved?.templateId || 'modern'
  })
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  const [errors, setErrors] = useState({})

  useAutosaveDraft({ data, enabled: true })

  const completion = useMemo(() => {
    const checks = [
      Boolean(data.fullName?.trim()),
      Boolean(data.email?.trim() && isValidEmail(data.email)),
      Boolean(data.phone?.trim()),
      Boolean(data.careerObjective?.trim()),
      Boolean(data.projects1?.trim() || data.projects2?.trim() || data.projects3?.trim()),
      Boolean(data.experienceWorkDetails?.trim()),
      Boolean(data.skillsTechnical?.trim() || data.skillsTools?.trim() || data.skillsSoft?.trim()),
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [data])

  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const e = {}
    if (!data.fullName?.trim()) e.fullName = 'Full Name is required'
    if (!data.email?.trim()) e.email = 'Email is required'
    else if (!isValidEmail(data.email)) e.email = 'Enter a valid email'
    if (!data.phone?.trim()) e.phone = 'Phone is required'
    if (!data.careerObjective?.trim()) e.careerObjective = 'Career Objective is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-primary font-black text-h2 tracking-tight">Premium Builder</div>
            <div className="text-foreground/70 mt-2 font-medium">Form + AI + premium customization (draft autosave)</div>
          </div>

          <div className="w-full sm:w-[360px]">
            <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${completion}%` }} />
            </div>
            <div className="text-xs text-foreground/50 tracking-widest uppercase font-bold mt-2">Completion: {completion}%</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-7 relative">
        <AIAssistantButton mode="premium" onAutofill={(patch) => setData((p) => mergeResume(p, patch))} />

        <div className="space-y-6 mt-6">
          <SectionCard icon={<User className="w-5 h-5" />} title="Personal Information" subtitle="Premium formatting + clean layout">
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput label="Full Name" value={data.fullName} onChange={(e) => setData((p) => ({ ...p, fullName: e.target.value }))} error={errors.fullName} />
              <FloatingInput label="Phone" value={data.phone} onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))} error={errors.phone} />
              <FloatingInput label="Email" type="email" value={data.email} onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))} error={errors.email} />
              <FloatingInput label="LinkedIn" value={data.linkedIn} onChange={(e) => setData((p) => ({ ...p, linkedIn: e.target.value }))} />
            </div>
          </SectionCard>

          <SectionCard icon={<Sparkles className="w-5 h-5" />} title="Premium Highlights" subtitle="Focus on the sections that make your resume stand out">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { title: 'AI Wording', description: 'Smart phrasing for career summaries and bullets.' },
                { title: 'Premium Templates', description: 'Choose from high-end modern resume designs.' },
                { title: 'ATS Ready', description: 'Structured sections optimized for recruiters.' },
                { title: 'Fast Export', description: 'Download polished PDF and print-ready resumes.' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <p className="text-xs text-slate-300 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={<Target className="w-5 h-5" />} title="Career Objective" subtitle="AI-ready ATS wording">
            <FloatingTextArea label="Career Objective" value={data.careerObjective} rows={5} onChange={(e) => setData((p) => ({ ...p, careerObjective: e.target.value }))} error={errors.careerObjective} />
          </SectionCard>

          <SectionCard icon={<Brain className="w-5 h-5" />} title="Skills" subtitle="Technical + Tools + Soft">
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput label="Technical Skills" value={data.skillsTechnical} onChange={(e) => setData((p) => ({ ...p, skillsTechnical: e.target.value }))} />
              <FloatingInput label="Tools & Platforms" value={data.skillsTools} onChange={(e) => setData((p) => ({ ...p, skillsTools: e.target.value }))} />
              <div className="md:col-span-2">
                <FloatingInput label="Soft Skills" value={data.skillsSoft} onChange={(e) => setData((p) => ({ ...p, skillsSoft: e.target.value }))} />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<Palette className="w-5 h-5" />} title="Premium Template" subtitle="Choose the style and preview image">
            <div className="space-y-5">
              <TemplateSelector template={templateId} setTemplate={setTemplateId} />
              <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/90">
                  <div
                    className="h-36 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${TEMPLATE_SAMPLES[templateId]?.image || TEMPLATE_SAMPLES.modern.bg})` }}
                  />
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <div className="text-sm font-bold text-white">{TEMPLATE_SAMPLES[templateId]?.label}</div>
                  <div className="text-xs text-slate-300 mt-2">{TEMPLATE_SAMPLES[templateId]?.tagline}</div>
                  <div className="mt-4 text-xs text-slate-300">This template is optimized for premium resumes, strong formatting, and clean reading flow.</div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<Award className="w-5 h-5" />} title="Bonus Details" subtitle="Add certifications, achievements, and personal highlights">
            <div className="grid gap-4 md:grid-cols-2">
              <FloatingInput label="Portfolio URL" value={data.portfolio} onChange={(e) => setData((p) => ({ ...p, portfolio: e.target.value }))} />
              <FloatingInput label="Certifications" value={data.personalCertifications} onChange={(e) => setData((p) => ({ ...p, personalCertifications: e.target.value }))} />
              <FloatingInput label="Achievements" value={data.personalAchievements} onChange={(e) => setData((p) => ({ ...p, personalAchievements: e.target.value }))} />
              <FloatingInput label="Languages" value={data.personalLanguages} onChange={(e) => setData((p) => ({ ...p, personalLanguages: e.target.value }))} />
              <FloatingInput label="Hobbies" value={data.personalHobbies} onChange={(e) => setData((p) => ({ ...p, personalHobbies: e.target.value }))} />
            </div>
          </SectionCard>

          <SectionCard icon={<Pin className="w-5 h-5" />} title="Projects" subtitle="Premium-impact bullets">
            <div className="grid md:grid-cols-3 gap-4">
              <FloatingTextArea label="Project 1" value={data.projects1} rows={4} onChange={(e) => setData((p) => ({ ...p, projects1: e.target.value }))} />
              <FloatingTextArea label="Project 2" value={data.projects2} rows={4} onChange={(e) => setData((p) => ({ ...p, projects2: e.target.value }))} />
              <FloatingTextArea label="Project 3" value={data.projects3} rows={4} onChange={(e) => setData((p) => ({ ...p, projects3: e.target.value }))} />
            </div>
          </SectionCard>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <LoadingButton
              type="button"
              onClick={async () => {
                if (!validate()) return
                setSaving(true)

                try {
                  const payload = { ...data, templateId }
                  writeJSON(DRAFT_KEY, payload)
                  writeJSON(STORAGE_KEYS.resume, payload)

                  const auth = readJSON(STORAGE_KEYS.auth, null)
                  if (auth?.token) {
                    await apiSaveResume({
                      token: auth.token,
                      payload,
                      title: data.fullName?.trim() || 'Premium Resume',
                      premium: true,
                    })
                  }

                  window.dispatchEvent(
                    new CustomEvent('royal-toast', {
                      detail: {
                        type: 'success',
                        title: 'Saved',
                        message: 'Premium resume saved successfully.',
                      },
                    }),
                  )

                  navigate('/premium/dashboard')
                } catch (error) {
                  window.dispatchEvent(
                    new CustomEvent('royal-toast', {
                      detail: {
                        type: 'error',
                        title: 'Save failed',
                        message: error?.message || 'Unable to save your resume.',
                      },
                    }),
                  )
                } finally {
                  setSaving(false)
                }
              }}
              loading={saving}
              className="w-full sm:w-auto"
            >
              Save & Continue
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  )
}

