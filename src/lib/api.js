<<<<<<< HEAD
// Backend API wrapper with proper environment configuration
// Uses VITE_API_URL for explicit API URL or falls back to Vite proxy

// IMPORTANT: Never use 'undefined' in URLs
// Always fallback to a valid default

// Check if we're in development mode (Vite dev server)
const isDev = import.meta.env.DEV

function getBaseUrl() {
  // 1. Explicit API URL takes priority - use this for production or custom backends
  // IMPORTANT: Must be a valid URL string, not 'null' or 'undefined'
  const explicitUrl = import.meta.env.VITE_API_URL
  if (explicitUrl && explicitUrl !== 'null' && explicitUrl !== 'undefined' && explicitUrl.trim()) {
    return explicitUrl.replace(/\/$/, '') + '/api'
  }

  // 2. VITE_API_BASE for backward compatibility
  const baseUrl = import.meta.env.VITE_API_BASE
  if (baseUrl && baseUrl !== 'null' && baseUrl !== 'undefined' && baseUrl.trim()) {
    return baseUrl.replace(/\/$/, '') + '/api'
  }

  // 3. In development, use Vite proxy (relative /api path)
  // This avoids CORS issues - Vite proxies to backend
  if (isDev) {
    return '/api'
  }

  // 4. Fallback for production build - detect from current location
  const hostname = window.location.hostname || 'localhost'
  const protocol = window.location.protocol || 'http:'
  const port = import.meta.env.VITE_API_PORT || 5000
  return `${protocol}//${hostname}:${port}/api`
}

// Initialize API_BASE immediately - this is the key fix
// Never allow API_BASE to be null/undefined
let API_BASE = getBaseUrl()

// Also support async pattern for features that need it
async function ensureApiBase() {
  // Already initialized, but kept for backward compatibility
  return API_BASE
}

export async function getApiBase() {
  await ensureApiBase()
  return API_BASE
=======
// Minimal backend API wrapper
let API_BASE = import.meta.env.VITE_API_BASE;
let portDetected = false;

// Auto-detect backend port ONLY in development
async function getApiBase() {
  if (API_BASE) {
    // Clean up trailing slash
    if (API_BASE.endsWith('/')) {
      API_BASE = API_BASE.slice(0, -1);
    }
    // Auto-append /api if user forgot it
    if (!API_BASE.endsWith('/api')) {
      API_BASE = `${API_BASE}/api`;
    }
    return API_BASE;
  }
  
  if (import.meta.env.DEV && !portDetected) {
    const hostname = window.location.hostname || 'localhost';
    const protocol = window.location.protocol || 'http:';
    
    // Try ports 5000-5020 to find the local backend
    for (let port = 5000; port <= 5020; port++) {
      try {
        const testUrl = `${protocol}//${hostname}:${port}/api/test`;
        const res = await fetch(testUrl, { 
          method: 'GET',
          signal: AbortSignal.timeout(500)
        });
        if (res.ok) {
          API_BASE = `${protocol}//${hostname}:${port}/api`;
          portDetected = true;
          console.log(`✅ Backend detected on port ${port}`);
          return API_BASE;
        }
      } catch (e) {
        // Ignore
      }
    }
    
    // Fallback default
    API_BASE = `${protocol}//${hostname}:5000/api`;
    portDetected = true;
    console.warn(`⚠️ Backend not auto-detected, defaulting to: ${API_BASE}`);
    return API_BASE;
  }
  
  // In production, if VITE_API_BASE is missing, it will hit relative /api
  if (!API_BASE) {
    console.warn("⚠️ VITE_API_BASE is missing in production. Falling back to '/api'.");
    API_BASE = '/api';
  }
  return API_BASE;
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
}

export { getApiBase };

async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json?.error || json?.message || res.statusText || 'Request failed')
  }
  return json
}

export async function apiRegister({ name, email, password }) {
  const base = await getApiBase();
  return safeFetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  })
}

<<<<<<< HEAD
export async function apiLogin({ email, password, rememberMe }) {
  return safeFetch(`${API_BASE}/auth/login`, {
=======
export async function apiLogin({ email, password }) {
  const base = await getApiBase();
  return safeFetch(`${base}/auth/login`, {
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, rememberMe }),
    credentials: 'include',
  })
}
<<<<<<< HEAD

// Verify email with OTP (after registration)
export async function apiVerifyEmail({ email, otp }) {
  return safeFetch(`${API_BASE}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
    credentials: 'include',
  })
}

// Resend verification OTP
export async function apiResendVerify({ email }) {
  return safeFetch(`${API_BASE}/auth/resend-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  })
}

export async function apiEmailLoginRequest({ email }) {
  return safeFetch(`${API_BASE}/auth/email-login-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  })
}

export async function apiEmailLoginVerify({ email, otp }) {
  return safeFetch(`${API_BASE}/auth/email-login-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
    credentials: 'include',
  })
}

export async function apiForgotPassword({ email }) {
  return safeFetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function apiResetPassword({ email, otp, newPassword }) {
  return safeFetch(`${API_BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, newPassword }),
  })
}

export async function apiLogout() {
  return safeFetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export async function apiRefresh() {
  return safeFetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
}

// Verify current user with backend using token
export async function apiMe(token) {
  return safeFetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include',
  })
}

export async function apiSubscribe({ email, name }) {
  return safeFetch(`${API_BASE}/subscribe/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  })
}

export async function apiAIChat(messages, resumeContext) {
  return safeFetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, resumeContext }),
    credentials: 'include',
  })
}

export async function apiAIStream(messages, resumeContext) {
  const response = await fetch(`${API_BASE}/ai/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, resumeContext }),
    credentials: 'include',
  })
  return response.body
}

export async function apiAIImprove(content, section, context) {
  return safeFetch(`${API_BASE}/ai/improve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, section, context }),
    credentials: 'include',
  })
}

export async function apiAIATS(resumeData) {
  return safeFetch(`${API_BASE}/ai/ats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeData }),
    credentials: 'include',
  })
}

export async function apiAISummary(userProfile) {
  return safeFetch(`${API_BASE}/ai/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userProfile }),
    credentials: 'include',
  })
}

export async function apiAIMetrics(role, industry) {
  return safeFetch(`${API_BASE}/ai/metrics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, industry }),
    credentials: 'include',
  })
}

// Export the base URL for direct use if needed
export function getAPIUrl() {
  return API_BASE
}

// ===== User Profile API =====

export async function apiUpdateProfile(token, data) {
  return safeFetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
}

export async function apiChangePassword(token, { currentPassword, newPassword }) {
  return safeFetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
    credentials: 'include',
  })
}
=======
>>>>>>> 50dbb2228965c1ead5a30fee68a216de8e7433eb
