import { getApiBase } from './api.js';

async function safeFetch(url, options) {
  const res = await fetch(url, options)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    // json.error can be a string or an object — extract a readable message
    const errObj = json?.error
    const errMsg =
      (typeof errObj === 'string' ? errObj : errObj?.message) ||
      json?.message ||
      res.statusText ||
      'Request failed'
    const err = new Error(errMsg)
    err.status = res.status
    throw err
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

export async function apiDeleteResume({ token, id }) {
  const API_BASE = await getApiBase();
  return safeFetch(`${API_BASE}/resume/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
