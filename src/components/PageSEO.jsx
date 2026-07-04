import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSeo } from '../lib/seo'

/**
 * PageSEO Component
 * Automatic SEO for each page
 */
export default function PageSEO({ 
  title, 
  description, 
  noIndex = false 
}) {
  const location = useLocation()
  
  const seoTitles = {
    '/': 'Resume PRO | AI-Powered Resume Builder for ATS-Optimized Resumes',
    '/auth': 'Sign In | Resume PRO',
    '/select': 'Choose Your Plan | Resume PRO',
    '/normal': 'Resume Builder | Resume PRO',
    '/premium': 'Premium Resume Builder | Resume PRO',
    '/about': 'About Us | Resume PRO',
    '/careers': 'Careers | Resume PRO',
    '/blog': 'Blog | Resume PRO',
    '/contact': 'Contact | Resume PRO',
  }
  
  const seoDescriptions = {
    '/': 'Create professional, ATS-optimized resumes with AI assistance. Premium templates, intelligent suggestions, and export-ready PDF outputs.',
    '/auth': 'Sign in to Resume PRO to access your resume builder and start building your professional resume.',
    '/select': 'Choose the perfect plan for your career needs. Free Starter, Pro, or Team plans available.',
    '/normal': 'Build your resume with guided sections, smart suggestions, and ATS-optimized output.',
    '/premium': 'Access premium templates and advanced optimization features.',
    '/about': 'Learn about Resume PRO - the AI-powered resume builder for modern job seekers.',
    '/careers': 'Join our team and help revolutionize how people build careers.',
    '/blog': 'Career tips, resume advice, and industry insights from Resume PRO.',
    '/contact': 'Get in touch with the Resume PRO team.',
  }
  
  const currentTitle = title || seoTitles[location.pathname] || 'Resume PRO'
  const currentDescription = description || seoDescriptions[location.pathname] || 'AI-powered resume builder for ATS-optimized resumes'
  
  useSeo({
    title: currentTitle,
    description: currentDescription,
    openGraph: {
      title: currentTitle,
      description: currentDescription,
      type: 'website',
    },
    twitter: {
      title: currentTitle,
      description: currentDescription,
      card: 'summary_large_image',
    },
  })
  
  // Handle no-index for certain pages
  useEffect(() => {
    if (noIndex) {
      const meta = document.querySelector('meta[name="robots"]')
      if (meta) {
        meta.content = 'noindex, nofollow'
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'robots'
        newMeta.content = 'noindex, nofollow'
        document.head.appendChild(newMeta)
      }
    }
  }, [noIndex])
  
  return null
}
