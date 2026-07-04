export const blogCategories = ['ATS', 'LinkedIn', 'AI', 'Career Tips', 'Templates']

export const blogTags = ['ATS', 'Keywords', 'LinkedIn', 'Interview', 'AI', 'Hiring', 'Templates']

const withMeta = (post) => ({
  ...post,
  readingTimeMinutes: post.wordCount ? Math.max(1, Math.round(post.wordCount / 200)) : 4,
})

export const blogPosts = [
  withMeta({
    slug: 'how-to-create-an-ats-friendly-resume',
    title: 'How to Create an ATS-Friendly Resume',
    category: 'ATS',
    tags: ['ATS', 'Keywords', 'Templates'],
    excerpt:
      'Learn a step-by-step approach to formatting and keyword strategy so your resume passes ATS filters and reads cleanly by recruiters.',
    author: 'Resume PRO Team',
    publishedAt: '2026-01-12',
    wordCount: 980,
    coverAlt: 'ATS friendly resume guide',
    body: [
      {
        type: 'h2',
        text: 'Start with the right structure',
      },
      {
        type: 'p',
        text: 'Use clear section headings (Summary, Experience, Skills, Education). Avoid tables and complex layouts that can break parsing in ATS systems.',
      },
      {
        type: 'h2',
        text: 'Optimize keywords for each job',
      },
      {
        type: 'p',
        text: 'Mirror key terms from the job description—especially skills, tools, and role-specific responsibilities. Keep it natural: the goal is relevance, not keyword stuffing.',
      },
      {
        type: 'h2',
        text: 'Keep formatting simple',
      },
      {
        type: 'p',
        text: 'Choose standard fonts, consistent spacing, and bullet points. Save exports as PDF for best compatibility.',
      },
    ],
  }),
  withMeta({
    slug: 'top-resume-mistakes-in-2026',
    title: 'Top Resume Mistakes in 2026',
    category: 'Career Tips',
    tags: ['Interview', 'Hiring'],
    excerpt:
      'Avoid common pitfalls that reduce recruiter response rates—formatting issues, weak impact statements, and mismatched keywords.',
    author: 'Resume PRO Team',
    publishedAt: '2026-03-03',
    wordCount: 760,
    coverAlt: 'Resume mistakes checklist',
    body: [
      { type: 'h2', text: 'Mistake #1: A resume that reads like a job description' },
      {
        type: 'p',
        text: 'Recruiters want proof of impact. Swap duties for outcomes: metrics, scope, and results.',
      },
      { type: 'h2', text: 'Mistake #2: Generic skills lists' },
      {
        type: 'p',
        text: 'Use evidence-backed skills. Add context in bullets (tools used, results delivered, scale of projects).',
      },
      { type: 'h2', text: 'Mistake #3: Exporting without checking readability' },
      {
        type: 'p',
        text: 'Always preview and export. Ensure headings and bullet points remain intact in the PDF.',
      },
    ],
  }),
  withMeta({
    slug: 'linkedin-optimization-guide',
    title: 'LinkedIn Optimization Guide',
    category: 'LinkedIn',
    tags: ['LinkedIn', 'Keywords', 'Interview'],
    excerpt:
      'Align your LinkedIn profile to your resume so recruiters find you faster and understand your value instantly.',
    author: 'Resume PRO Team',
    publishedAt: '2026-04-18',
    wordCount: 840,
    coverAlt: 'LinkedIn profile optimization',
    body: [
      { type: 'h2', text: 'Make your headline keyword-rich' },
      {
        type: 'p',
        text: 'Your headline should communicate your role, domain, and value proposition. Include skills employers search for.',
      },
      { type: 'h2', text: 'Turn experience into measurable outcomes' },
      {
        type: 'p',
        text: 'Use 2–4 impact bullets per role. Tie achievements to scope, scale, and results.',
      },
      { type: 'h2', text: 'Write a “quick scan” About section' },
      {
        type: 'p',
        text: 'Lead with what you do, who you help, and why you’re credible. Keep it readable and specific.',
      },
    ],
  }),
  withMeta({
    slug: 'ai-tools-for-job-seekers',
    title: 'AI Tools for Job Seekers',
    category: 'AI',
    tags: ['AI', 'Interview', 'Hiring'],
    excerpt:
      'Discover safe, practical ways to use AI for resume drafts, keyword alignment, and cover letter personalization.',
    author: 'Resume PRO Team',
    publishedAt: '2026-05-27',
    wordCount: 910,
    coverAlt: 'AI tools for job seekers',
    body: [
      { type: 'h2', text: 'Use AI to draft, then personalize' },
      {
        type: 'p',
        text: 'Start with AI suggestions for structure and phrasing. Then replace generic statements with your real experiences and metrics.',
      },
      { type: 'h2', text: 'Focus on relevance over fluency' },
      {
        type: 'p',
        text: 'AI should help you match the job’s language and highlight the right skills—not just sound impressive.',
      },
      { type: 'h2', text: 'Export and verify ATS readability' },
      {
        type: 'p',
        text: 'Always preview your resume export. Ensure headings and bullets remain consistent.',
      },
    ],
  }),
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const current = getBlogPostBySlug(currentSlug)
  if (!current) return []
  const scored = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const tagOverlap = p.tags.filter((t) => current.tags.includes(t)).length
      const categoryMatch = p.category === current.category ? 2 : 0
      return { post: p, score: tagOverlap + categoryMatch }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
  return scored.map((s) => s.post)
}

export function normalizeSearch(q) {
  return (q || '').trim().toLowerCase()
}

export function searchPosts({ query, category, tag }) {
  const q = normalizeSearch(query)
  return blogPosts.filter((p) => {
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    const matchesCategory = !category || p.category === category
    const matchesTag = !tag || p.tags.includes(tag)
    return matchesQuery && matchesCategory && matchesTag
  })
}

