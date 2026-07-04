import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Crown,
  Sparkles,
  BadgeCheck,
  Zap,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Check,
  Dot,
} from 'lucide-react'

import { apiPaymentCreateOrder, apiPaymentVerify } from '../../lib/apiPayment.js'
import { useAuth } from '../../lib/authStore.js'
import { useToasts } from '../../lib/toastStore.js'

function PlanCard({ plan, active, price, suffix, onPick, glow }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onPick}
      className={
        'relative w-full text-left rounded-3xl border p-5 overflow-hidden transition ' +
        (active
          ? 'border-royal-gold/60 bg-white/5'
          : 'border-white/15 bg-black/10 hover:border-royal-gold/30')
      }
      style={{ boxShadow: glow && active ? '0 0 0 1px rgba(197,160,89,.25), 0 0 40px rgba(197,160,89,.18)' : undefined }}
      aria-pressed={active}
    >
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 20% 10%, rgba(197,160,89,0.35) 0%, rgba(197,160,89,0) 45%), radial-gradient(circle at 90% 60%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 55%)',
          }}
        />
      ) : null}

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {plan.badge ? (
                <span className="inline-flex items-center rounded-full bg-royal-gold/15 border border-royal-gold/30 px-3 py-1 text-xs font-black text-royal-gold">
                  {plan.badge}
                </span>
              ) : null}
            </div>
            <div className="mt-3 text-xl font-black text-white">{plan.title}</div>
            <div className="mt-1 text-xs text-slate-200/70">{plan.subtitle}</div>
          </div>

          {active ? (
            <div className="text-royal-gold font-black flex items-center gap-2 text-sm">
              <Check className="w-4 h-4" /> Selected
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <div className="text-4xl font-black text-white">{price}</div>
          <div className="text-sm text-slate-200/70">{suffix}</div>
        </div>

        <div className="mt-5 space-y-2">
          {plan.includes.map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-100/90">
              <BadgeCheck className={active || glow ? 'w-4 h-4 text-royal-gold' : 'w-4 h-4 text-slate-300'} />
              {x}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-bold">
          <span className={active ? 'text-royal-gold' : 'text-white/90'}>Choose plan</span>
          <ArrowRight className={active ? 'w-4 h-4 text-royal-gold' : 'w-4 h-4 text-slate-200/70'} />
        </div>
      </div>
    </motion.button>
  )
}

export default function PremiumUpgradeModal({ open, onClose }) {
  const { user, token } = useAuth()
  const { addToast } = useToasts()

  const [billing, setBilling] = useState('yearly') // yearly | monthly
  const [planKey, setPlanKey] = useState('pro_year')
  const [provider, setProvider] = useState('stripe')
  const [busy, setBusy] = useState(false)

  const plans = useMemo(() => {
    const isYear = billing === 'yearly'
    return {
      free: {
        title: 'Free',
        subtitle: 'Start building with clean templates',
        badge: null,
        price: '$0',
        suffix: 'forever',
        includes: ['Basic editor + preview', 'Standard export with watermark', 'Limited templates'],
      },
      pro_month: {
        title: 'Pro Monthly',
        subtitle: 'For active job hunting',
        badge: 'Most popular',
        price: '$19',
        suffix: '/ month',
        includes: [
          'No watermark PDF export',
          'AI resume generator',
          'ATS optimization + scoring',
        ],
      },
      pro_year: {
        title: 'Pro Yearly',
        subtitle: 'Best value for serious applicants',
        badge: isYear ? 'Best value' : null,
        price: '$149',
        suffix: '/ year',
        includes: ['No watermark PDF export', 'AI resume generator', 'Unlimited templates', 'Advanced themes'],
      },
      enterprise: {
        title: 'Enterprise',
        subtitle: 'Teams, recruiters, and career services',
        badge: 'Scale',
        price: '$499',
        suffix: '/ year',
        includes: ['Multi-user billing', 'Advanced analytics', 'Priority support', 'Custom themes'],
      },
    }
  }, [billing])

  const features = useMemo(
    () => [
      'No Watermark PDF Export',
      'AI Resume Generator',
      'ATS Resume Optimization',
      'Unlimited Resume Templates',
      'Cover Letter Generator',
      'Smart AI Suggestions',
      'Resume Analytics',
      'Multi-language Support',
      'Real-time Preview',
      'Advanced Themes',
    ],
    []
  )

  const selectedPlan = planKey === 'pro_month' ? plans.pro_month : planKey === 'pro_year' ? plans.pro_year : planKey === 'enterprise' ? plans.enterprise : plans.free

  const paymentProviders = [
    { key: 'stripe', title: 'Stripe', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'razorpay', title: 'Razorpay', icon: <Zap className="w-4 h-4" /> },
    { key: 'paypal', title: 'PayPal', icon: <ShieldCheck className="w-4 h-4" /> },
  ]

  const startCheckout = async () => {
    if (!token) {
      addToast('error', 'Login required', 'Please login to upgrade your plan.')
      return
    }

    setBusy(true)
    try {
      // UI-first: real integration can be wired to backend payment routes later.
      // We keep a realistic request flow shape.
      const amount = planKey.startsWith('pro_year') ? 14900 : planKey.startsWith('pro_month') ? 1900 : planKey === 'enterprise' ? 49900 : 0
      if (amount <= 0) {
        addToast('success', 'Plan updated', 'You are already on Free.')
        onClose?.()
        return
      }

      const plan = planKey.startsWith('pro') ? 'PRO' : planKey === 'enterprise' ? 'TEAM' : 'FREE'
      const order = await apiPaymentCreateOrder({ token, plan })
      const verify = await apiPaymentVerify({ token, orderId: order?.orderId, paymentId: order?.paymentId || '', razorpaySignature: order?.razorpaySignature || '', plan })

      if (verify?.ok) {
        addToast('success', 'Premium activated', 'Your subscription is now active. Enjoy premium features!')
        const auth = JSON.parse(localStorage.getItem('royalAuth') || 'null')
        if (auth?.token) {
          const updatedAuth = { ...auth, user: { ...auth.user, plan: 'PRO', subscriptionStatus: 'active' } }
          localStorage.setItem('royalAuth', JSON.stringify(updatedAuth))
          window.dispatchEvent(new Event('royal-auth-updated'))
        }
        onClose?.()
      } else {
        addToast('error', 'Payment failed', verify?.message || 'Please try again')
      }
    } catch (e) {
      addToast('error', 'Payment failed', e?.message || 'Please try again')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-6xl rounded-3xl border border-white/15 bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden"
            initial={{ y: 16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-start justify-between gap-6 px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-royal-gold" />
                </div>
                <div>
                  <div className="text-2xl font-black">Upgrade to Premium</div>
                  <div className="text-xs text-slate-200/70 mt-1">Neon-powered features, ATS-ready exports, and AI improvements.</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 hover:border-royal-gold transition flex items-center justify-center"
                aria-label="Close upgrade modal"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="space-y-5">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-royal-gold" />
                        <div className="font-black text-white">Premium features</div>
                      </div>
                      <div className="text-xs text-slate-200/70 mt-1">Everything you need to craft resumes that get callbacks.</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs font-bold text-slate-200/70">Billing</div>
                      <div className="rounded-full border border-white/15 bg-black/20 p-1 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setBilling('monthly')
                            setPlanKey('pro_month')
                          }}
                          className={
                            'px-3 py-1.5 rounded-full text-xs font-black transition ' +
                            (billing === 'monthly' ? 'bg-royal-gold text-royal-navy' : 'text-slate-200/80 hover:text-white')
                          }
                          aria-pressed={billing === 'monthly'}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBilling('yearly')
                            setPlanKey('pro_year')
                          }}
                          className={
                            'px-3 py-1.5 rounded-full text-xs font-black transition ' +
                            (billing === 'yearly' ? 'bg-royal-gold text-royal-navy' : 'text-slate-200/80 hover:text-white')
                          }
                          aria-pressed={billing === 'yearly'}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-2">
                    {features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-100/90">
                        <span className="mt-0.5">
                          <Dot className="w-3 h-3 text-royal-gold" />
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <PlanCard
                    glow={false}
                    plan={plans.free}
                    active={planKey === 'free'}
                    price={plans.free.price}
                    suffix={plans.free.suffix}
                    onPick={() => setPlanKey('free')}
                  />
                  <PlanCard
                    glow
                    plan={plans.pro_month}
                    active={planKey === 'pro_month'}
                    price={plans.pro_month.price}
                    suffix={plans.pro_month.suffix}
                    onPick={() => setPlanKey('pro_month')}
                  />
                  <PlanCard
                    glow
                    plan={plans.pro_year}
                    active={planKey === 'pro_year'}
                    price={plans.pro_year.price}
                    suffix={plans.pro_year.suffix}
                    onPick={() => setPlanKey('pro_year')}
                  />
                  <PlanCard
                    glow={false}
                    plan={plans.enterprise}
                    active={planKey === 'enterprise'}
                    price={plans.enterprise.price}
                    suffix={plans.enterprise.suffix}
                    onPick={() => setPlanKey('enterprise')}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-black text-white">Payment</div>
                      <div className="text-xs text-slate-200/70 mt-1">Select provider. Real checkout can be wired later.</div>
                    </div>
                    <div className="text-xs font-black text-royal-gold">Secure</div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {paymentProviders.map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setProvider(p.key)}
                        className={
                          'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition ' +
                          (provider === p.key ? 'border-royal-gold/60 bg-black/20' : 'border-white/10 bg-black/10 hover:border-royal-gold/30')
                        }
                        aria-pressed={provider === p.key}
                      >
                        <span className="flex items-center gap-3">
                          <span className={provider === p.key ? 'text-royal-gold' : 'text-slate-200/70'}>{p.icon}</span>
                          <span className="font-bold text-white text-sm">{p.title}</span>
                        </span>
                        <span className="text-xs font-black text-slate-200/70">{provider === p.key ? 'Selected' : 'Choose'}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-slate-200/70">You selected</div>
                    <div className="mt-1 text-white font-black">{selectedPlan.title}</div>
                    <div className="mt-1 text-royal-gold font-black">{selectedPlan.price} {selectedPlan.suffix}</div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-black/15 backdrop-blur-xl p-5">
                  <div className="text-sm font-black text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-royal-gold" /> CTAs
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <motion.button
                      type="button"
                      onClick={startCheckout}
                      disabled={busy}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full rounded-2xl bg-royal-gold text-royal-navy font-black px-5 py-3 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {busy ? 'Processing…' : 'Upgrade Now'}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        addToast('success', 'Free trial started', 'Demo mode: premium will activate after checkout.')
                      }}
                      className="w-full rounded-2xl bg-white/5 border border-white/10 text-white font-bold px-5 py-3 hover:border-royal-gold transition"
                    >
                      Start Free Trial
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        addToast(
                          'info',
                          'Plan comparison',
                          'Free: watermark export & basic editor. Pro: no watermark export, AI + ATS tools. Enterprise: team analytics + priority support.'
                        )
                      }}
                      className="w-full rounded-2xl bg-black/10 border border-white/10 text-white/90 font-bold px-5 py-3 hover:border-royal-gold transition"
                    >
                      Compare Plans
                    </button>

                    <div className="text-xs text-slate-200/70 leading-relaxed">
                      By upgrading, you agree to the Terms and Privacy Policy. This is a UI demo; integrate actual Stripe/Razorpay/PayPal webhooks in backend for production.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

