import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from './components/ui/Button'

import Footer from './components/Footer.jsx'
import AuthGuard from './components/AuthGuard.jsx'
import ToastLayer from './components/ToastLayer.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import NotFound from './pages/NotFound.jsx'

import GlobalHeader from './components/GlobalHeader.jsx'

import { readJSON, writeJSON, removeKey, STORAGE_KEYS } from './lib/storage.js'
import { apiMe, apiLogout } from './lib/api.js'

import './index.css'

// Enable React Router v7 future flags for v7 behavior
const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

// Lazy loaded pages
const Auth = lazy(() => import('./pages/Auth.jsx'))
const OtpVerify = lazy(() => import('./pages/OtpVerify.jsx'))
const SelectPlan = lazy(() => import('./pages/SelectPlan.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const Plans = lazy(() => import('./pages/Plans.jsx'))
const Templates = lazy(() => import('./pages/Templates.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const HelpCenter = lazy(() => import('./pages/HelpCenter.jsx'))
const Documentation = lazy(() => import('./pages/Documentation.jsx'))
const FAQ = lazy(() => import('./pages/FAQ.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/policies/PrivacyPolicy.jsx'))
const TermsOfService = lazy(() => import('./pages/policies/TermsOfService.jsx'))
const CookiePolicy = lazy(() => import('./pages/policies/CookiePolicy.jsx'))
const RefundPolicy = lazy(() => import('./pages/policies/RefundPolicy.jsx'))
const SecurityPolicy = lazy(() => import('./pages/policies/SecurityPolicy.jsx'))

const NormalForm = lazy(() => import('./pages/normal/NormalForm.jsx'))
const NormalPreview = lazy(() => import('./pages/normal/NormalPreview.jsx'))
const NormalDownload = lazy(() => import('./pages/normal/NormalDownload.jsx'))

const PremiumDashboard = lazy(() => import('./pages/premium/PremiumDashboard.jsx'))
const PremiumForm = lazy(() => import('./pages/premium/PremiumForm.jsx'))

const MyResumes = lazy(() => import('./pages/MyResumes.jsx'))

const Builder = lazy(() => import('./pages/Builder.jsx'))
const ChatBotAIAssistant = lazy(() => import('./components/ai/ChatBotAIAssistant.jsx'))

function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [toasts, setToasts] = useState([])
  const [authLoading, setAuthLoading] = useState(true)

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const showToast = useMemo(
    () => (type, title, message) => {
      window.dispatchEvent(
        new CustomEvent('royal-toast', {
          detail: { type, title, message },
        }),
      )
    },
    [],
  )

  useEffect(() => {
    async function verifyAuth() {
      const auth = readJSON(STORAGE_KEYS.auth, null)
      if (!auth?.token) {
        setAuthLoading(false)
        return
      }

      // Optimistically log the user in using cached details
      if (auth.user) {
        setUser(auth)
      }

      try {
        const response = await apiMe(auth.token)
        if (response && response.user) {
          const updatedAuth = {
            ...auth,
            user: response.user,
          }
          setUser(updatedAuth)
          writeJSON(STORAGE_KEYS.auth, updatedAuth)
        }
      } catch (err) {
        console.error('Verify auth connection or validation error:', err)
        const isAuthError = err.message && (
          err.message.toLowerCase().includes('unauthorized') ||
          err.message.toLowerCase().includes('expired') ||
          err.message.toLowerCase().includes('invalid') ||
          err.message.toLowerCase().includes('not authenticated') ||
          err.message.toLowerCase().includes('jwt')
        )
        if (isAuthError) {
          removeKey(STORAGE_KEYS.auth)
          setUser(null)
        }
      } finally {
        setAuthLoading(false)
      }
    }

    verifyAuth()
  }, [])

  useEffect(() => {
    const handleToast = (event) => {
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const toast = { id, ...event.detail }
      setToasts((prev) => [toast, ...prev])
      window.setTimeout(() => {
        setToasts((prevState) => prevState.filter((item) => item.id !== id))
      }, 5000)
    }

    window.addEventListener('royal-toast', handleToast)
    return () => window.removeEventListener('royal-toast', handleToast)
  }, [])

  const onLogout = async () => {
    try {
      await apiLogout()
    } catch {
      // ignore
    }

    removeKey(STORAGE_KEYS.auth)
    sessionStorage.clear()
    setUser(null)
    showToast('success', 'Logged out', 'You have been signed out.')
    navigate('/auth', { replace: true })
  }

  const isAuthRoute = location.pathname === '/auth'

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <p className="text-sm text-slate-400">Verifying session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuthRoute ? (
          <GlobalHeader user={user?.user} onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} />
        ) : null}

        <main className={cn('relative flex-1 pt-28 pb-10 layout-container')}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={cn('relative w-full', isAuthRoute && 'flex-1 flex flex-col')}
            >
              <Suspense
                fallback={
                  <div className="min-h-[60vh] flex items-center justify-center text-slate-300">
                    Loading page...
                  </div>
                }
              >
                <ErrorBoundary>
                  <Routes location={location}>
                    <Route path="/" element={<Home user={user?.user} />} />

                    <Route
                      path="/verify"
                      element={<OtpVerify />}
                    />

                    <Route
                      path="/auth"
                      element={
                        <Auth
                          onAuthed={(auth) => {
                            setUser(auth)
                            showToast('success', 'Welcome', 'You are logged in.')
                            navigate('/select', { replace: true })
                          }}
                        />
                      }
                    />

                    <Route
                      path="/select"
                      element={
                        <AuthGuard>
                          <SelectPlan />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/normal"
                      element={
                        <AuthGuard>
                          <NormalForm />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/normal/preview"
                      element={
                        <AuthGuard>
                          <NormalPreview />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/normal/download"
                      element={
                        <AuthGuard>
                          <NormalDownload />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/premium"
                      element={
                        <AuthGuard>
                          <PremiumForm />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/premium/dashboard"
                      element={
                        <AuthGuard>
                          <PremiumDashboard />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/resumes"
                      element={
                        <AuthGuard>
                          <MyResumes />
                        </AuthGuard>
                      }
                    />

                    {/* Public routes */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/faq" element={<FAQ />} />

                    {/* Policies */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/cookie" element={<CookiePolicy />} />
                    <Route path="/refund" element={<RefundPolicy />} />
                    <Route path="/security" element={<SecurityPolicy />} />

                    {/* Account pages */}
                    <Route
                      path="/profile"
                      element={
                        <AuthGuard>
                          <Profile />
                        </AuthGuard>
                      }
                    />

                    <Route
                      path="/settings"
                      element={
                        <AuthGuard>
                          <Settings />
                        </AuthGuard>
                      }
                    />

                    {/* Legacy/compatibility */}
                    <Route
                      path="/resume-builder"
                      element={<Builder user={user?.user} showToast={showToast} />}
                    />
                    <Route
                      path="/builder"
                      element={<Builder user={user?.user} showToast={showToast} />}
                    />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {!isAuthRoute ? <Footer /> : null}
      </div>

      <ToastLayer toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {!isAuthRoute ? <ChatBotAIAssistant /> : null}
    </div>
  )
}

export default function App() {
  return (
    <Router future={routerFuture}>
      <AppShell />
    </Router>
  )
}

