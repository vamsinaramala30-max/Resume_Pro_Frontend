import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { useSeo, injectJsonLd } from '../lib/seo.js'

const WHATSAPP_NUMBER = '919989998990'
const ADMIN_EMAIL = 'vamsinaramala30@gmail.com'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: ADMIN_EMAIL,
    href: `mailto:${ADMIN_EMAIL}`,
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+91 99899 89990',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I want to contact you.`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [toast, setToast] = useState(null)

  useSeo({
    title: 'Contact Us | Resume PRO',
    description: 'Get in touch with Resume PRO. We\'re here to help with any questions about our resume builder, subscriptions, or support.',
    canonicalUrl: typeof window !== 'undefined' ? window.location?.href : '',
    openGraph: {
      title: 'Contact Us | Resume PRO',
      description: 'Get in touch with Resume PRO for support and inquiries.',
      type: 'website',
    },
  })

  useEffect(() => {
    injectJsonLd('contact-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Resume PRO',
      description: 'Contact page for Resume PRO support',
      publisher: {
        '@type': 'Organization',
        name: 'Resume PRO',
      },
    })
  }, [])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitizeInput = (input) => {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setToast({
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.',
      })
    } catch (error) {
      setSubmitStatus('error')
      setToast({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I want to contact you.`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            Contact <span className="text-royal-gold">Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Have questions? We'd love to hear from you. Send us a message or reach out on WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-royal-gold/20 to-transparent opacity-30 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-950/80 border px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 ${
                      errors.name
                        ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20'
                    }`}
                    placeholder="John Doe"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-950/80 border px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 ${
                      errors.email
                        ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20'
                    }`}
                    placeholder="john@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-slate-500">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-950/80 border px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 ${
                      errors.phone
                        ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20'
                    }`}
                    placeholder="+91 99899 89990"
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-slate-950/80 border px-4 py-3 text-sm text-white outline-none transition duration-200 appearance-none ${
                      errors.subject
                        ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20'
                    }`}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-slate-900">Select a subject</option>
                    <option value="General Inquiry" className="bg-slate-900">General Inquiry</option>
                    <option value="Technical Support" className="bg-slate-900">Technical Support</option>
                    <option value="Billing Question" className="bg-slate-900">Billing Question</option>
                    <option value="Feature Request" className="bg-slate-900">Feature Request</option>
                    <option value="Partnership" className="bg-slate-900">Partnership</option>
                    <option value="Other" className="bg-slate-900">Other</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full rounded-xl bg-slate-950/80 border px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 resize-none ${
                      errors.message
                        ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                        : 'border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20'
                    }`}
                    placeholder="Write your message here..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-royal-gold px-6 py-4 font-bold text-slate-950 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition group-hover:translate-x-1" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-green-400" role="status">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-400" role="alert">
                    <XCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              <p className="mt-2 text-slate-300">
                Prefer to reach out directly? Here's how you can contact us.
              </p>

              <div className="mt-6 space-y-5">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-royal-gold/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-300">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-royal-gold transition"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-white">Chat on WhatsApp</h2>
              <p className="mt-2 text-slate-300">
                Get quick responses during business hours.
              </p>

              <button
                onClick={openWhatsApp}
                className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <MessageCircle className="h-5 w-5 transition group-hover:scale-110" />
                Chat on WhatsApp
              </button>

              <p className="mt-3 text-center text-sm text-slate-400">
                Usually replies within 1-2 hours
              </p>
            </div>

            {/* Response Time */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gold/10 text-royal-gold">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Response Time</h3>
                  <p className="mt-1 text-slate-300">
                    We typically respond within 24 hours during business days (Monday - Saturday, 9 AM - 6 PM IST).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
            toast.type === 'success'
              ? 'border-green-400/30 bg-green-400/10 text-green-400'
              : 'border-red-400/30 bg-red-400/10 text-red-400'
          }`}
          role="status"
        >
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  )
}