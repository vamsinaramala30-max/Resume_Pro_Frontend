import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Download, Printer, Save, FileText, User, Loader2 } from 'lucide-react'

import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { readJSON, STORAGE_KEYS, writeJSON } from '../../lib/storage.js'
import TemplateSelector from '../../components/TemplateSelector.jsx'
import { splitSkillString } from '../../lib/formatters.js'

import ResumePrintable from '../../components/resume/ResumePrintable.jsx'
import { apiSaveResume } from '../../lib/apiResume.js'

const DRAFT_KEY = STORAGE_KEYS.resumeDraftPremium

function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function PreviewResumeMini({ data, templateId }) {
  const templateTheme = TEMPLATE_SAMPLES[templateId] || TEMPLATE_SAMPLES.modern
  const accent = templateTheme.accent || '#c5a045'

  return (
    <div style={{ background: '#fff', color: '#0f172a', fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <div style={{ background: templateTheme.headerBg, color: '#fff' }} className="px-8 py-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            {data.profileImageDataUrl ? (
              <img src={data.profileImageDataUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-3xl font-black leading-tight">{String(data.fullName || 'Your Name')}</div>
            <div className="text-sm text-white/80 mt-1">
              {String(data.phone || 'Phone')} • {String(data.email || 'Email')}
            </div>
            <div className="text-xs text-white/80 mt-2">
              Career Objective: <span style={{ color: accent, fontWeight: 700 }}>{String(data.careerObjective || '—')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-7 text-sm">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="font-bold uppercase text-xs tracking-widest" style={{ color: accent }}>
              Projects
            </div>
            <div className="mt-3 space-y-3 text-slate-700">
              {[data.projects1, data.projects2, data.projects3].map((p, i) => (
                <div key={i}>
                  <div className="font-bold">Project {i + 1}</div>
                  <div className="whitespace-pre-wrap">{String(p || 'Add project impact...')}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs tracking-widest" style={{ color: accent }}>
              Skills
            </div>
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

function A4Wrapper({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-none overflow-visible">{children}</div>
    </div>
  )
}

export default function PremiumDownload() {
  const navigate = useNavigate()
  const [templateId, setTemplateId] = useState('modern')
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  const [pdfLoading, setPdfLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  useEffect(() => {
    const saved = readJSON(DRAFT_KEY, null)
    if (saved) {
      setData(mergeResume(RESUME_DEFAULTS, saved))
      if (saved.templateId) setTemplateId(saved.templateId)
    }
  }, [])

  const generateSmartPdf = async ({ scale = 2, quality = 0.98, filename }) => {
    const el = document.getElementById('premium-resume-preview-print')
    if (!el) return

    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ])

    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowHeight: el.scrollHeight,
    })

    const A4_W_MM = 210
    const A4_H_MM = 297
    const MARGIN_MM = 8

    const printableW = A4_W_MM - MARGIN_MM * 2
    const printableH = A4_H_MM - MARGIN_MM * 2

    const pxPerMm = canvas.width / printableW
    const contentHeightMm = canvas.height / pxPerMm
    const totalPages = Math.max(1, Math.ceil(contentHeightMm / printableH))

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage()

      const srcY = page * printableH * pxPerMm
      const srcH = Math.min(printableH * pxPerMm, canvas.height - srcY)

      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = srcH
      const ctx = pageCanvas.getContext('2d')
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH)

      const imgData = pageCanvas.toDataURL('image/jpeg', quality)
      const imgH = srcH / pxPerMm
      pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, printableW, imgH)
    }

    pdf.save(filename)
  }

  const downloadPdf = async () => {
    const name = `${String(data.fullName || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
    setPdfLoading(true)
    try {
      await generateSmartPdf({ scale: 2, quality: 0.97, filename: name })
    } finally {
      setPdfLoading(false)
    }
  }

  const exportHighQualityPdf = async () => {
    const name = `${String(data.fullName || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase()}-high-quality.pdf`
    setExportLoading(true)
    try {
      await generateSmartPdf({ scale: 2.5, quality: 1, filename: name })
    } finally {
      setExportLoading(false)
    }
  }

  const saveLocal = async () => {
    // Preserve existing premium save flow; this button only syncs if already authenticated.
    const payload = { ...data, templateId }
    writeJSON(STORAGE_KEYS.resume, payload)

    const auth = readJSON(STORAGE_KEYS.auth, null)
    if (auth?.token) {
      await apiSaveResume({
        token: auth.token,
        payload,
        title: data.fullName?.trim() || 'Premium Resume',
        premium: true,
      })
    } else {
      // no-op (data already cached in local storage via autosave/preview)
    }
  }

  const print = () => window.print()

  const share = async () => {
    const shareData = {
      title: 'My Resume',
      text: `Resume for ${data.fullName || 'Me'} — generated with Resume PRO`,
      url: window.location.href,
    }

    try {
      if (navigator.share) await navigator.share(shareData)
    } catch {
      // user cancelled
    }
  }

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="text-primary font-black text-4xl">Download &amp; Share</div>
            <div className="text-slate-400 mt-1 text-sm">Premium — export PDF + print.</div>
          </div>

          <button
            onClick={() => navigate('/premium/preview')}
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 hover:border-white/20 px-4 py-2.5 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Preview
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-white/15 bg-black/10 p-5">
            <div className="text-sm font-bold text-slate-100 mb-4">Template Preview</div>
            <TemplateSelector template={templateId} setTemplate={setTemplateId} />
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

          <div className="rounded-3xl border border-white/15 bg-black/10 p-5 flex flex-col gap-3">
            <div className="text-sm font-bold text-slate-100">Export Options</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium PDF will include your uploaded profile image and template styling.
            </p>

            <div className="grid gap-2.5 mt-2">
              <button
                onClick={downloadPdf}
                disabled={pdfLoading || exportLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold bg-primary text-primary-foreground hover:brightness-110 transition disabled:opacity-60"
              >
                {pdfLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download PDF
                  </>
                )}
              </button>

              <button
                onClick={exportHighQualityPdf}
                disabled={pdfLoading || exportLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-amber-500/40 text-slate-200 transition disabled:opacity-60"
              >
                {exportLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Exporting…
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" /> Export HQ PDF
                  </>
                )}
              </button>

              <button
                onClick={print}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-white/20 text-slate-200 transition"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              <button
                onClick={saveLocal}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-emerald-500/40 text-slate-200 transition"
              >
                <Save className="w-4 h-4" /> Save to Cloud
              </button>

              <button
                onClick={share}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-blue-500/40 text-slate-200 transition"
              >
                <Check className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <div className="w-[210mm] bg-white overflow-visible shadow-2xl" id="premium-resume-preview-print">
          <ResumePrintable data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  )
}

