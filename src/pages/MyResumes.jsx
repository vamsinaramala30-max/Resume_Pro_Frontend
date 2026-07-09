import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Sparkles, FileText, Trash2, Edit, Calendar, Trophy, Download, Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { readJSON, STORAGE_KEYS, writeJSON } from '../lib/storage.js'
import { isPremiumUser } from '../lib/premium.js'
import { apiGetMyResumes, apiDeleteResume } from '../lib/apiResume.js'
import { calculateATSScore, getScoreColor } from '../lib/atsScore.js'

export default function MyResumes() {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const auth = readJSON(STORAGE_KEYS.auth, null)

  useEffect(() => {
    async function loadResumes() {
      if (!auth?.token) {
        navigate('/auth')
        return
      }
      try {
        const data = await apiGetMyResumes({ token: auth.token })
        if (Array.isArray(data)) {
          setResumes(data)
        } else {
          setResumes([])
        }
      } catch (err) {
        console.error(err)
        // Use err.status (set by safeFetch) for reliable 401 detection
        if (err.status === 401 || err.message?.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem(STORAGE_KEYS.auth)
          navigate('/auth')
        } else {
          setError(err.message || 'Failed to load resumes.')
        }
      } finally {
        setLoading(false)
      }
    }
    loadResumes()
  }, [auth?.token, navigate])

  const handleEdit = (resume) => {
    if (resume.premium) {
      writeJSON(STORAGE_KEYS.resumeDraftPremium ?? 'royalResumeDraftPremium', resume.payload)
      navigate('/premium')
    } else {
      writeJSON(STORAGE_KEYS.resumeDraftNormal ?? 'royalResumeDraftNormal', resume.payload)
      navigate('/normal')
    }
  }

  const handleDelete = async (resume) => {
    if (!window.confirm(`Delete "${resume.title || 'Untitled Resume'}"? This cannot be undone.`)) return
    setDeleting(resume.id)
    try {
      await apiDeleteResume({ token: auth.token, id: resume.id })
      setResumes((prev) => prev.filter((r) => r.id !== resume.id))
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.auth)
        navigate('/auth')
      } else {
        alert(err.message || 'Failed to delete resume.')
      }
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <div className="text-primary font-black text-sm uppercase tracking-wider flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Document Vault
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">My Resumes</h1>
            <p className="text-muted text-sm mt-1.5 leading-relaxed">
              Access, update, and manage your cloud-synchronized resumes.
            </p>
          </div>

          <button
            onClick={() => navigate('/select')}
            className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-3 font-bold text-sm transition-all shadow-lg shadow-primary/10"
          >
            <Plus className="h-4 w-4" />
            Create New Resume
          </button>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl border border-border bg-card/30 p-5 space-y-4 animate-pulse h-48" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-red-400">
            {error}
          </div>
        ) : resumes.length === 0 ? (
          <Card className="bg-card border-border p-10 text-center rounded-3xl backdrop-blur-xl">
            <FileText className="h-16 w-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No resumes found</h3>
            <p className="text-muted text-sm max-w-md mx-auto mb-6">
              You haven't saved any resumes to the cloud yet. Choose a template to create your first resume.
            </p>
            <Button onClick={() => navigate('/select')} variant="primary">
              Choose a Template
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => {
              const score = resume.payload ? calculateATSScore(resume.payload) : { total: 0 }
              return (
                <motion.div
                  key={resume.id || resume._id}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-border bg-card p-5 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-primary/40 transition duration-300 min-h-[220px]"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                          resume.premium
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-surface-elevated text-muted border border-border'
                        }`}
                      >
                        {resume.premium ? (
                          <>
                            <Crown className="h-2.5 w-2.5 fill-primary/20" /> Premium
                          </>
                        ) : 'Standard'}
                      </span>

                      <div
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ color: getScoreColor(score.total), backgroundColor: `${getScoreColor(score.total)}10` }}
                      >
                        {score.total}% ATS
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-foreground truncate mb-1">
                      {resume.title || 'Untitled Resume'}
                    </h3>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {new Date(resume.updatedAt || resume.savedAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2.5 mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => handleEdit(resume)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-surface-elevated border border-border text-xs font-bold text-foreground py-2.5 hover:bg-surface-hover hover:text-foreground transition duration-200"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resume)}
                      disabled={deleting === resume.id}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 px-3 py-2.5 hover:bg-red-500/20 hover:text-red-300 transition duration-200 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {deleting === resume.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
