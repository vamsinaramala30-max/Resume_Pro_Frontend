import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Youtube, ShieldCheck, CreditCard, Lock, Eye } from 'lucide-react'

const BRAND = {
  name: 'Resume PRO',
  description:
    'Create professional, ATS-optimized resumes and cover letters in minutes with our AI-powered builder. Designed to help you land your dream job.',
}

const SOCIAL = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    to: 'https://www.linkedin.com/',
    Icon: Linkedin,
    ariaLabel: 'Resume PRO on LinkedIn (opens in new tab)',
  },
  {
    key: 'github',
    label: 'GitHub',
    to: 'https://github.com/',
    Icon: Github,
    ariaLabel: 'Resume PRO on GitHub (opens in new tab)',
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    to: 'https://x.com/',
    Icon: Twitter,
    ariaLabel: 'Resume PRO on X (opens in new tab)',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    to: 'https://www.youtube.com/',
    Icon: Youtube,
    ariaLabel: 'Resume PRO on YouTube (opens in new tab)',
  },
]

const FOOTER_SECTIONS = [
  {
    title: 'Product',
    items: [
      { label: 'Resume Builder', to: '/select' },
      { label: 'Templates', to: '/templates' },
      { label: 'Premium Features', to: '/premium/dashboard' },
      { label: 'AI Assistant', to: '/resume-builder' },
      { label: 'Export to PDF', to: '/normal/download' },
      { label: 'Plans', to: '/plans' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Latest Blog', to: '/blog' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press Kit', to: '/blog' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Help Center', to: '/help-center' },
      { label: 'Documentation', to: '/documentation' },
      { label: 'Builder Guides', to: '/help-center' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Developer API', to: '/documentation' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookie' },
      { label: 'Refund Policy', to: '/refund' },
      { label: 'Security Policy', to: '/security' },
    ],
  },
]

function FooterListColumn({ title, items }) {
  return (
    <section aria-labelledby={`footer-col-${title}`} className="flex flex-col">
      <h3
        id={`footer-col-${title}`}
        className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400/80 mb-4"
      >
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {items.map((l) => (
          <li key={l.label}>
            {l.to.startsWith('http') ? (
              <a
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-royal-gold hover:translate-x-1 inline-flex items-center transition-all duration-300 ease-out focus:outline-none focus-visible:text-royal-gold"
              >
                {l.label}
              </a>
            ) : (
              <Link
                to={l.to}
                className="text-slate-400 hover:text-royal-gold hover:translate-x-1 inline-flex items-center transition-all duration-300 ease-out focus:outline-none focus-visible:text-royal-gold"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      {/* Decorative premium gradient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[150px] bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(197,160,89,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Section: Brand + Newsletter */}
        <div className="py-14 grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand Logo */}
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-royal-gold to-amber-500 rounded-xl blur opacity-30 group-hover:opacity-55 transition duration-500"></div>
                  <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-royal-gold font-bold text-lg shadow-inner">
                    R
                  </div>
                </div>
                <div>
                  <div className="text-lg font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    {BRAND.name}
                  </div>
                  <div className="text-[9px] font-bold tracking-[0.25em] text-royal-gold uppercase">
                    Premium Builder
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
                {BRAND.description}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-8">
              {SOCIAL.map(({ key, label, to, Icon, ariaLabel }) => (
                <a
                  key={key}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-royal-gold hover:border-royal-gold/30 hover:bg-royal-gold/5 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-royal-gold"
                  aria-label={ariaLabel}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-sm font-bold text-white tracking-tight">Stay updated</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed max-w-md">
                Get the latest resume templates, ATS optimization tips, and feature updates directly in your inbox.
              </p>

              <form
                className="mt-5 flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter subscription"
              >
                <div className="relative flex-grow">
                  <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/5 bg-slate-950/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-royal-gold/40 focus:ring-1 focus:ring-royal-gold/30 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-royal-gold to-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-royal-gold/15 focus:outline-none focus-visible:ring-1 focus-visible:ring-royal-gold"
                >
                  Subscribe
                </button>
              </form>

              <div className="mt-3 text-[10px] text-slate-500">
                We respect your inbox. Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="border-t border-white/5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_SECTIONS.map((sec) => (
              <FooterListColumn key={sec.title} title={sec.title} items={sec.items} />
            ))}
          </div>
        </div>

        {/* Bottom Section: Security Badges & Legal Info */}
        <div className="border-t border-white/5 py-8 pb-12">
          {/* Trust Badges */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'SSL Secured', desc: '256-bit encryption', Icon: Lock },
              { label: 'Razorpay Secure', desc: '100% safe transactions', Icon: CreditCard },
              { label: 'Data Encrypted', desc: 'Secure cloud hosting', Icon: ShieldCheck },
              { label: 'GDPR Compliant', desc: 'Full user privacy control', Icon: Eye },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-slate-900/20 p-3.5 backdrop-blur-sm hover:border-white/10 hover:bg-slate-900/40 transition-all duration-300"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-royal-gold/5 text-royal-gold">
                  <t.Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">{t.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Copyright & Meta Links */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/5 pt-6">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Resume PRO. All Rights Reserved.
            </div>
            <nav aria-label="Footer bottom links" className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
              <Link className="hover:text-royal-gold transition-colors duration-300 focus:outline-none" to="/">
                Home
              </Link>
              <Link className="hover:text-royal-gold transition-colors duration-300 focus:outline-none" to="/plans">
                Plans
              </Link>
              <Link className="hover:text-royal-gold transition-colors duration-300 focus:outline-none" to="/faq">
                FAQ
              </Link>
              <Link className="hover:text-royal-gold transition-colors duration-300 focus:outline-none" to="/contact">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
