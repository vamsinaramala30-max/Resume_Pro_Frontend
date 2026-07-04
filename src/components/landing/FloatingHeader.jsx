import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Moon, Sun } from 'lucide-react'


const CrownMark = memo(function CrownMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-royal-gold/15 ring-1 ring-white/10 text-royal-gold shadow-[0_0_50px_rgba(197,160,89,0.25)]">
      👑
    </span>
  )
})

const ThemeIcon = memo(function ThemeIcon({ isDark }) {
  return isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
})

/**
 * Floating premium header only (no navbar links/menu).
 * - Sticky top: 20px
 * - Width: 92%, max-w 1400px
 * - Rounded-full glass card
 * - Right: theme toggle, profile/login, CTA "Get Started →"
 */
function FloatingHeader() {
  const navigate = useNavigate()

  const getStoredTheme = useCallback(() => {
    const saved = window.localStorage.getItem('theme-mode')
    return saved === 'light' || saved === 'dark' ? saved : 'dark'
  }, [])

  const themeMode = useMemo(() => getStoredTheme(), [getStoredTheme])
  const isDark = themeMode === 'dark'

  const cycleTheme = useCallback(() => {
    const curr = window.localStorage.getItem('theme-mode') || 'dark'
    const order = ['light', 'dark']
    const idx = order.indexOf(curr)
    const next = order[(idx + 1) % order.length] || 'dark'
    window.localStorage.setItem('theme-mode', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    // Force re-render without extra state complexity: reload icon state quickly.
    window.dispatchEvent(new Event('bb-theme-changed'))
  }, [])

  // Listen to theme changes so the icon updates.
  // Keep it minimal to avoid re-render loops.
  // Keep icon in sync without rerender loops.
  const [_, setTick] = useState(0)

  useEffect(() => {
    const onTheme = () => setTick((t) => t + 1)
    window.addEventListener('bb-theme-changed', onTheme)
    return () => window.removeEventListener('bb-theme-changed', onTheme)
  }, [])


  const onLogin = useCallback(() => navigate('/auth'), [navigate])

  const onGetStarted = useCallback(() => navigate('/auth'), [navigate])

  return (
    <header className="pointer-events-none sticky top-[20px] z-50 w-full mx-auto">
      <div className="w-[92%] max-w-[1400px] mx-auto pointer-events-auto">
        <div
          className="rounded-full bg-[rgba(2,6,23,0.55)] backdrop-blur-[20px] border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.35),0_0_60px_rgba(245,192,74,0.08)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left */}
            <div className="flex items-center gap-4">
              <CrownMark />
              <div className="leading-tight">
                <div className="text-lg font-black tracking-tight text-white">Resume PRO</div>
                <div className="text-xs text-slate-300">Futuristic SaaS resume builder</div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cycleTheme}
                className="inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
                aria-label="Toggle theme"
              >
                <ThemeIcon isDark={isDark} />
              </button>

              <button
                type="button"
                onClick={onLogin}
                className="inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-gold/70"
              >
                Login
              </button>

              {/* Primary CTA */}
              <Link
                to="/auth"
                onClick={(e) => {
                  e.preventDefault()
                  onGetStarted()
                }}
                className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F5C04A] via-[#EAB308] to-[#22D3EE] px-5 py-3 text-sm font-bold text-ink-950 shadow-[0_0_50px_rgba(197,160,89,0.25)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10 inline-flex items-center">
                  Get Started →
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.35)_40%,transparent_60%)] rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(FloatingHeader)
