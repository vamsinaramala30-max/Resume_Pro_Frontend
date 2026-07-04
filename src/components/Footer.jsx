import { Link } from 'react-router-dom'
<<<<<<< HEAD
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'

const BRAND = {
  name: 'Resume PRO',
  description:
    'AI-powered resume builder for ATS-friendly resumes, cover letters, and career documents.',
}

const TRUST_BADGE = [
  { label: 'Secure Payments' },
  { label: 'ATS Optimized' },
  { label: 'Trusted by Professionals' },
]

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
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/blog' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press Kit', to: '/blog' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Help Center', to: '/help-center' },
      { label: 'Documentation', to: '/documentation' },
      { label: 'Guides', to: '/help-center' },
      { label: 'FAQs', to: '/faq' },
      { label: 'API Docs', to: '/documentation' },
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
    <section aria-labelledby={`footer-col-${title}`}>
      <h3 id={`footer-col-${title}`} className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300/80">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-200/90">
        {items.map((l) => (
          <li key={l.label}>
            {l.to.startsWith('http') ? (
              <a
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition"
              >
                {l.label}
              </a>
            ) : (
              <Link
                to={l.to}
                className="inline-flex items-center rounded-xl hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition"
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

function TrustBadgeRow() {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" aria-label="Trust badges">
      {TRUST_BADGE.map((b) => (
        <div
          key={b.label}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100/95"
        >
          <span className="h-2 w-2 rounded-full bg-royal-gold" aria-hidden="true" />
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="relative py-14">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_120%_at_50%_-20%,rgba(197,160,89,0.25),transparent_60%)] opacity-70" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            {/* Brand */}
            <section aria-label="Brand">
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-gold/15 text-royal-gold shadow-[0_0_0_1px_rgba(197,160,89,0.25)]"
                  aria-hidden="true"
                >
                  R
                </div>
                <div>
                  <div className="text-xl font-black text-white">{BRAND.name}</div>
                  <div className="mt-1 text-xs font-semibold tracking-[0.22em] text-slate-400 uppercase">
                    Resume PRO SaaS
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">{BRAND.description}</p>

              <TrustBadgeRow />

              {/* Newsletter */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <h3 className="text-sm font-semibold text-white">Stay updated</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Stay updated with resume tips and product updates.
                </p>

                <form
                  className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Intentionally no network call here. Wire to your backend when available.
                  }}
                  aria-label="Newsletter subscription"
                >
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
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-royal-gold/60 focus:ring-2 focus:ring-royal-gold/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-royal-gold px-5 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Subscribe
                  </button>
                </form>

                <div className="mt-3 text-xs text-slate-400">
                  We respect your inbox. Unsubscribe anytime.
                </div>
              </div>
            </section>

            {/* Columns */}
            {FOOTER_SECTIONS.map((sec) => (
              <FooterListColumn key={sec.title} title={sec.title} items={sec.items} />
            ))}

            {/* Social */}
            <section className="lg:col-span-1" aria-label="Social links">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300/80">
                Social
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {SOCIAL.map(({ key, label, to, Icon, ariaLabel }) => (
                  <a
                    key={key}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition hover:bg-white/10 hover:border-royal-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
                    aria-label={ariaLabel}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold transition group-hover:brightness-110" aria-hidden="true">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-slate-100">{label}</span>
                  </a>
                ))}

                {/* Instagram + X icons not in lucide import list; keep as links without icons via text badges */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group col-span-1 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition hover:bg-white/10 hover:border-royal-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
                  aria-label="Resume PRO on Instagram (opens in new tab)"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold transition group-hover:brightness-110" aria-hidden="true">
                    ⌁
                  </span>
                  <span className="text-sm font-semibold text-slate-100">Instagram</span>
                </a>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group col-span-1 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 transition hover:bg-white/10 hover:border-royal-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
                  aria-label="Resume PRO on X (opens in new tab)"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold transition group-hover:brightness-110" aria-hidden="true">
                    𝕏
                  </span>
                  <span className="text-sm font-semibold text-slate-100">X</span>
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group col-span-2 inline-flex items-center justify-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10 hover:border-royal-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
                  aria-label="Resume PRO on YouTube (opens in new tab)"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold transition group-hover:brightness-110" aria-hidden="true">
                    ▶
                  </span>
                  <span className="text-sm font-semibold text-slate-100">YouTube</span>
                </a>
              </div>
            </section>
          </div>

          {/* Trust & Security Row */}
          <div className="mt-12 rounded-[28px] border border-white/10 bg-slate-950/30 p-5 sm:p-7">
            <div className="text-sm font-semibold text-white">Trust &amp; Security</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'SSL Secured' },
                { label: 'Razorpay Secure Payments' },
                { label: 'Data Encrypted' },
                { label: 'GDPR Ready' },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden="true" />
                  <span className="text-sm text-slate-100/95">{t.label}</span>
                </div>
              ))}
=======

export default function Footer() {
  return (
    <footer className="mt-[var(--section-spacing-desktop)] border-t border-border bg-surface-elevated/30 py-12">
      <div className="layout-container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link to="/" className="text-h4 font-black text-foreground flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm">R</span>
              Resume PRO
            </Link>
            <p className="max-w-md text-foreground/70 leading-relaxed text-sm">
              Modern SaaS resume builder with polished templates, intelligent content suggestions, and premium export features.
            </p>
          </div>

          <div>
            <div className="text-caption uppercase tracking-widest text-foreground/50 font-bold mb-4">Company</div>
            <div className="space-y-3 text-sm text-foreground/70 font-medium">
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">About</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Careers</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Blog</a>
            </div>
          </div>

          <div>
            <div className="text-caption uppercase tracking-widest text-foreground/50 font-bold mb-4">Resources</div>
            <div className="space-y-3 text-sm text-foreground/70 font-medium">
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Help Center</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Privacy</a>
              <a className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Terms</a>
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Footer bottom */}
        <div className="pb-10">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-200/90">© 2026 Resume PRO. All Rights Reserved.</div>
            <nav aria-label="Footer bottom links" className="flex flex-wrap gap-4 text-sm">
              <Link className="text-slate-200/90 hover:text-white transition" to="/">
                Home
              </Link>
              <Link className="text-slate-200/90 hover:text-white transition" to="/plans">
                Plans
              </Link>
              <Link className="text-slate-200/90 hover:text-white transition" to="/faq">
                FAQ
              </Link>
              <Link className="text-slate-200/90 hover:text-white transition" to="/contact">
                Contact
              </Link>
            </nav>
=======
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between font-medium">
          <div>© {new Date().getFullYear()} Resume PRO. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">LinkedIn</a>
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">GitHub</a>
            <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" href="#">Twitter</a>
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
          </div>
        </div>
      </div>
    </footer>
  )
}
