import { useSeo, injectJsonLd } from '../lib/seo.js'
import { useMemo } from 'react'

const FAQ = [
  { q: 'How do I start building my resume?', a: 'Go to Builder and follow the guided sections.' },
  { q: 'Is my resume ATS-friendly?', a: 'Yes—templates follow structured headings and scanning-safe layouts.' },
  { q: 'Can I export my resume as PDF?', a: 'Yes. Premium and normal flows support exports.' },
  { q: 'How does the AI assistant help?', a: 'Ask questions about ATS optimization, bullet rewriting, and interview prep.' },
]

export default function HelpCenter() {
  useSeo({
    title: 'Help Center | Resume PRO',
    description: 'Answers, guides, and FAQs for Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('help-center-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  const items = useMemo(() => FAQ, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-foreground">Help Center</h1>
        <p className="mt-3 text-muted-foreground">Quick answers to common questions.</p>

        <section className="mt-8 space-y-4">
          {items.map((f) => (
            <article key={f.q} className="rounded-3xl border border-border bg-card shadow-card p-6">
              <h2 className="text-lg font-bold text-foreground">{f.q}</h2>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
