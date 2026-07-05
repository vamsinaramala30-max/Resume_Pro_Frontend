// Backend API wrapper with proper environment configuration
// Uses VITE_API_URL for explicit API URL or falls back to Vite proxy

// IMPORTANT: Never use 'undefined' in URLs
// Always fallback to a valid default

const isDev = import.meta.env.DEV

function getBaseUrl() {
  // 1. Explicit API URL takes priority
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
  if (isDev) {
    return '/api'
  }

  // 4. Fallback for production build
  const hostname = window.location.hostname || 'localhost'
  const protocol = window.location.protocol || 'http:'
  const port = import.meta.env.VITE_API_PORT || 5000
  return `${protocol}//${hostname}:${port}/api`
}

// Initialize API_BASE immediately so exports always work.
let API_BASE = getBaseUrl()

async function ensureApiBase() {
  // Already initialized; keep async for backward compatibility.
  return API_BASE
}

export async function getApiBase() {
  await ensureApiBase()
  return API_BASE
}



async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const errMsg = json?.error?.message || (typeof json?.error === 'string' ? json?.error : '') || json?.message || res.statusText || 'Request failed'
    throw new Error(errMsg)
  }
  return json
}

export async function apiRegister({ name, email, password }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  })
}

export async function apiLogin({ email, password, rememberMe }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, rememberMe }),
    credentials: 'include',
  })
}

// Verify email with OTP (after registration)
export async function apiVerifyEmail({ email, otp }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
    credentials: 'include',
  })
}

// Resend verification OTP
export async function apiResendVerify({ email }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/resend-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  })
}

export async function apiEmailLoginRequest({ email }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/email-login-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'include',
  })
}

export async function apiEmailLoginVerify({ email, otp }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/email-login-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
    credentials: 'include',
  })
}

export async function apiForgotPassword({ email }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function apiResetPassword({ email, otp, newPassword }) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, newPassword }),
  })
}

export async function apiLogout() {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

export async function apiRefresh() {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
}

// Verify current user with backend using token
export async function apiMe(token) {
  const base = await getApiBase()
  return safeFetch(`${base}/auth/me`, {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include',
  })
}

export async function apiSubscribe({ email, name }) {
  const base = await getApiBase()
  return safeFetch(`${base}/subscribe/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  })
}

export async function apiAIChat(messages, resumeContext) {
  const base = await getApiBase()
  return safeFetch(`${base}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, resumeContext }),
    credentials: 'include',
  })
}

export async function apiAIStream(messages, resumeContext) {
  const base = await getApiBase()
  const response = await fetch(`${base}/ai/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, resumeContext }),
    credentials: 'include',
  })
  return response.body
}

export async function apiAIImprove(content, section, context) {
  const base = await getApiBase()
  return safeFetch(`${base}/ai/improve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, section, context }),
    credentials: 'include',
  })
}

export async function apiAIATS(resumeData) {
  const base = await getApiBase()
  return safeFetch(`${base}/ai/ats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeData }),
    credentials: 'include',
  })
}

export async function apiAISummary(userProfile) {
  const base = await getApiBase()
  return safeFetch(`${base}/ai/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userProfile }),
    credentials: 'include',
  })
}

export async function apiAIMetrics(role, industry) {
  const base = await getApiBase()
  return safeFetch(`${base}/ai/metrics`, {
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
  const base = await getApiBase()
  return safeFetch(`${base}/auth/profile`, {
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
  const base = await getApiBase()
  return safeFetch(`${base}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
    credentials: 'include',
  })
}

