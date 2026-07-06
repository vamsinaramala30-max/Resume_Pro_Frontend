import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, ArrowRight, RefreshCw, CheckCircle, XCircle, Sparkles, Timer, ChevronLeft } from 'lucide-react'
import LoadingButton from '../components/LoadingButton.jsx'
import FloatingInput from '../components/FloatingInput.jsx'

// Glass card component
function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}

// Floating background shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-royal-gold/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-[-10%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
      />
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
          className="absolute bottom-0 h-2 w-2 rounded-full bg-royal-gold/40"
          style={{ left: `${15 + i * 15}%` }}
        />
      ))}
    </div>
  )
}

// Toast/Message component
function AuthMessage({ type, title, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        type === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : type === 'error'
          ? 'border-red-500/30 bg-red-500/10'
          : 'border-sky-500/30 bg-sky-500/10'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" />
      ) : type === 'error' ? (
        <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
      ) : (
        <Sparkles className="h-5 w-5 flex-shrink-0 text-sky-400" />
      )}
      <div className="flex-1">
        <div className={`font-semibold ${type === 'error' ? 'text-red-300' : type === 'success' ? 'text-emerald-300' : 'text-sky-300'}`}>
          {title}
        </div>
        <div className="text-sm text-slate-300">{message}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  )
}

// Single OTP Input Box
function OtpInput({ value, onChange, onKeyDown, index, inputRef }) {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, '')
        onChange(index, val)
      }}
      onKeyDown={(e) => onKeyDown(e, index)}
      className="h-14 w-12 rounded-2xl border border-white/15 bg-white/5 text-center text-xl font-bold text-white placeholder:text-slate-600 focus:border-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold/30 transition-all"
      placeholder="*"
      aria-label={`OTP digit ${index + 1}`}
      autoComplete="one-time-code"
    />
  )
}

export default function OtpVerify({ onVerified, email: propEmail, onResend, onBack }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Get email from props, search params, or state
  const email = propEmail || searchParams.get('email') || (location.state?.email) || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [otpCountdown, setOtpCountdown] = useState(0)

  const inputRefs = useRef([])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // OTP countdown timer
  useEffect(() => {
    if (otpCountdown <= 0) return
    const timer = setInterval(() => {
      setOtpCountdown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [otpCountdown])

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take last character
    setOtp(newOtp)

    // Auto move to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous field if current is empty
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const otpString = otp.join('')

  const handleVerify = async () => {
    if (otpString.length !== 6) {
      setMessage({ type: 'error', title: 'Invalid code', message: 'Please enter all 6 digits' })
      return
    }

    setLoading(true)
    try {
      // Call the onVerified callback (passed from parent) or use default behavior
      if (onVerified) {
        await onVerified(email, otpString)
      } else {
        // Default: call API
        const API_BASE = (await import('../lib/api.js').then(m => m.getApiBase?.() || 'http://localhost:5001/api'))
        const res = await fetch(`${API_BASE}/auth/email-login-verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpString }),
          credentials: 'include',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Verification failed')

        // Store auth data
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
      }

      setMessage({ type: 'success', title: 'Verified!', message: 'Redirecting to dashboard...' })

      // Navigate after short delay
      setTimeout(() => {
        navigate('/select', { replace: true })
      }, 1000)
    } catch (e) {
      setMessage({ type: 'error', title: 'Verification failed', message: e.message || 'Invalid or expired code' })
      // Clear OTP inputs
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (otpCountdown > 0) return

    setLoading(true)
    try {
      if (onResend) {
        await onResend(email)
      } else {
        // Default: call API
        const API_BASE = (await import('../lib/api.js').then(m => m.getApiBase?.() || 'http://localhost:5001/api'))
        const res = await fetch(`${API_BASE}/auth/email-login-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        })
        await res.json()
      }

      setMessage({ type: 'success', title: 'Code sent', message: 'Check your email for a new code' })
      setOtpCountdown(60)
    } catch (e) {
      setMessage({ type: 'error', title: 'Failed', message: e.message || 'Could not send verification code' })
    } finally {
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/auth', { state: { email } })
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.15),transparent_40%),radial-gradient(circle_at_20%_30%,rgba(96,165,250,0.12),transparent_25%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.1),transparent_30%),linear-gradient(180deg,#020617,#050b17)] text-white">
      {/* Animated Background */}
      <FloatingShapes />

      <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 lg:py-20">
        {/* Glass Card */}
        <GlassCard className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-6 space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-gold/15 overflow-hidden p-2">
              <img src="/resumePro.png" alt="Resume PRO Logo" className="h-full w-full object-contain" />
            </div>
            <div className="text-2xl font-black text-white">Verify your email</div>
            <p className="text-sm text-slate-300">
              We sent a verification code to<br />
              <span className="font-medium text-royal-gold">{email}</span>
            </p>
          </div>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <AuthMessage
                type={message.type}
                title={message.title}
                message={message.message}
                onClose={() => setMessage(null)}
              />
            )}
          </AnimatePresence>

          {/* OTP Input Boxes */}
          <div className="mt-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <OtpInput
                  key={i}
                  index={i}
                  value={digit}
                  onChange={handleOtpChange}
                  onKeyDown={handleKeyDown}
                  inputRef={(el) => (inputRefs.current[i] = el)}
                />
              ))}
            </div>
          </div>

          {/* Timer / Resend */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Sign In
            </button>
            {otpCountdown > 0 ? (
              <div className="flex items-center gap-1 text-slate-400">
                <Timer className="h-4 w-4" />
                Resend in {otpCountdown}s
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="flex items-center gap-1 text-royal-gold hover:text-white transition disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Resend code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <div className="mt-8">
            <LoadingButton
              onClick={handleVerify}
              loading={loading}
              disabled={loading || otpString.length !== 6}
              className="w-full"
            >
              Verify & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </LoadingButton>
          </div>

          {/* Note */}
          <p className="mt-4 text-center text-xs text-slate-400">
            Code expires in 10 minutes
          </p>
        </GlassCard>
      </div>
    </div>
  )
}