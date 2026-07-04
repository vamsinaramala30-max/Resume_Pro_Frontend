import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Wand2 } from 'lucide-react'
import TemplateSelector from '../../components/TemplateSelector.jsx'
import SectionCard from '../../components/SectionCard.jsx'
import { TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../../lib/storage.js'
import { splitSkillString } from '../../lib/formatters.js'

const DRAFT_KEY = STORAGE_KEYS.resumeDraftNormal ?? 'royalResumeDraftNormal'

function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function sanitizeText(s) {
  return String(s ?? '')
}

function A4Wrapper({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-none overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function PreviewResume({ data, templateId }) {
  const skills = splitSkillString(data.skillsTechnical)
  const tools = splitSkillString(data.skillsTools)
  const soft = splitSkillString(data.skillsSoft)

  const templateTheme = TEMPLATE_SAMPLES[templateId] || TEMPLATE_SAMPLES.modern
  const st = {
    headerBg: templateTheme.headerBg,
    accent: templateTheme.accent || '#c5a045',
  }

  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <div style={{ background: st.headerBg }} className="px-8 py-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            {data.profileImageDataUrl ? (
              <img src={data.profileImageDataUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span style={{ color: st.accent }} className="text-2xl">
                👤
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-3xl font-black text-white leading-tight">
              {sanitizeText(data.fullName) || 'Your Name'}
            </div>
            <div className="text-sm text-white/80 mt-1">
              {sanitizeText(data.phone) || 'Phone'} • {sanitizeText(data.email) || 'Email'}
              {data.linkedIn ? (
                <span className="ml-2">• LinkedIn: <span style={{ color: st.accent }}>{sanitizeText(data.linkedIn)}</span></span>
              ) : null}
            </div>
            {data.portfolio ? (
              <div className="text-xs text-white/80 mt-1">
                Portfolio: <span style={{ color: st.accent }}>{sanitizeText(data.portfolio)}</span>
              </div>
            ) : null}

            <div className="mt-4">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
                Career Objective
              </div>
              <div className="text-sm text-white/90 leading-relaxed mt-2 whitespace-pre-wrap">
                {sanitizeText(data.careerObjective) || 'Add your career objective...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-7">
        <div className="grid grid-cols-[1fr_1fr] gap-8">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
              Education
            </div>
            <div className="mt-3 text-sm">
              <div className="font-bold">{sanitizeText(data.educationDegree) || 'Degree / Branch'}</div>
              <div>{sanitizeText(data.educationCollege) || 'College Name'}</div>
              <div className="text-sm text-slate-700">
                {sanitizeText(data.educationYearCgpa) || 'Year & CGPA'}
              </div>
              <div className="text-sm text-slate-700 mt-1">Intermediate: {sanitizeText(data.educationIntermediate) || '—'}</div>
              <div className="text-sm text-slate-700">SSC: {sanitizeText(data.educationSSC) || '—'}</div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
                Projects
              </div>
              <div className="mt-3 space-y-3 text-sm">
                {[data.projects1, data.projects2, data.projects3].map((p, i) => (
                  <div key={i}>
                    <div className="font-bold">Project {i + 1}</div>
                    <div className="text-slate-700 whitespace-pre-wrap">{sanitizeText(p) || 'Add project impact...'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
              Skills
            </div>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <div className="font-bold text-slate-900 mb-2">Technical</div>
                <div className="space-y-2">
                  {skills.length ? (
                    skills.slice(0, 12).map((s) => (
                      <div key={s} className="flex items-center justify-between">
                        <div className="text-slate-700">{s}</div>
                        <div className="text-xs" style={{ color: st.accent }}>
                          {Math.min(95, 45 + s.length * 2)}%
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500">Add technical skills</div>
                  )}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-2">Tools</div>
                <div className="flex flex-wrap gap-2">
                  {tools.length ? tools.slice(0, 14).map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border">{t}</span>
                  )) : <span className="text-slate-500">Add tools/platforms</span>}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-2">Soft Skills</div>
                <div className="text-slate-700">{soft.length ? soft.join(' • ') : 'Add soft skills'}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
                Experience
              </div>
              <div className="mt-3 text-sm text-slate-700">
                <div className="font-bold">{sanitizeText(data.experienceRole) || 'Role / Company'}</div>
                <div>{sanitizeText(data.experienceCompany) || 'Company'}</div>
                <div className="mt-1">{sanitizeText(data.experienceDuration) || 'Duration'}</div>
                <div className="mt-2 whitespace-pre-wrap">{sanitizeText(data.experienceWorkDetails) || 'Work details...'}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: st.accent }}>
                Certifications & Achievements
              </div>
              <div className="mt-3 text-sm text-slate-700 space-y-2">
                <div><span className="font-bold">Certifications:</span> {sanitizeText(data.personalCertifications) || '—'}</div>
                <div><span className="font-bold">Achievements:</span> {sanitizeText(data.personalAchievements) || '—'}</div>
                <div><span className="font-bold">Languages:</span> {sanitizeText(data.personalLanguages) || '—'}</div>
                <div><span className="font-bold">Hobbies:</span> {sanitizeText(data.personalHobbies) || '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NormalPreview() {
  const [templateId, setTemplateId] = useState('modern')
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  useEffect(() => {
    const saved = readJSON(DRAFT_KEY, null)
    if (saved) setData(mergeResume(RESUME_DEFAULTS, saved))
  }, [])

  const completionActions = (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <button
        type="button"
        onClick={() => (window.location.href = '/normal')}
        className="px-4 py-2 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-royal-gold transition text-sm inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Edit
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (window.location.href = '/normal/download')}
          className="px-4 py-2 rounded-2xl font-bold bg-royal-gold text-royal-navy hover:brightness-110 transition text-sm inline-flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Confirm
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-royal-gold font-black text-4xl">Normal Resume Preview</div>
            <div className="text-slate-200/90 mt-2">Step 2/3 — A4 preview + template switch.</div>
          </div>

          <div className="w-full sm:w-[420px]">
            <div className="rounded-3xl border border-white/15 bg-black/10 backdrop-blur-xl p-5">
              <div className="text-sm font-bold text-slate-100">Template</div>
              <TemplateSelector template={templateId} setTemplate={setTemplateId} />
            </div>
          </div>
        </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>{/* keep */}</div>
          {completionActions}
        </div>
      </div>

      </motion.div>

      <div className="mt-7">
        <A4Wrapper>
          <div id="resume-preview-print">
            <PreviewResume data={data} templateId={templateId} />
          </div>
        </A4Wrapper>
      </div>
    </div>
  )
}

