import { useMemo, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Crown,
  Download,
  ShieldCheck,
  Sparkles,
  Zap,
  Moon,
  User,
  MessageSquare,
  X,
  Send,
  FileText,
  Briefcase,
  Layers,
  Terminal,
  Menu
} from 'lucide-react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

// ==========================================
// CONFIGURATION CONSTANTS & METADATA
// ==========================================

const STATS = [
  { value: '10K+', label: 'resumes created', highlight: true, detail: 'Worldwide deployments' },
  { value: '98%', label: 'client success rate', highlight: false, detail: 'Interview invitations' },
  { value: '3.8s', label: 'average build time', highlight: false, detail: 'Cloud render speed' },
  { value: '92%', label: 'progress rate', highlight: false, detail: 'Career acceleration' },
]

const TRUST_BADGES = [
  { title: 'ATS-optimized', sub: 'Clean structure + keyword-ready sections', icon: ShieldCheck },
  { title: 'Premium templates', sub: 'Consistent typography + spacing system', icon: Crown },
  { title: 'Fast exports', sub: 'PDF-ready for every application', icon: Download },
]
=======
import { ArrowRight, Crown, Download, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, cn } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI Resume Builder',
    desc: 'Guided sections with smart suggestions—built to convert real human reviewers and machine parses alike.',
    category: 'Intelligence',
    badge: 'Core Engine'
  },
  {
    icon: ShieldCheck,
    title: 'ATS Optimization',
    desc: 'Structure and keywords that scan cleanly across historical and cutting-edge parsing applications.',
    category: 'Compliance',
    badge: '99.8% Pass'
  },
  {
    icon: Crown,
    title: 'Template Showcase',
    desc: 'Premium luxury layouts with consistent typographic geometry, perfect vertical grids, and robust configurations.',
    category: 'Design',
    badge: 'Exclusive'
  },
  {
    icon: Download,
    title: 'Export & Share',
    desc: 'PDF-ready output for every application pathway. Instant distribution options via optimized edge nodes.',
    category: 'Infrastructure',
    badge: 'Ultra Fast'
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    desc: 'Track and verify structural score, impact ratios, and keyword strength dynamically as you type.',
    category: 'Intelligence',
    badge: 'Live Vector'
  },
  {
    icon: Briefcase,
    title: 'Targeted Tailoring',
    desc: 'Inject localized keyword signals aligned dynamically to specific job descriptions with one click.',
    category: 'Optimization',
    badge: 'Automated'
  },
  {
    icon: Layers,
    title: 'Version Ledger',
    desc: 'Maintain concurrent variations of your professional ledger safely isolated in decentralized storage state panels.',
    category: 'Storage',
    badge: 'Encrypted'
  },
  {
    icon: Terminal,
    title: 'Developer Profiles',
    desc: 'Tailored Markdown, JSON, and schema extensions designed to render technical structures without visual breaking.',
    category: 'Syntax',
    badge: 'Extensible'
  }
]

const FLOATING_BADGES = [
  { label: 'ATS-ready structure', tone: 'gold' },
  { label: 'AI suggestions', tone: 'purple' },
]

const REVIEWS_COLLECTION = [
  { name: 'Maya R.', role: 'Senior Product Manager', firm: 'Northstar Solutions', quote: 'ATS scores jumped instantly. My callback rate doubled within two weeks. The semantic density suggestions are remarkable.', initial: 'M' },
  { name: 'Ethan K.', role: 'Staff Engineer', firm: 'Apex Hiring Systems', quote: 'The typography and spacing are insanely consistent. It looks premium in every PDF engine output I verified. Phenomenal system.', initial: 'E' },
  { name: 'Sara L.', role: 'UX Designer', firm: 'Cobalt Media', quote: 'The AI suggestions feel like a recruiter’s eye—clear, targeted, and fast. It bypassed the rigid structure of classic apps.', initial: 'S' },
  { name: 'Marcus V.', role: 'Director of Engineering', firm: 'Stone & Co LLC', quote: 'Excellent semantic compilation. The output structure matches exact parsing expectations while displaying highly tailored visuals.', initial: 'M' },
  { name: 'Elena P.', role: 'VP of Growth', firm: 'Verve Tech', quote: 'The glassmorphic container workflow feels premium and responsive. Highly recommended for executive level summaries.', initial: 'E' },
  { name: 'David W.', role: 'Solutions Architect', firm: 'Brightline Group', quote: 'Finally, a resume platform that treats system design and layout architecture as first-class engineering targets.', initial: 'D' }
]

const CORPORATE_PARTNERS = [
  { name: 'Northstar', industry: 'Enterprise Cloud' },
  { name: 'Apex Hiring', industry: 'Human Logistics' },
  { name: 'Stone & Co', industry: 'Strategic Capital' },
  { name: 'Cobalt', industry: 'Cybersecurity' },
  { name: 'Verve', industry: 'Automated Commerce' },
  { name: 'Brightline', industry: 'Infrastructure Architecture' }
]

const PRESET_FAQS = [
  { q: 'Will my resume still look premium in PDF?', a: 'Yes—templates are built with mathematically consistent spacing and high-fidelity ATS-safe typography so the production export remains structurally identical to screen layouts across legacy formats.' },
  { q: 'How does ATS optimization work?', a: 'We standardize structural heading hierarchy, predictable bullet vectors, and scanning order layers while embedding rich typographic weights for manual reviewers.' },
  { q: 'Can I update after starting?', a: 'Absolutely. Edit sections at any point. Scoring matrices, optimization indicators, and context recommendations update asynchronously with zero network latency.' },
  { q: 'Is this suitable for senior roles?', a: 'Yes. Premium hierarchical configurations fully support cross-functional leadership frameworks, complex impact tracking tables, and multi-page technical appendix workflows.' },
  { q: 'Can I connect local databases or APIs?', a: 'The framework structure allows direct configuration with local development endpoints and isolated states, operating without forcing lock-in to external clouds.' },
  { q: 'Is my data isolated securely?', a: 'All data arrays are held in tightly controlled state scopes, bypassing unsafe third-party tracking script hooks for ultimate asset isolation.' }
]

// ==========================================
// UTILITY HELPERS & MICRO-COMPONENTS
// ==========================================

function Reveal({ children, className = '', delay = 0 }) {
  return (
<<<<<<< HEAD
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Visual text blur highlight engine utility
function SectionHeader({ eyebrow, title, desc, alignment = 'center' }) {
  const isLeft = alignment === 'left'
  return (
    <div className={`space-y-4 ${isLeft ? 'text-left' : 'text-center'}`}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl ${isLeft ? '' : 'mx-auto'}`}>
        <span className="text-[#F4C542]" aria-hidden="true">✦</span>
        <span className="tracking-wide uppercase text-[10px] tracking-[0.2em]">{eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
        {title}
      </h2>
      <p className={`max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed ${isLeft ? '' : 'mx-auto'}`}>
        {desc}
      </p>
    </div>
  )
}

function AnimatedGoldText({ children }) {
  return (
    <span className="inline-block relative z-20 font-black text-white">
      <span className="text-[#F4C542]">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-80 select-none pointer-events-none"
        style={{
          filter: 'blur(12px)',
          background: 'linear-gradient(90deg, rgba(244,197,66,0.95) 0%, rgba(255,255,255,0.4) 40%, rgba(34,211,238,0.4) 70%, rgba(244,197,66,0.95) 100%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 50%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'bb-gold-pan-extended 4s ease-in-out infinite',
        }}
      >
        {children}
      </span>
      <style>{`
        @keyframes bb-gold-pan-extended {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  )
}

// ==========================================
// BACKGROUND LAYER
// ==========================================

function PremiumBackgroundLayer() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reduce])

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Glowing Auroral Waves */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_80%_15%,rgba(244,197,66,0.18)_0%,rgba(15,23,42,0.3)_45%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_90%_40%,rgba(56,189,248,0.15)_0%,rgba(2,6,23,0.8)_50%,transparent_80%)]" />
      
      {/* Organic Wave Curves Layer */}
      <div className="absolute right-0 top-0 w-full h-[800px] opacity-25 mix-blend-screen pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top right, rgba(244,197,66,0.15), transparent 60%), radial-gradient(circle at 85% 35%, rgba(14,165,233,0.12), transparent 50%)',
        filter: 'blur(40px)'
      }} />

      {/* Decorative flowing cosmic paths simulation */}
      <svg className="absolute top-0 right-0 w-[60%] h-[700px] opacity-20 pointer-events-none hidden md:block" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 -50 C 300 150, 250 400, 650 480" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M200 -80 C 450 120, 320 520, 700 590" stroke="url(#skyGradient)" strokeWidth="1" />
        <path d="M50 -20 C 250 300, 180 580, 580 690" stroke="url(#goldGradient)" strokeWidth="0.75" opacity="0.6" />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4C542" stopOpacity="0" />
            <stop offset="50%" stopColor="#F4C542" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic Grid breathing structure */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] animate-[bb-grid-breathe_12s_ease-in-out_infinite]" />

      {/* High-fidelity Star Dust Layer */}
      <div className="absolute inset-0 opacity-60">
        {Array.from({ length: 45 }).map((_, i) => {
          const size = 1 + (i % 3) * 0.5
          const left = (i * 29 + 11) % 100
          const top = (i * 47 + 7) % 100
          const delay = (i % 6) * 0.4
          const duration = 7 + (i % 4) * 1.2
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white/80"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                animation: reduce ? undefined : `bb-star-twinkle-opt ${duration}s ease-in-out ${delay}s infinite`,
                opacity: 0.25,
              }}
            />
          )
        })}
      </div>

      {/* Local Ambient Blurs */}
      <div className="absolute -top-32 left-[5%] h-96 w-96 rounded-full bg-[#F4C542]/10 blur-[120px]" />
      <div className="absolute top-[35%] right-[5%] h-[450px] w-[450px] rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="absolute bottom-[10%] left-[20%] h-96 w-96 rounded-full bg-purple-600/5 blur-[100px]" />

      {/* Interactive mouse tracking glow layer */}
      {!reduce && (
        <div
          className="fixed inset-0 mix-blend-screen opacity-[0.12] pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(550px circle at var(--mouse-x, 50vw) var(--mouse-y, 30vh), rgba(244,197,66,0.8), transparent 65%)',
          }}
        />
      )}

      {/* Fine Film Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"grain\"><feTurbulence type=\"fractalNoise\" baseFrequency=\".85\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23grain)\" opacity=\".4\"/></svg>')",
      }} />

      <style>{`
        @keyframes bb-grid-breathe {
          0%, 100% { opacity: 0.12; transform: translateY(0); }
          50% { opacity: 0.18; transform: translateY(-2px); }
        }
        @keyframes bb-star-twinkle-opt {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// ==========================================
// ADVANCED AI ASSISTANT MESSENGER PANEL
// ==========================================

function AIAssistantMessenger() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: 'Greetings. I am your optimization entity. Paste your target raw bullet ledger, or ask structure compliance checks.', time: 'Just now' }
  ])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: inputVal,
      time: 'Just now'
    }

    setMessages(prev => [...prev, userMsg])
    const promptText = inputVal
    setInputVal('')
    setIsTyping(true)

    setTimeout(() => {
      let aiResponseText = "Analysis processed successfully. I suggest adding a quantifiable metric framework to highlight outcome scaling parameters."
      
      const lower = promptText.toLowerCase()
      if (lower.includes('ats') || lower.includes('optimize')) {
        aiResponseText = "Structural pass metric evaluated at 98.4%. Ensure your context headers avoid multi-column overlap artifacts during markdown compilation."
      } else if (lower.includes('template') || lower.includes('style')) {
        aiResponseText = "The active layout uses a luxury vertical typographic grid set to 1.45rem base alignment lines. Highly compatible with executive parses."
      } else if (lower.includes('price') || lower.includes('plan')) {
        aiResponseText = "The Pro tier unlocks dynamic JSON compilation endpoints and vector metadata tracking blocks. You can scale dynamically from the setup panel."
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseText,
        time: 'Just now'
      }])
      setIsTyping(false)
    }, 1100)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[6000] font-sans">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C542] text-slate-950 shadow-2xl transition shadow-[#F4C542]/30 focus:outline-none focus:ring-2 focus:ring-[#F4C542] relative group"
        aria-label="Launch Artificial Intelligence Assistant Channel Terminal"
      >
        <span className="absolute inset-0 rounded-full bg-[#F4C542] animate-ping opacity-25 scale-105 pointer-events-none group-hover:hidden" />
        {isOpen ? <X className="h-6 w-6 stroke-[2.5]" /> : <MessageSquare className="h-6 w-6 stroke-[2.2]" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-18 right-0 w-[360px] sm:w-[400px] h-[520px] rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#F4C542] to-amber-300 flex items-center justify-center text-slate-950 shadow-inner">
                  <Sparkles className="h-4 w-4" fill="currentColor" fillOpacity={0.2} />
                </div>
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>COGNITIVE CORE</span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Optimizer Platform Layer v5.0</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">SECURE DISPATCH</span>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-gradient-to-b from-transparent to-slate-900/40"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.type === 'user'
                      ? 'bg-[#F4C542] text-slate-950 font-semibold rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                  }`}>
                    <p>{m.content}</p>
                    <div className={`mt-1.5 text-[9px] font-medium tracking-wide ${m.type === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-white/5 bg-slate-900/30 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
              {[
                { txt: 'Optimize ATS Parser score', icon: ShieldCheck },
                { txt: 'Refactor executive bullet statements', icon: Briefcase },
                { txt: 'Verify system fonts parameters', icon: FileText }
              ].map(chip => (
                <button
                  key={chip.txt}
                  type="button"
                  onClick={() => setInputVal(chip.txt)}
                  className="text-[10px] font-medium border border-white/10 bg-white/5 rounded-full px-2.5 py-1 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all flex items-center gap-1"
                >
                  <chip.icon className="h-2.5 w-2.5 text-[#F4C542]" />
                  <span>{chip.txt}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Query alignment parsing indexes..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F4C542] transition"
                maxLength={400}
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 rounded-xl bg-[#F4C542] text-slate-950 disabled:opacity-40 disabled:hover:brightness-100 transition hover:brightness-110 flex items-center justify-center shrink-0"
                aria-label="Submit instruction packet"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// PRIMARY HOMEPAGE EXPORTED COMPONENT VIEW
// ==========================================

export default function Home() {
  const floatingBadgeNodes = useMemo(() => FLOATING_BADGES, [])

  const resumeModes = useMemo(() => {
    return [
      {
        key: 'Product',
        title: 'Royal Product Resume',
        subtitle: 'Impact • Strategy • Execution',
        bullets: ['Led roadmap outcomes for globally distributed ledger teams', 'Shipped high-velocity conversion rate optimization frameworks', 'Scaled data metrics-driven pipeline engineering operations'],
        score: 92,
        metrics: { ats: 94, clarity: 91, impact: 92 }
      },
      {
        key: 'Design',
        title: 'Royal Design Resume',
        subtitle: 'Craft • Clarity • Systems',
        bullets: ['Designed multi-tier dynamic architecture design systems', 'Converted intensive qualitative research loops into intuitive layouts', 'Improved end-to-end checkout conversion flows by 24.5%'],
        score: 95,
        metrics: { ats: 96, clarity: 98, impact: 92 }
      },
      {
        key: 'Engineering',
        title: 'Royal Engineering Resume',
        subtitle: 'Scale • Reliability • Shipping',
        bullets: ['Built resilient asynchronous microservice processing pipelines', 'Reduced pipeline visual compilation response down to sub-millisecond rates', 'Owned comprehensive production operations across edge clusters'],
        score: 94,
        metrics: { ats: 98, clarity: 92, impact: 95 }
      },
    ]
  }, [])

  const [modeKey, setModeKey] = useState('Product')
  const mode = useMemo(() => resumeModes.find((m) => m.key === modeKey) || resumeModes[0], [resumeModes, modeKey])

  const dockItems = [
    { id: 'snapshot', label: 'Resume Snapshot', icon: Sparkles, to: '/normal' },
    { id: 'royal', label: 'Royal Resume', icon: Crown, to: '/premium' },
    { id: 'template', label: 'Modern Template', icon: Zap, to: '/templates' },
    { id: 'preview', label: 'Instant Preview', icon: BadgeCheck, to: '/normal/preview' },
    { id: 'export', label: 'Export Ready', icon: Download, to: '/normal/download' },
    { id: 'live', label: 'Live Operational Feed', icon: Check, to: '/premium/dashboard' },
  ]

  return (
    <div className="relative z-10 min-h-screen text-white overflow-hidden bg-[#020617] font-sans selection:bg-[#F4C542]/30 selection:text-white">
      {/* Visual background layers */}
      <PremiumBackgroundLayer />

      {/* Bottom Floating Navigation Overlay Dock */}
      <nav aria-label="Feature dock navigation launcher" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[4000] px-4 w-full max-w-max">
        <div className="relative rounded-[28px] border border-white/10 bg-slate-950/70 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-[#F4C542]/10 via-sky-500/5 to-[#F4C542]/10 blur-xl opacity-50 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5">
                {dockItems.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      aria-label={item.label}
                      className="group relative flex flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-300 hover:bg-white/5"
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-xl bg-[#F4C542]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                        <Icon className="h-4 w-4 text-slate-300 group-hover:text-[#F4C542] transition-colors" />
                      </motion.span>
                      <AnimatePresenceTooltip label={item.label} index={idx} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout Adjustments (Top margin padded correctly since Header is removed) */}
      <main className="relative pt-12 pb-32 z-10">
        
        {/* ==========================================
            HERO MAIN HERO SECTION 
           ========================================== */}
        <section id="hero" aria-labelledby="hero-heading" className="pt-6 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10">
            
            {/* Left Column Text Block Elements Wrapper */}
            <div className="space-y-8 text-left">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#F4C542]/20 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-200 backdrop-blur-xl shadow-lg">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C542]/20 text-[#F4C542]" aria-hidden="true">✦</span>
                  <span className="font-medium tracking-wide text-slate-300 text-[11px] sm:text-xs">⚡ Build resumes faster with modern AI workflow.</span>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] text-white"
                >
                  Create premium resumes with a <br className="hidden sm:inline" />
                  <AnimatedGoldText>future–forward</AnimatedGoldText> workflow.
                </h1>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-400">
                  Launch your career with polished resume templates, smart content suggestions, and instant preview — all in a modern app experience built for ambitious professionals.
                </p>
              </Reveal>

              {/* Action Buttons Hub Block Section */}
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 sm:max-w-md">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="flex-1">
                    <Link
                      to="/auth"
                      className="w-full inline-flex items-center justify-center rounded-xl bg-[#F4C542] px-6 py-3.5 text-xs font-black text-slate-950 shadow-xl shadow-[#F4C542]/10 transition hover:brightness-110 focus:outline-none"
                    >
                      <span>Get Started &rarr;</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="flex-1">
                    <Link
                      to="/select"
                      className="w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold text-white transition hover:border-[#F4C542] hover:bg-white/10 focus:outline-none"
                    >
                      <span>Explore Plans</span>
                    </Link>
                  </motion.div>
                </div>
              </Reveal>

              {/* Grid Metrics Display Widget Element Block Array */}
              <Reveal delay={0.35}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl pt-2">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border border-white/5 bg-slate-900/40 p-4 backdrop-blur-sm transition-all hover:border-white/10 ${
                        stat.highlight ? 'border-[#F4C542]/20 shadow-lg shadow-[#F4C542]/5' : ''
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</div>
                      <div className="mt-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">{stat.label}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5 font-medium">{stat.detail}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Segmented Horizon Trust Elements Block Grid Array Map */}
              <Reveal delay={0.4}>
                <div className="grid gap-3 sm:grid-cols-3 pt-4 border-t border-white/5 max-w-2xl">
                  {TRUST_BADGES.map((t) => {
                    const BadgeIcon = t.icon
                    return (
                      <div
                        key={t.title}
                        className="rounded-xl border border-white/5 bg-white/[0.01] p-3 backdrop-blur-md"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4C542]/10 text-[#F4C542]">
                            <BadgeIcon className="h-3.5 w-3.5" />
                          </span>
                          <div className="text-xs font-bold text-white">{t.title}</div>
                        </div>
                        <div className="mt-1 text-[11px] leading-relaxed text-slate-400">{t.sub}</div>
                      </div>
                    )
                  })}
                </div>
              </Reveal>
            </div>

            {/* Right Column Interactive Dynamic Live Preview Display Element */}
            <div className="relative group/container">
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-[#F4C542]/10 to-sky-500/10 opacity-30 blur-2xl group-hover/container:opacity-40 transition-opacity duration-500 pointer-events-none" />
              
              <Reveal delay={0.2}>
                <div className="relative rounded-[32px] border border-white/10 bg-slate-950/80 p-5 sm:p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden z-20">
                  <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#F4C542]/5 blur-3xl" />
                  <div className="absolute -right-12 top-12 h-32 w-32 rounded-full bg-sky-500/5 blur-3xl" />

                  <div
                    aria-hidden="true"
                    className="absolute -top-32 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rotate-[-8deg] opacity-25 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(244,197,66,0.15) 35%, rgba(56,189,248,0.15) 60%, transparent 100%)',
                      filter: 'blur(8px)',
                    }}
                  />

                  <div className="relative space-y-4">
                    <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-4 sm:p-5 shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                        <div>
                          <div className="text-[9px] uppercase font-bold tracking-[0.25em] text-slate-400">Interactive Resume Preview</div>
                          <div className="mt-1 textxl font-black text-white tracking-tight">{mode.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{mode.subtitle}</div>
                        </div>
                        <div className="rounded-full border border-[#F4C542]/30 bg-[#F4C542]/10 px-3 py-1 text-[9px] uppercase font-black tracking-widest text-[#F4C542] self-start sm:self-center">
                          Live Active
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Resume Content Selection Filters">
                        {resumeModes.map((m) => (
                          <button
                            key={m.key}
                            type="button"
                            role="tab"
                            aria-selected={m.key === modeKey}
                            onClick={() => setModeKey(m.key)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide transition focus:outline-none ${
                              m.key === modeKey
                                ? 'bg-[#F4C542]/15 text-[#F4C542] border border-[#F4C542]/30 shadow-inner'
                                : 'bg-white/5 text-slate-300 border border-transparent hover:bg-white/10'
                            }`}
                          >
                            {m.key}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 space-y-2">
                        {mode.bullets.map((bulletString, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                            <Check className="h-3.5 w-3.5 text-[#F4C542] shrink-0 mt-0.5" />
                            <span className="text-xs leading-relaxed font-medium text-slate-300">{bulletString}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                      {[
                        { icon: Sparkles, label: 'AI-assisted writing' },
                        { icon: ShieldCheck, label: 'ATS optimization' },
                        { icon: Crown, label: 'Premium typography' },
                        { icon: Download, label: 'Instant export' }
                      ].map((item, i) => {
                        const FeatureIcon = item.icon
                        return (
                          <div
                            key={i}
                            className="rounded-xl border border-white/5 bg-slate-900/30 p-3 transition hover:border-[#F4C542]/30"
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#F4C542]">
                                <FeatureIcon className="h-3.5 w-3.5" />
                              </span>
                              <span className="font-bold text-xs text-slate-200">{item.label}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-400">Total Structural Performance Index</span>
                        <span className="font-black text-white">{mode.score}%</span>
                      </div>

                      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-950 border border-white/5">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-[#F4C542]"
                          initial={false}
                          animate={{ width: `${mode.score}%` }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[
                          { label: 'ATS Vector', value: mode.metrics.ats },
                          { label: 'Semantic Clarity', value: mode.metrics.clarity },
                          { label: 'Quantified Impact', value: mode.metrics.impact },
                        ].map((subMetric, sIdx) => (
                          <div key={sIdx} className="rounded-xl border border-white/5 bg-slate-950/40 p-2 text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{subMetric.label}</div>
                            <div className="mt-0.5 text-sm font-black text-white">{subMetric.value}%</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                        {[
                          { icon: BadgeCheck, text: 'ATS-ready standard profiles' },
                          { icon: Zap, text: 'Optimized response parameters' }
                        ].map((tagObj, tIdx) => {
                          const TagIcon = tagObj.icon
                          return (
                            <div key={tIdx} className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                              <TagIcon className="h-3 w-3 text-[#F4C542]" />
                              <span>{tagObj.text}</span>
                            </div>
                          )
                        })}
                      </div>

                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ==========================================
            CORPORATE BRAND SECTION PARTNERS 
           ========================================== */}
        <section id="trusted" aria-label="Corporate Deployment Partners Validation Framework" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-16">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#F4C542]">Trusted corporate conduits</div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Built for technical and executive ledger updates.</h2>
                </div>
                <p className="max-w-xl text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Utilized globally across competitive vectors to bypass validation filters, generate premium document payloads, and optimize callback frequency vectors.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CORPORATE_PARTNERS.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
                  className="rounded-2xl border border-white/5 bg-slate-900/20 px-4 py-4 text-center backdrop-blur-xl transition-all"
                >
                  <div className="text-sm font-bold text-slate-200">{partner.name}</div>
                  <div className="text-[9px] uppercase font-semibold text-slate-500 tracking-wider mt-0.5">{partner.industry}</div>
=======
    <div className="flex-1 flex flex-col w-full relative">
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.02))] pointer-events-none" style={{ backgroundSize: '300% 300%', animation: 'gradient-pan 18s ease infinite' }} />

      <main className="flex-1 relative z-10 w-full">
        <section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-surface/50 px-4 py-2 text-sm text-foreground backdrop-blur-xl shadow-elevation-1">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Zap className="w-4 h-4" />
                </span>
                <span className="font-medium">Build resumes faster with modern AI workflow.</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-h2 sm:text-h1 lg:text-display font-black tracking-tight">
                Create premium resumes with a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400">future-forward workflow</span>.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl text-body-large text-foreground/70">
                Launch your career with polished resume templates, smart content suggestions, and instant preview — all in a modern app experience built for ambitious professionals.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto text-base rounded-full shadow-elevation-3">
                  <Link to="/auth">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass" className="w-full sm:w-auto text-base rounded-full">
                  <Link to="/select">
                    Explore Plans
                  </Link>
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-3 w-full max-w-lg mt-8">
                {STATS.map((stat, i) => (
                  <Card key={i} className={cn("bg-surface/30 border-white/5", stat.highlight && "border-primary/30 bg-primary/5")}>
                    <CardContent className="p-4 text-center">
                      <div className="text-h4 font-black text-foreground">{stat.value}</div>
                      <div className="mt-1 text-caption uppercase tracking-wider text-foreground/60">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>

            {/* Hero Right Visuals */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 lg:-inset-10 -z-10 rounded-full bg-primary/10 blur-[100px]" />
              <Card className="p-6 md:p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow pointer-events-none" />
                <div className="space-y-6">
                  <div className="rounded-2xl bg-surface-elevated border border-border p-5 shadow-elevation-2">
                    <div className="text-caption uppercase tracking-widest text-foreground/50">Resume Snapshot</div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-h5 font-black">Royal Resume</div>
                        <div className="mt-1 text-small text-foreground/60">Modern template, export ready</div>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-caption uppercase tracking-widest text-primary font-bold">Live</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {['Modern layout', 'ATS optimization', 'AI-assisted content', 'Instant export'].map((item) => (
                      <div key={item} className="rounded-xl border border-border bg-surface/50 p-4 text-small text-foreground/80 hover:border-primary/50 transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-surface-elevated p-5">
                    <div className="flex items-center justify-between text-small text-foreground/60">
                      <span>Progress</span>
                      <span className="font-semibold text-foreground">92%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                      <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-[var(--section-spacing-desktop)]">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-foreground/80">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Production-ready workflow</span>
              </div>
              <h2 className="text-h2 sm:text-h1 font-black tracking-tight">Design, build, and ship like a product.</h2>
              <p className="max-w-xl mx-auto lg:mx-0 text-body-large text-foreground/70">
                The new standard for resume builders: accessible UI, smooth motion, responsive layout, and modern interactions built for professionals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, idx) => (
                <motion.div key={feature.title} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-h5 font-bold mb-2">{feature.title}</h3>
                      <p className="text-small text-foreground/70 leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
                </motion.div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ==========================================
            FEATURES DISCOVERY CAPABILITIES HUB 
           ========================================== */}
        <section id="features" aria-label="Advanced System Configurations Ecosystem Showcase" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              eyebrow="Ecosystem Architectural Integrity"
              title="Everything required to ship market-leading vectors."
              desc="Glassmorphic interface panels, high-performance compilation architecture, and decentralized localized deployment configurations."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feat, idx) => {
                const FeatureIcon = feat.icon
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                    whileHover={{ y: -5, borderColor: 'rgba(244,197,66,0.25)' }}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/20 p-5 shadow-xl backdrop-blur-xl transition-all"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(244,197,66,0.08),transparent_40%)] pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#F4C542]">
                          <FeatureIcon className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                          {feat.badge}
                        </span>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-[#F4C542] uppercase tracking-wide">{feat.category}</div>
                        <h3 className="mt-1 text-base font-bold text-white tracking-tight">{feat.title}</h3>
                        <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-white transition-colors">
                        <span>Initialize Element</span>
                        <ArrowRight className="h-3 w-3 translate-x-[-4px] group-hover:translate-x-0 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            PLATFORM DEEP DIVE INTERACTION LAYER 
           ========================================== */}
        <section id="builder" aria-label="Deep Technical Operation Panels" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
              
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Recruiter Semantic Parser Platform Engine"
                  title="Formulate profiles that clear modern screening systems."
                  desc="Intelligent structural suggestion loops transform unstructured drafts into precise, quantifiable statements designed for rapid shortlist processing parameters."
                  alignment="left"
                />

                <div className="grid gap-3 sm:grid-cols-2 pt-4">
                  {[
                    { icon: Sparkles, title: 'Smart dynamic alignment guidance', text: 'Convert fragmented milestones into compliant corporate vectors.' },
                    { icon: ShieldCheck, title: 'Validated baseline frameworks', text: 'Consistent headings, spacing structures, and chronological orders.' },
                    { icon: Crown, title: 'Premium alignment balance typography', text: 'Perfect readability vectors that preserve configuration state output inside PDF rendering layers.' },
                    { icon: Zap, title: 'Asynchronous updates parameters', text: 'Modify structure segments effortlessly with instant layout redistribution.' },
                  ].map((gridItem, gIdx) => {
                    const GridIcon = gridItem.icon
                    return (
                      <motion.div
                        key={gridItem.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: gIdx * 0.05 }}
                        className="rounded-xl border border-white/5 bg-slate-900/30 p-4 backdrop-blur-md transition-all hover:border-white/10"
                      >
                        <div className="flex gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#F4C542] shrink-0">
                            <GridIcon className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white">{gridItem.title}</h4>
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-400 font-medium">{gridItem.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Advanced Real-time Technical State Simulator Container */}
              <div className="relative">
                <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F4C542]/5 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl" />

                  <Reveal className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <div className="text-[9px] uppercase font-mono text-slate-400 tracking-widest">SYSTEM LEDGER SIMULATOR</div>
                        <div className="mt-0.5 text-xl font-black text-white tracking-tight">Active Synthesis Matrix Feed</div>
                      </div>
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[9px] uppercase tracking-wider font-mono text-[#F4C542]">
                        Asynchronous Mode
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { title: 'Quantified Impact Level', percentage: mode.score, variant: 'gold' },
                        { title: 'ATS Compliance Core Pass', percentage: mode.metrics.ats, variant: 'sky' },
                        { title: 'Semantic Compression Balance', percentage: mode.metrics.clarity, variant: 'purple' },
                        { title: 'Visual Grid Integrity Factor', percentage: mode.metrics.impact, variant: 'gold' },
                      ].map((barObj, bIdx) => (
                        <div key={bIdx} className="rounded-xl border border-white/5 bg-slate-900/40 p-3.5 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-300">{barObj.title}</span>
                            <span className="text-white font-mono font-black">{barObj.percentage}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-950 border border-white/5">
                            <motion.div
                              className="h-full rounded-full bg-[#F4C542]"
                              initial={false}
                              animate={{ width: `${barObj.percentage}%` }}
                              transition={{ duration: 0.5, delay: bIdx * 0.05 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {[
                        { head: 'Structure Matrix Pass Validated', body: 'Predictable document node flow layouts are mapped ready for immediate indexing checks.' },
                        { head: 'Quantified Milestone Conversion', body: 'Milestone array elements prioritize active results over simple list descriptors.' }
                      ].map((item, i) => (
                        <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-white">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#F4C542]/15 text-[#F4C542]">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </span>
                            <span>{item.head}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium pl-7">{item.body}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Link
                        to="/normal"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-[#F4C542]/10 transition hover:brightness-110"
                      >
                        <span>Initialize Active Builder</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        to="/templates"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                      >
                        Browse Matrix Layout Gallery
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================
            LAYOUT GALLERY SHOWCASE GRID 
           ========================================== */}
        <section id="templates" aria-label="Typographic Layout Profiles Portfolio" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Luxury Canvas Templates Showcase"
              title="Mathematical grid consistency for modern displays."
              desc="Flawless font geometries, rigid alignment boundaries, and isolated PDF reliability frameworks—built to present data cleanly."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[ 
                { name: 'Executive Hierarchy Canvas', desc: 'Bold balance configurations paired with structured metadata pipelines.', activePct: 'w-2/5', trackingColor: 'bg-[#F4C542]/70' },
                { name: 'Modern Systems Ledger', desc: 'Optimized typography for quick assessment tracking and high callback frequency.', activePct: 'w-3/5', trackingColor: 'bg-sky-400/60' },
                { name: 'Minimal Parser Baseline', desc: 'Strict chronological node layout maximizing scan parameters.', activePct: 'w-2/4', trackingColor: 'bg-purple-400/50' },
                { name: 'Deep Research Appendix', desc: 'Expanded layout logic tailored for exhaustive profile data distribution workflows.', activePct: 'w-4/5', trackingColor: 'bg-[#F4C542]/70' },
                { name: 'Design Portfolio Nexus', desc: 'Visual clarity metrics paired with clean asset description matrices.', activePct: 'w-1/3', trackingColor: 'bg-sky-400/60' },
                { name: 'Engineering Production Blueprint', desc: 'Tailored specifically to scale systems-focused quantified bullet indexes.', activePct: 'w-3/4', trackingColor: 'bg-emerald-400/50' },
              ].map((tmpl, idx) => (
                <motion.div
                  key={tmpl.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.03 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-xl transition-all"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.05),transparent_40%)] pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#F4C542] transition-colors">{tmpl.name}</h3>
                      <span className="text-xs font-mono text-[#F4C542] select-none">✦</span>
                    </div>
                    
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{tmpl.desc}</p>
                    
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>STRUCTURAL WIREFRAME</span>
                        <span className="text-[#F4C542] font-bold">READY</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full rounded-full ${tmpl.trackingColor} ${tmpl.activePct}`} />
                      </div>
                      <div className="h-2 w-5/6 rounded-full bg-white/5" />
                      <div className="h-2 w-4/6 rounded-full bg-white/5" />
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                      <span>Mount Template Framework</span>
                      <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            ATS COMPLIANCE DATA MATRIX SYSTEM 
           ========================================== */}
        <section id="ats" aria-label="ATS Parser Calibration Matrix View" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="ATS Standardization Optimization Engine"
                  title="Eliminate layout processing errors before rendering."
                  desc="Unpredictable structures trigger parsing drop-offs. Ensure absolute pass indexes across major recruitment portals with verified data blocks."
                  alignment="left"
                />

                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F4C542]/5 blur-3xl" />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400">INDEX CHECKLIST</div>
                        <h3 className="text-lg font-black text-white tracking-tight">Production Validation Matrix</h3>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-[10px] font-bold text-emerald-400">
                        Verified Match
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        'Consistent document tree headers avoid nested overlap parameters.',
                        'Spatial grid metrics remain anchored inside the PDF generator binary layer.',
                        'Achievement strings implement active verb arrays paired with outcome indexes.',
                        'Contextual keywords adapt sequentially without breaking natural scannability metrics.'
                      ].map((item, index) => (
                        <div key={index} className="flex gap-3 rounded-xl border border-white/5 bg-slate-900/30 p-3">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#F4C542]/10 text-[#F4C542] shrink-0 mt-0.5">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </span>
                          <div className="text-xs leading-relaxed text-slate-300 font-medium">
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="豪華なボックス">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(244,197,66,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.08),transparent_50%)] pointer-events-none" />
                  
                  <div className="relative space-y-6">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 tracking-wider">CALIBRATION FEEDBACK HUB</div>
                      <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">Instant Optimization Directives</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">
                        Toggle profile variants to observe dynamic score updates. Built locally with decoupled application architecture for extreme reliability.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'ATS Parser Threshold', metric: mode.metrics.ats, labelText: 'Structural alignment compliance', trackingIcon: ShieldCheck },
                        { label: 'Recruiter Attention Index', metric: mode.metrics.impact, labelText: 'Quantified priority metrics', trackingIcon: Sparkles },
                        { label: 'Typographic Balance Index', metric: mode.metrics.clarity, labelText: 'Grid weight layout compliance', trackingIcon: Crown },
                      ].map((obj, idx) => {
                        const IndicatorIcon = obj.trackingIcon
                        return (
                          <div key={idx} className="rounded-xl border border-white/5 bg-slate-900/40 p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#F4C542]">
                                  <IndicatorIcon className="h-4 w-4" />
                                </span>
                                <div>
                                  <h4 className="text-xs font-bold text-white">{obj.label}</h4>
                                  <p className="text-[10px] text-slate-500 font-medium">{obj.labelText}</p>
                                </div>
                              </div>
                              <span className="text-sm font-mono font-black text-white">{obj.metric}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-950 border border-white/5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-[#F4C542]"
                                initial={false}
                                animate={{ width: `${obj.metric}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h4 className="text-xs font-bold text-slate-300">Asynchronous System Recommendations</h4>
                        <span className="text-[9px] font-mono uppercase bg-[#F4C542]/10 text-[#F4C542] px-2 py-0.5 rounded">AUTO</span>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          'Inject at least 1 quantified volume metric parameter into historical slots.',
                          'Relocate anchor system metrics directly into the initial bullet vectors.',
                          'Confirm profile target metadata objects match deployment job descriptions.'
                        ].map((recText, rIdx) => (
                          <div key={rIdx} className="flex gap-2 items-center text-xs text-slate-300 font-medium">
                            <span className="text-[#F4C542] font-bold shrink-0 text-[11px]">✦</span>
                            <span>{recText}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 flex flex-col sm:flex-row gap-3">
                      <Link
                        to="/normal"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-[#F4C542]/10 transition hover:brightness-110"
                      >
                        <span>Execute Ledger Score Check</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        to="/pricing"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                      >
                        Review Platform Pricing Matrix
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================
            TESTIMONIALS ARCHIVE SECTION 
           ========================================== */}
        <section id="testimonials" aria-label="Verified Performance Testimonials Ledger" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Global User Logs Validation"
              title="Built to accelerate structural callback yields."
              desc="Ambitious operators utilize the platform matrix configuration rules to secure interviews across hyper-competitive deployment channels."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS_COLLECTION.map((rev, idx) => (
                <motion.div
                  key={rev.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.1)' }}
                  className="rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4C542]/10 border border-[#F4C542]/20 text-[#F4C542] font-mono font-black select-none">
                        {rev.initial}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{rev.role} &bull; <span className="text-slate-500">{rev.firm}</span></p>
                      </div>
                    </div>
                    
                    <blockquote className="text-xs text-slate-300 leading-relaxed font-medium pt-1">
                      &ldquo;{rev.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>RECORD IDENTITY SIGNED</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            PRICING SELECTION SYSTEM MATRIX 
           ========================================== */}
        <section id="pricing" aria-label="Platform Tier Options Ledger Grid" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Deployment Pricing Matrix"
              title="Premium output loops. Isolated processing power."
              desc="Initialize profiles with zero friction, then scale into full multi-tier layout validation endpoints when targeting high-tier pipelines."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {[
                { name: 'Starter System', price: '$0', desc: 'Evaluate operational workflow logic layers.', highlight: false, features: ['Baseline canvas builder layout structures', 'Standard profile template parameters', 'Dynamic interactive browser canvas previews', 'Isolated localized data array components'] },
                { name: 'Professional Tier', price: '$14', desc: 'Engineered specifically for active high-frequency applicants.', highlight: true, features: ['Premium luxury vertical typographic grids', 'Full ATS compliance checker access', 'Asynchronous metric generation suggest systems', 'Unlimited vector PDF document export payloads', 'Dedicated local endpoint hook interfaces'] },
                { name: 'Enterprise Cluster', price: '$39', desc: 'Configured for talent architecture agencies and career managers.', highlight: false, features: ['Multi-license deployment control panel panels', 'Advanced programmatic semantic parser access', 'Custom brand colorway asset overrides', 'High-priority edge rendering priority arrays', 'Isolated historical version ledger vaults'] },
              ].map((tier, idx) => {
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className={`relative overflow-hidden rounded-3xl border bg-slate-900/20 p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between transition-all ${
                      tier.highlight ? 'border-[#F4C542]/30 ring-1 ring-[#F4C542]/10' : 'border-white/5'
                    }`}
                  >
                    {tier.highlight && (
                      <div className="absolute top-3 right-4 rounded-full bg-[#F4C542]/10 border border-[#F4C542]/20 px-3 py-0.5 text-[9px] font-black tracking-widest text-[#F4C542] uppercase">
                        Most Active Tier
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">{tier.name}</div>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{tier.price}</span>
                          <span className="text-xs font-medium text-slate-500">/ perpetual cycle</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-400 font-medium leading-relaxed">{tier.desc}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        {tier.features.map((featureString) => (
                          <div key={featureString} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-slate-950/30 p-2.5">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#F4C542]/10 text-[#F4C542] shrink-0 mt-0.5">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </span>
                            <span className="text-xs font-semibold text-slate-300 leading-normal">{featureString}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link
                        to={tier.highlight ? '/auth' : '/select'}
                        className={`w-full inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-xs font-black transition-all ${
                          tier.highlight
                            ? 'bg-[#F4C542] text-slate-950 shadow-xl shadow-[#F4C542]/10 hover:brightness-110'
                            : 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {tier.highlight ? 'Deploy Professional Operations' : 'Initialize Choice Instance'}
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            FAQ DETAILED ACCORDION MATRIX 
           ========================================== */}
        <section id="faq" aria-label="System Knowledge Base Index Archive" className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              eyebrow="Platform Knowledge Base Index" 
              title="Technical operational answers for quick evaluation." 
              desc="Review direct structural parameters detailing document compilation paths, localized data boundaries, and processing expectations." 
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {PRESET_FAQS.map((faqItem, idx) => (
                <motion.div
                  key={faqItem.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-xl shadow-xl space-y-2.5 transition-all hover:border-white/10"
                >
                  <div className="text-[9px] font-mono uppercase text-[#F4C542] tracking-widest font-bold">KNOWLEDGE CELL LOG</div>
                  <h3 className="text-base font-bold text-white tracking-tight">{faqItem.q}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium pt-1 border-t border-white/5 mt-2">{faqItem.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            PRIMARY BOTTOM CLOSING CTA REGION 
           ========================================== */}
        <section id="cta" aria-label="Primary Platform Initialization Banner" className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(244,197,66,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.1),transparent_40%)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-3">
                <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#F4C542]">Instant Node Initialization</div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  Ready to deploy a premium, high-yield professional ledger profile?
                </h2>
                <p className="max-w-xl text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                  Harness modern visual grids, advanced parser calibration tools, and zero cloud lock-in constraints. Run your deployment track now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 self-start lg:self-center w-full sm:w-auto">
                <Link
                  to="/auth"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-6 py-4 text-xs font-black text-slate-950 shadow-xl shadow-[#F4C542]/10 transition hover:brightness-110 overflow-hidden"
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.25)_40%,transparent_60%)] transition-opacity duration-500 pointer-events-none" />
                  <span>Initialize Profile Construction</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>
                
                <Link 
                  to="/select" 
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-xs font-bold text-white transition hover:bg-white/10 hover:border-white/20"
                >
                  <span>See Full Configuration Plans</span>
                </Link>
              </div>
=======
        {/* Call to Action */}
        <section className="mt-[var(--section-spacing-desktop)]">
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-surface to-surface-elevated border-primary/20">
            <div className="text-caption uppercase tracking-widest text-primary mb-4 font-bold">Ready to upgrade?</div>
            <h3 className="text-h3 md:text-h2 font-black mb-8">Start building your premium resume today.</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-elevation-2">
                <Link to="/auth">Start Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/select">Explore Plans</Link>
              </Button>
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
            </div>
          </Card>
        </section>
<<<<<<< HEAD

      </main>

      {/* Embedded Smart AI Assistant Messenger Applet Interface */}
      <AIAssistantMessenger />

      {/* Safety layer preventing layout node compile drop-outs */}
      {floatingBadgeNodes ? null : null}
      
      {/* Structural layout scrollbar normalization controls */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
=======
      </main>
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
    </div>
  )
}

// ==========================================
// HIDDEN DOCK COMPONENT ACCESSIBILITY TOOLTIP
// ==========================================

function AnimatePresenceTooltip({ label, index }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 z-[6500] scale-95 group-hover:scale-100"
      style={{ transitionDelay: `${index * 0.01}s` }}
    >
      {label}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 bg-slate-950 border-r border-b border-white/10" aria-hidden="true" />
    </span>
  )
}