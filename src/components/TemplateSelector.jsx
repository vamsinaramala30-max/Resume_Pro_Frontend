import { motion } from 'framer-motion'
import { TEMPLATE_LIST, TEMPLATE_SAMPLES } from '../lib/templateSamples.js'

function Thumbnail({ sample }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/90 shadow-sm">
      <div className="h-32 w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: sample.image ? `url(${sample.image})` : `url(${sample.bg})`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-slate-950/75 px-3 py-2 text-xs text-slate-100">
        {sample.tagline}
      </div>
    </div>
  )
}

export default function TemplateSelector({ template, setTemplate }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {TEMPLATE_LIST.map((t) => {
        const sample = TEMPLATE_SAMPLES[t.id]
        const isActive = template === t.id

        return (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => setTemplate(t.id)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={
              'group relative flex flex-col rounded-[1.75rem] border p-4 text-left transition-all duration-300 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/50 ' +
              (isActive
                ? 'border-royal-gold/70 bg-royal-gold/10 shadow-2xl'
                : 'border-white/10 bg-white/5 hover:border-royal-gold/40 hover:bg-slate-950/80 hover:shadow-xl')
            }
            aria-pressed={isActive}
            aria-label={`Select ${t.label} template`}
          >
            <Thumbnail sample={sample} />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-black uppercase tracking-[0.18em] text-white">
                  {t.label}
                </div>
                <span
                  className="h-2 w-16 rounded-full"
                  style={{ backgroundColor: sample.accent }}
                />
              </div>
              <p className="text-sm text-slate-300 leading-snug">{sample.tagline}</p>
              {isActive ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-royal-gold/15 px-3 py-2 text-xs font-semibold text-royal-gold">
                  Selected
                </div>
              ) : null}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}



