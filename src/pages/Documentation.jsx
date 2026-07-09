import { useSeo, injectJsonLd } from '../lib/seo.js'

export default function Documentation() {
  useSeo({
    title: 'Documentation | Resume PRO',
    description: 'Developer and product documentation for Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('docs-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Documentation | Resume PRO',
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-black text-foreground">Documentation</h1>
        <p className="mt-3 text-muted-foreground">This section is ready for integration with your docs content.</p>

        <section className="mt-8 rounded-3xl border border-border bg-card shadow-card p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-black text-foreground">Getting started</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the Builder to create an ATS-friendly resume.</li>
              <li>Preview and export to PDF.</li>
              <li>Use the AI assistant for ATS optimization and rewriting.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
