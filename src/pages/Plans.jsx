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

// Animated background — theme-aware opacity
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/8 dark:bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-[-10%] h-80 w-80 rounded-full bg-sky-500/6 dark:bg-sky-500/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-10%] left-1/4 h-64 w-64 rounded-full bg-violet-500/6 dark:bg-violet-500/10 blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-primary/30 dark:bg-primary/40"
          style={{ left: `${10 + i * 12}%` }}
        />
      ))}
    </div>
  )
}

// Pricing toggle
function PricingToggle({ isYearly, onToggle }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span>Monthly</span>

      <button
        onClick={onToggle}
        className="relative flex h-7 w-14 items-center rounded-full bg-gray-300 p-1"
      >
        <motion.div
          className="h-5 w-5 rounded-full bg-yellow-500"
          animate={{
            x: isYearly ? 28 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>

      <span>Yearly</span>
    </div>
  );
}

// Pricing card
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
      className={`relative rounded-3xl border p-6 transition-all hover:scale-[1.02] ${plan.highlight
          ? 'border-primary/40 bg-gradient-to-b from-primary/8 dark:from-primary/10 to-transparent shadow-elevation-3'
          : 'border-border bg-card shadow-card hover:shadow-card-hover hover:border-border-muted'
        }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
            <Crown className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.highlight ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-primary'
            }`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-black text-foreground">
            ${price === 0 ? 'Free' : price}
          </span>
          {price > 0 && <span className="text-muted-foreground">{period}</span>}
        </div>

        <p className="mt-3 text-muted-foreground">{plan.desc}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 ${plan.highlight ? 'bg-primary text-primary-foreground' : 'bg-surface-elevated text-primary'
              }`}>
              <Check className="h-3 w-3" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={plan.cta.to}
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 ${plan.highlight
            ? 'bg-primary text-primary-foreground hover:brightness-110 hover:shadow-lg hover:shadow-primary/30'
            : 'border border-border bg-surface-elevated text-foreground hover:bg-surface-hover hover:border-primary/30'
          }`}
      >
        {plan.cta.label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

// FAQ accordion
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-black text-foreground">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex w-full items-center justify-between p-5 text-left hover:bg-surface-elevated transition"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-surface-elevated border border-border text-muted-foreground transition-transform ${openIndex === i ? 'rotate-180' : ''
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
                  <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

// Testimonials
function TestimonialsSection() {
  return (
    <section>
      <h2 className="mb-8 text-center text-3xl font-black text-foreground">Loved by Professionals</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card shadow-card p-6"
          >
            <Quote className="h-8 w-8 text-primary/30" />
            <p className="mt-4 text-foreground/80">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-border"
                loading="lazy"
              />
              <div>
                <div className="font-medium text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="relative rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/8 dark:from-primary/10 to-transparent p-12 text-center overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15),transparent_70%)]" />
      <div className="relative">
        <h2 className="text-3xl font-black text-foreground">Ready to stand out?</h2>
        <p className="mt-4 text-muted-foreground">Join thousands of professionals who landed their dream jobs.</p>
        <Link
          to="/select?plan=premium"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/30"
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
            className="inline-flex rounded-full bg-surface-elevated border border-border px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Pricing Plans
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Choose your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">
              perfect
            </span>{' '}
            plan
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
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