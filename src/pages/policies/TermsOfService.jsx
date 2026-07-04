import { useState, useEffect } from 'react'
import { useSeo, injectJsonLd } from '../../lib/seo.js'
import PolicyTemplate from './PolicyTemplate.jsx'

const TABLE_OF_CONTENTS = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'account', label: 'Account Registration' },
  { id: 'responsibilities', label: 'User Responsibilities' },
  { id: 'subscription', label: 'Subscription & Payment' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'prohibited', label: 'Prohibited Activities' },
  { id: 'availability', label: 'Service Availability' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact Information' },
]

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('')

  useSeo({
    title: 'Terms of Service | Resume PRO',
    description: 'Terms of Service for Resume PRO. AI-powered resume builder platform. Read our terms, conditions, and user agreement before using our services.',
    canonicalUrl: typeof window !== 'undefined' ? window.location?.href : '',
    openGraph: {
      title: 'Terms of Service | Resume PRO',
      description: 'Terms of Service for Resume PRO resume builder platform.',
      type: 'website',
    },
  })

  useEffect(() => {
    injectJsonLd('tos-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Terms of Service | Resume PRO',
      description: 'Terms of Service for Resume PRO platform.',
      publisher: {
        '@type': 'Organization',
        name: 'Resume PRO',
      },
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = TABLE_OF_CONTENTS.map(s => document.getElementById(s.id)).filter(Boolean)
      const scrollPos = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <PolicyTemplate title="Terms of Service" effective="June 29, 2026">
      {/* Table of Contents */}
      <nav className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-5" aria-label="Table of contents">
        <h2 className="text-lg font-semibold text-white">Table of Contents</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {TABLE_OF_CONTENTS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-sm transition ${
                  activeSection === item.id
                    ? 'text-royal-gold font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="mr-2">§</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Introduction */}
      <section className="mb-8">
        <p className="text-slate-300 leading-7">
          Welcome to Resume PRO. These Terms of Service ("Terms") constitute a legally binding agreement between you
          ("User," "you," or "your") and Resume PRO ("Company," "we," "our," or "us") governing your use of the Resume
          PRO platform, including our website, AI-powered resume builder, templates, and related services
          (collectively, the "Service").
        </p>
        <p className="mt-4 text-slate-300 leading-7">
          By accessing or using Resume PRO, you agree to be bound by these Terms. If you do not agree to these Terms,
          do not use our Service.
        </p>
      </section>

      {/* Section 1: Acceptance of Terms */}
      <section id="acceptance" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            By creating an account, subscribing to our Service, or simply browsing our website, you acknowledge that you:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Have read and understood these Terms</li>
            <li>Agree to be bound by these Terms</li>
            <li>Are at least 13 years of age</li>
            <li>Have the legal capacity to enter into a binding agreement</li>
          </ul>
          <p className="mt-4">
            If you are using the Service on behalf of a company or organization, you represent that you have the authority to bind
            that entity to these Terms.
          </p>
        </div>
      </section>

      {/* Section 2: Account Registration */}
      <section id="account" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">2. Account Registration</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">2.1 Registration Requirements</h3>
            <p className="mt-3 text-slate-300 leading-6">
              To use our Service, you must create an account. During registration, you agree to provide:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Valid email address</li>
              <li>Strong, unique password</li>
              <li>Accurate and complete information</li>
              <li>Age verification (must be 13 or older)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">2.2 Account Security</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You are responsible for:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Maintaining the confidentiality of your password</li>
              <li>All activities under your account</li>
              <li>Notifying us immediately of unauthorized access</li>
              <li>Using two-factor authentication when available</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">2.3 Account Responsibilities</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You agree to:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Provide accurate and up-to-date information</li>
              <li>Not share your account credentials</li>
              <li>Not use another user's account without permission</li>
              <li>Comply with all applicable laws</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: User Responsibilities */}
      <section id="responsibilities" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">3. User Responsibilities</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            When using Resume PRO, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Provide Accurate Information:</strong> All resume and profile information you provide must be accurate and truthful.</li>
            <li><strong className="text-white">Respect Others:</strong> Treat other users with respect and professionalism.</li>
            <li><strong className="text-white">Use Lawfully:</strong> Use the Service only for lawful purposes.</li>
            <li><strong className="text-white">Protect Your Data:</strong> Maintain backups of your important resume data.</li>
            <li><strong className="text-white">Report Issues:</strong> Notify us of any bugs, security issues, or violations.</li>
          </ul>
        </div>
      </section>

      {/* Section 4: Subscription & Payment */}
      <section id="subscription" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">4. Subscription & Payment</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">4.1 Subscription Plans</h3>
            <p className="mt-3 text-slate-300 leading-6">
              Resume PRO offers the following plans:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li><strong className="text-white">Free:</strong> Basic resume creation, limited templates</li>
              <li><strong className="text-white">Premium Monthly:</strong> ₹499/month, all templates, AI features, priority support</li>
              <li><strong className="text-white">Premium Yearly:</strong> ₹3,999/year, save ~33%, all premium features</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">4.2 Payment Processing</h3>
            <p className="mt-3 text-slate-300 leading-6">
              Payments are processed securely via Razorpay. We do not store your payment details.
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>All transactions are encrypted</li>
              <li>Razorpay handles PCI-DSS compliance</li>
              <li>Invoices are emailed to your registered email</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">4.3 Refund Policy</h3>
            <p className="mt-3 text-slate-300 leading-6">
              We offer a 7-day money-back guarantee for first-time subscribers. To request a refund:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Contact support@resumepro.in within 7 days of purchase</li>
              <li>Provide your registered email and transaction ID</li>
              <li>Refund will be processed within 5-7 business days</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              After 7 days, refunds are not available, but you can cancel anytime to avoid renewal.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">4.4 Cancellation</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can cancel your subscription anytime:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Go to Settings → Subscription → Cancel</li>
              <li>Or email support@resumepro.in</li>
              <li>Cancellation takes effect at the end of your billing period</li>
              <li>You will retain access until then</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Intellectual Property */}
      <section id="intellectual-property" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">5. Intellectual Property</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.1 Our IP Rights</h3>
            <p className="mt-3 text-slate-300 leading-6">
              Resume PRO and its content, including:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Website design and code</li>
              <li>AI algorithms and models</li>
              <li>Template designs</li>
              <li>Brand and logos</li>
              <li>Documentation</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              are the exclusive property of Resume PRO and are protected by Indian and international copyright,
              trademark, and other laws.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.2 Your Resume Ownership</h3>
            <p className="mt-3 text-slate-300 leading-6">
              <strong className="text-white">You retain full ownership of all resume content you create.</strong> This includes:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Personal information you input</li>
              <li>Work experience descriptions</li>
              <li>Custom content and modifications</li>
              <li>Downloaded PDF files</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              We only use your data to provide our services. You can export and use your resumes for any purpose.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.3 License to Use</h3>
            <p className="mt-3 text-slate-300 leading-6">
              We grant you a limited, non-exclusive, non-transferable license to:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Use our templates for personal resume creation</li>
              <li>Download resumes you create</li>
              <li>Use our AI features within the platform</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              This license does not permit resale, distribution, or commercial use of our templates without written permission.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Prohibited Activities */}
      <section id="prohibited" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">6. Prohibited Activities</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            You must NOT:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Violate Laws:</strong> Use the Service for any illegal purpose.</li>
            <li><strong className="text-white">Harass Others:</strong> Harass, defame, or harm other users.</li>
            <li><strong className="text-white">Spam:</strong> Send spam or unsolicited communications.</li>
            <li><strong className="text-white">Impersonate:</strong> Pretend to be someone else.</li>
            <li><strong className="text-white">Hack:</strong> Attempt to hack, reverse engineer, or disrupt our Service.</li>
            <li><strong className="text-white">Scrape:</strong> Scrape or copy our content without permission.</li>
            <li><strong className="text-white">Resell:</strong> Resell or redistribute our templates commercially.</li>
            <li><strong className="text-white">Share Credentials:</strong> Share your account login with others.</li>
            <li><strong className="text-white">Create Fake Resumes:</strong> Create resumes with false or misleading information.</li>
          </ul>
          <p className="mt-4 text-red-400">
            Violation may result in immediate account termination without refund.
          </p>
        </div>
      </section>

      {/* Section 7: Service Availability */}
      <section id="availability" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">7. Service Availability</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            We strive for high availability but cannot guarantee 100% uptime. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Scheduled Maintenance:</strong> We may perform maintenance with prior notice.</li>
            <li><strong className="text-white">Unplanned Outages:</strong> Server issues may cause temporary downtime.</li>
            <li><strong className="text-white">Geographic Limitations:</strong> Some features may not be available in all regions.</li>
            <li><strong className="text-white">Your Responsibility:</strong> Maintain backups of your important data.</li>
          </ul>
          <p className="mt-4">
            We are not liable for any losses due to service unavailability.
          </p>
        </div>
      </section>

      {/* Section 8: Limitation of Liability */}
      <section id="liability" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">8. Limitation of Liability</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">8.1 Disclaimer</h3>
            <p className="mt-3 text-slate-300 leading-6">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Uninterrupted service</li>
              <li>Error-free operation</li>
              <li>Employment or job offers</li>
              <li>Resume effectiveness</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">8.2 Liability Cap</h3>
            <p className="mt-3 text-slate-300 leading-6">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID
              FOR OUR SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">8.3 Excluded Damages</h3>
            <p className="mt-3 text-slate-300 leading-6">
              WE SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Actions taken in good faith based on AI suggestions</li>
              <li>Third-party actions or content</li>
              <li>Mistakes in your resume information</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9: Termination */}
      <section id="termination" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">9. Termination</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">9.1 Termination by You</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can cancel your account at any time:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Via Settings → Delete Account</li>
              <li>By emailing support@resumepro.in</li>
              <li>Your data will be deleted within 30 days</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">9.2 Termination by Us</h3>
            <p className="mt-3 text-slate-300 leading-6">
              We may terminate or suspend your account immediately if you:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Violate these Terms</li>
              <li>Engage in illegal activity</li>
              <li>Fail to pay for subscription</li>
              <li>Create fake or misleading resumes</li>
              <li>Harass or abuse other users</li>
              <li>Attempt to hack our systems</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">9.3 Effect of Termination</h3>
            <p className="mt-3 text-slate-300 leading-6">
              Upon termination:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Your right to use the Service stops immediately</li>
              <li>You must destroy all downloaded content</li>
              <li>You remain liable for any outstanding fees</li>
              <li>Certain provisions survive termination</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 10: Governing Law */}
      <section id="governing-law" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">10. Governing Law</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            These Terms are governed by the laws of India:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Jurisdiction:</strong> Courts in Hyderabad, Telangana, India have exclusive jurisdiction.</li>
            <li><strong className="text-white">Applicable Laws:</strong> Information Technology Act, 2000 and rules thereunder.</li>
            <li><strong className="text-white">Dispute Resolution:</strong> Parties agree to attempt mediation before litigation.</li>
          </ul>
        </div>
      </section>

      {/* Section 11: Contact Information */}
      <section id="contact" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">11. Contact Information</h2>

        <div className="mt-6 rounded-2xl border border-royal-gold/30 bg-royal-gold/5 p-6">
          <p className="text-slate-300 leading-7">
            For questions about these Terms, please contact us:
          </p>
          <div className="mt-4 space-y-3 text-slate-200">
            <p>
              <strong className="text-white">Email:</strong>{' '}
              <a href="mailto:support@resumepro.in" className="text-royal-gold hover:underline">
                support@resumepro.in
              </a>
            </p>
            <p>
              <strong className="text-white">Website:</strong>{' '}
              <a href="https://resumepro.in" className="text-royal-gold hover:underline">
                https://resumepro.in
              </a>
            </p>
            <p>
              <strong className="text-white">Country:</strong> India
            </p>
          </div>
        </div>
      </section>
    </PolicyTemplate>
  )
}