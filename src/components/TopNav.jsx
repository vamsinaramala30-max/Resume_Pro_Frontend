import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, UserCircle2, LogOut, Moon, Sun, Sparkles } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

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
]

export default function TopNav({ user, onLogout, theme, toggleTheme }) {
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
    <header className="fixed top-0 left-0 right-0 z-[1500]">
      <div className="layout-container pt-4">
        <nav className="rounded-full border border-border bg-surface/70 backdrop-blur-xl shadow-elevation-2 px-5 py-3 transition-colors">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 text-base font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">R</span>
              Resume PRO
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1 mr-2">
                {navItems.map((item) => (
                  <Button key={item.to} asChild variant="ghost" className="rounded-full text-sm font-semibold">
                    <Link to={item.to}>{item.label}</Link>
                  </Button>
                ))}
              </div>



              <div className="relative" ref={profileRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="rounded-full"
                  aria-label="Open profile menu"
                >
                  <UserCircle2 className="h-5 w-5 text-foreground/80" />
                </Button>

                <AnimatePresence>
                  {profileOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-50 mt-3 w-72 origin-top-right"
                    >
                      <Card className="p-4 shadow-elevation-4 border-border">
                        <div className="mb-3 rounded-xl bg-surface-elevated px-4 py-3 text-sm text-foreground/90 font-medium">
                          {user?.email || 'Guest Member'}
                        </div>
                        {profileSections.map((section) => (
                          <div key={section.title} className="mb-4 last:mb-2">
                            <div className="mb-2 text-xs uppercase tracking-widest text-primary font-bold px-2">{section.title}</div>
                            <div className="space-y-1">
                              {section.links.map((link) => (
                                <Link
                                  key={link.to}
                                  to={link.to}
                                  onClick={() => setProfileOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-foreground"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            variant="destructive"
                            className="w-full justify-start rounded-xl"
                            onClick={() => {
                              setProfileOpen(false)
                              onLogout()
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen((value) => !value)}
                className="rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <ChevronDown className={`h-5 w-5 text-foreground/80 transition-transform duration-normal ${menuOpen ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={wrapRef}
              className="mt-4 origin-top lg:hidden"
            >
              <Card className="p-4 border-border shadow-elevation-3">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Button key={item.to} asChild variant="ghost" className="w-full justify-start rounded-xl">
                      <Link to={item.to} onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
