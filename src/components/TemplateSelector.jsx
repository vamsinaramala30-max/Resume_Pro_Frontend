import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TEMPLATE_LIST, TEMPLATE_SAMPLES, FREE_TEMPLATES, PREMIUM_TEMPLATES } from '../lib/templateSamples.js';
import { readJSON, STORAGE_KEYS } from '../lib/storage.js';
import { isPremiumUser as hasPremiumAccess } from '../lib/premium.js';

function Thumbnail({ sample, locked }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/90 shadow-sm ${locked ? 'blur-sm' : ''}`}>
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
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
          <div className="flex flex-col items-center gap-2">
            <svg className="h-8 w-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm-8 10h16v8H4v-8z"/>
            </svg>
            <span className="text-xs font-bold text-amber-400">LOCKED</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TemplateSelector({ template, setTemplate }) {
  const navigate = useNavigate();
  
  // Check user subscription status
  const auth = readJSON(STORAGE_KEYS.auth, null);
  const isPremium = hasPremiumAccess(auth?.user);

  const handleTemplateClick = (t) => {
    const sample = TEMPLATE_SAMPLES[t.id];
    
    // If template is premium and user is not premium, redirect to pricing
    if (sample?.premium && !isPremium) {
      navigate('/select', { state: { upgrade: true } });
      return;
    }
    
    setTemplate(t.id);
  };

  // Filter templates based on user subscription
  const availableTemplates = isPremium ? TEMPLATE_LIST : FREE_TEMPLATES.map(t => ({
    id: t.id,
    label: t.label,
    tagline: t.tagline,
    accent: t.accent,
    premium: t.premium
  }));

  return (
    <div className="space-y-6">
      {/* Free Templates Section */}
      {!isPremium && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Free Templates</span>
            <span className="h-px flex-1 bg-white/10"/>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {FREE_TEMPLATES.map((t) => {
              const sample = TEMPLATE_SAMPLES[t.id];
              const isActive = template === t.id;

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
                  <Thumbnail sample={sample} locked={false} />
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
              );
            })}
          </div>
        </div>
      )}

      {/* Premium Templates Section - Locked for free users */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${isPremium ? 'text-amber-400' : 'text-slate-400'}`}>
            {isPremium ? 'Premium Templates' : 'Premium Templates (Upgrade to Unlock)'}
          </span>
          <span className="h-px flex-1 bg-white/10"/>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {PREMIUM_TEMPLATES.map((t) => {
            const sample = TEMPLATE_SAMPLES[t.id];
            const isActive = template === t.id;
            const isLocked = !isPremium;

            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => handleTemplateClick(t)}
                whileHover={isPremium ? { y: -3 } : {}}
                whileTap={isPremium ? { scale: 0.98 } : {}}
                className={
                  'group relative flex flex-col rounded-[1.75rem] border p-4 text-left transition-all duration-300 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/50 ' +
                  (isActive
                    ? 'border-royal-gold/70 bg-royal-gold/10 shadow-2xl'
                    : isLocked
                    ? 'border-amber-500/30 bg-white/5 cursor-not-allowed opacity-60'
                    : 'border-white/10 bg-white/5 hover:border-royal-gold/40 hover:bg-slate-950/80 hover:shadow-xl')
                }
                aria-pressed={isActive}
                aria-label={isLocked ? `Premium template - Upgrade to unlock` : `Select ${t.label} template`}
              >
                <Thumbnail sample={sample} locked={isLocked} />
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
                  ) : isLocked ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-400">
                      Upgrade to Unlock
                    </div>
                  ) : null}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
