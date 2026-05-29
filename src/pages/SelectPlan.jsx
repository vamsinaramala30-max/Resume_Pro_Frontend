import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Sparkles, BadgeCheck, Zap, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { cn } from '../components/ui/Button'

function PlanCard({ title, subtitle, badge, glow, onClick, icon, features }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className={cn("h-full flex flex-col relative overflow-hidden transition-all duration-300", glow ? "border-primary/40 shadow-elevation-3" : "border-border hover:border-primary/20 shadow-elevation-2")}>
        {glow && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
        )}

        <CardHeader className="pb-4 relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl", glow ? "bg-primary/20 text-primary" : "bg-surface-elevated text-foreground")}>
                {icon}
              </span>
              <span className="text-xs uppercase tracking-widest font-bold text-foreground/60">{badge}</span>
            </div>
            {glow ? <Zap className="h-6 w-6 text-primary" /> : <ShieldCheck className="h-6 w-6 text-foreground/40" />}
          </div>
          <h2 className="text-h3 font-black text-foreground">{title}</h2>
          <p className="text-body text-foreground/70">{subtitle}</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col relative z-10 pt-2 space-y-6">
          <div className="space-y-3 flex-1">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                <BadgeCheck className={cn("h-5 w-5 shrink-0", glow ? "text-primary" : "text-foreground/40")} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border mt-auto flex flex-col sm:flex-row items-center gap-4">
            <Button onClick={onClick} className="w-full sm:w-auto" variant={glow ? "default" : "secondary"}>
              Select {badge}
            </Button>
            <span className="text-xs uppercase tracking-widest text-foreground/50 font-medium">
              {glow ? 'AI + luxury' : 'Solid resume workflow'}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function SelectPlan() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col relative z-10 w-full">
      <div className="space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-surface/50 border-border p-8 lg:p-12">
            <div className="inline-flex items-center gap-3 rounded-full bg-surface-elevated border border-border px-4 py-2 text-sm text-foreground mb-8">
              <Crown className="h-4 w-4 text-primary" /> Pick the workflow that fits your career.
            </div>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <h1 className="text-h2 font-black tracking-tight text-foreground">Choose your resume experience.</h1>
                <p className="mt-4 max-w-xl text-body-large text-foreground/70">
                  From fast form-based creation to premium AI-guided resume design, select the plan that brings your story to life.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-elevated/50 p-6 border border-border">
                <div className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Why choose</div>
                <div className="space-y-3 text-sm text-foreground/80 font-medium">
                  <p className="flex gap-2"><span>⟶</span> Speed through setup with structured flow.</p>
                  <p className="flex gap-2"><span>⟶</span> Unlock richer formats and premium visuals.</p>
                  <p className="flex gap-2"><span>⟶</span> Keep your workflow production-ready.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <PlanCard
            title="Normal Resume"
            subtitle="Clean templates, fast form workflow, and export-ready preview for every job application."
            badge="Standard"
            glow={false}
            icon={<Sparkles className="h-6 w-6" />}
            features={['3-step builder flow', 'Trusted ATS-friendly structure', 'PDF + print export', 'Responsive resume previews']}
            onClick={() => navigate('/normal')}
          />
          <PlanCard
            title="Premium Resume"
            subtitle="Luxury design system with AI suggestions, fast customization, and exclusive templates."
            badge="Premium"
            glow
            icon={<Crown className="h-6 w-6" />}
            features={['AI writing assistance', 'Premium visual templates', 'Keyword optimization', 'Advanced export options']}
            onClick={() => navigate('/premium')}
          />
        </motion.div>
      </div>
    </div>
  )
}
