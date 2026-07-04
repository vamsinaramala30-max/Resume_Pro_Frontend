import { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  Send,
  Wand2,
  User,
  Bot,
  Loader2,
  AlertCircle,
  Sparkles,
  FileText,
  Target,
  BookOpen,
  Code,
  Mail,
  HelpCircle,
  RefreshCw
} from 'lucide-react'
import { apiAIChat, apiAIStream } from '../../lib/api.js'

// Quick action buttons
const QUICK_ACTIONS = [
  { id: 'objective', label: 'Generate Objective', icon: BookOpen, prompt: 'Write a professional career objective for my resume. I am a software developer with experience in JavaScript, React, and Node.js.' },
  { id: 'ats', label: 'Improve ATS Score', icon: Target, prompt: 'How can I improve my ATS score? What keywords should I include? Give me specific suggestions.' },
  { id: 'summary', label: 'Write Summary', icon: FileText, prompt: 'Write a professional summary that highlights my skills and experience in the tech industry.' },
  { id: 'skills', label: 'Generate Skills', icon: Code, prompt: 'What technical and soft skills should I include for a software developer position?' },
  { id: 'cover', label: 'Cover Letter', icon: Mail, prompt: 'Help me write a cover letter for a software developer position.' },
  { id: 'interview', label: 'Interview Prep', icon: HelpCircle, prompt: 'What common interview questions should I prepare for as a software developer?' }
]

// Suggested prompts for new users
const SUGGESTED_PROMPTS = [
  'Create a Java Developer resume',
  'Improve my ATS score',
  'Write career objective',
  'Generate projects section'
]

export default function AIAssistantModal({ mode = 'normal', onClose, onAutofill }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `ResumeCopilot Welcome - I'm ResumeCopilot, your AI resume assistant. I can help you with:\n\n- Resume writing and optimization\n- ATS score improvements\n- Career objectives and summaries\n- Skills and project descriptions\n- Cover letters and interview prep\n\n**Try a quick action below or type your question!**`
    }
  ])

  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const headerTitle = useMemo(() => {
    return 'ResumeCopilot AI'
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addAssistantMessage = (content) => {
    setMessages(prev => [...prev, { role: 'assistant', content }])
  }

  const addUserMessage = (content) => {
    setMessages(prev => [...prev, { role: 'user', content }])
  }

  const sendMessage = async (userContent) => {
    if (!userContent.trim() || busy) return

    const messageText = userContent.trim()
    setError(null)
    addUserMessage(messageText)
    setInput('')
    setBusy(true)

    try {
      // Build message history for context
      const chatMessages = messages.map(m => ({
        role: m.role,
        content: m.content
      }))
      chatMessages.push({ role: 'user', content: messageText })

      // Call the API
      const response = await apiAIChat(chatMessages, {})

      if (response.message) {
        addAssistantMessage(response.message)
      } else {
        addAssistantMessage('Sorry, I could not generate a response. Please try again.')
      }
    } catch (err) {
      console.error('AI Chat error:', err)
      setError(err.message || 'Failed to connect to AI service')
      addAssistantMessage('Sorry, I encountered an error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickAction = (action) => {
    sendMessage(action.prompt)
  }

  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt)
  }

  const handleRetry = () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content)
    }
  }

  // Extract text content from markdown-like content
  const formatContent = (content) => {
    if (!content) return ''
    // Basic markdown formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-white/10 rounded text-xs">$1</code>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ height: '650px' }}
        initial={{ y: 14, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <div className="font-black text-lg text-white">{headerTitle}</div>
              <div className="text-xs text-slate-400">AI-powered resume assistance</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 custom-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  m.role === 'user'
                    ? 'max-w-[85%] rounded-2xl px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold'
                    : 'max-w-[85%] rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-slate-100'
                }
              >
                {m.role === 'user' ? (
                  <div className="text-sm leading-relaxed">{m.content}</div>
                ) : (
                  <div
                    className="text-sm leading-relaxed prose-white"
                    dangerouslySetInnerHTML={{ __html: formatContent(m.content) }}
                  />
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
                <button
                  onClick={handleRetry}
                  className="ml-2 p-1 hover:bg-red-500/20 rounded transition"
                  aria-label="Retry"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions - Show only when not busy and at start */}
        {messages.length <= 1 && !busy && (
          <div className="px-5 pb-2 flex-shrink-0">
            <div className="text-xs text-slate-500 mb-2 font-medium">Quick Actions</div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.slice(0, 4).map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  disabled={busy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-amber-400/30 transition disabled:opacity-50"
                >
                  <action.icon className="w-3 h-3 text-amber-400" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your resume..."
              disabled={busy}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition disabled:opacity-50"
            />
            <motion.button
              type="submit"
              disabled={busy || !input.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
            >
              {busy ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </form>

          {messages.length <= 1 && !busy && (
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  disabled={busy}
                  className="text-xs text-slate-500 hover:text-amber-400 transition disabled:opacity-50 underline-offset-2 hover:underline"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs text-slate-600">
            Powered by OpenAI GPT-4
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}