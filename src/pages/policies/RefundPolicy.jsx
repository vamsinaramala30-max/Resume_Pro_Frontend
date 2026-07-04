import { useSeo, injectJsonLd } from '../../lib/seo.js'
import PolicyTemplate from './PolicyTemplate.jsx'

export default function RefundPolicy() {
  useSeo({
    title: 'Refund Policy | Resume PRO',
    description: 'Refund policy for Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('refund-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Refund Policy | Resume PRO',
  })

  return (
    <PolicyTemplate title="Refund Policy" effective="2026-01-01">
      <p>
        This is a placeholder Refund Policy page. Replace with your legal text.
      </p>
      <ul>
        <li>Eligibility</li>
        <li>How to request a refund</li>
        <li>Processing time</li>
      </ul>
    </PolicyTemplate>
  )
}

