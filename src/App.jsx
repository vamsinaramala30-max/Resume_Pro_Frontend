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
import { cn } from './components/ui/Button'

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
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isAuthRoute ? (
          <TopNav user={user} theme={theme} toggleTheme={toggleTheme} onLogout={onLogout} />
        ) : null}

        <main
          className={cn(
            'relative flex-1',
            !isAuthRoute && 'pt-[calc(var(--nav-height)+var(--section-spacing-mobile))] md:pt-[calc(var(--nav-height)+var(--section-spacing-tablet))] lg:pt-[calc(var(--nav-height)+var(--section-spacing-desktop))] pb-[var(--section-spacing-mobile)] md:pb-[var(--section-spacing-tablet)] lg:pb-[var(--section-spacing-desktop)] layout-container'
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={cn("relative w-full", isAuthRoute && "flex-1 flex flex-col")}
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



