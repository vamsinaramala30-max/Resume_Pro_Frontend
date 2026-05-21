import { Navigate, useLocation } from 'react-router-dom'
import { readJSON, STORAGE_KEYS } from '../lib/storage'

export default function AuthGuard({ children }) {
  const location = useLocation()
  const auth = readJSON(STORAGE_KEYS.auth, null)

  // Keep logged-in until explicit logout; if rememberMe is off, still honor stored token.
  const ok = Boolean(auth?.token)

  if (!ok) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />
  }

  return children
}

