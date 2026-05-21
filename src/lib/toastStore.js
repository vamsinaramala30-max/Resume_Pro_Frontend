import { useCallback, useEffect, useMemo, useState } from 'react'

// Toast store built on top of the existing CustomEvent('royal-toast') API.
// This keeps the app behavior consistent while allowing components to call addToast().

export function useToasts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addToast = useCallback((type, title, message) => {
    window.dispatchEvent(
      new CustomEvent('royal-toast', {
        detail: { type, title, message },
      })
    )
  }, [])

  // Keep stable return signature.
  return useMemo(() => ({ addToast, mounted }), [addToast, mounted])
}

