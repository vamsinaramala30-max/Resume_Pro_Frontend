import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Download, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, cn } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const FEATURES = [
  {
    icon: Crown,
    title: 'Premium Templates',
    desc: 'Luxury resume layouts that look elegant and scan cleanly for ATS.',
  },
  {
    icon: Zap,
    title: 'AI Smart Assist',
    desc: 'Auto-suggestions for skills, summaries, keywords, and job-ready phrasing.',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    desc: 'PDF, DOCX, print-ready pages, and shareable resume snapshots.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Workflow',
    desc: 'Secure forms, polished preview, and fast resume iteration.',
  },
]

const STATS = [
  { value: '10K+', label: 'resumes created', highlight: true },
  { value: '98%', label: 'client success rate' },
  { value: '3.8s', label: 'average build time' },
]

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full relative">
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.02))] pointer-events-none" style={{ backgroundSize: '300% 300%', animation: 'gradient-pan 18s ease infinite' }} />

      <main className="flex-1 relative z-10 w-full">
        <section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-surface/50 px-4 py-2 text-sm text-foreground backdrop-blur-xl shadow-elevation-1">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Zap className="w-4 h-4" />
                </span>
                <span className="font-medium">Build resumes faster with modern AI workflow.</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-h2 sm:text-h1 lg:text-display font-black tracking-tight">
                Create premium resumes with a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400">future-forward workflow</span>.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl text-body-large text-foreground/70">
                Launch your career with polished resume templates, smart content suggestions, and instant preview — all in a modern app experience built for ambitious professionals.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto text-base rounded-full shadow-elevation-3">
                  <Link to="/auth">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass" className="w-full sm:w-auto text-base rounded-full">
                  <Link to="/select">
                    Explore Plans
                  </Link>
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-3 w-full max-w-lg mt-8">
                {STATS.map((stat, i) => (
                  <Card key={i} className={cn("bg-surface/30 border-white/5", stat.highlight && "border-primary/30 bg-primary/5")}>
                    <CardContent className="p-4 text-center">
                      <div className="text-h4 font-black text-foreground">{stat.value}</div>
                      <div className="mt-1 text-caption uppercase tracking-wider text-foreground/60">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>

            {/* Hero Right Visuals */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 lg:-inset-10 -z-10 rounded-full bg-primary/10 blur-[100px]" />
              <Card className="p-6 md:p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow pointer-events-none" />
                <div className="space-y-6">
                  <div className="rounded-2xl bg-surface-elevated border border-border p-5 shadow-elevation-2">
                    <div className="text-caption uppercase tracking-widest text-foreground/50">Resume Snapshot</div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-h5 font-black">Royal Resume</div>
                        <div className="mt-1 text-small text-foreground/60">Modern template, export ready</div>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-caption uppercase tracking-widest text-primary font-bold">Live</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {['Modern layout', 'ATS optimization', 'AI-assisted content', 'Instant export'].map((item) => (
                      <div key={item} className="rounded-xl border border-border bg-surface/50 p-4 text-small text-foreground/80 hover:border-primary/50 transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-surface-elevated p-5">
                    <div className="flex items-center justify-between text-small text-foreground/60">
                      <span>Progress</span>
                      <span className="font-semibold text-foreground">92%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                      <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-[var(--section-spacing-desktop)]">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-foreground/80">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Production-ready workflow</span>
              </div>
              <h2 className="text-h2 sm:text-h1 font-black tracking-tight">Design, build, and ship like a product.</h2>
              <p className="max-w-xl mx-auto lg:mx-0 text-body-large text-foreground/70">
                The new standard for resume builders: accessible UI, smooth motion, responsive layout, and modern interactions built for professionals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, idx) => (
                <motion.div key={feature.title} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-h5 font-bold mb-2">{feature.title}</h3>
                      <p className="text-small text-foreground/70 leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-[var(--section-spacing-desktop)]">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-surface to-surface-elevated border-primary/20">
            <div className="text-caption uppercase tracking-widest text-primary mb-4 font-bold">Ready to upgrade?</div>
            <h3 className="text-h3 md:text-h2 font-black mb-8">Start building your premium resume today.</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-elevation-2">
                <Link to="/auth">Start Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/select">Explore Plans</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
