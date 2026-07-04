const ensureMetaTag = ({ name, property, content }) => {
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (name) el.setAttribute('name', name)
    if (property) el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const ensureLinkTag = ({ rel, href }) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function normalizeUrl(inputUrl) {
  try {
    if (!inputUrl) return ''
    const u = new URL(inputUrl, window.location.origin)
    // Remove hash and normalize trailing slash
    u.hash = ''
    if (u.pathname.endsWith('/') && u.pathname.length > 1) u.pathname = u.pathname.slice(0, -1)
    return u.toString()
  } catch {
    return inputUrl
  }
}

export function useSeo({
  title,
  description,
  canonicalUrl,
  openGraph,
  twitter,
}) {
  if (typeof document === 'undefined') return

  const t = title || 'Resume PRO'
  document.title = t

  if (description) ensureMetaTag({ name: 'description', content: description })

  const resolvedCanonical = canonicalUrl || window.location?.href
  if (resolvedCanonical) ensureLinkTag({ rel: 'canonical', href: normalizeUrl(resolvedCanonical) })

  if (openGraph) {
    ensureMetaTag({ property: 'og:title', content: openGraph.title || t })
    if (openGraph.description) ensureMetaTag({ property: 'og:description', content: openGraph.description })
    if (openGraph.type) ensureMetaTag({ property: 'og:type', content: openGraph.type })
    if (openGraph.url) ensureMetaTag({ property: 'og:url', content: openGraph.url })
    if (openGraph.image) ensureMetaTag({ property: 'og:image', content: openGraph.image })
  } else {
    ensureMetaTag({ property: 'og:title', content: t })
    if (description) ensureMetaTag({ property: 'og:description', content: description })
    ensureMetaTag({ property: 'og:type', content: 'website' })
  }

  const twTitle = twitter?.title || t
  ensureMetaTag({ name: 'twitter:card', content: twitter?.card || 'summary_large_image' })
  ensureMetaTag({ name: 'twitter:title', content: twTitle })
  if (twitter?.description || description) {
    ensureMetaTag({
      name: 'twitter:description',
      content: twitter?.description || description,
    })
  }
  if (twitter?.image || openGraph?.image) {
    ensureMetaTag({ name: 'twitter:image', content: twitter?.image || openGraph?.image })
  }
}

export function injectJsonLd(id, json) {
  if (typeof document === 'undefined') return
  const existing = document.head.querySelector(`script[type="application/ld+json"][data-jsonld-id="${id}"]`)
  const script = existing || document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-jsonld-id', id)
  script.text = JSON.stringify(json)
  if (!existing) document.head.appendChild(script)
}

export function clearJsonLd(id) {
  if (typeof document === 'undefined') return
  const existing = document.head.querySelector(`script[type="application/ld+json"][data-jsonld-id="${id}"]`)
  if (existing) existing.remove()
}

