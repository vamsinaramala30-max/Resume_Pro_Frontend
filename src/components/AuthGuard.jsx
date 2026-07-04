// src/components/AuthGuard.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { readJSON, STORAGE_KEYS } from '../lib/storage';
import { apiMe } from '../lib/api';

export default function AuthGuard({ children }) {
  const location = useLocation();
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const verifyStarted = useRef(false);

  useEffect(() => {
    let mounted = true;
    
    // Prevent double invocation loops in development strict mode
    if (verifyStarted.current) return;
    verifyStarted.current = true;

    async function verifyToken() {
      try {
        const auth = readJSON(STORAGE_KEYS.auth, null);

        if (!auth?.token) {
          if (mounted) setChecking(false);
          return;
        }

        const response = await apiMe(auth.token);
        if (mounted) {
          if (response?.ok && response?.user) {
            setVerified(true);
          } else {
            const { removeKey } = await import('../lib/storage');
            removeKey(STORAGE_KEYS.auth);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err?.message || err);
        if (mounted) setError(err?.message || 'Authentication failed');
      } finally {
        if (mounted) setChecking(false);
      }
    }

    verifyToken();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-400">
          <div className="h-4 w-4 animate-spin rounded-full border border-amber-400 border-t-transparent" />
          <span>Verifying structural session...</span>
        </div>
      </div>
    );
  }

  // Intercept and break infinite redirection loop cycles safely
  if (!verified) {
    if (location.pathname === '/auth' || location.pathname === '/login') {
      return children;
    }
    return <Navigate to="/auth" replace state={{ from: location.pathname, error }} />;
  }

  return children;
}

export { AuthGuard as ProtectedRoute };