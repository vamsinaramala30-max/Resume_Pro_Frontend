import { useEffect, useState } from 'react'
import { Download, Share2, Printer, Save, FileText, ArrowLeft, Loader2, CheckCircle2, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../../lib/storage.js'
import { splitSkillString } from '../../lib/formatters.js'
import TemplateSelector from '../../components/TemplateSelector.jsx'

async function loadHtml2Pdf() {
  const module = await import('html2pdf.js')
  return module.default || module
}

const DRAFT_KEY = STORAGE_KEYS.resumeDraftNormal

function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function sanitizeText(s) {
  return String(s ?? '')
}

function PreviewResumeMini({ data, templateId }) {
  const templateTheme = TEMPLATE_SAMPLES[templateId] || TEMPLATE_SAMPLES.modern
  const accent = templateTheme.accent || '#c5a045'

  return (
    <div style={{ background: '#fff', color: '#0f172a', fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <div className="px-8 py-8" style={{ background: templateTheme.headerBg, color: '#fff' }}>
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            {data.profileImageDataUrl ? (
              <img src={data.profileImageDataUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-primary-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-3xl font-black leading-tight">{sanitizeText(data.fullName) || 'Your Name'}</div>
            <div className="text-sm text-white/80 mt-1">
              {sanitizeText(data.phone) || 'Phone'} • {sanitizeText(data.email) || 'Email'}
            </div>
            <div className="text-xs text-white/80 mt-2">
              Career Objective: <span style={{ color: accent, fontWeight: 700 }}>{sanitizeText(data.careerObjective) || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-7 text-sm">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="font-bold uppercase text-xs tracking-widest" style={{ color: accent }}>Projects</div>
            <div className="mt-3 space-y-3 text-slate-700">
              {[data.projects1, data.projects2, data.projects3].map((p, i) => (
                <div key={i}>
                  <div className="font-bold">Project {i + 1}</div>
                  <div className="whitespace-pre-wrap">{sanitizeText(p) || 'Add project impact...'}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs tracking-widest" style={{ color: accent }}>Skills</div>
            <div className="mt-3 text-slate-700">
              <div className="font-semibold">Technical</div>
              <div className="mt-1">{splitSkillString(data.skillsTechnical).join(', ') || '—'}</div>
              <div className="font-semibold mt-3">Tools</div>
              <div className="mt-1">{splitSkillString(data.skillsTools).join(', ') || '—'}</div>
              <div className="font-semibold mt-3">Soft</div>
              <div className="mt-1">{splitSkillString(data.skillsSoft).join(', ') || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NormalDownload() {
  const [templateId, setTemplateId] = useState('modern')
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  useEffect(() => {
    const saved = readJSON(DRAFT_KEY, null)
    if (saved) setData(mergeResume(RESUME_DEFAULTS, saved))
  }, [])

  const downloadPdf = async () => {
    const el = document.getElementById('resume-preview-print')
    if (!el) return

    const html2pdf = await loadHtml2Pdf()
    const name = `${(data.fullName || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`

    const opt = {
      margin: [8, 8, 8, 8],
      filename: name,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }

    await html2pdf().set(opt).from(el).save()
  }

  const share = async () => {
    // Demo: share via Web Share if available; otherwise create a text share.
    const shareData = {
      title: 'My Resume',
      text: `Resume for ${data.fullName || 'Me'} — generated with Royal Resume Builder`,
      url: window.location.href,
    }

    try {
      if (navigator.share) await navigator.share(shareData)
      else {
        window.dispatchEvent(
          new CustomEvent('royal-toast', {
            detail: {
              type: 'info',
              title: 'Share',
              message: shareData.text,
            },
          })
        )
      }
    } catch {
      // no-op
    }
  }

  const saveLocal = () => {
    writeJSON(STORAGE_KEYS.resumeSavedNormal ?? 'royalResumeSavedNormal', { ...data, savedAt: Date.now() })
    window.dispatchEvent(
      new CustomEvent('royal-toast', {
        detail: {
          type: 'success',
          title: 'Saved',
          message: 'Saved locally (demo).',
        },
      })
    )
  }

  const print = () => {
    // ensure UI is not printed
    window.print()
  }

  const exportHighQualityPdf = async () => {
    const el = document.getElementById('resume-preview-print')
    if (!el) return

    const html2pdf = await loadHtml2Pdf()
    const name = `${(data.fullName || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}-high-quality.pdf`

    await html2pdf().set({
      margin: [10, 10, 10, 10],
      filename: name,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2.5, useCORS: true, logging: false, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }).from(el).save()
  }

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="text-primary font-black text-4xl">Download & Share</div>
        <div className="text-slate-200/90 mt-2">Step 3/3 — PDF, print, save, share, and high-quality export.</div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-white/15 bg-black/10 p-5">
            <div className="text-sm font-bold text-slate-100">Template preview</div>
            <div className="mt-4">
              <TemplateSelector template={templateId} setTemplate={setTemplateId} />
            </div>
            <div className="mt-5 rounded-3xl border border-white/10 overflow-hidden bg-slate-950/90">
              <div
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${TEMPLATE_SAMPLES[templateId]?.image || TEMPLATE_SAMPLES.modern.bg})` }}
              />
              <div className="p-4">
                <div className="text-sm font-bold text-white">{TEMPLATE_SAMPLES[templateId]?.label}</div>
                <div className="text-xs text-slate-400 mt-1">{TEMPLATE_SAMPLES[templateId]?.tagline}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/10 p-5">
            <div className="text-sm font-bold text-slate-100">Download options</div>
            <div className="mt-3 text-sm text-slate-300 leading-relaxed">
              Use the image preview and template selection above to verify your final resume style. Export a polished premium PDF or print-ready version in one click.
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-5 gap-3">
          <button onClick={downloadPdf} className="md:col-span-1 px-4 py-3 rounded-2xl font-bold bg-primary text-primary-foreground hover:brightness-110 transition inline-flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button onClick={print} className="px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-primary transition inline-flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={saveLocal} className="px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-primary transition inline-flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
          <button onClick={share} className="px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-primary transition inline-flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={exportHighQualityPdf} className="px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-primary transition inline-flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Export
          </button>
        </div>
      </motion.div>

      <div className="mt-7 flex justify-center">
        <div className="w-[210mm] min-h-[297mm] bg-white overflow-hidden shadow-2xl" id="resume-preview-print">
          <PreviewResumeMini data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  )
}

