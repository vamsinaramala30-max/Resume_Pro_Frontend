import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import FloatingInput from '../../components/FloatingInput.jsx'
import FloatingTextArea from '../../components/FloatingTextArea.jsx'
import SectionCard from '../../components/SectionCard.jsx'
import LoadingButton from '../../components/LoadingButton.jsx'
import AIAssistantButton from '../../components/ai/AIAssistantButton.jsx'

import { RESUME_DEFAULTS } from '../../lib/resumeDefaults.js'
import { isValidEmail } from '../../lib/validators.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../../lib/storage.js'

const DRAFT_KEY = STORAGE_KEYS.resumeDraftNormal ?? 'royalResumeDraftNormal'

function mergeResume(prev, patch) {
  return { ...prev, ...patch }
}

function useAutosaveDraft({ data, enabled, delayMs = 1800 }) {
  useEffect(() => {
    if (!enabled) return
    const t = setTimeout(() => {
      writeJSON(DRAFT_KEY, data)
    }, delayMs)
    return () => clearTimeout(t)
  }, [data, enabled, delayMs])
}

export default function NormalForm() {
  const navigate = useNavigate()
  const [data, setData] = useState(() => {
    const saved = readJSON(DRAFT_KEY, null)
    return saved ? mergeResume(RESUME_DEFAULTS, saved) : { ...RESUME_DEFAULTS }
  })

  const [errors, setErrors] = useState({})

  useAutosaveDraft({ data, enabled: true })

  const progress = useMemo(() => {
    const checks = [
      Boolean(data.fullName?.trim()),
      Boolean(data.email?.trim() && isValidEmail(data.email)),
      Boolean(data.phone?.trim()),
      Boolean(data.careerObjective?.trim()),
      Boolean(data.educationDegree?.trim() || data.educationCollege?.trim()),
      Boolean(data.skillsTechnical?.trim() || data.skillsTools?.trim() || data.skillsSoft?.trim()),
      Boolean(data.projects1?.trim() || data.projects2?.trim() || data.projects3?.trim()),
      Boolean(data.experienceWorkDetails?.trim() || data.experienceCompany?.trim()),
      Boolean(data.personalCertifications?.trim() || data.personalAchievements?.trim()),
      Boolean(data.personalLanguages?.trim()),
      Boolean(data.personalHobbies?.trim()),
    ]

    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [data])

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-royal-gold font-black text-4xl">Normal Resume Builder</div>
            <div className="text-slate-200/90 mt-2">Step 1/3 — Form only. No preview here.</div>
          </div>
          <div className="w-full sm:w-[340px]">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-royal-gold to-yellow-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-slate-200/70 mt-2">Completion: {progress}%</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-7 relative">
        <AIAssistantButton
          mode="normal"
          onAutofill={(patch) => {
            setData((prev) => mergeResume(prev, patch))
          }}
        />

        <div className="space-y-6">
          <SectionCard
            icon="👑"
            title="Personal Information"
            subtitle="Identity, contact, and links"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput
                label="Full Name"
                value={data.fullName}
                onChange={(e) => setData((p) => ({ ...p, fullName: e.target.value }))}
                error={errors.fullName}
              />
              <FloatingInput
                label="Phone"
                value={data.phone}
                onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                error={errors.phone}
              />
              <FloatingInput
                label="Email"
                value={data.email}
                type="email"
                onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                error={errors.email}
              />
              <FloatingInput
                label="LinkedIn"
                value={data.linkedIn}
                onChange={(e) => setData((p) => ({ ...p, linkedIn: e.target.value }))}
              />
              <div className="md:col-span-2">
                <FloatingInput
                  label="Portfolio"
                  value={data.portfolio}
                  onChange={(e) => setData((p) => ({ ...p, portfolio: e.target.value }))}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon="👑" title="Career Objective" subtitle="ATS-friendly professional goal">
            <FloatingTextArea
              label="Career Objective"
              value={data.careerObjective}
              rows={5}
              error={errors.careerObjective}
              onChange={(e) => setData((p) => ({ ...p, careerObjective: e.target.value }))}
            />
          </SectionCard>

          <SectionCard icon="👑" title="Education" subtitle="Degree, college, year, and grades">
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput
                label="Degree / Branch"
                value={data.educationDegree}
                onChange={(e) => setData((p) => ({ ...p, educationDegree: e.target.value }))}
              />
              <FloatingInput
                label="College Name"
                value={data.educationCollege}
                onChange={(e) => setData((p) => ({ ...p, educationCollege: e.target.value }))}
              />
              <FloatingInput
                label="Year & CGPA"
                value={data.educationYearCgpa}
                onChange={(e) => setData((p) => ({ ...p, educationYearCgpa: e.target.value }))}
              />
              <FloatingInput
                label="Intermediate"
                value={data.educationIntermediate}
                onChange={(e) => setData((p) => ({ ...p, educationIntermediate: e.target.value }))}
              />
              <div className="md:col-span-2">
                <FloatingInput
                  label="SSC"
                  value={data.educationSSC}
                  onChange={(e) => setData((p) => ({ ...p, educationSSC: e.target.value }))}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon="👑" title="Skills" subtitle="Technical, tools, and soft skills">
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput
                label="Technical Skills (comma separated)"
                value={data.skillsTechnical}
                onChange={(e) => setData((p) => ({ ...p, skillsTechnical: e.target.value }))}
              />
              <FloatingInput
                label="Tools & Platforms (comma separated)"
                value={data.skillsTools}
                onChange={(e) => setData((p) => ({ ...p, skillsTools: e.target.value }))}
              />
              <div className="md:col-span-2">
                <FloatingInput
                  label="Soft Skills (comma separated)"
                  value={data.skillsSoft}
                  onChange={(e) => setData((p) => ({ ...p, skillsSoft: e.target.value }))}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon="👑" title="Projects" subtitle="High-impact results">
            <div className="grid md:grid-cols-3 gap-4">
              <FloatingTextArea
                label="Project 1"
                value={data.projects1}
                rows={4}
                onChange={(e) => setData((p) => ({ ...p, projects1: e.target.value }))}
              />
              <FloatingTextArea
                label="Project 2"
                value={data.projects2}
                rows={4}
                onChange={(e) => setData((p) => ({ ...p, projects2: e.target.value }))}
              />
              <FloatingTextArea
                label="Project 3"
                value={data.projects3}
                rows={4}
                onChange={(e) => setData((p) => ({ ...p, projects3: e.target.value }))}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon="👑"
            title="Internship / Experience"
            subtitle="Role, duration, and achievements"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput
                label="Role / Company"
                value={data.experienceRole}
                onChange={(e) => setData((p) => ({ ...p, experienceRole: e.target.value }))}
              />
              <FloatingInput
                label="Duration"
                value={data.experienceDuration}
                onChange={(e) => setData((p) => ({ ...p, experienceDuration: e.target.value }))}
              />
              <FloatingInput
                label="Work Company"
                value={data.experienceCompany}
                onChange={(e) => setData((p) => ({ ...p, experienceCompany: e.target.value }))}
              />
              <div className="md:col-span-2">
                <FloatingTextArea
                  label="Work Details"
                  value={data.experienceWorkDetails}
                  rows={5}
                  onChange={(e) => setData((p) => ({ ...p, experienceWorkDetails: e.target.value }))}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon="👑" title="Certifications" subtitle="Credibility boosters">
            <div className="grid md:grid-cols-2 gap-4">
              <FloatingInput
                label="Certifications"
                value={data.personalCertifications}
                onChange={(e) => setData((p) => ({ ...p, personalCertifications: e.target.value }))}
              />
              <FloatingInput
                label="Achievements"
                value={data.personalAchievements}
                onChange={(e) => setData((p) => ({ ...p, personalAchievements: e.target.value }))}
              />
            </div>
          </SectionCard>

          <SectionCard icon="👑" title="Languages" subtitle="Multilingual readiness">
            <FloatingInput
              label="Languages"
              value={data.personalLanguages}
              onChange={(e) => setData((p) => ({ ...p, personalLanguages: e.target.value }))}
            />
          </SectionCard>

          <SectionCard icon="👑" title="Hobbies" subtitle="Human + balanced profile">
            <FloatingInput
              label="Hobbies"
              value={data.personalHobbies}
              onChange={(e) => setData((p) => ({ ...p, personalHobbies: e.target.value }))}
            />
          </SectionCard>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <LoadingButton
              type="button"
              onClick={() => {
                if (!validate()) return
                writeJSON(DRAFT_KEY, data)
                navigate('/normal/preview')
              }}
              className="bg-royal-gold text-royal-navy hover:brightness-110"
            >
              Continue to Preview
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  )
}

