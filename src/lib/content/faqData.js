export const faqCategories = ['General', 'Account', 'Resumes', 'Privacy', 'Billing']

export const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is Resume PRO?',
        a: 'Resume PRO is an AI-powered resume builder.'
      },
      {
        q: 'Is Resume PRO free?',
        a: 'Core features are available free.'
      },
    ],
  },
  {
    category: 'Account',
    items: [
      {
        q: 'Can I delete my account?',
        a: 'Yes.'
      },
      {
        q: 'Can I export my data?',
        a: 'Yes.'
      },
    ],
  },
  {
    category: 'Resumes',
    items: [
      {
        q: 'Are templates ATS-friendly?',
        a: 'Yes.'
      },
      {
        q: 'Can I edit resumes later?',
        a: 'Yes.'
      },
    ],
  },
  {
    category: 'Privacy',
    items: [
      {
        q: 'Do you sell user data?',
        a: 'No. We never sell user data.'
      },
    ],
  },
  {
    category: 'Billing',
    items: [
      {
        q: 'Where can I manage my subscription?',
        a: 'Use your account dashboard to manage plans and billing preferences.'
      },
    ],
  },
]

export function filterFaqs({ query, category }) {
  const q = (query || '').trim().toLowerCase()
  return faqs
    .filter((c) => !category || c.category === category)
    .map((c) => ({
      ...c,
      items: c.items.filter((it) =>
        !q || it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
      ),
    }))
    .filter((c) => c.items.length > 0)
}

