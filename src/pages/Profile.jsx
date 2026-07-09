import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSeo, injectJsonLd } from '../lib/seo.js'
import { readJSON, writeJSON, STORAGE_KEYS, removeItem } from '../lib/storage.js'
import { apiMe, apiLogout, apiUpdateProfile, getAPIUrl } from '../lib/api.js'
import { calculateATSScore, getScoreColor } from '../lib/atsScore.js'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Crown,
  FileText,
  Shield,
  Key,
  LogOut,
  Edit2,
  Check,
  X,
  Settings,
  Bell,
  Moon,
  Sun,
  Monitor,
  HelpCircle,
  ChevronRight,
  Award,
  Clock,
  MapPin,
  Briefcase,
  ExternalLink,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'

export default function Profile() {
  useSeo({
    title: 'Profile | Resume PRO',
    description: 'Manage your profile details, subscription, and account settings.',
    canonicalUrl: window.location?.href,
  })

  injectJsonLd('profile-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Profile | Resume PRO',
  })

  // State
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('royalTheme') || 'dark')
  const [resumeCount, setResumeCount] = useState(0)
  const [avgAtsScore, setAvgAtsScore] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    profession: '',
  })

  const navigate = useNavigate()

  // Load user and resume data
  useEffect(() => {
    async function loadUserData() {
      setLoading(true)
      try {
        const auth = readJSON(STORAGE_KEYS.auth, null)
        if (!auth?.token || !auth?.user) {
          navigate('/auth')
          return
        }

        // Fetch user from backend
        try {
          const result = await apiMe(auth.token)
          if (result?.user) {
            setUser(result.user)
            setFormData({
              name: result.user.name || '',
              email: result.user.email || '',
              phone: result.user.phone || '',
              bio: result.user.bio || '',
              location: result.user.location || '',
              profession: result.user.profession || '',
            })

            // Update local storage
            writeJSON(STORAGE_KEYS.auth, {
              ...auth,
              user: { ...auth.user, ...result.user },
            })
          } else {
            setUser(auth.user)
            setFormData({
              name: auth.user.name || '',
              email: auth.user.email || '',
              phone: auth.user.phone || '',
              bio: auth.user.bio || '',
              location: auth.user.location || '',
              profession: auth.user.profession || '',
            })
          }
        } catch (e) {
          setUser(auth.user)
          setFormData({
            name: auth.user.name || '',
            email: auth.user.email || '',
            phone: auth.user.phone || '',
          })
        }

        // Load resumes
        try {
          const apiBase = getAPIUrl()
          const res = await fetch(`${apiBase}/resume/me`, {
            headers: { Authorization: `Bearer ${auth.token}` },
            credentials: 'include',
          })
          const data = await res.json().catch(() => [])
          if (Array.isArray(data)) {
            setResumeCount(data.length)

            // Calculate average ATS score
            if (data.length > 0) {
              let totalScore = 0
              let scoredCount = 0

              data.forEach(resume => {
                if (resume.payload) {
                  const score = calculateATSScore(resume.payload)
                  totalScore += score.total
                  scoredCount++
                }
              })

              if (scoredCount > 0) {
                setAvgAtsScore(Math.round(totalScore / scoredCount))
              }
            }
          }
        } catch (e) {
          console.error('Failed to load resumes:', e)
        }
      } catch (e) {
        setError(e.message)
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiLogout()
    } catch (e) {
      // Ignore logout errors
    }
    removeItem(STORAGE_KEYS.auth)
    window.location.href = '/auth'
  }

  // Save profile
  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const auth = readJSON(STORAGE_KEYS.auth, null)
      await apiUpdateProfile(auth.token, formData)
      setUser(prev => ({ ...prev, ...formData }))
      writeJSON(STORAGE_KEYS.auth, {
        ...auth,
        user: { ...auth.user, ...formData },
      })
      setIsEditing(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-24 bg-surface-elevated rounded-3xl border border-border" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-28 bg-surface-elevated rounded-2xl border border-border" />
              ))}
            </div>
            <div className="h-64 bg-surface-elevated rounded-3xl border border-border" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mx-auto max-w-4xl">
        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 rounded-2xl border border-error/30 bg-error/10 p-4"
          >
            <AlertCircle className="h-5 w-5 text-error shrink-0" />
            <p className="text-error text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-error hover:text-error/70 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl font-black text-slate-900">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {/* Online Status */}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
            {/* Crown for premium */}
            {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active') && (
              <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Crown className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">{formData.name || 'User'}</h1>
            <p className="text-muted-foreground">{formData.email || 'No email'}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow"
          >
            <FileText className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-black text-foreground">{resumeCount}</div>
            <div className="text-xs text-muted-foreground">{resumeCount === 1 ? 'Resume' : 'Resumes'}</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow"
          >
            <Award className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-black" style={{ color: getScoreColor(avgAtsScore) }}>
              {avgAtsScore}%
            </div>
            <div className="text-xs text-muted-foreground">ATS Score</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow"
          >
            <Crown className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-black text-foreground">
              {(user?.plan === 'PREMIUM' || user?.subscriptionStatus === 'active') ? (
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Premium
                </span>
              ) : (
                'FREE'
              )}
            </div>
            <div className="text-xs text-muted-foreground">Plan</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow"
          >
            <Calendar className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-black text-foreground">
              {user?.createdAt ? (
                <span className="text-sm text-foreground">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              ) : (
                '—'
              )}
            </div>
            <div className="text-xs text-muted-foreground">Member Since</div>
          </motion.div>
        </div>

        {/* Personal Information */}
        <section className="mb-8 rounded-3xl border border-border bg-card shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h2>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEditing ? (
                <Check className="h-4 w-4" />
              ) : (
                <Edit2 className="h-4 w-4" />
              )}
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-muted-foreground">Full Name</span>
              {isEditing ? (
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-surface-elevated border border-border px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  type="text"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-foreground">{formData.name || 'Not set'}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <p className="mt-1 text-lg font-semibold text-foreground">{formData.email}</p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-muted-foreground">Phone</span>
              {isEditing ? (
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-surface-elevated border border-border px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  type="tel"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-foreground">{formData.phone || 'Not set'}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-muted-foreground">Location</span>
              {isEditing ? (
                <input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-surface-elevated border border-border px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  type="text"
                  placeholder="City, Country"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {formData.location || 'Not set'}
                </p>
              )}
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-muted-foreground">Profession</span>
              {isEditing ? (
                <input
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-surface-elevated border border-border px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  {formData.profession || 'Not set'}
                </p>
              )}
            </label>
          </div>

          {isEditing && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    bio: user?.bio || '',
                    location: user?.location || '',
                    profession: user?.profession || '',
                  })
                }}
                className="px-4 py-2 rounded-xl border border-border bg-surface-elevated text-foreground font-semibold hover:bg-surface-hover transition"
              >
                Cancel
              </button>
            </div>
          )}
        </section>

        {/* Account & Security */}
        <section className="mb-8 rounded-3xl border border-border bg-card shadow-card p-6">
          <h2 className="text-xl font-black flex items-center gap-2 mb-6 text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            Account Security
          </h2>

          <div className="space-y-2">
            <Link
              to="/settings"
              className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <Link
              to="/settings"
              className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full p-4 rounded-xl bg-surface-elevated border border-border hover:bg-error/5 hover:border-error/30 transition"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5 text-error" />
                <div className="text-left">
                  <p className="font-semibold text-error">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Quick Links */}
        <section className="rounded-3xl border border-border bg-card shadow-card p-6">
          <h2 className="text-xl font-black flex items-center gap-2 mb-6 text-foreground">
            <Settings className="h-5 w-5 text-primary" />
            Quick Links
          </h2>

          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              to="/resumes"
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">My Resumes</span>
            </Link>

            <Link
              to="/plans"
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <Crown className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Upgrade Plan</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <Settings className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Settings</span>
            </Link>

            <Link
              to="/help"
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border hover:bg-surface-hover hover:border-primary/30 transition"
            >
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Help Center</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}