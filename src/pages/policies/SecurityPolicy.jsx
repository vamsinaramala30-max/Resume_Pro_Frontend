import { useSeo, injectJsonLd } from '../../lib/seo.js'
import PolicyTemplate from './PolicyTemplate.jsx'

export default function SecurityPolicy() {
  useSeo({
    title: 'Security Policy | Resume PRO',
    description: 'Security policy and disclosure information for Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('security-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Security Policy | Resume PRO',
  })

  return (
    <PolicyTemplate title="Security Policy" effective="2026-01-01">
      <p>
        This is a placeholder Security Policy page. Replace with your security disclosure and technical safeguards.
      </p>
      <ul>
        <li>Vulnerability reporting</li>
        <li>Responsible disclosure timeline</li>
        <li>Contact method</li>
      </ul>
    </PolicyTemplate>
  )
}

