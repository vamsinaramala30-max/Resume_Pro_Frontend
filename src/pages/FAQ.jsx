import { useSeo, injectJsonLd } from '../lib/seo.js'

const FAQ_ITEMS = [
  { q: 'Is Resume PRO really ATS-friendly?', a: 'Yes. Templates are structured for clean parsing and scannability.' },
  { q: 'Do I need to be premium to export?', a: 'Export is available in the normal flow and enhanced in premium.' },
  { q: 'Can I regenerate bullet points?', a: 'Yes. Use the AI assistant to rewrite or tailor content.' },
]

export default function FAQ() {
  useSeo({
    title: 'FAQ | Resume PRO',
    description: 'Frequently asked questions about Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('faq-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-foreground">FAQ</h1>
        <p className="mt-3 text-muted-foreground">Answers to the most common questions.</p>

        <section className="mt-8 space-y-4">
          {FAQ_ITEMS.map((f) => (
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
