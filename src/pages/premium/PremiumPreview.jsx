import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, User } from 'lucide-react'

import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import TemplateSelector from '../../components/TemplateSelector.jsx'
import { TEMPLATE_SAMPLES } from '../../lib/templateSamples.js'
import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../../lib/storage.js'
import { splitSkillString } from '../../lib/formatters.js'

import ResumePrintable from '../../components/resume/ResumePrintable.jsx'

const DRAFT_KEY = STORAGE_KEYS.resumeDraftPremium

function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function A4Wrapper({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-none overflow-visible">
        {children}
      </div>
    </div>
  )
}

function PreviewResume({ data, templateId }) {
  // Use existing printable component so preview/PDF match closely.
  return (
    <div className="bg-white">
      <ResumePrintable data={data} templateId={templateId} />
    </div>
  )
}

export default function PremiumPreview() {
  const navigate = useNavigate()
  const [templateId, setTemplateId] = useState('modern')
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  useEffect(() => {
    const saved = readJSON(DRAFT_KEY, null)
    if (saved) {
      setData(mergeResume(RESUME_DEFAULTS, saved))
      if (saved.templateId) setTemplateId(saved.templateId)
    }
  }, [])

  const completionActions = (
    <div className="flex items-center justify-between gap-4 flex-wrap mt-8">
      <Button variant="outline" onClick={() => navigate('/premium')}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Edit
      </Button>

      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={() => navigate('/premium')}>
          Back
        </Button>

        <Button onClick={() => navigate('/premium/download')}>
          <Check className="w-4 h-4 mr-2" />
          Confirm
        </Button>
      </div>
    </div>
  )

  return (
    <div className="relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="text-primary font-black text-h2 tracking-tight">Premium Resume Preview</div>
            <div className="text-foreground/70 mt-2 font-medium">Live A4 preview + template switch.</div>
          </div>

          <div className="w-full sm:w-[420px]">
            <Card className="bg-surface/50 p-5 border-border shadow-elevation-2">
              <div className="text-sm font-bold text-foreground mb-3">Template</div>
              <TemplateSelector template={templateId} setTemplate={setTemplateId} />
            </Card>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_360px]">
          <div className="flex flex-col justify-end">{completionActions}</div>

          <Card className="bg-surface/50 p-5 border-border shadow-elevation-2">
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">Live template image</div>
            <div
              className="mt-4 h-44 rounded-2xl bg-cover bg-center border border-border shadow-elevation-1"
              style={{ backgroundImage: `url(${TEMPLATE_SAMPLES[templateId]?.image || TEMPLATE_SAMPLES.modern.bg})` }}
            />
            <div className="mt-4 text-sm text-foreground/70 leading-relaxed font-medium">
              Switch templates to instantly preview your premium layout before downloading.
            </div>
          </Card>
        </div>
      </motion.div>

      <div className="mt-7">
        <A4Wrapper>
          <div id="premium-resume-preview-print">
            <PreviewResume data={data} templateId={templateId} />
          </div>
        </A4Wrapper>
      </div>
    </div>
  )
}

