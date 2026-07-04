import { motion } from 'framer-motion'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { Users, ShieldCheck, Sparkles, FileText, LineChart } from 'lucide-react'

export default function About() {
  useSeo({
    title: 'About Resume PRO | AI Resume Builder',
    description:
      'Resume PRO is an AI-powered resume builder helping professionals create ATS-friendly resumes, cover letters, and career documents.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('org-about', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Resume PRO',
    url: window.location?.href,
    sameAs: ['https://www.linkedin.com', 'https://github.com', 'https://twitter.com'],
  })

  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }]

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />

        <section className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-royal-gold/20 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-royal-gold/20 text-royal-gold">✨</span>
              AI-powered resume building, made production-ready.
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-white">
              Resume PRO helps you create documents that get noticed.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Resume PRO is an AI-powered resume builder helping professionals create ATS-friendly resumes, cover letters, and career documents.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Sparkles, title: 'ATS Optimization', desc: 'Format and keyword guidance designed for parsing.' },
                { icon: LineChart, title: 'Resume Analytics', desc: 'Get clarity on what’s strong and what’s missing.' },
                { icon: FileText, title: 'PDF Export', desc: 'Export polished documents with confidence.' },
              ].map((f) => (
                <motion.div key={f.title} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <f.icon className="h-7 w-7 text-royal-gold" />
                  <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-slate-300 leading-7 text-sm">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Mission</div>
            <h2 className="mt-3 text-3xl font-black text-white">Help job seekers create professional resumes.</h2>
            <p className="mt-4 text-slate-300 leading-8">
              Help job seekers create professional resumes that improve interview success rates.
            </p>

            <div className="mt-8 flex items-center gap-3 text-slate-200">
              <ShieldCheck className="h-5 w-5 text-royal-gold" />
              Privacy-first document handling.
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Vision</div>
            <h2 className="mt-3 text-3xl font-black text-white">Become trusted globally.</h2>
            <p className="mt-4 text-slate-300 leading-8">
              Become the most trusted resume-building platform globally.
            </p>

            <div className="mt-8 flex items-center gap-3 text-slate-200">
              <Users className="h-5 w-5 text-royal-gold" />
              Built for real careers.
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Core Features</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'ATS Optimization',
              'AI Suggestions',
              'Resume Templates',
              'Cover Letter Builder',
              'PDF Export',
              'Resume Analytics',
            ].map((t) => (
              <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-200">
                <div className="text-sm uppercase tracking-[0.28em] text-royal-gold">✓</div>
                <div className="mt-3 font-bold text-white">{t}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Timeline</div>
            <div className="mt-6 space-y-4">
              {[
                { year: '2024', text: 'Modern ATS-first workflow and premium templates.' },
                { year: '2025', text: 'AI suggestions for keywords, summaries, and impact bullets.' },
                { year: '2026', text: 'Analytics insights + scalable resume export and document tooling.' },
              ].map((item) => (
                <div key={item.year} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">{item.year}</div>
                  <div className="mt-2 font-bold text-white">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Statistics</div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { value: '10K+', label: 'resumes created' },
                { value: '98%', label: 'client success rate' },
                { value: '3.8s', label: 'average build time' },
                { value: '100%', label: 'template export readability' },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Company Values</div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Innovation', 'Privacy', 'Accessibility', 'Transparency', 'User Success'].map((v) => (
                <div key={v} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-lg font-bold text-white">{v}</div>
                  <div className="mt-2 text-sm text-slate-300 leading-7">
                    Built into every interaction so your career journey stays simple and secure.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.35em] text-royal-gold font-black">Team</div>
            <h2 className="mt-3 text-3xl font-black text-white">Team placeholder</h2>
            <p className="mt-4 text-slate-300 leading-8">
              Add your leadership and hiring team here. This section is intentionally a placeholder for your production content.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Alex', 'Taylor', 'Jordan', 'Morgan'].map((name) => (
                <div key={name} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-white/10" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-white">{name} (Placeholder)</div>
                      <div className="text-sm text-slate-400">Role</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

