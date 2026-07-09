import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Lock, User, ArrowRight, RefreshCw, 
  CheckCircle, XCircle, Sparkles, Eye, EyeOff, 
  Send, ArrowLeft, ShieldCheck, Check, Info, FileText
} from 'lucide-react'

import LoadingButton from '../components/LoadingButton.jsx'
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
import { isValidEmail } from '../lib/validators.js'
import { readJSON, writeJSON, STORAGE_KEYS } from '../lib/storage.js'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

// --- Helper Utilities ---

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

function getStrengthLabel(score) {
  if (score === 0) return ''
  if (score >= 80) return 'Strong'
  if (score >= 50) return 'Moderate'
  return 'Weak'
}

function barColor(score) {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 50) return 'bg-amber-500'
  return 'bg-rose-500'
}

function AuthTab({ active, onClick, children, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
        active
          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
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
      className={`flex items-start gap-3 rounded-xl border p-3.5 text-xs ${
        type === 'success'
          ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300'
          : type === 'error'
          ? 'border-rose-500/20 bg-rose-500/5 text-rose-300'
          : 'border-sky-500/20 bg-sky-500/5 text-sky-300'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
      ) : type === 'error' ? (
        <XCircle className="h-4 w-4 flex-shrink-0 text-rose-400 mt-0.5" />
      ) : (
        <Sparkles className="h-4 w-4 flex-shrink-0 text-sky-400 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{title}</div>
        <div className="text-slate-400 mt-0.5 leading-relaxed">{message}</div>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="text-slate-500 hover:text-white flex-shrink-0 transition">
          <XCircle className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  )
}

// --- Redesigned Premium Input Component ---
function PremiumInput({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder = '',
  error,
  name,
  autoComplete,
  icon: Icon,
  disabled,
  maxLength,
  showPasswordToggle,
  onTogglePassword,
  showPasswordState
}) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center px-0.5">
        <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">{label}</label>
      </div>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition duration-200">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          maxLength={maxLength}
          className={`w-full rounded-xl bg-background border py-3 px-4 text-sm text-foreground placeholder:text-muted/65 outline-none transition duration-200 ${
            Icon ? 'pl-10' : 'pl-4'
          } ${showPasswordToggle ? 'pr-10' : 'pr-4'} ${
            error
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20'
              : 'border-border focus:border-primary focus:ring-1 focus:ring-primary/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition duration-200"
          >
            {showPasswordState ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-400 text-xs px-0.5 flex items-center gap-1 font-medium"
        >
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

// --- Main Auth Component ---

export default function Auth({ onAuthed }) {
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login', 'register', 'email-otp', 'forgot', 'reset-password'
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // System status notification
  const [message, setMessage] = useState(null)
  const [otpCountdown, setOtpCountdown] = useState(0)

  // Validation Errors
  const [errors, setErrors] = useState({})
  const [forgotSuccess, setForgotSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const score = useMemo(() => strengthScore(password), [password])

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

  // Inline check helper
  const validateField = (field, val) => {
    let errs = { ...errors }

    if (field === 'email') {
      if (!val.trim()) {
        errs.email = 'Email address is required'
      } else if (!isValidEmail(val)) {
        errs.email = 'Please enter a valid email address'
      } else {
        delete errs.email
      }
    }

    if (field === 'password') {
      if (!val.trim()) {
        errs.password = 'Password is required'
      } else if (val.length < 6) {
        errs.password = 'Password must be at least 6 characters long'
      } else {
        delete errs.password
      }
    }

    if (field === 'confirmPassword') {
      if (!val.trim()) {
        errs.confirmPassword = 'Please confirm your password'
      } else if (val !== password) {
        errs.confirmPassword = 'Passwords do not match'
      } else {
        delete errs.confirmPassword
      }
    }

    if (field === 'name') {
      if (!val.trim()) {
        errs.name = 'Full name is required'
      } else {
        delete errs.name
      }
    }

    setErrors(errs)
  }

  // Pre-submit validation
  const validateAll = () => {
    const errs = {}

    if (mode !== 'email-otp') {
      if (!email.trim()) errs.email = 'Email address is required'
      else if (!isValidEmail(email)) errs.email = 'Please enter a valid email address'
    }

    if (['login', 'register', 'reset-password'].includes(mode)) {
      if (!password.trim()) errs.password = 'Password is required'
      else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    }

    if (mode === 'register') {
      if (!name.trim()) errs.name = 'Full name is required'
      if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
      if (!termsAccepted) errs.terms = 'You must accept the terms and conditions'
    }

    if (mode === 'reset-password') {
      if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // --- Handlers ---

  async function handlePasswordLogin() {
    if (!validateAll()) return

    setLoading(true)
    setMessage(null)
    
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
    if (!validateAll()) return

    setLoading(true)
    setMessage(null)
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
      setErrors({ email: 'Please provide a valid email address first.' })
      return
    }

    setLoading(true)
    setMessage(null)
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
      showMsg('error', 'Verification Error', 'Please input the complete 6-digit confirmation code.')
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      if (mode === 'email-otp') {
        try {
          const data = await apiEmailLoginVerify({ email, otp, rememberMe })
          const auth = { token: data.token, user: data.user, rememberMe, createdAt: Date.now() }
          writeJSON(STORAGE_KEYS.auth, auth)
          onAuthed(auth)
          return
        } catch (loginErr) {
          if (loginErr.message?.includes('Invalid') || loginErr.message?.includes('expired') || loginErr.message?.includes('not verified')) {
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
      setErrors({ email: 'Please enter a valid email address to receive reset instructions.' })
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      await apiForgotPassword({ email })
      setForgotSuccess(true)
      setOtpCountdown(60)
    } catch (e) {
      showMsg('error', 'Request Failed', e?.message || 'An error occurred triggering the password reset.')
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordReset() {
    if (!validateAll()) return
    if (!otp.trim() || otp.length !== 6) {
      showMsg('error', 'Invalid Code', 'Please input your 6-digit security code.')
      return
    }

    setLoading(true)
    setMessage(null)
    try {
      await apiResetPassword({ email, otp, newPassword: password })
      setResetSuccess(true)
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
    setErrors({})
    setForgotSuccess(false)
    setResetSuccess(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-primary/20 selection:text-primary">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-surface-elevated/50 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Premium Brand Showcase */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4.5 py-1.5 text-xs font-semibold text-primary tracking-wider w-fit"
            >
              <Sparkles className="h-3.5 w-3.5" />
              INTELLIGENT ATS RESUME WORKSPACE
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-foreground">
                Create a resume that gets you{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-primary-hover">
                  hired.
                </span>
              </h1>
              <p className="text-muted text-sm leading-relaxed max-w-md">
                Build structurally optimal, high-converting designer resumes aligned directly with industry ATS criteria.
              </p>
            </div>

            {/* Premium Simulated UI Illustration */}
            <div className="relative rounded-2xl border border-border bg-card p-5 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50 pointer-events-none" />
              <div className="flex items-center justify-between border-b border-border pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/60" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  <ShieldCheck className="h-3 w-3 text-amber-500" />
                  ATS Match Score
                </div>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-3.5 w-32 rounded bg-slate-800" />
                    <div className="h-2 w-20 rounded bg-slate-900" />
                  </div>
                  <div className="text-xs font-bold text-emerald-400">92% Optimal</div>
                </div>
                <div className="h-2 w-full rounded bg-slate-900 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] font-medium text-slate-300">ATS Formatting</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] font-medium text-slate-300">Action Verbs Check</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">TRUSTED BY CANDIDATES AT</p>
              <div className="flex items-center gap-6 mt-3 text-slate-400 opacity-60 font-semibold text-xs tracking-wider">
                <span>GOOGLE</span>
                <span>STRIPE</span>
                <span>VERCEL</span>
                <span>NOTION</span>
              </div>
            </div>
          </div>

           {/* Right Column: Form Control Panel */}
          <div className="col-span-12 lg:col-span-6 flex flex-col w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* Top Card Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-foreground mb-1.5 flex items-center gap-2">
                  {mode === 'login' && 'Sign in to Resume PRO'}
                  {mode === 'register' && 'Get Started Free'}
                  {mode === 'email-otp' && 'Verify Security Code'}
                  {mode === 'forgot' && 'Reset Password'}
                  {mode === 'reset-password' && 'Configure New Password'}
                </h2>
                <p className="text-xs text-muted leading-relaxed">
                  {mode === 'login' && 'Enter your security parameters to access dashboard options.'}
                  {mode === 'register' && 'Create your account to unlock instant AI resume scoring.'}
                  {mode === 'email-otp' && `Input the secure 6-digit confirmation key dispatched to ${email}`}
                  {mode === 'forgot' && 'Provide your registered email address to verify identity.'}
                  {mode === 'reset-password' && 'Setup uniform and updated password credentials.'}
                </p>
              </div>

              {/* Login / Register Navigation Tabs */}
              {(mode === 'login' || mode === 'register') && (
                <div className="flex gap-1 rounded-xl bg-background p-1 mb-6 border border-border">
                  <AuthTab active={mode === 'login'} onClick={() => changeMode('login')} icon={Lock}>Login</AuthTab>
                  <AuthTab active={mode === 'register'} onClick={() => changeMode('register')} icon={User}>Register</AuthTab>
                </div>
              )}

              {/* Passwordless alternative toggle */}
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => changeMode('email-otp')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 py-3 text-xs font-bold text-slate-300 hover:bg-slate-950 hover:text-white transition duration-200 mb-6"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-500" />
                  Sign in with secure email code
                </button>
              )}

              {/* System Messages */}
              <AnimatePresence mode="wait">
                {message && (
                  <div className="mb-5">
                    <AuthMessage
                      type={message.type}
                      title={message.title}
                      message={message.message}
                      onClose={() => setMessage(null)}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* FORGOT PASSWORD SUCCESS SCREEN */}
              {forgotSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-5 py-2"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Send className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Reset Link Dispatched</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                      A dynamic recovery code sequence was dispatched to <strong className="text-white">{email}</strong>. Check your inbox and spam folder.
                    </p>
                  </div>
                  <div className="pt-2 space-y-3">
                    {otpCountdown > 0 ? (
                      <p className="text-[11px] text-slate-500">Resend sequence available in {otpCountdown}s</p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-amber-500 hover:text-amber-400 font-bold transition"
                      >
                        Resend Recovery Link
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => changeMode('login')}
                      className="w-full flex items-center justify-center gap-1.5 py-3 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-950 transition duration-200"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Return to Login
                    </button>
                  </div>
                </motion.div>
              ) : resetSuccess ? (
                /* RESET PASSWORD SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-5 py-2"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Password Configured</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your new security password credentials have been updated successfully.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => changeMode('login')}
                      className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs hover:bg-amber-400 transition duration-200"
                    >
                      Sign In to Continue
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* STANDARD FORMS STACK */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name field (Register only) */}
                  {mode === 'register' && (
                    <PremiumInput
                      label="Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (errors.name) validateField('name', e.target.value)
                      }}
                      onBlur={() => validateField('name', name)}
                      placeholder="e.g. John Doe"
                      autoComplete="name"
                      icon={User}
                      error={errors.name}
                      disabled={loading}
                    />
                  )}

                  {/* Email Field (All except reset password, which is read-only if email is already set) */}
                  {mode !== 'email-otp' && (
                    <PremiumInput
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) validateField('email', e.target.value)
                      }}
                      onBlur={() => validateField('email', email)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      icon={Mail}
                      error={errors.email}
                      disabled={loading || mode === 'reset-password'}
                    />
                  )}

                  {/* OTP Field (email-otp only) */}
                  {mode === 'email-otp' && (
                    <div className="space-y-4">
                      <PremiumInput
                        label="6-Digit Security Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        icon={Lock}
                        disabled={loading}
                      />
                      <div className="flex items-center justify-between text-xs px-0.5">
                        <button
                          type="button"
                          onClick={() => changeMode('login')}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition duration-200 font-medium"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" /> Password Login
                        </button>
                        {otpCountdown > 0 ? (
                          <span className="text-slate-500">Resend in {otpCountdown}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleEmailLoginRequest}
                            className="text-amber-500 hover:text-amber-400 font-bold transition"
                          >
                            Resend Request
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Password & Strength Meter */}
                  {['login', 'register', 'reset-password'].includes(mode) && (
                    <div className="space-y-4">
                      <PremiumInput
                        label={mode === 'reset-password' ? "New Password" : "Password"}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errors.password) validateField('password', e.target.value)
                        }}
                        onBlur={() => validateField('password', password)}
                        placeholder="••••••••"
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        icon={Lock}
                        error={errors.password}
                        disabled={loading}
                        showPasswordToggle
                        onTogglePassword={() => setShowPassword(prev => !prev)}
                        showPasswordState={showPassword}
                      />

                      {/* Password Strength Indicator */}
                      {mode === 'register' && password.length > 0 && (
                        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>Password Strength</span>
                            <span className={score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                              {getStrengthLabel(score)}
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                            <motion.div animate={{ width: `${score}%` }} className={`h-full ${barColor(score)}`} />
                          </div>
                          <div className="text-[10px] text-slate-500 leading-normal">
                            Use 8+ characters with uppercase letters, numbers, and symbols.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Confirm Password (Register & Reset Password only) */}
                  {['register', 'reset-password'].includes(mode) && (
                    <PremiumInput
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (errors.confirmPassword) validateField('confirmPassword', e.target.value)
                      }}
                      onBlur={() => validateField('confirmPassword', confirmPassword)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      icon={Lock}
                      error={errors.confirmPassword}
                      disabled={loading}
                      showPasswordToggle
                      onTogglePassword={() => setShowConfirmPassword(prev => !prev)}
                      showPasswordState={showConfirmPassword}
                    />
                  )}

                  {/* Terms / Conditions & Privacy Policy checkboxes (Register only) */}
                  {mode === 'register' && (
                    <div className="space-y-2.5 pt-1">
                      <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked)
                            if (e.target.checked) {
                              const errs = { ...errors }
                              delete errs.terms
                              setErrors(errs)
                            }
                          }}
                          disabled={loading}
                          className="mt-0.5 h-3.5 w-3.5 accent-amber-500 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500/20"
                        />
                        <span>
                          I agree to the{' '}
                          <a href="/terms" target="_blank" className="text-slate-300 hover:text-white underline font-semibold transition">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="/privacy" target="_blank" className="text-slate-300 hover:text-white underline font-semibold transition">
                            Privacy Policy
                          </a>.
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="text-rose-400 text-xs flex items-center gap-1 font-medium">
                          <Info className="h-3.5 w-3.5 flex-shrink-0" />
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Remember me & Forgot Password Row (Login only) */}
                  {mode === 'login' && (
                    <div className="flex items-center justify-between text-xs px-0.5 pt-1 pb-2">
                      <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none font-medium">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          disabled={loading}
                          className="h-3.5 w-3.5 accent-amber-500 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500/20"
                        />
                        Remember Session
                      </label>
                      <button
                        type="button"
                        onClick={() => changeMode('forgot')}
                        disabled={loading}
                        className="text-slate-400 hover:text-amber-500 font-bold transition duration-200"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Actions */}
                  <div className="pt-2.5">
                    {['login', 'register'].includes(mode) && (
                      <>
                        <LoadingButton
                          type="submit"
                          loading={loading}
                          disabled={loading}
                          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition duration-200 py-3 rounded-xl flex items-center justify-center text-xs tracking-wider uppercase"
                        >
                          {mode === 'register' ? 'Complete Onboarding' : 'Secure Entry'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </LoadingButton>

                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                          </div>
                          <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                            <span className="bg-card px-3 text-muted font-bold">Or continue with</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated py-2.5 text-xs font-bold text-foreground hover:bg-surface-hover hover:text-foreground transition duration-200"
                          >
                            <GoogleIcon className="h-4 w-4" /> Google
                          </button>
                          <button
                            type="button"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated py-2.5 text-xs font-bold text-foreground hover:bg-surface-hover hover:text-foreground transition duration-200"
                          >
                            <AppleIcon className="h-4 w-4" /> Apple
                          </button>
                        </div>
                      </>
                    )}

                    {mode === 'email-otp' && (
                      <LoadingButton
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl text-xs tracking-wider uppercase hover:bg-primary-hover transition duration-200"
                      >
                        Verify & Synchronize
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </LoadingButton>
                    )}

                    {mode === 'forgot' && (
                      <div className="space-y-4">
                        <LoadingButton
                          type="submit"
                          loading={loading}
                          disabled={loading}
                          className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs tracking-wider uppercase hover:bg-amber-400 transition duration-200"
                        >
                          Send Recovery Link
                          <Send className="ml-2 h-3.5 w-3.5" />
                        </LoadingButton>
                        <button
                          type="button"
                          onClick={() => changeMode('login')}
                          disabled={loading}
                          className="w-full text-center text-xs text-slate-400 hover:text-white transition duration-200 py-1 font-medium"
                        >
                          Return to Authentication
                        </button>
                      </div>
                    )}

                    {mode === 'reset-password' && (
                      <LoadingButton
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs tracking-wider uppercase hover:bg-amber-400 transition duration-200"
                      >
                        Commit New Password
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </LoadingButton>
                    )}
                  </div>
                </form>
              )}

              {/* Contextual Footer links */}
              {!forgotSuccess && !resetSuccess && (
                <div className="mt-6 text-center text-xs text-slate-400">
                  {mode === 'login' && (
                    <p>
                      New to the platform?{' '}
                      <button
                        type="button"
                        onClick={() => changeMode('register')}
                        className="text-amber-500 hover:underline font-bold ml-0.5"
                      >
                        Create your account
                      </button>
                    </p>
                  )}
                  {mode === 'register' && (
                    <p>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => changeMode('login')}
                        className="text-amber-500 hover:underline font-bold ml-0.5"
                      >
                        Log in
                      </button>
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
