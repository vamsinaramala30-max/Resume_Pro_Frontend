import { useSeo, injectJsonLd } from '../../lib/seo.js'
import PolicyTemplate from './PolicyTemplate.jsx'

export default function CookiePolicy() {
  useSeo({
    title: 'Cookie Policy | Resume PRO',
    description: 'Cookie policy for Resume PRO.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('cookie-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cookie Policy | Resume PRO',
  })

  return (
    <PolicyTemplate title="Cookie Policy" effective="2026-01-01">
      <p>
        This is a placeholder Cookie Policy page. Replace with your legal text.
      </p>
      <ul>
        <li>Cookie types</li>
        <li>How we use cookies</li>
        <li>How to manage cookies</li>
      </ul>
    </PolicyTemplate>
  )
}

