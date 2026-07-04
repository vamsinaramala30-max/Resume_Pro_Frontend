import { useSeo, injectJsonLd } from '../lib/seo.js'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TEMPLATES = [
  { name: 'Executive Hierarchy Canvas', color: 'bg-royal-gold/20', tag: 'Premium' },
  { name: 'Modern Systems Ledger', color: 'bg-sky-400/20', tag: 'Popular' },
  { name: 'Minimal Parser Baseline', color: 'bg-purple-400/20', tag: 'ATS-ready' },
  { name: 'Deep Research Appendix', color: 'bg-emerald-400/20', tag: 'Advanced' },
]

export default function Templates() {
  useSeo({
    title: 'Templates | Resume PRO',
    description: 'Explore Resume PRO templates built for ATS-friendly parsing and premium typography.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('templates-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resume PRO templates',
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-3">
          <div className="text-royal-gold font-black text-sm uppercase tracking-[0.25em]">Templates</div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Luxury templates, ATS-safe structure</h1>
          <p className="text-slate-300 max-w-2xl">Pick a template and start building instantly—everything stays clean for parsing and export.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((t, idx) => (
            <motion.section
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.02 }}
              className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-sm font-black text-white">{t.name}</h2>
                <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${t.color} text-white`}>{t.tag}</span>
              </div>
              <div className="mt-4 h-32 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10" aria-hidden="true" />
              <Link
                to="/normal"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-royal-gold px-4 py-3 text-sm font-black text-slate-950 hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Use template
              </Link>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}

