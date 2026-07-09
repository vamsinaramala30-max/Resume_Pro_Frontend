import { useState, useEffect } from 'react'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { TEMPLATE_LIST, TEMPLATE_SAMPLES } from '../lib/templateSamples.js'
import { readJSON, STORAGE_KEYS } from '../lib/storage.js'
import { isPremiumUser as hasPremiumAccess } from '../lib/premium.js'
import { Sparkles, Layout, ShieldCheck, Zap, Star } from 'lucide-react'

// Beautiful mockup image mappings for templates
const MOCKUP_IMAGES = {
  ats: 'https://images.unsplash.com/photo-1616628188506-4ad99d65640e?q=80&w=800&auto=format&fit=crop',
  corporate: 'https://images.unsplash.com/photo-1616628188467-8fb29f49bbe8?q=80&w=800&auto=format&fit=crop',
  minimal: 'https://images.unsplash.com/photo-1616628188550-e0741b4f6e10?q=80&w=800&auto=format&fit=crop',
  modern: 'https://images.unsplash.com/photo-1616628188523-28f09072db46?q=80&w=800&auto=format&fit=crop',
  royal: 'https://images.unsplash.com/photo-1616628188556-9ef02bc05168?q=80&w=800&auto=format&fit=crop',
  luxury: 'https://images.unsplash.com/photo-1616628188478-43d99d3e8e19?q=80&w=800&auto=format&fit=crop',
  creative: 'https://images.unsplash.com/photo-1616628188506-4ad99d65640e?q=80&w=800&auto=format&fit=crop',
  executive: 'https://images.unsplash.com/photo-1616628188467-8fb29f49bbe8?q=80&w=800&auto=format&fit=crop',
  sleek: 'https://images.unsplash.com/photo-1616628188550-e0741b4f6e10?q=80&w=800&auto=format&fit=crop',
}

const DEFAULT_MOCKUP = 'https://images.unsplash.com/photo-1616628188506-4ad99d65640e?q=80&w=800&auto=format&fit=crop'

export default function Templates() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, free, premium

  useSeo({
    title: 'Resume Templates | Resume PRO',
    description: 'Explore Resume PRO templates built for ATS-friendly parsing and premium typography.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('templates-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resume PRO templates',
  })

  // Simulated loading effect for premium user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [filter])

  // Check auth & premium status
  const auth = readJSON(STORAGE_KEYS.auth, null)
  const isPremium = hasPremiumAccess(auth?.user)

  const templatesToShow = TEMPLATE_LIST.filter((t) => {
    if (filter === 'free') return !t.premium
    if (filter === 'premium') return t.premium
    return true
  })

  const handleUseTemplate = (templateId, premium) => {
    if (premium && !isPremium) {
      navigate('/select', { state: { upgrade: true } })
    } else {
      navigate('/resume-builder', { state: { templateId } })
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto w-full max-w-none">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="text-primary font-black text-sm uppercase tracking-[0.25em] flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Templates Explorer
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
              Luxury templates, <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">ATS-safe</span> structure
            </h1>
            <p className="text-muted-foreground text-base max-w-3xl leading-relaxed">
              Pick a style and build instantly. Every layout is mathematically tuned for parsing algorithms and executive aesthetic requirements.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center bg-surface-elevated p-1.5 rounded-2xl border border-border w-fit">
            <button
              onClick={() => { setLoading(true); setFilter('all'); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setLoading(true); setFilter('free'); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                filter === 'free'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => { setLoading(true); setFilter('premium'); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                filter === 'premium'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              <CrownIcon className="h-3.5 w-3.5" />
              Premium
            </button>
          </div>
        </div>

        {/* Grid Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading-skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="rounded-3xl border border-border bg-card shadow-card p-5 space-y-4 animate-pulse">
                  <div className="h-48 rounded-2xl bg-surface-elevated" />
                  <div className="h-4 w-2/3 rounded bg-surface-elevated" />
                  <div className="h-3 w-full rounded bg-surface-elevated" />
                  <div className="h-10 rounded-xl bg-surface-elevated" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="templates-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {templatesToShow.map((t, idx) => {
                const sample = TEMPLATE_SAMPLES[t.id] || {}
                const mockupUrl = MOCKUP_IMAGES[t.id] || DEFAULT_MOCKUP
                const isLocked = t.premium && !isPremium

                return (
                  <motion.section
                    key={t.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.02 }}
                    className="group relative flex flex-col rounded-3xl border border-border bg-card shadow-card p-5 hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Badge */}
                    <div className="absolute top-8 right-8 z-10">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                          t.premium
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {t.premium ? 'Premium' : 'Free'}
                      </span>
                    </div>

                    {/* Preview Image Container */}
                    <div className="relative aspect-[4/3] rounded-2xl border border-border bg-surface-elevated overflow-hidden mb-5">
                      <img
                        src={mockupUrl}
                        alt={`${t.label} Mockup Preview`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = DEFAULT_MOCKUP
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />

                      {isLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-2">
                            <Star className="h-6 w-6 fill-primary/20" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-primary">Locked</span>
                          <span className="text-[10px] text-white/70 mt-1">Upgrade to Premium</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-base font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-[0.05em]">
                          {t.label}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {t.tagline || sample.tagline || 'ATS-friendly resume structure with modern styling features.'}
                        </p>
                      </div>

                      <button
                        onClick={() => handleUseTemplate(t.id, t.premium)}
                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          isLocked
                            ? 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20'
                            : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20'
                        }`}
                      >
                        {isLocked ? (
                          <>
                            <Zap className="h-3.5 w-3.5" />
                            Unlock with Premium
                          </>
                        ) : (
                          <>Use Template</>
                        )}
                      </button>
                    </div>
                  </motion.section>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CrownIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  )
}
