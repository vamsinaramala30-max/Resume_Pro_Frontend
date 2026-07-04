import { useEffect, useMemo, useRef, useState, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Copy,
  RefreshCw,
  Loader2,
  Bot,
  AlertCircle
} from 'lucide-react'

import { getApiBase } from '../../lib/api.js'

// Send message to AI with better error handling
async function sendToAI(messages, resumeContext = {}) {
  const API_BASE = await getApiBase()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

  try {
    const API_BASE = await getApiBase()
    const res = await fetch(API_BASE + '/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, resumeContext }),
      credentials: 'include',
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const errorMsg = data?.message || data?.error || 'Request failed'
      throw new Error(errorMsg)
    }

    const data = await res.json()
    return data.message || 'No response received'
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw err
  }
}

// Quick action prompts
const QUICK_ACTIONS = [
  { text: 'Write a professional career objective for a software developer', label: 'Objective' },
  { text: 'How can I improve my ATS score? Give specific keywords.', label: 'ATS Score' },
  { text: 'Write a professional summary for my resume', label: 'Summary' },
  { text: 'What skills should I include for a developer position?', label: 'Skills' }
]

// Animation variants
const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
}

const pulseVariants = {
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(251, 191, 36, 0.4)',
      '0 0 0 15px rgba(251, 191, 36, 0)',
      '0 0 0 30px rgba(251, 191, 36, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
}

const ChatBotAIAssistant = memo(function ChatBotAIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I\'m ResumeCopilot, your AI resume assistant.\n\nI can help you with:\n• Resume writing & optimization\n• ATS score improvements\n• Career objectives & summaries\n• Skills & project descriptions\n• Cover letters & interview prep\n\n**Try a quick action below or ask your question!**',
      timestamp: Date.now()
    }
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo?.({ top: 999999, behavior: 'smooth' })
  }, [open, messages])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const send = async (text) => {
    const trimmed = String(text || '').trim()
    if (!trimmed || isThinking) return

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    const userMsg = { id: 'u_' + Date.now(), role: 'user', text: trimmed, timestamp: Date.now() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setIsThinking(true)
    setError(null)

    try {
      const chatMessages = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }))
      chatMessages.push({ role: 'user', content: trimmed })

      const reply = await sendToAI(chatMessages)
      setMessages(m => [...m, { id: 'a_' + Date.now(), role: 'assistant', text: reply, timestamp: Date.now() }])
    } catch (err) {
      // Ignore aborted requests
      if (err.name === 'AbortError') return

      console.error('AI Error:', err)
      const userMessage = err.message?.includes('unavailable')
        ? 'AI service is temporarily unavailable. Please try again later.'
        : err.message || 'Failed to connect to AI service'
      setError(userMessage)
      setMessages(m => [
        ...m,
        {
          id: 'a_' + Date.now() + '_error',
          role: 'assistant',
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: Date.now()
        }
      ])
    } finally {
      setIsThinking(false)
      abortControllerRef.current = null
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearConversation = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: 'Conversation cleared. How can I help you with your resume?',
        timestamp: Date.now()
      }
    ])
  }

  const retryLastMessage = () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()
    if (lastUserMessage) {
      send(lastUserMessage.text)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Floating Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[380px] max-w-[92vw] rounded-3xl border border-white/15 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '550px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-slate-900" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">ResumeCopilot</div>
                  <div className="text-xs text-slate-400">AI Resume Assistant</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={clearConversation}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
              {messages.map(m => (
                <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  {!m.role.startsWith('a_') && m.role !== 'user' && (
                    <button
                      onClick={() => copyMessage(m.text)}
                      className="self-end mb-1 mr-2 p-1 text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  )}
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] rounded-2xl px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-semibold text-sm'
                        : 'max-w-[85%] rounded-2xl px-4 py-2 bg-white/5 border border-white/10 text-slate-100 text-sm'
                    }
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-white/5 border border-white/10 text-sm text-slate-400 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="flex-1">{error}</span>
                  <button onClick={retryLastMessage} className="p-1 hover:bg-red-500/20 rounded transition">
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions - Show only at start */}
            {messages.length <= 1 && !isThinking && (
              <div className="px-4 pb-2 flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.slice(0, 2).map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => send(p.text)}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-amber-400/30 hover:bg-white/10"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  placeholder="Ask me anything about your resume..."
                  disabled={isThinking}
                  className="flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isThinking || !input.trim()}
 className="h-10 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-50 flex items-center justify-center min-w-[40px]"
                >
                  {isThinking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={buttonVariants.hover}
        whileTap={buttonVariants.tap}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 shadow-xl shadow-amber-500/25 flex items-center justify-center"
      >
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="absolute inset-0 rounded-full"
        />
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  )
})

export default ChatBotAIAssistant