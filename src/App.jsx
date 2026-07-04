import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'

// Enable React Router v7 future flags for v7 behavior
const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}
import { AnimatePresence, motion } from 'framer-motion'

import header from './components/landing/HeroHeader.jsx'
import GlobalHeader from './components/GlobalHeader.jsx'
import Footer from './components/Footer.jsx'
import AuthGuard from './components/AuthGuard.jsx'
import ToastLayer from './components/ToastLayer.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import NotFound from './pages/NotFound.jsx'
import { readJSON, removeKey, writeJSON, STORAGE_KEYS } from './lib/storage.js'
import { apiMe, apiLogout } from './lib/api.js'

// Lazy loaded pages
const Auth = lazy(() => import('./pages/Auth.jsx'))
const OtpVerify = lazy(() => import('./pages/OtpVerify.jsx'))
const SelectPlan = lazy(() => import('./pages/SelectPlan.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const NormalForm = lazy(() => import('./pages/normal/NormalForm.jsx'))
const NormalPreview = lazy(() => import('./pages/normal/NormalPreview.jsx'))
const NormalDownload = lazy(() => import('./pages/normal/NormalDownload.jsx'))
const PremiumDashboard = lazy(() => import('./pages/premium/PremiumDashboard.jsx'))
const PremiumForm = lazy(() => import('./pages/premium/PremiumForm.jsx'))
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
const Builder = lazy(() => import('./pages/Builder.jsx'))
const ChatBotAIAssistant = lazy(() => import('./components/ai/ChatBotAIAssistant.jsx'))

import './index.css'

function AppShell() {
  // Router hooks - MUST be called first
  const location = useLocation()
  const navigate = useNavigate()

  // State hooks - MUST be called unconditionally
  const [user, setUser] = useState(null)
  const [toasts, setToasts] = useState([])
  const [authLoading, setAuthLoading] = useState(true)

  // Memo hook - unconditional
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

  // Effect for auth verification - runs on mount
  useEffect(() => {
    async function verifyAuth() {
      const auth = readJSON(STORAGE_KEYS.auth, null)
      if (!auth?.token) {
        setAuthLoading(false)
        return
      }

      try {
        const response = await apiMe(auth.token)
        if (response.ok && response.user) {
          setUser({
            token: auth.token,
            user: response.user,
            rememberMe: auth.rememberMe,
            createdAt: auth.createdAt,
          })
          console.log('Auth verified:', response.user)
        } else {
          console.log('Token invalid, clearing auth')
          removeKey(STORAGE_KEYS.auth)
        }
      } catch (err) {
        console.error('Auth verification failed:', err.message)
        removeKey(STORAGE_KEYS.auth)
      } finally {
        setAuthLoading(false)
      }
    }

    verifyAuth()
  }, [])

  // Effect for toast handling - MUST run unconditionally
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

  // Handler functions
  const onLogout = async () => {
    try {
      // Call backend logout API
      await apiLogout()
    } catch (err) {
      // Ignore API errors - still clear local auth
    }
    removeKey(STORAGE_KEYS.auth)
    sessionStorage.clear()
    setUser(null)
    showToast('success', 'Logged out', 'You have been signed out.')
    navigate('/auth', { replace: true })
  }

  // Derived values - computed after all hooks
  const isAuthRoute = location.pathname === '/auth'

  // Render loading state - uses conditional rendering AFTER all hooks
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

  // Main render - ALL hooks called before this point
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-royal-gold/25 blur-3xl animate-blob" />
        <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl animate-blob animation-delay-4000" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(197,160,89,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),transparent_22%)]" />
      </div>

      <div className="relative z-10">
        <GlobalHeader
          user={user?.user}
          onLogout={onLogout}
        />
        <main className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative"
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
                    <Route path="/" element={<Home />} />

                    {/* OTP Verification Route */}
                    <Route
                      path="/verify"
                      element={
                        <OtpVerify />
                      }
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
                    <Route path="/resume-builder" element={<Builder user={user?.user} showToast={showToast} />} />
                    <Route path="/builder" element={<Builder user={user?.user} showToast={showToast} />} />

                    <Route path="*" element={<NotFound />} />


                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {!isAuthRoute ? <Footer /> : null}
      </div>

      <ToastLayer
        toasts={toasts}
        onRemove={(id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))}
      />

      {/* Floating AI Chat Assistant - outside main content area */}
      {!isAuthRoute && <ChatBotAIAssistant />}
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