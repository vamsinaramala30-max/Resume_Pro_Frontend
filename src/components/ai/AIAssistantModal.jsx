import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Wand2 } from 'lucide-react'

const SAMPLE_PATCH_NORMAL = {
  careerObjective:
    'Detail-oriented software developer seeking an opportunity to contribute to impactful products. Proven ability to ship reliable features, collaborate across teams, and improve performance through clean engineering practices.',
  skillsTechnical:
    'JavaScript, React, Node.js, REST APIs, SQL, Data Structures, Performance Optimization',
  skillsTools:
    'Git, Docker, CI/CD, Jira, Figma, Linux',
  skillsSoft:
    'Communication, Ownership, Problem Solving, Team Collaboration',
  projects1:
    'Built a real-time dashboard that visualizes key metrics using React and efficient state management. Reduced page load time and improved UI responsiveness.',
  projects2:
    'Developed an automated resume parsing service that extracts structured fields and generates ATS-friendly summaries. Implemented robust validation and error handling.',
  projects3:
    'Created a secure authentication flow with JWT, validation middleware, and reusable UI components. Added comprehensive tests and improved developer experience.',
  experienceRole:
    'Frontend Developer Intern',
  experienceCompany:
    'TechNova Labs',
  experienceDuration:
    'Jan 2024 — May 2024',
  experienceWorkDetails:
    '- Collaborated with senior engineers to implement UI features and improve accessibility.\n- Optimized rendering performance and reduced redundant API calls.\n- Wrote clear documentation for reusable components and patterns.',
  personalCertifications:
    'Google Cloud Fundamentals • React Advanced Patterns',
  personalAchievements:
    'Top 5% performance ranking in team projects • Hackathon Best UI/UX',
  personalLanguages: 'English (Fluent), Hindi (Native)',
  personalHobbies: 'Cricket, gym, reading tech articles',
  portfolio: 'https://yourportfolio.example.com',
  linkedIn: 'linkedin.com/in/yourname',
  educationDegree: 'B.Tech in Computer Science',
  educationCollege: 'Global Tech University',
  educationYearCgpa: '2024 • 8.7 CGPA',
  educationIntermediate: '12th Grade • 93%',
  educationSSC: '10th Grade • 95%',
}

export default function AIAssistantModal({ mode = 'normal', onClose, onAutofill }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I can help you fill your resume with premium-quality wording. Click “Generate sample content” to auto-fill sections.',
    },
  ])

  const [busy, setBusy] = useState(false)

  const headerTitle = useMemo(() => {
    if (mode === 'premium') return 'Premium AI Assistant'
    return 'AI Assistant'
  }, [mode])

  const addAssistant = (content) => {
    setMessages((prev) => [...prev, { role: 'assistant', content }])
  }

  const addUser = (content) => {
    setMessages((prev) => [...prev, { role: 'user', content }])
  }

  const generate = async () => {
    setBusy(true)
    addUser('Generate sample resume content for me.')

    // Simulate latency like a real model
    await new Promise((r) => setTimeout(r, 900))

    addAssistant('Done. I generated a structured career objective, skills, projects, and experience details.')
    onAutofill?.(SAMPLE_PATCH_NORMAL)
    setBusy(false)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-black/25 backdrop-blur-xl shadow-2xl overflow-hidden"
        initial={{ y: 14, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-royal-gold" />
            </div>
            <div>
              <div className="font-black text-lg">{headerTitle}</div>
              <div className="text-xs text-slate-200/70">Premium wording • Auto-fill enabled</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 hover:border-royal-gold transition flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[55vh] overflow-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  m.role === 'user'
                    ? 'max-w-[80%] rounded-3xl px-4 py-3 bg-royal-gold text-royal-navy font-bold'
                    : 'max-w-[80%] rounded-3xl px-4 py-3 bg-white/5 border border-white/10 text-slate-100'
                }
              >
                <div className="text-sm leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))}

          {busy ? (
            <div className="text-xs text-slate-200/70">Generating…</div>
          ) : null}
        </div>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={generate}
              disabled={busy}
              className="flex-1 px-5 py-3 rounded-2xl bg-royal-gold text-royal-navy font-black disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Generate sample content
              </span>
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl font-bold bg-white/5 border border-white/10 hover:border-royal-gold transition"
            >
              Close
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-200/70">
            Note: This assistant uses offline heuristics in this demo snapshot.
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

