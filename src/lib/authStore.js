import { useEffect, useState } from 'react'
import { readJSON, STORAGE_KEYS } from './storage.js'

export function useAuth() {
  const [auth, setAuth] = useState(() => readJSON(STORAGE_KEYS.auth, null))

  useEffect(() => {
    const handleStorage = () => setAuth(readJSON(STORAGE_KEYS.auth, null))
    window.addEventListener('storage', handleStorage)
    window.addEventListener('royal-auth-updated', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('royal-auth-updated', handleStorage)
    }
  }, [])

  return {
    user: auth?.user || null,
    token: auth?.token || null,
    auth,
  }
}
