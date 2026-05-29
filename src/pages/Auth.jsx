import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Eye, EyeOff, ShieldCheck, Sparkles, Save } from 'lucide-react'

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
  if (score >= 80) return 'bg-success'
  if (score >= 50) return 'bg-warning'
  return 'bg-error'
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
  const [errors, setErrors] = useState({})

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
    const newErrors = {}
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!isValidEmail(email)) newErrors.email = 'Enter a valid email'
    
    if (!password.trim()) newErrors.password = 'Password is required'
    else if (mode === 'register' && password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    if (mode === 'register' && !name.trim()) newErrors.name = 'Name is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const showMsg = (type, title, message) => setTo({ type, title, message })

  async function submit(e) {
    if (e) e.preventDefault()
    
    if (validate()) return

    setLoading(true)
    setTo({ type: '', title: '', message: '' })
    
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
    <div className="flex-1 flex w-full justify-center py-[var(--section-spacing-desktop)] px-[var(--page-padding-inline)] z-10 relative">
      <div className="max-w-6xl w-full grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
        
        {/* Left Side Details */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/20 shadow-elevation-1">
            <Sparkles className="h-4 w-4" /> Premium Workspace
          </div>
          <div className="space-y-4">
            <h1 className="text-h2 sm:text-h1 font-black tracking-tight text-foreground">
              Secure login for your modern resume workflow.
            </h1>
            <p className="text-body-large text-foreground/70 max-w-xl mx-auto lg:mx-0">
              Sign in to access your saved drafts, premium templates, instant preview, and polished PDF export. Built for professionals who want a better job application experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto lg:mx-0">
            {[
              { icon: Eye, title: 'Live Preview', description: 'See updates instantly.' },
              { icon: Sparkles, title: 'Premium Layouts', description: 'Polished ATS designs.' },
              { icon: Save, title: 'Secure Save', description: 'Drafts restore instantly.' },
            ].map((item) => (
              <Card key={item.title} className="bg-surface/50 border-white/5 shadow-none">
                <CardContent className="p-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-bold text-foreground">{item.title}</div>
                  <p className="mt-1 text-xs text-foreground/70">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-elevation-4 border-border overflow-hidden">
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex gap-2 rounded-xl bg-surface-elevated p-1.5 border border-border">
                <button
                  type="button"
                  className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                    mode === 'login'
                      ? 'bg-surface text-foreground shadow-elevation-1'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  onClick={() => { setMode('login'); setForgot(false); setErrors({}); setTo({}); }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${
                    mode === 'register'
                      ? 'bg-surface text-foreground shadow-elevation-1'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  onClick={() => { setMode('register'); setForgot(false); setErrors({}); setTo({}); }}
                >
                  Register
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {forgot ? (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2 text-center">
                      <CardTitle>Forgot Password</CardTitle>
                      <CardDescription>
                        This demo stores users locally. Password resets are disabled.
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="button" variant="outline" onClick={() => setForgot(false)}>
                        Back to login
                      </Button>
                      <Button
                        type="button"
                        onClick={() => showMsg('success', 'Info', 'Reset flow is disabled.')}
                      >
                        Request reset
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onSubmit={submit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="space-y-2 text-center pb-2">
                      <CardTitle className="text-h4">{mode === 'register' ? 'Create an account' : 'Welcome back'}</CardTitle>
                      <CardDescription>
                        {mode === 'register'
                          ? 'Register to unlock saved resumes and premium features.'
                          : 'Login to continue editing and download your PDF.'}
                      </CardDescription>
                    </div>

                    <div className="space-y-4">
                      {mode === 'register' && (
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setErrors(prev => ({...prev, name: ''})) }}
                            placeholder="John Doe"
                            autoComplete="name"
                            error={errors.name}
                          />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: ''})) }}
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          error={errors.email}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({...prev, password: ''})) }}
                            placeholder="••••••••"
                            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            error={errors.password}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {mode === 'register' && password && (
                          <div className="pt-3 pb-1">
                            <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                              <div style={{ width: `${score}%` }} className={`h-full transition-all duration-300 ${barColor(score)}`} />
                            </div>
                            <p className="mt-1.5 text-xs text-foreground/60">Strength: {score}%</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className="h-4 w-4 rounded border border-border bg-surface transition-colors peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"></div>
                          {rememberMe && <ShieldCheck className="absolute h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">Remember me</span>
                      </label>
                      <button
                        onClick={() => setForgot(true)}
                        className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        type="button"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {to?.type && (
                      <div className={`text-sm p-3 rounded-md border ${
                        to.type === 'error' ? 'bg-error/10 border-error/20 text-error' : 
                        to.type === 'success' ? 'bg-success/10 border-success/20 text-success' : 
                        'bg-surface-elevated border-border text-foreground'
                      }`}>
                        <span className="font-semibold">{to.title}:</span> {to.message}
                      </div>
                    )}

                    <Button type="submit" isLoading={loading} className="w-full mt-2">
                      {mode === 'register' ? 'Create Account' : 'Login'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
