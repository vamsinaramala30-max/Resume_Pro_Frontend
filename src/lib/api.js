// Minimal backend API wrapper with dynamic port detection
let API_BASE = import.meta.env.VITE_API_BASE;
let portDetected = false;

// Auto-detect backend port in development
async function detectBackendPort() {
  if (portDetected) return;
  if (API_BASE) return; // Use env var if set
  
  const hostname = window.location.hostname || 'localhost';
  const protocol = window.location.protocol || 'http:';
  
  // Try ports 5000-5020 to find the backend
  for (let port = 5000; port <= 5020; port++) {
    try {
      const testUrl = `${protocol}//${hostname}:${port}/api/test`;
      const res = await fetch(testUrl, { 
        method: 'GET',
        signal: AbortSignal.timeout(500) // 500ms timeout per port
      });
      if (res.ok) {
        API_BASE = `${protocol}//${hostname}:${port}/api`;
        portDetected = true;
        console.log(`✅ Backend detected on port ${port}`);
        return;
      }
    } catch (e) {
      // Port not responding, try next
    }
  }
  
  // Fallback to env or default
  API_BASE = API_BASE || `${protocol}//${hostname}:5000/api`;
  portDetected = true;
  console.log(`⚠️ Backend not auto-detected, using: ${API_BASE}`);
}

// Export API_BASE getter
export async function getApiBase() {
  await detectBackendPort();
  return API_BASE;
}

async function safeFetch(url, options) {
  await detectBackendPort();
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json?.error || json?.message || `${res.statusText || 'Request failed'}`)
  }
  return json
}

export async function apiRegister({ name, email, password }) {
  return safeFetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
}

export async function apiLogin({ email, password }) {
  return safeFetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

