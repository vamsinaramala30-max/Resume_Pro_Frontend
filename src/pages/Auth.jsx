import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingButton from '../components/LoadingButton.jsx'
import FloatingInput from '../components/FloatingInput.jsx'

import { apiLogin, apiRegister } from '../lib/api.js'
import { isValidEmail } from '../lib/validators.js'
import { readJSON, removeKey, writeJSON, STORAGE_KEYS } from '../lib/storage.js'

function strengthScore(pw) {
  const s = String(pw || '')
  let score = 0
  if (s.length >= 8) score += 30
  if (/[A-Z]/.test(s)) score += 20
  if (/[0-9]/.test(s)) score += 20
  if (/[^A-Za-z0-9]/.test(s)) score += 20
  if (s.length >= 12) score += 10
  return Math.min(100, score)
}

function barColor(score) {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-royal-gold'
  return 'bg-red-500'
}

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [forgot, setForgot] = useState(false)

  const [to, setTo] = useState({ type: '', title: '', message: '' })

  const score = useMemo(() => strengthScore(password), [password])

  const navigate = useNavigate()

  useEffect(() => {
    const auth = readJSON(STORAGE_KEYS.auth, null)
    if (auth?.token && (rememberMe || auth.rememberMe)) {
      onAuthed(auth)
      navigate('/select', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validate = () => {
    if (!email.trim()) return 'Email is required'
    if (!isValidEmail(email)) return 'Enter a valid email'
    if (!password.trim()) return 'Password is required'
    if (mode === 'register' && !name.trim()) return 'Name is required'
    if (mode === 'register' && password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const showMsg = (type, title, message) => setTo({ type, title, message })

  async function submit() {
    const err = validate()
    if (err) return showMsg('error', 'Validation', err)

    setLoading(true)
    try {
      if (mode === 'register') {
        await apiRegister({ name, email, password })
        showMsg('success', 'Success', 'Registered. Please login.')
        setMode('login')
      } else {
        const data = await apiLogin({ email, password })
        const auth = {
          token: data.token,
          email,
          rememberMe,
          createdAt: Date.now(),
        }
        writeJSON(STORAGE_KEYS.auth, auth)
        onAuthed(auth)
      }
    } catch (e) {
      const message = e?.message || 'Please try again'
      showMsg('error', 'Auth failed', message)
      if (!rememberMe) removeKey(STORAGE_KEYS.auth)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.12),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(96,165,250,0.12),transparent_25%),linear-gradient(180deg,#020617,#050b17)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
              Premium resume workspace
            </div>
            <div className="space-y-4 max-w-xl">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
                Secure login for your modern resume workflow.
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Sign in to access your saved drafts, premium templates, instant preview, and polished PDF export. Built for professionals who want a better job application experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Live Preview', description: 'See resume updates instantly.' },
                { title: 'Premium Templates', description: 'Choose polished designs.' },
                { title: 'Secure Save', description: 'Your draft restores on refresh.' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
                  <div className="text-3xl">✨</div>
                  <div className="mt-3 text-sm font-bold text-white">{item.title}</div>
                  <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-6 space-y-3">
              <div className="text-3xl font-black text-white">{mode === 'register' ? 'Create an account' : 'Welcome back'}</div>
              <p className="text-sm text-slate-300">
                {mode === 'register'
                  ? 'Register to unlock saved resumes, premium layouts, and export features.'
                  : 'Login to continue editing your resume and download polished PDF exports.'}
              </p>
            </div>

            <div className="flex gap-3 mb-6 rounded-3xl bg-slate-950/70 p-2 border border-white/10">
              <button
                className={`flex-1 rounded-2xl py-3 text-sm font-bold transition ${
                  mode === 'login'
                    ? 'bg-royal-gold text-royal-navy shadow-lg'
                    : 'text-slate-200 hover:text-white'
                }`}
                onClick={() => {
                  setMode('login')
                  setForgot(false)
                }}
              >
                Login
              </button>
              <button
                className={`flex-1 rounded-2xl py-3 text-sm font-bold transition ${
                  mode === 'register'
                    ? 'bg-royal-gold text-royal-navy shadow-lg'
                    : 'text-slate-200 hover:text-white'
                }`}
                onClick={() => {
                  setMode('register')
                  setForgot(false)
                }}
              >
                Register
              </button>
            </div>

            {forgot ? (
              <div className="space-y-5">
                <div className="text-xl font-black">Forgot Password</div>
                <p className="text-slate-300 text-sm">
                  This demo stores users locally in the browser. Password resets are not wired in this snapshot.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <LoadingButton onClick={() => setForgot(false)} loading={false} type="button">
                    Back to login
                  </LoadingButton>
                  <button
                    type="button"
                    onClick={() => showMsg('success', 'Info', 'Reset flow is disabled in this version.')}
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-bold text-white hover:border-royal-gold transition"
                  >
                    Request reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {mode === 'register' ? (
                  <FloatingInput
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    autoComplete="name"
                  />
                ) : null}

                <FloatingInput
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  type="email"
                  autoComplete="email"
                />

                <div className="space-y-3">
                  <label className="block relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-all pointer-events-none ${
                      password ? '-top-2.5 text-royal-gold' : 'text-slate-400'
                    }`}>
                      Password
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" "
                      className="w-full rounded-2xl bg-black/20 border border-white/15 px-4 pt-6 pb-3 text-white outline-none focus:border-royal-gold"
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-200 hover:text-white transition"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </label>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div style={{ width: `${score}%` }} className={`h-2 ${barColor(score)}`} />
                  </div>
                  <p className="text-xs text-slate-300">Password strength: {score}%</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-3 text-sm text-slate-200/90 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 accent-royal-gold"
                    />
                    Remember me
                  </label>
                  <button
                    onClick={() => setForgot(true)}
                    className="text-sm text-slate-200/90 hover:text-royal-gold transition"
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>

                <LoadingButton onClick={submit} loading={loading} type="button" disabled={loading}>
                  {mode === 'register' ? 'Create Account' : 'Login'}
                </LoadingButton>

                {to?.type ? (
                  <div className={`text-sm ${to.type === 'error' ? 'text-red-300' : to.type === 'success' ? 'text-emerald-300' : 'text-slate-200'}`}>
                    <span className="font-semibold">{to.title}:</span> {to.message}
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}


