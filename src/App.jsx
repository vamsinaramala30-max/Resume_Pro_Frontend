import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const Auth = lazy(() => import('./pages/Auth.jsx'))
const SelectPlan = lazy(() => import('./pages/SelectPlan.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const NormalForm = lazy(() => import('./pages/normal/NormalForm.jsx'))
const NormalPreview = lazy(() => import('./pages/normal/NormalPreview.jsx'))
const NormalDownload = lazy(() => import('./pages/normal/NormalDownload.jsx'))
const PremiumDashboard = lazy(() => import('./pages/premium/PremiumDashboard.jsx'))
const PremiumForm = lazy(() => import('./pages/premium/PremiumForm.jsx'))

import TopNav from './components/TopNav.jsx'
import Footer from './components/Footer.jsx'
import AuthGuard from './components/AuthGuard.jsx'
import ToastLayer from './components/ToastLayer.jsx'

import { readJSON, removeKey, STORAGE_KEYS } from './lib/storage.js'

import './index.css'

function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()

  const [theme, setTheme] = useState(() => localStorage.getItem('royalTheme') || 'dark')
  const [user, setUser] = useState(null)
  const [toasts, setToasts] = useState([])

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
    const auth = readJSON(STORAGE_KEYS.auth, null)
    if (auth?.token) setUser(auth)
  }, [])

  useEffect(() => {
    const handleToast = (event) => {
      const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const toast = { id, ...event.detail }
      setToasts((prev) => [toast, ...prev])
      window.setTimeout(() => {
        setToasts((prevState) => prevState.filter((item) => item.id !== id))
      }, 5000)
    }

    window.addEventListener('royal-toast', handleToast)
    return () => window.removeEventListener('royal-toast', handleToast)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem('royalTheme', theme)
  }, [theme])

  const onLogout = () => {
    removeKey(STORAGE_KEYS.auth)
    setUser(null)
    showToast('success', 'Logged out', 'You have been signed out.')
    navigate('/auth', { replace: true })
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const isAuthRoute = location.pathname === '/auth'

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-royal-gold/25 blur-3xl animate-blob" />
        <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl animate-blob animation-delay-4000" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(197,160,89,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),transparent_22%)]" />
      </div>

      <div className="relative z-10">
        {!isAuthRoute ? (
          <TopNav user={user} theme={theme} toggleTheme={toggleTheme} onLogout={onLogout} />
        ) : null}

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
              <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-slate-300">Loading page…</div>}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
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
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {!isAuthRoute ? <Footer /> : null}
      </div>

      <ToastLayer toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))} />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}



