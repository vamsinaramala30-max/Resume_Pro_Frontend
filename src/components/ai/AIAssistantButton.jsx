import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import AIAssistantModal from './AIAssistantModal.jsx'

export default function AIAssistantButton({ mode = 'normal', onAutofill }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="absolute top-0 right-0">
        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="z-10 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/15 text-white hover:border-royal-gold transition"
          aria-label="Open AI assistant"
        >
          <Sparkles className="w-4 h-4 text-royal-gold" />
          <span className="text-sm font-bold">AI Assistant</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open ? (
          <AIAssistantModal
            mode={mode}
            onClose={() => setOpen(false)}
            onAutofill={(patch) => {
              onAutofill?.(patch)
              setOpen(false)
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

