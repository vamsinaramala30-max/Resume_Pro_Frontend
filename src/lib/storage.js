// LocalStorage helpers (used for auth + resume cloud save)

export const STORAGE_KEYS = {
  auth: 'royalAuth',
  resume: 'royalResumeData',
  resumeDraftNormal: 'royalResumeDraftNormal',
  resumeDraftPremium: 'royalResumeDraftPremium',
  resumeSavedNormal: 'royalResumeSavedNormal',
};

export function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
  localStorage.removeItem(key);
}

