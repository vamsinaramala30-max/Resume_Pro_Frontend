import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, UserCircle2, LogOut, Settings, Bookmark, User, Moon, Sun } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Plans', to: '/select' },
  { label: 'Builder', to: '/normal' },
  { label: 'Premium', to: '/premium' },
]

const profileSections = [
  {
    title: 'About Company',
    links: [
      { label: 'Career', to: '/#company' },
      { label: 'Blog', to: '/#blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', to: '/#help-center' },
      { label: 'How to create resume', to: '/#resume-guide' },
      { label: 'Privacy', to: '/#privacy' },
      { label: 'Terms', to: '/#terms' },
    ],
  },
]

export default function TopNav({ user, onLogout, theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const wrapRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && wrapRef.current.contains(e.target)) return
      if (profileRef.current && profileRef.current.contains(e.target)) return
      setMenuOpen(false)
      setProfileOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-[1500] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mt-3 rounded-[32px] border border-white/10 bg-slate-950/85 backdrop-blur-3xl shadow-2xl px-5 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 text-base font-black uppercase tracking-[0.25em] text-white">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-royal-gold/15 text-royal-gold">R</span>
              Resume PRO
            </Link>

            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-royal-gold/15 text-royal-gold">✨</span>
              Futuristic SaaS resume builder
            </div>

            <div className="ml-auto flex items-center gap-2">
              <nav className="hidden lg:flex items-center gap-3">
                {navItems.map((item) => (
                  <Link key={item.to} to={item.to} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-200 transition hover:border-royal-gold"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-200 transition hover:border-royal-gold"
                  aria-label="Open profile menu"
                >
                  <UserCircle2 className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {profileOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl"
                    >
                      <div className="mb-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                        {user?.email || 'Guest Member'}
                      </div>
                      {profileSections.map((section) => (
                        <div key={section.title} className="mb-3 last:mb-0">
                          <div className="mb-2 text-xs uppercase tracking-[0.3em] text-royal-gold">{section.title}</div>
                          <div className="space-y-1">
                            {section.links.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setProfileOpen(false)}
                                className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={onLogout}
                        className="mt-2 w-full rounded-2xl bg-rose-500/10 px-4 py-3 text-left text-sm font-semibold text-rose-300 transition hover:bg-rose-500/15"
                      >
                        <LogOut className="inline-block h-4 w-4 align-middle mr-2" /> Logout
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-200 transition hover:border-royal-gold lg:hidden"
                aria-label="Open menu"
              >
                <ChevronDown className={`h-5 w-5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                ref={wrapRef}
                className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}


