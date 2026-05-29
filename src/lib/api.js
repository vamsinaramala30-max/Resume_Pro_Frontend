// Minimal backend API wrapper
let API_BASE = import.meta.env.VITE_API_BASE;
let portDetected = false;

// Auto-detect backend port ONLY in development
async function getApiBase() {
  if (API_BASE) return API_BASE;
  
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
}

export { getApiBase };

async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json?.error || json?.message || `${res.statusText || 'Request failed'}`)
  }
  return json
}

export async function apiRegister({ name, email, password }) {
  const base = await getApiBase();
  return safeFetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
}

export async function apiLogin({ email, password }) {
  const base = await getApiBase();
  return safeFetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}
