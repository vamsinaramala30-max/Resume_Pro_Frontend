import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
<<<<<<< HEAD
import { 
  Mail, Lock, User, ArrowRight, RefreshCw, 
  CheckCircle, XCircle, Sparkles, Eye, EyeOff, 
  Send, ArrowLeft 
} from 'lucide-react'

import LoadingButton from '../components/LoadingButton.jsx'
import FloatingInput from '../components/FloatingInput.jsx'
import {
  apiLogin,
  apiRegister,
  apiEmailLoginRequest,
  apiEmailLoginVerify,
  apiForgotPassword,
  apiResetPassword,
  apiVerifyEmail,
  apiResendVerify
} from '../lib/api.js'
=======
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Eye, EyeOff, ShieldCheck, Sparkles, Save } from 'lucide-react'

import { apiLogin, apiRegister } from '../lib/api.js'
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
import { isValidEmail } from '../lib/validators.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../lib/storage.js'

// --- Helper Utilities & Subcomponents ---

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.7 0 4.97-1 6.64-2.71l-3.57-2.77c-1.02.68-2.34 1.08-3.07 1.08-2.38 0-4.4-1.61-5.12-3.78H1.64v2.85C3.44 20.92 7.41 23 12 23z" fill="#34A853"/>
      <path d="M6.88 14.09c-.21-.63-.33-1.31-.33-2.09s.12-1.46.33-2.09V7.07H1.64C1.08 8.55.81 10.22.81 12s.27 3.45.83 4.93l2.85-2.22z" fill="#FBBC05"/>
      <path d="M12 4.58c1.32 0 2.52.45 3.45 1.35l2.77-2.77C16.97 1.78 14.7.75 12 0.75 7.41 2.56 3.44 5.64 1.64 10.11l2.85-2.22c.72 2.17 2.74 3.78 5.12 3.78z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.3.87.8 0 2.26-1.07 3.81-.91.65.03 2.32.33 3.5 1.26-2.9 1.73-2.38 5.98 0 7.13zm-3.21-14.5c.75-1 1.27-2.39 1.13-3.78-1.11.05-2.46.74-3.27 1.72-.73.87-1.37 2.29-1.2 3.66 1.24.09 2.51-.56 3.34-1.6z" />
    </svg>
  )
}

function strengthScore(pw) {
  const s = String(pw || '')
  let score = 0
  if (s.length >= 8) score += 25
  if (s.length >= 12) score += 15
  if (/[A-Z]/.test(s)) score += 15
  if (/[a-z]/.test(s)) score += 15
  if (/[0-9]/.test(s)) score += 15
  if (/[^A-Za-z0-9]/.test(s)) score += 20
  return Math.min(100, score)
}

function barColor(score) {
<<<<<<< HEAD
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 50) return 'bg-amber-500'
  return 'bg-red-500'
=======
  if (score >= 80) return 'bg-success'
  if (score >= 50) return 'bg-warning'
  return 'bg-error'
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 md:p-8 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-[-10%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
      />
    </div>
  )
}

function AuthTab({ active, onClick, children, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all duration-300 ${
        active
          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  )
}

function AuthMessage({ type, title, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-start gap-3 rounded-2xl border p-4 mb-4 ${
        type === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
          : type === 'error'
          ? 'border-red-500/30 bg-red-500/10 text-red-300'
          : 'border-sky-500/30 bg-sky-500/10 text-sky-300'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" />
      ) : type === 'error' ? (
        <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
      ) : (
        <Sparkles className="h-5 w-5 flex-shrink-0 text-sky-400" />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-slate-300 mt-0.5">{message}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-white flex-shrink-0 transition">
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}

// --- Main Auth Component ---

export default function Auth({ onAuthed }) {
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login', 'register', 'email-otp', 'forgot', 'reset-password'
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
<<<<<<< HEAD
  const [message, setMessage] = useState(null)
  const [otpCountdown, setOtpCountdown] = useState(0)

  const score = useMemo(() => strengthScore(password), [password])

  // REMOVED: Auto-login without verification causes false login state
  // Users must authenticate through proper flow now
=======
  const [forgot, setForgot] = useState(false)

  const [to, setTo] = useState({ type: '', title: '', message: '' })
  const [errors, setErrors] = useState({})

  const score = useMemo(() => strengthScore(password), [password])
  const navigate = useNavigate()
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb

  // OTP Countdown handling

  // OTP Countdown handling
  useEffect(() => {
    if (otpCountdown <= 0) return
    const timer = setInterval(() => {
      setOtpCountdown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [otpCountdown])

  const showMsg = useCallback((type, title, message) => {
    setMessage({ type, title, message })
  }, [])

<<<<<<< HEAD
  const validate = useCallback(() => {
    if (!email.trim()) return 'Email is required'
    if (!isValidEmail(email)) return 'Enter a valid email address'
    if (mode === 'login' && !password.trim()) return 'Password is required'
    if (mode === 'register' && !name.trim()) return 'Name is required'
    if (mode === 'register' && password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }, [email, password, name, mode])
=======
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
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb

  // --- Handlers ---

<<<<<<< HEAD
  async function handlePasswordLogin() {
    const err = validate()
    if (err) return showMsg('error', 'Validation Check', err)
=======
  async function submit(e) {
    if (e) e.preventDefault()
    
    if (validate()) return
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb

    setLoading(true)
    setTo({ type: '', title: '', message: '' })
    
    try {
      const data = await apiLogin({ email, password })
      const auth = { token: data.token, user: data.user, rememberMe, createdAt: Date.now() }
      writeJSON(STORAGE_KEYS.auth, auth)
      onAuthed(auth)
    } catch (e) {
      showMsg('error', 'Login Failed', e?.message || 'Please check your credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister() {
    const err = validate()
    if (err) return showMsg('error', 'Validation Check', err)

    setLoading(true)
    try {
      const data = await apiRegister({ name, email, password })

      // Check if email verification is required
      if (data.needsVerification) {
        showMsg('success', 'Registration Complete', 'Please verify your email. Check your inbox for the verification code.')
        changeMode('email-otp')
        setOtpCountdown(60)
        setLoading(false)
        return
      }

      // No verification needed - proceed directly
      const auth = { token: data.token, user: data.user, rememberMe, createdAt: Date.now() }
      writeJSON(STORAGE_KEYS.auth, auth)
      onAuthed(auth)
    } catch (e) {
      showMsg('error', 'Registration Failed', e?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailLoginRequest() {
    if (!email.trim() || !isValidEmail(email)) {
      return showMsg('error', 'Valid Email Required', 'Please provide a valid email before requesting a verification code.')
    }

    setLoading(true)
    try {
      await apiEmailLoginRequest({ email })
      showMsg('success', 'Code Dispatched', 'Check your inbox for a secure 6-digit access code.')
      setMode('email-otp')
      setOtpCountdown(60)
    } catch (e) {
      showMsg('error', 'Delivery Failed', e?.message || 'Could not send verification code. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailLoginVerify() {
    if (!otp.trim() || otp.length !== 6) {
      return showMsg('error', 'Verification Error', 'Please input the complete 6-digit confirmation code.')
    }

    setLoading(true)
    try {
      if (mode === 'email-otp') {
        // This could be either email login OR email verification after registration
        // Try email login first
        try {
          const data = await apiEmailLoginVerify({ email, otp, rememberMe })
          const auth = { token: data.token, user: data.user, rememberMe, createdAt: Date.now() }
          writeJSON(STORAGE_KEYS.auth, auth)
          onAuthed(auth)
          return
        } catch (loginErr) {
          // If login fails, try email verification
          if (loginErr.message?.includes('Invalid') || loginErr.message?.includes('expired')) {
            try {
              await apiVerifyEmail({ email, otp })
              showMsg('success', 'Email Verified', 'Your email has been verified. Please login to continue.')
              changeMode('login')
              setOtp('')
              return
            } catch (verifyErr) {
              throw verifyErr
            }
          }
          throw loginErr
        }
      } else {
        // Password reset (forgot password)
        const data = await apiEmailLoginVerify({ email, otp, rememberMe })
        const auth = { token: data.token, user: data.user, rememberMe, createdAt: Date.now() }
        writeJSON(STORAGE_KEYS.auth, auth)
        onAuthed(auth)
      }
    } catch (e) {
      showMsg('error', 'Authentication Failed', e?.message || 'The code entered is invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    if (!email.trim() || !isValidEmail(email)) {
      return showMsg('error', 'Valid Email Required', 'Please enter your account email to receive reset instructions.')
    }

    setLoading(true)
    try {
      await apiForgotPassword({ email })
      showMsg('success', 'Reset Code Sent', 'If that account exists, a temporary password recovery code has been sent.')
      setMode('reset-password')
      setOtpCountdown(60)
    } catch (e) {
      showMsg('error', 'Request Failed', e?.message || 'An error occurred triggering the password reset.')
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordReset() {
    if (!otp.trim() || otp.length !== 6) {
      return showMsg('error', 'Invalid Code', 'Please input your 6-digit security code.')
    }
    if (!password.trim() || password.length < 6) {
      return showMsg('error', 'Security Issue', 'Your new password must be at least 6 characters long.')
    }

    setLoading(true)
    try {
      await apiResetPassword({ email, otp, newPassword: password })
      showMsg('success', 'Password Updated', 'Your security parameters have been updated. You can now log in.')
      setMode('login')
      setPassword('')
      setOtp('')
    } catch (e) {
      showMsg('error', 'Reset Execution Error', e?.message || 'Failed to update credentials. Please crosscheck your token.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    switch (mode) {
      case 'login': return handlePasswordLogin()
      case 'register': return handleRegister()
      case 'email-otp': return handleEmailLoginVerify()
      case 'forgot': return handleForgotPassword()
      case 'reset-password': return handlePasswordReset()
      default: return handlePasswordLogin()
    }
  }

  const changeMode = (targetMode) => {
    setMode(targetMode)
    setMessage(null)
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.08),transparent_40%),radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.08),transparent_25%),linear-gradient(180deg,#020617,#090d1f)] text-white relative flex items-center justify-center py-12 px-4 selection:bg-amber-500/30 selection:text-white">
      <FloatingShapes />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          
          {/* Left: Interactive Info Column */}
          <div className="space-y-8 hidden lg:block pr-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-amber-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Premium Resume Workspace
            </motion.div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight leading-tight text-white xl:text-6xl">
                Secure login for your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
                  modern
                </span>{' '}
                workflow.
              </h1>
              <p className="text-slate-400 leading-relaxed text-base max-w-lg">
                Sign in to manage premium templates, restore dynamic drafts, and export production-ready, ATS-optimized data.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Live Preview', description: 'See structural layout variations rendering dynamically.', icon: '👁️' },
                { title: 'Premium Layouts', description: 'Access high-converting minimalist designs.', icon: '✨' },
                { title: 'Cloud Persistence', description: 'Progress is saved automatically to secure storage.', icon: '🔒' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="mt-2 text-sm font-bold text-slate-200">{item.title}</div>
                  <p className="mt-1 text-xs text-slate-400 leading-normal">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Authentication Control Panel */}
          <div className="flex flex-col w-full max-w-md mx-auto">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white mb-1.5">
                    {mode === 'login' && 'Welcome Back'}
                    {mode === 'register' && 'Create Account'}
                    {mode === 'email-otp' && 'Verify Identity'}
                    {mode === 'forgot' && 'Account Recovery'}
                    {mode === 'reset-password' && 'Choose Password'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {mode === 'login' && 'Access dashboard insights and continuous document updates.'}
                    {mode === 'register' && 'Unlock instant saving and custom structural styles.'}
                    {mode === 'email-otp' && `Enter the 6-digit workspace access code sent to ${email}`}
                    {mode === 'forgot' && 'Verify registration credentials to dispatch a reset sequence.'}
                    {mode === 'reset-password' && 'Establish uniform, updated credentials code authentication.'}
                  </p>
                </div>

                {/* Main Tabs */}
                {(mode === 'login' || mode === 'register') && (
                  <div className="flex gap-1.5 rounded-2xl bg-slate-950 p-1.5 border border-white/5">
                    <AuthTab active={mode === 'login'} onClick={() => changeMode('login')} icon={Lock}>Login</AuthTab>
                    <AuthTab active={mode === 'register'} onClick={() => changeMode('register')} icon={User}>Register</AuthTab>
                  </div>
                )}

                {/* Passwordless alternative toggle */}
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => changeMode('email-otp')}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-200 hover:border-amber-500/40 hover:bg-white/10 transition duration-200"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Sign in with secure email code
                  </button>
                )}

                {/* System Messages */}
                <AnimatePresence mode="wait">
                  {message && (
                    <AuthMessage
                      type={message.type}
                      title={message.title}
                      message={message.message}
                      onClose={() => setMessage(null)}
                    />
                  )}
                </AnimatePresence>

                {/* Inputs Stack */}
                <div className="space-y-3.5">
                  {mode === 'register' && (
                    <FloatingInput
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder=" "
                      autoComplete="name"
                      icon={User}
                    />
                  )}

                  {mode !== 'email-otp' && (
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" "
                      autoComplete="email"
                      icon={Mail}
                      disabled={mode === 'reset-password'}
                    />
                  )}

                  {mode === 'email-otp' && (
                    <div className="space-y-3">
                      <FloatingInput
                        label="6-Digit Verification Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        icon={Lock}
                      />
                      <div className="flex items-center justify-between text-xs px-1">
                        <button
                          type="button"
                          onClick={() => changeMode('login')}
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" /> Password Login
                        </button>
                        {otpCountdown > 0 ? (
                          <span className="text-slate-400">Resend code in {otpCountdown}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleEmailLoginRequest}
                            className="text-amber-400 hover:text-amber-300 font-semibold transition"
                          >
                            Resend Request
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {(mode === 'login' || mode === 'register' || mode === 'reset-password') && (
                    <div className="space-y-2 relative">
                      <div className="relative">
                        <FloatingInput
                          label={mode === 'reset-password' ? "New Password" : "Password"}
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder=" "
                          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                          icon={Lock}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      
                      {mode === 'register' && password.length > 0 && (
                        <div className="pt-1">
                          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                            <motion.div animate={{ width: `${score}%` }} className={`h-full ${barColor(score)}`} />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                            <span>Complexity Check</span>
                            <span>Score: {score}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sub Options Row */}
                {mode === 'login' && (
                  <div className="flex items-center justify-between text-xs px-1 pt-1">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-3.5 w-3.5 accent-amber-500 rounded border-white/10 bg-slate-900"
                      />
                      Remember Session
                    </label>
                    <button
                      type="button"
                      onClick={() => changeMode('forgot')}
                      className="text-slate-400 hover:text-amber-400 transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Primary Submits */}
                <div className="pt-2">
                  {['login', 'register'].includes(mode) && (
                    <>
                      <LoadingButton type="submit" loading={loading} disabled={loading} className="w-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition duration-200 py-3 rounded-xl flex items-center justify-center">
                        {mode === 'register' ? 'Complete Onboarding' : 'Secure Entry'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </LoadingButton>

                      <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-wider"><span className="bg-slate-950 px-2.5 text-slate-500">SSO Alternatives</span></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition">
                          <GoogleIcon className="h-4 w-4" /> Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition">
                          <AppleIcon className="h-4 w-4" /> Apple
                        </button>
                      </div>
                    </>
                  )}

                  {mode === 'email-otp' && (
                    <LoadingButton type="submit" loading={loading} disabled={loading} className="w-full bg-amber-500 text-slate-950 font-bold py-3">
                      Verify & Synchronize
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </LoadingButton>
                  )}

                  {mode === 'forgot' && (
                    <div className="space-y-3">
                      <LoadingButton type="button" onClick={handleForgotPassword} loading={loading} disabled={loading || otpCountdown > 0} className="w-full bg-amber-500 text-slate-950 font-bold py-3">
                        <Send className="mr-2 h-4 w-4" /> Send Recovery Link
                      </LoadingButton>
                      <button type="button" onClick={() => changeMode('login')} className="w-full text-center text-xs text-slate-400 hover:text-white transition py-1">
                        Return to Authentication
                      </button>
                    </div>
                  )}

                  {mode === 'reset-password' && (
                    <LoadingButton type="submit" loading={loading} disabled={loading} className="w-full bg-amber-500 text-slate-950 font-bold py-3">
                      Commit New Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </LoadingButton>
                  )}
                </div>
              </form>
            </GlassCard>

            {/* Structured contextual footer switcher links grouped nicely within the layout segment */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {mode === 'login' && (
                <p>
                  New to the platform?{' '}
                  <button type="button" onClick={() => changeMode('register')} className="text-amber-400 hover:underline font-semibold ml-0.5">
                    Create your account
                  </button>
                </p>
              )}
              {mode === 'register' && (
                <p>
                  Already have an account?{' '}
                  <button type="button" onClick={() => changeMode('login')} className="text-amber-400 hover:underline font-semibold ml-0.5">
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>

=======
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
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
