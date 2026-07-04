import { useState, useEffect } from 'react'
import { useSeo, injectJsonLd } from '../../lib/seo.js'
import PolicyTemplate from './PolicyTemplate.jsx'

const TABLE_OF_CONTENTS = [
  { id: 'information-collect', label: 'Information We Collect' },
  { id: 'how-use-data', label: 'How We Use Your Data' },
  { id: 'data-storage', label: 'Data Storage & Security' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'user-rights', label: 'Your Rights' },
  { id: 'cookies', label: 'Cookies & Analytics' },
  { id: 'children-privacy', label: "Children's Privacy" },
  { id: 'policy-updates', label: 'Policy Updates' },
  { id: 'contact', label: 'Contact Information' },
]

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('')

  useSeo({
    title: 'Privacy Policy | Resume PRO',
    description: 'Learn how Resume PRO collects, uses, and protects your personal information. We are committed to safeguarding your privacy while providing AI-powered resume building services.',
    canonicalUrl: typeof window !== 'undefined' ? window.location?.href : '',
    openGraph: {
      title: 'Privacy Policy | Resume PRO',
      description: 'Learn how Resume PRO collects, uses, and protects your personal information.',
      type: 'website',
    },
  })

  useEffect(() => {
    injectJsonLd('privacy-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy | Resume PRO',
      description: 'Privacy policy for Resume PRO resume builder platform.',
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
    <PolicyTemplate title="Privacy Policy" effective="June 29, 2026">
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
          At Resume PRO ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our AI-powered resume builder platform. By accessing or
          using Resume PRO, you agree to this Privacy Policy. If you do not agree, please do not use our service.
        </p>
      </section>

      {/* Section 1: Information We Collect */}
      <section id="information-collect" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">1.1 Account Information</h3>
            <p className="mt-3 text-slate-300 leading-6">
              When you create an account, we collect:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Email address (required for authentication)</li>
              <li>Password (encrypted using bcrypt)</li>
              <li>Full name (optional, for resume personalization)</li>
              <li>Phone number (optional, for account recovery)</li>
              <li>Profile picture (optional)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">1.2 Resume and Profile Data</h3>
            <p className="mt-3 text-slate-300 leading-6">
              To generate resumes, you may provide:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Personal details (name, address, contact info)</li>
              <li>Professional summary</li>
              <li>Work experience (company, role, dates, descriptions)</li>
              <li>Education history</li>
              <li>Skills and certifications</li>
              <li>Languages spoken</li>
              <li>Projects and achievements</li>
              <li>References</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              <strong className="text-white">Note:</strong> You retain full ownership of all resume data you input. We use this data
              solely to provide our services.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">1.3 Payment Information</h3>
            <p className="mt-3 text-slate-300 leading-6">
              For premium subscriptions, payment is processed through Razorpay. We do not store your credit card or bank
              details on our servers. Razorpay handles all payment data securely.
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Razorpay transaction IDs (for invoice tracking)</li>
              <li>Subscription plan details</li>
              <li>Billing history</li>
              <li>Purchase dates</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">1.4 Usage Data</h3>
            <p className="mt-3 text-slate-300 leading-6">
              We automatically collect:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited</li>
              <li>Time spent on platform</li>
              <li>Feature usage patterns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: How We Use Your Data */}
      <section id="how-use-data" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">2. How We Use Your Data</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Provide Services:</strong> Generate, edit, and export resumes based on your input.</li>
            <li><strong className="text-white">Account Management:</strong> Authenticate your account and provide customer support.</li>
            <li><strong className="text-white">AI Assistance:</strong> Use AI to suggest improvements, generate content, and optimize resumes.</li>
            <li><strong className="text-white">Payment Processing:</strong> Process subscription payments and manage billing.</li>
            <li><strong className="text-white">Communication:</strong> Send account-related emails, updates, and support responses.</li>
            <li><strong className="text-white">Analytics:</strong> Improve our platform based on usage patterns.</li>
            <li><strong className="text-white">Security:</strong> Detect and prevent fraud, abuse, and unauthorized access.</li>
            <li><strong className="text-white">Legal Compliance:</strong> Meet regulatory requirements and respond to legal requests.</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Data Storage & Security */}
      <section id="data-storage" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">3. Data Storage & Security</h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">3.1 Data Hosting</h3>
            <p className="mt-3 text-slate-300 leading-6">
              Our servers are hosted on Supabase (PostgreSQL) with data centers primarily in India. Your data is stored securely
              with enterprise-grade encryption.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">3.2 Security Measures</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>SSL/TLS encryption for all data in transit</li>
              <li>AES-256 encryption for stored data</li>
              <li>Bcrypt password hashing</li>
              <li>Rate limiting on API endpoints</li>
              <li>Regular security audits</li>
              <li>Access logging and monitoring</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">3.3 Data Retention</h3>
            <p className="mt-3 text-slate-300 leading-6">
              We retain your data as long as your account is active. You can request deletion at any time. Inactive accounts
              may be deleted after 2 years of no activity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Third-Party Services */}
      <section id="third-party" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">4. Third-Party Services</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            We use trusted third-party services to provide our platform:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Supabase:</strong> Database and authentication</li>
            <li><strong className="text-white">Razorpay:</strong> Payment processing</li>
            <li><strong className="text-white">Resend:</strong> Transactional emails</li>
            <li><strong className="text-white">Anthropic:</strong> AI-powered resume assistance</li>
            <li><strong className="text-white">Google Analytics:</strong> Usage analytics (opt-out available)</li>
          </ul>
          <p className="mt-4">
            These providers are contractually obligated to protect your data and use it only for providing services to us.
          </p>
        </div>
      </section>

      {/* Section 5: Your Rights */}
      <section id="user-rights" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">5. Your Rights</h2>

        <div className="mt-6 space-y-6">
          <p className="text-slate-300 leading-7">
            Under applicable privacy laws (including GDPR and India's IT Act), you have the following rights:
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.1 Access & Portability</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can request a copy of all data we hold about you in a portable format.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.2 Correction</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can update or correct your personal information at any time through your account settings.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.3 Deletion</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can request deletion of your account and all associated data. This includes:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Profile information</li>
              <li>Resume data</li>
              <li>Payment history</li>
              <li>Usage logs</li>
            </ul>
            <p className="mt-4 text-slate-300 leading-6">
              To request deletion, go to Settings → Delete Account, or contact us at{' '}
              <a href="mailto:support@resumepro.in" className="text-royal-gold hover:underline">
                support@resumepro.in
              </a>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-royal-gold">5.4 Opt-Out</h3>
            <p className="mt-3 text-slate-300 leading-6">
              You can opt out of:
            </p>
            <ul className="mt-3 list-disc pl-6 text-slate-300 space-y-2">
              <li>Marketing emails (via unsubscribe link)</li>
              <li>Google Analytics tracking (via browser settings)</li>
              <li>AI suggestions (disable in account settings)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Cookies & Analytics */}
      <section id="cookies" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">6. Cookies & Analytics</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            We use cookies to improve your experience:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-white">Essential Cookies:</strong> Required for authentication and core functionality</li>
            <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences</li>
            <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
          </ul>
          <p className="mt-4">
            You can disable cookies in your browser settings, but some features may not work properly.
          </p>
        </div>
      </section>

      {/* Section 7: Children's Privacy */}
      <section id="children-privacy" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">7. Children's Privacy</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If you believe we have collected data from a child under 13,
            please contact us immediately, and we will delete such information.
          </p>
        </div>
      </section>

      {/* Section 8: Policy Updates */}
      <section id="policy-updates" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">8. Policy Updates</h2>

        <div className="mt-6 space-y-4 text-slate-300 leading-7">
          <p>
            We may update this Privacy Policy from time to time. When we make significant changes, we will:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Post the new policy on this page</li>
            <li>Update the "Effective" date at the top</li>
            <li>Send an email notification to your registered email (for major changes)</li>
          </ul>
          <p className="mt-4">
            Your continued use of Resume PRO after any update constitutes acceptance of the new Privacy Policy.
          </p>
        </div>
      </section>

      {/* Section 9: Contact Information */}
      <section id="contact" className="mb-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white">9. Contact Information</h2>

        <div className="mt-6 rounded-2xl border border-royal-gold/30 bg-royal-gold/5 p-6">
          <p className="text-slate-300 leading-7">
            If you have any questions about this Privacy Policy, please contact us:
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