import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { isPremiumUser } from '../lib/premium.js'
import {
  Home,
  User,
  Settings,
  LogOut,
  Crown,
  Bell,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Layout,
  Star,
  FileSignature,
  Zap,
  Sun,
  Moon,
} from 'lucide-react'

const dropdownVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', duration: 0.25, bounce: 0.1 }
  },
  exit: { opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.15 } }
}

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { height: { type: 'spring', duration: 0.3, bounce: 0 }, opacity: { duration: 0.2 } }
  },
  exit: { height: 0, opacity: 0, transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } } }
}

function NotificationPanel({ notifications = [], onMarkRead, onMarkAllRead }) {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden z-50"
    >
      <div className="flex items-center justify-between border-b border-border p-4 bg-card/50 backdrop-blur-md">
        <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
        {unreadCount > 0 && onMarkAllRead && (
          <button
            onClick={(e) => { e.stopPropagation(); onMarkAllRead(); }}
            className="text-xs font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
        {unreadCount === 0 && notifications.length === 0 ? (
          <div className="p-8 text-center text-muted">
            <Bell className="mx-auto h-8 w-8 mb-2 opacity-30" />
            <p className="text-xs font-medium">All caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkRead?.(notif.id)}
              className={`p-4 hover:bg-surface-hover cursor-pointer transition-colors relative ${!notif.read ? 'bg-primary/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                {!notif.read && (
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium text-foreground truncate ${!notif.read ? 'font-semibold' : ''}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-muted line-clamp-2 mt-0.5">{notif.message}</p>
                  <p className="text-[10px] text-muted/80 mt-1.5 font-medium">{notif.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}

function UserMenuDropdown({ user, isPremium, onLogout, onClose }) {
  const menuItems = [
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/resumes', label: 'My Resumes', icon: FileSignature },
  ]

  if (isPremium) {
    menuItems.push({ to: '/premium/dashboard', label: 'Subscription Status', icon: Crown })
  }

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-border bg-card p-2 shadow-2xl z-50"
    >
      <div className="border-b border-border px-3 py-3 mb-1">
        <div className="text-sm font-semibold text-foreground truncate">{user?.name || 'User Profile'}</div>
        <div className="text-xs text-muted truncate mt-0.5">{user?.email}</div>
        {isPremium && (
          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2 py-1 text-[11px] font-semibold text-primary w-fit">
            <Star className="h-3 w-3 fill-primary" />
            Premium Member
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-surface-hover hover:text-foreground transition-all group"
          >
            <item.icon className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-border mt-1 pt-1">
        <button
          onClick={() => { onClose(); onLogout(); }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </motion.div>
  )
}

function UserAvatar({ user, onClick, active }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <button
      onClick={onClick}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-slate-950 transition-all hover:scale-105 cursor-pointer ring-offset-2 ring-offset-background focus:outline-none ${active ? 'ring-2 ring-amber-400' : 'hover:ring-2 hover:ring-amber-400/50'
        }`}
      aria-label="Toggle user panel"
    >
      <span className="relative z-10">{initial}</span>
    </button>
  )
}

export default function GlobalHeader({ user, onLogout, theme, toggleTheme }) {
  const location = useLocation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifPanelOpen, setNotifPanelOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  const userMenuRef = useRef(null)
  const notifPanelRef = useRef(null)

  const isPremium = isPremiumUser(user)

  useEffect(() => {
    const NOTIF_KEY = 'royalNotifications'
    try {
      const stored = localStorage.getItem(NOTIF_KEY)
      if (stored) {
        setNotifications(JSON.parse(stored))
      } else {
        const defaults = [
          { id: 1, title: 'Welcome to Resume PRO', message: 'Start building your professional resume today!', time: 'Just now', read: false },
          { id: 2, title: 'Template Update', message: 'New premium templates available', time: '2 hours ago', read: false },
          { id: 3, title: 'Premium Feature', message: 'Unlock AI-powered suggestions', time: '1 day ago', read: true },
        ]
        localStorage.setItem(NOTIF_KEY, JSON.stringify(defaults))
        setNotifications(defaults)
      }
    } catch (e) {
      console.error('Failed to load notifications:', e)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
      if (notifPanelRef.current && !notifPanelRef.current.contains(e.target)) {
        setNotifPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setUserMenuOpen(false)
        setNotifPanelOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleMarkRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n)
    setNotifications(updated)
    localStorage.setItem('royalNotifications', JSON.stringify(updated))
  }

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    localStorage.setItem('royalNotifications', JSON.stringify(updated))
  }

  const navLinks = user
    ? [
      { to: '/resumes', label: 'My Resumes', icon: FileSignature },
      { to: '/resume-builder', label: 'AI Builder', icon: Sparkles },
      { to: '/templates', label: 'Templates', icon: Layout },
    ]
    : [
      { to: '/', label: 'Home', icon: Home },
      { to: '/templates', label: 'Templates', icon: Layout },
      { to: '/plans', label: 'Plans', icon: Zap },
    ]

  const hasUnread = notifications.some(n => !n.read)

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-50 rounded-2xl border border-border bg-card/75 backdrop-blur-xl shadow-2xl transition-all duration-300">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6">
        <Link to={user ? '/select' : '/'} className="flex items-center gap-2.5 group focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-amber-400 transition-all group-hover:bg-amber-500/20 group-hover:scale-105 ring-1 ring-amber-500/20 overflow-hidden p-1">
            <img src="/resumePro.png" alt="Resume PRO Icon" className="h-full w-full object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Resume <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">PRO</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative rounded-xl px-4 py-2 text-sm font-medium transition-all focus:outline-none flex items-center gap-2 ${isActive ? 'text-foreground font-semibold' : 'text-muted hover:text-foreground'
                  }`}
              >
                <link.icon className={`h-4 w-4 transition-colors ${isActive ? 'text-primary' : 'text-muted group-hover:text-foreground'}`} />
                <span className="relative z-10">{link.label}</span>
                <span className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-primary transition-all duration-300 rounded-full ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                  }`} />
                {isActive && (
                  <motion.span layoutId="desktop-nav-pill" className="absolute inset-0 rounded-xl bg-foreground/5" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isPremium && (
            <Link
              to="/premium/dashboard"
              className="hidden items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/10 hover:brightness-110 transition-all sm:flex"
            >
              <Crown className="h-3 w-3 fill-slate-950" />
              PRO
            </Link>
          )}
          {toggleTheme && (

            <button

              onClick={toggleTheme}

              className="rounded-xl p-2.5 text-muted hover:bg-surface-hover hover:text-foreground transition-all focus:outline-none"

              aria-label="Toggle theme"

            >

              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}

            </button>

          )}
          {!isPremium && user && (
            <Link
              to="/plans"
              className="hidden items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 text-xs font-bold text-primary transition-all sm:flex"
            >
              <Zap className="h-3 w-3 fill-primary/20 animate-pulse text-primary" />
              Upgrade to PRO
            </Link>
          )}


          <div className="relative" ref={notifPanelRef}>
            <button
               onClick={() => { setNotifPanelOpen(!notifPanelOpen); setUserMenuOpen(false); }}
               className={`relative rounded-xl p-2.5 text-muted hover:bg-surface-hover hover:text-foreground transition-all focus:outline-none ${notifPanelOpen ? 'bg-surface-hover text-foreground' : ''
                 }`}
              aria-label="View notifications"
              aria-expanded={notifPanelOpen}
              aria-haspopup="true"
            >
              <Bell className="h-4 w-4" />
              {hasUnread && (
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {notifPanelOpen && (
                <NotificationPanel
                  notifications={notifications}
                  onMarkRead={handleMarkRead}
                  onMarkAllRead={handleMarkAllRead}
                />
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="relative flex items-center" ref={userMenuRef}>
              <div className="flex items-center gap-1">
                <UserAvatar user={user} active={userMenuOpen} onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifPanelOpen(false); }} />
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifPanelOpen(false); }}
                  className="hidden sm:flex p-1 rounded-lg text-muted hover:text-foreground transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {userMenuOpen && (
                  <UserMenuDropdown
                    user={user}
                    isPremium={isPremium}
                    onLogout={onLogout}
                    onClose={() => setUserMenuOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/10 hover:bg-primary-hover transition-all focus:outline-none"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-muted hover:bg-surface-hover hover:text-foreground md:hidden focus:outline-none transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-border bg-card/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                      ? 'bg-surface-hover text-foreground font-semibold'
                      : 'text-muted hover:bg-surface-hover hover:text-foreground'
                      }`}
                  >
                    <link.icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted'}`} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}

              {!user && (
                <Link
                  to="/auth"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}