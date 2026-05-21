import { getApiBase } from './api.js';

async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json?.error || json?.message || `${res.statusText || 'Request failed'}`)
  }
  return json
}

export async function apiSaveResume({ token, payload, title, premium }) {
  const API_BASE = await getApiBase();
  return safeFetch(`${API_BASE}/resume/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ payload, title, premium }),
  })
}

export async function apiGetMyResumes({ token }) {
  const API_BASE = await getApiBase();
  return safeFetch(`${API_BASE}/resume/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

