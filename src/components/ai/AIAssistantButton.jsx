import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageSquare, X, Bot } from 'lucide-react'
import AIAssistantModal from './AIAssistantModal.jsx'

// Floating button animation variants
const buttonVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
}

// Pulse animation for the floating button
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

export default function FloatingAIButton({ onAutofill }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Button - Fixed at bottom right */}
      <motion.div
        className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3"
        initial="initial"
        animate="animate"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 20 }}
              className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-xl whitespace-nowrap"
            >
              AI Resume Assistant
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover="hover"
          whileTap="tap"
          aria-label="Open AI Resume Assistant"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 shadow-xl shadow-amber-500/25 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute inset-0 rounded-full"
          />

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6" />
          )}

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <AIAssistantModal
            mode="premium"
            onClose={() => setIsOpen(false)}
            onAutofill={onAutofill}
          />
        )}
      </AnimatePresence>
    </>
  )
}