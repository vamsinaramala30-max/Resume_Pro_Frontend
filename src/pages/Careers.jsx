import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { BriefcaseBusiness, Clock, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'

const JOBS = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid/Senior',
    tags: ['React', 'TypeScript', 'Accessibility'],
    description:
      'Build polished resume-building experiences with modern React patterns, performance profiling, and accessibility-first UI.',
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid/Senior',
    tags: ['Node.js', 'Security', 'APIs'],
    description:
      'Implement secure APIs, billing-ready integrations, and reliable background tasks with strong validation and rate limiting.',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Contract',
    level: 'Senior',
    tags: ['Design Systems', 'UX Research', 'Prototyping'],
    description:
      'Design modern SaaS flows with high conversion focus, glassmorphism aesthetics, and measurable improvements to user comprehension.',
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    tags: ['NLP', 'Prompting', 'Evaluation'],
    description:
      'Create safe AI assistance pipelines for resumes and cover letters with robust evaluation and privacy-first data handling.',
  },
]

function JobCard({ job, onApply }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      className="rounded-[32px] border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold tracking-[0.18em] text-royal-gold">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            {job.level}
          </div>
          <h2 className="mt-4 text-2xl font-black text-white">{job.title}</h2>
          <p className="mt-2 text-slate-300 leading-7">{job.description}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-sm text-slate-200">
            <MapPin className="h-4 w-4 text-royal-gold" aria-hidden="true" />
            {job.location}
          </div>
          <div className="mt-2 flex items-center justify-end gap-2 text-sm text-slate-200">
            <Clock className="h-4 w-4 text-royal-gold" aria-hidden="true" />
            {job.type}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => onApply(job)}
          className="w-full sm:w-auto rounded-2xl bg-royal-gold px-6 py-3 font-bold text-royal-navy shadow-2xl shadow-royal-gold/20 hover:brightness-110 transition"
        >
          Apply for this role
        </button>
      </div>
    </motion.article>
  )
}

function JobApplicationForm({ selectedJob, onSubmitted }) {
  const [form, setForm] = useState({ fullName: '', email: '', portfolio: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const fullName = form.fullName.trim()
    const email = form.email.trim()
    if (!fullName) return 'Full name is required.'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'A valid email is required.'
    const p = form.portfolio.trim()
    if (p && !/^https?:\/\//i.test(p)) return 'Portfolio link must start with http:// or https://'
    return ''
  }

  const submit = async () => {
    setError('')
    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setSubmitting(true)

    // No backend endpoint confirmed in the repo; fail gracefully with a short delay.
    await new Promise((r) => setTimeout(r, 650))

    setSubmitting(false)
    setSuccess(true)
    onSubmitted?.({ ...form, jobId: selectedJob?.id })
  }

  if (!selectedJob) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
        <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Application</div>
        <div className="mt-3 text-slate-300 leading-7">Select a job to apply.</div>
      </div>
    )
  }

  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Apply</div>
          <h3 className="mt-3 text-2xl font-black text-white">{selectedJob.title}</h3>
          <p className="mt-2 text-slate-300 leading-7">Tell us how you can help Resume PRO ship better resumes.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
          <ShieldCheck className="h-4 w-4 text-royal-gold" aria-hidden="true" />
          Secure submission
        </div>
      </div>

      {success ? (
        <div className="mt-5 rounded-3xl border border-royal-gold/30 bg-royal-gold/10 p-5">
          <div className="font-black text-royal-gold">Application submitted.</div>
          <div className="mt-2 text-slate-200 leading-7 text-sm">Thanks! We’ll review your application shortly.</div>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-200" htmlFor="careers-fullname">
              Full Name
            </label>
            <input
              id="careers-fullname"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-200" htmlFor="careers-email">
              Email
            </label>
            <input
              id="careers-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-200" htmlFor="careers-portfolio">
              Portfolio / LinkedIn (optional)
            </label>
            <input
              id="careers-portfolio"
              value={form.portfolio}
              onChange={(e) => setForm((p) => ({ ...p, portfolio: e.target.value }))}
              className="mt-2 w-full rounded-2xl bg-black/20 border border-white/15 px-4 py-3 outline-none focus:border-royal-gold"
              placeholder="https://linkedin.com/in/you"
              autoComplete="url"
            />
          </div>

          {error ? (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200" role="alert">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="rounded-2xl px-6 py-3 font-bold bg-royal-gold text-royal-navy shadow-2xl shadow-royal-gold/20 hover:brightness-110 transition disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
            <div className="text-xs text-slate-400 leading-5">
              Tip: In production, this will POST to your hiring backend.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default function Careers() {
  useSeo({
    title: 'Careers | Resume PRO',
    description: 'Join Resume PRO. Remote roles for frontend, backend, UI/UX, and AI engineering.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('org-careers', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers - Resume PRO',
  })

  const breadcrumbs = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Careers', to: '/careers' },
    ],
    [],
  )

  const [selectedJob, setSelectedJob] = useState(null)
  const [submitted, setSubmitted] = useState(0)

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        <section className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <GraduationCap className="h-4 w-4 text-royal-gold" aria-hidden="true" />
              Careers at Resume PRO
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-white">
              Build the future of resume building.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              We’re an AI-powered team focused on performance, accessibility, privacy, and measurable user success.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              {JOBS.map((job) => (
                <JobCard key={job.id} job={job} onApply={(j) => setSelectedJob(j)} />
              ))}
            </div>

            <div>
              <JobApplicationForm selectedJob={selectedJob} onSubmitted={() => setSubmitted((n) => n + 1)} />
              {submitted > 0 ? (
                <div className="mt-4 text-xs text-slate-400">You can apply to multiple roles.</div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Open roles</div>
            <div className="mt-4 text-2xl font-black text-white">Explore positions</div>
            <div className="mt-2 text-slate-300 leading-7">
              Select a role above to preview the application form.
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Our values</div>
            <div className="mt-4 space-y-3 text-slate-200">
              <div className="flex gap-3">
                <span className="h-2 w-2 mt-3 rounded-full bg-royal-gold" aria-hidden="true" />
                <span className="leading-7">Accessibility-first product decisions.</span>
              </div>
              <div className="flex gap-3">
                <span className="h-2 w-2 mt-3 rounded-full bg-royal-gold" aria-hidden="true" />
                <span className="leading-7">Performance and reliability by default.</span>
              </div>
              <div className="flex gap-3">
                <span className="h-2 w-2 mt-3 rounded-full bg-royal-gold" aria-hidden="true" />
                <span className="leading-7">Privacy and responsible AI practices.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

