import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { removeItem, STORAGE_KEYS } from '../lib/storage.js'
import { apiLogout } from '../lib/api.js'
import { isPremiumUser } from '../lib/premium.js'
import {
  LogOut,
  User,
  FileText,
  Crown,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
  Plus,
  BarChart3,
  CreditCard,
  Moon,
  Sun,
  Monitor,
  Keyboard,
} from 'lucide-react'

// Menu items for authenticated users
const MENU_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/premium/dashboard' },
  { id: 'resumes', label: 'My Resumes', icon: FileText, href: '/resumes' },
  { id: 'templates', label: 'Templates', icon: FileText, href: '/templates' },
  { id: 'builder', label: 'New Resume', icon: Plus, href: '/builder' },
]

const SETTINGS_ITEMS = [
  { id: 'premium', label: 'Premium', icon: Crown, href: '/plans' },
  { id: 'billing', label: 'Billing', icon: CreditCard, href: '/select-plan' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { id: 'help', label: 'Help Center', icon: HelpCircle, href: '/help' },
]

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapRef = useRef(null)
  const navigate = useNavigate()

  // Close on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // Close on user change
  useEffect(() => {
    setOpen(false)
  }, [user])

  // Get user initial
  const initial = useMemo(() => {
    const name = user?.name || user?.email || 'U'
    return String(name).trim().slice(0, 1).toUpperCase()
  }, [user])

  // Handle logout
  const handleLogout = async () => {
    setLoading(true)
    try {
      await apiLogout()
    } catch (e) {
      // Ignore
    }
    removeItem(STORAGE_KEYS.auth)
    onLogout?.()
    navigate('/auth')
  }

  // Check if user is premium
  const isPremium = isPremiumUser(user)

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-2 rounded-2xl bg-surface-elevated border border-border px-3 text-foreground transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2"
        aria-label="User menu"
        aria-expanded={open}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary font-bold">
          {user ? initial : <User className="h-4 w-4" />}
        </span>
        <span className="hidden lg:inline text-sm font-semibold text-foreground">Account</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-72 overflow-hidden rounded-3xl border border-border bg-card shadow-card-hover"
          >
            {/* User Info Header */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-black text-slate-900">
                    {initial}
                  </div>
                  {isPremium && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
                      <Crown className="h-2.5 w-2.5 text-slate-900" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">
                    {user?.name || user?.email || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || ''}
                  </p>
                  {isPremium ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <Crown className="h-3 w-3" />
                      Premium
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Free Plan</span>
                  )}
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Main Menu Items */}
            <div className="p-2">
              {user ? (
                <>
                  {MENU_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-surface-elevated transition"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    )
                  })}
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-amber-400">
                    <User className="h-4 w-4" />
                  </span>
                  Sign in
                </Link>
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Settings Section */}
            <div className="p-2">
              {user ? (
                <>
                  {SETTINGS_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-surface-elevated transition"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated text-muted-foreground">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    )
                  })}
                </>
              ) : (
                <Link
                  to="/help"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5 transition"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <span className="flex-1">Help Center</span>
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                </Link>
              )}
            </div>

            {/* Logout */}
            {user && (
              <>
                <div className="h-px bg-white/10" />
                <div className="p-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      <LogOut className="h-4 w-4" />
                    </span>
                    <span className="flex-1">Log out</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}