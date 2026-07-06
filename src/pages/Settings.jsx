import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { readJSON, writeJSON, STORAGE_KEYS, removeItem } from '../lib/storage.js'
import { apiMe, apiLogout, apiChangePassword, apiUpdateProfile } from '../lib/api.js'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Bell,
  Moon,
  Sun,
  Monitor,
  CreditCard,
  Eye,
  EyeOff,
  Key,
  LogOut,
  Settings as SettingsIcon,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Loader2,
  Save,
  Trash2,
  Download,
  Smartphone,
  Globe,
  FileText,
  Crown,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react'

// Setting sections
const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Moon },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'privacy', label: 'Privacy', icon: Shield },
]

export default function Settings() {
  useSeo({
    title: 'Settings | Resume PRO',
    description: 'Adjust your account settings, preferences, and security options.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('settings-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Settings | Resume PRO',
  })

  const navigate = useNavigate()

  // State
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('royalTheme') || 'dark')

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    location: '',
    profession: '',
    bio: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    marketingEmails: false,
    resumeAlerts: true,
    securityAlerts: true,
  })

  // Privacy preferences
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    resumePublic: false,
    analytics: true,
  })

  // Load user data
  useEffect(() => {
    async function loadUserData() {
      setLoading(true)
      try {
        const auth = readJSON(STORAGE_KEYS.auth, null)
        if (!auth?.token) {
          navigate('/auth')
          return
        }

        try {
          const { user: backendUser } = await apiMe(auth.token)
          if (backendUser) {
            setUser(backendUser)
            setProfileForm({
              name: backendUser.name || '',
              phone: backendUser.phone || '',
              location: backendUser.location || '',
              profession: backendUser.profession || '',
              bio: backendUser.bio || '',
            })
          }
        } catch (e) {
          // Fallback to local storage
          if (auth?.user) {
            setUser(auth.user)
            setProfileForm({
              name: auth.user.name || '',
              phone: auth.user.phone || '',
            })
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [navigate])

  // Theme persistence
  useEffect(() => {
    localStorage.setItem('royalTheme', theme)
    document.documentElement.classList.remove('light', 'dark')
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.add(isDark ? 'dark' : 'light')
    } else {
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  // Password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-600' }

    let score = 0
    if (password.length >= 8) score += 25
    if (password.length >= 12) score += 15
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20
    if (/\d/.test(password)) score += 20
    if (/[^a-zA-Z0-9]/.test(password)) score += 20

    const labels = [
      { threshold: 0, label: 'Very Weak', color: 'bg-red-500' },
      { threshold: 25, label: 'Weak', color: 'bg-red-500' },
      { threshold: 50, label: 'Fair', color: 'bg-orange-500' },
      { threshold: 70, label: 'Good', color: 'bg-yellow-500' },
      { threshold: 85, label: 'Strong', color: 'bg-green-500' },
    ]

    const level = [...labels].reverse().find(l => score >= l.threshold)
    return { score: Math.min(100, score), label: level.label, color: level.color }
  }

  const passwordStrength = getPasswordStrength(passwordForm.newPassword)

  // Handle profile save
  const handleSaveProfile = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const auth = readJSON(STORAGE_KEYS.auth, null)
      await apiUpdateProfile(auth.token, profileForm)

      const authData = readJSON(STORAGE_KEYS.auth, {})
      writeJSON(STORAGE_KEYS.auth, {
        ...authData,
        user: { ...authData.user, ...profileForm },
      })

      setSuccess('Profile updated successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  // Handle password change
  const handleChangePassword = async () => {
    setError(null)
    setSuccess(null)

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setSaving(true)

    try {
      const auth = readJSON(STORAGE_KEYS.auth, null)
      await apiChangePassword(auth.token, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      setSuccess('Password changed successfully')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setSuccess(null), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiLogout()
    } catch (e) {
      // Ignore
    }
    removeItem(STORAGE_KEYS.auth)
    window.location.href = '/auth'
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-slate-800/50 rounded-xl w-48" />
            <div className="flex gap-4">
              <div className="w-48 h-96 bg-slate-800/50 rounded-2xl" />
              <div className="flex-1 h-96 bg-slate-800/50 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/profile"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black">Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <nav className="w-full md:w-48 shrink-0 space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-amber-400 text-slate-900'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <User className="h-5 w-5 text-amber-400" />
                      Profile Information
                    </h2>

                    {/* Error/Success Messages */}
                    {error && (
                      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                        <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                        <p className="text-red-200 text-sm flex-1">{error}</p>
                        <button onClick={() => setError(null)} className="text-red-400">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {success && (
                      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                        <Check className="h-5 w-5 text-green-400 shrink-0" />
                        <p className="text-green-200 text-sm flex-1">{success}</p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Full Name
                          </label>
                          <input
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                            type="text"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Email
                          </label>
                          <input
                            value={user?.email || ''}
                            disabled
                            className="w-full rounded-xl bg-slate-950/40 border border-slate-900 px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                            type="email"
                          />
                          <p className="text-[10px] text-slate-500 mt-1.5 uppercase font-semibold">Email cannot be changed</p>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Phone
                          </label>
                          <input
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                            type="tel"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Location
                          </label>
                          <input
                            value={profileForm.location}
                            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                            type="text"
                            placeholder="City, Country"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Profession
                          </label>
                          <input
                            value={profileForm.profession}
                            onChange={(e) => setProfileForm({ ...profileForm, profession: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                            type="text"
                            placeholder="e.g. Full Stack Developer"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Bio
                          </label>
                          <textarea
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 resize-none h-24 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:brightness-110 transition disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Save Changes
                      </button>
                    </div>
                  </section>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <Lock className="h-5 w-5 text-amber-400" />
                      Change Password
                    </h2>

                    {error && (
                      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                        <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                        <p className="text-red-200 text-sm flex-1">{error}</p>
                        <button onClick={() => setError(null)} className="text-red-400">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {success && (
                      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                        <Check className="h-5 w-5 text-green-400 shrink-0" />
                        <p className="text-green-200 text-sm flex-1">{success}</p>
                      </div>
                    )}

                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 pr-12"
                            type={showPasswords.current ? 'text' : 'password'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 pr-12"
                            type={showPasswords.new ? 'text' : 'password'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {passwordForm.newPassword && (
                          <div className="mt-2.5">
                            <div className="flex gap-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`transition-all ${passwordStrength.color}`}
                                style={{ width: `${passwordStrength.score}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 uppercase font-semibold">{passwordStrength.label}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full rounded-xl bg-slate-950/80 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition duration-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 pr-12"
                            type={showPasswords.confirm ? 'text' : 'password'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                          <p className="text-xs text-red-400 mt-1.5 font-medium">Passwords do not match</p>
                        )}
                      </div>

                      <button
                        onClick={handleChangePassword}
                        disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:brightness-110 transition disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Key className="h-4 w-4" />
                        )}
                        Change Password
                      </button>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <Smartphone className="h-5 w-5 text-amber-400" />
                      Active Sessions
                    </h2>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="font-semibold">Current Session</p>
                            <p className="text-sm text-slate-400">This device</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium">
                          Active
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out of all devices
                    </button>
                  </section>
                </motion.div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <Moon className="h-5 w-5 text-amber-400" />
                      Theme
                    </h2>

                    <p className="text-slate-400 mb-6">Choose your preferred appearance.</p>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'system', label: 'System', icon: Monitor },
                      ].map(t => {
                        const Icon = t.icon
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`p-4 rounded-xl border transition ${
                              theme === t.id
                                ? 'border-amber-400 bg-amber-400/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <Icon className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                            <p className="font-semibold">{t.label}</p>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <Bell className="h-5 w-5 text-amber-400" />
                      Notification Preferences
                    </h2>

                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Email Updates</p>
                          <p className="text-sm text-slate-400">Get notified about resume updates</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.emailUpdates}
                          onChange={(e) => setNotifications({ ...notifications, emailUpdates: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Marketing Emails</p>
                          <p className="text-sm text-slate-400">Receive promotional offers</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Resume Alerts</p>
                          <p className="text-sm text-slate-400">ATS score changes and recommendations</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.resumeAlerts}
                          onChange={(e) => setNotifications({ ...notifications, resumeAlerts: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Security Alerts</p>
                          <p className="text-sm text-slate-400">Login attempts and password changes</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.securityAlerts}
                          onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>
                    </div>
                  </section>
                </motion.div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <CreditCard className="h-5 w-5 text-amber-400" />
                      Subscription
                    </h2>

                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">
                            {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active') ? (
                              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                                Premium Plan
                              </span>
                            ) : (
                              'Free Plan'
                            )}
                          </p>
                          <p className="text-sm text-slate-400">
                            {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active')
                              ? 'Your subscription is active'
                              : 'Upgrade to unlock all features'}
                          </p>
                        </div>
                        {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active') ? (
                          <Crown className="h-8 w-8 text-amber-400" />
                        ) : null}
                      </div>
                    </div>

                    <Link
                      to="/plans"
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:brightness-110 transition"
                    >
                      <Crown className="h-4 w-4" />
                      {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active')
                        ? 'Manage Subscription'
                        : 'Upgrade to Premium'}
                    </Link>
                  </section>
                </motion.div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6">
                      <Shield className="h-5 w-5 text-amber-400" />
                      Privacy Settings
                    </h2>

                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Profile Visibility</p>
                          <p className="text-sm text-slate-400">Allow others to view your profile</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.profileVisible}
                          onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Public Resume Link</p>
                          <p className="text-sm text-slate-400">Share your resume publicly</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.resumePublic}
                          onChange={(e) => setPrivacy({ ...privacy, resumePublic: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer">
                        <div>
                          <p className="font-semibold">Analytics</p>
                          <p className="text-sm text-slate-400">Help us improve with anonymous data</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.analytics}
                          onChange={(e) => setPrivacy({ ...privacy, analytics: e.target.checked })}
                          className="h-5 w-5 accent-amber-400"
                        />
                      </label>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
                    <h2 className="text-xl font-black flex items-center gap-2 mb-6 text-red-400">
                      <Trash2 className="h-5 w-5" />
                      Danger Zone
                    </h2>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-semibold">Export Data</p>
                            <p className="text-sm text-red-300/70">Download all your data</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
                        <div className="flex items-center gap-3">
                          <Trash2 className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-semibold">Delete Account</p>
                            <p className="text-sm text-red-300/70">PermanentlyDelete your account</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}