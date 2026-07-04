import { useState, useMemo } from 'react'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X, Sparkles, Crown, Users, Building2, ArrowRight, Star, Quote } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    price: 0,
    yearlyPrice: 0,
    desc: 'Perfect to get started with resume building.',
    features: [
      'Basic resume builder',
      '3 Templates',
      'Instant preview',
      'PDF export (1/month)',
      'ATS structure checklist',
    ],
    cta: { label: 'Start Free', to: '/auth' },
    icon: Sparkles,
  },
  {
    name: 'Premium',
    price: 14,
    yearlyPrice: 134,
    desc: 'Everything you need for your career.',
    highlight: true,
    popular: true,
    features: [
      'All templates (50+)',
      'Unlimited PDF exports',
      'AI-powered suggestions',
      'Resume analytics',
      'Cover letter builder',
      'Priority support',
      'Advanced ATS optimization',
    ],
    cta: { label: 'Go Premium', to: '/select?plan=premium' },
    icon: Crown,
  },
  {
    name: 'Team',
    price: 39,
    yearlyPrice: 374,
    desc: 'For agencies and career teams.',
    features: [
      '5 Team seats',
      'Team analytics',
      'Custom templates',
      'Centralized billing',
      'API access',
      'Dedicated account manager',
      'White-label options',
    ],
    cta: { label: 'Contact Sales', to: '/contact' },
    icon: Users,
  },
]

const FAQS = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
  },
  {
    q: 'Is there a free trial for Premium?',
    a: 'Yes! New users get a 7-day free trial to explore all Premium features before committing.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, debit cards, and UPI payments through our secure payment processor.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    quote: 'Resume PRO helped me land my dream job. The ATS optimization is incredible!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Meta',
    quote: 'The templates are professional and the AI suggestions are spot-on.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer at Apple',
    quote: 'Finally, a resume builder that understands design and functionality.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
]

// Floating particles component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-royal-gold/10 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-[-10%] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-10%] left-1/4 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
          className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-royal-gold/40"
          style={{ left: `${10 + i * 12}%` }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  )
}

// Pricing toggle component
function PricingToggle({ isYearly, onToggle }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className={`text-sm font-medium transition ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative h-7 w-14 rounded-full bg-white/10 p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold"
        role="switch"
        aria-checked={isYearly}
        aria-label="Toggle yearly pricing"
      >
        <motion.div
          className="absolute h-5 w-5 rounded-full bg-royal-gold shadow-lg"
          animate={{ left: isYearly ? '28px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`text-sm font-medium transition ${isYearly ? 'text-white' : 'text-slate-400'}`}>
        Yearly
        <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
          Save 20%
        </span>
      </span>
    </div>
  )
}

// Pricing card component
function PricingCard({ plan, isYearly, index }) {
  const Icon = plan.icon
  const price = isYearly ? plan.yearlyPrice : plan.price
  const period = isYearly ? '/year' : '/month'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-3xl border p-6 transition-all hover:scale-[1.02] ${
        plan.highlight
          ? 'border-royal-gold/40 bg-gradient-to-b from-royal-gold/10 to-transparent shadow-2xl shadow-royal-gold/20'
          : 'border-white/10 bg-slate-900/40 hover:border-white/20'
      }`}
    >
      {/* Glow effect for popular plan */}
      {plan.popular && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-royal-gold px-4 py-1 text-sm font-bold text-slate-900">
            <Crown className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            plan.highlight ? 'bg-royal-gold text-slate-900' : 'bg-white/10 text-royal-gold'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-white">{plan.name}</h3>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-black text-white">
            ${price === 0 ? 'Free' : price}
          </span>
          {price > 0 && <span className="text-slate-400">{period}</span>}
        </div>

        <p className="mt-3 text-slate-300">{plan.desc}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-slate-200">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
              plan.highlight ? 'bg-royal-gold text-slate-900' : 'bg-white/10 text-royal-gold'
            }`}>
              <Check className="h-3 w-3" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={plan.cta.to}
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
          plan.highlight
            ? 'bg-royal-gold text-slate-950 hover:brightness-110 hover:shadow-lg hover:shadow-royal-gold/30'
            : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        {plan.cta.label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

// FAQ accordion component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-black text-white">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex w-full items-center justify-between p-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-white">{faq.q}</span>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-transform ${
                openIndex === i ? 'rotate-180' : ''
              }`}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-slate-300">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

// Testimonials component
function TestimonialsSection() {
  return (
    <section>
      <h2 className="mb-8 text-center text-3xl font-black text-white">Loved by Professionals</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <Quote className="h-8 w-8 text-royal-gold/30" />
            <p className="mt-4 text-slate-200">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="font-medium text-white">{t.name}</div>
                <div className="text-sm text-slate-400">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// CTA Section component
function CTASection() {
  return (
    <section className="relative rounded-3xl border border-royal-gold/30 bg-gradient-to-b from-royal-gold/10 to-transparent p-12 text-center">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.2),transparent_70%)]" />
      <div className="relative">
        <h2 className="text-3xl font-black text-white">Ready to stand out?</h2>
        <p className="mt-4 text-slate-300">Join thousands of professionals who landed their dream jobs.</p>
        <Link
          to="/select?plan=premium"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-royal-gold px-8 py-4 text-lg font-bold text-slate-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-royal-gold/30"
        >
          Start Free Trial
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

export default function Plans() {
  const [isYearly, setIsYearly] = useState(false)

  useSeo({
    title: 'Plans & Pricing | Resume PRO',
    description: 'Choose the perfect plan for your career. Start free or upgrade to Premium for unlimited exports and AI-powered resume building.',
    canonicalUrl: window.location?.href,
    openGraph: {
      title: 'Plans & Pricing | Resume PRO',
      description: 'Choose the perfect plan for your career.',
      type: 'website',
    },
    twitter: {
      title: 'Plans & Pricing | Resume PRO',
      description: 'Choose the perfect plan for your career.',
      card: 'summary_large_image',
    },
  })

  injectJsonLd('plans-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Resume PRO',
    description: 'AI-powered resume builder with ATS-friendly templates and exports.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '39',
      priceCurrency: 'USD',
    },
  })

  return (
    <div className="relative min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <AnimatedBackground />

      <div className="relative mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-royal-gold"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Pricing Plans
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Choose your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold via-yellow-300 to-royal-gold">
              perfect
            </span>{' '}
            plan
          </h1>
          <p className="mx-auto max-w-2xl text-slate-300">
            Start free, then upgrade to unlock premium templates, AI-powered suggestions, and unlimited exports.
          </p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="mt-10">
          <PricingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} isYearly={isYearly} index={i} />
          ))}
        </div>

        {/* Feature Comparison could go here */}

        {/* Testimonials */}
        <div className="mt-24">
          <TestimonialsSection />
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <FAQSection />
        </div>

        {/* CTA */}
        <div className="mt-24">
          <CTASection />
        </div>
      </div>
    </div>
  )
}