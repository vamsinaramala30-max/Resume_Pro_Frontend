export function isValidEmail(email) {
  // simple, pragmatic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export function normalizePhone(phone) {
  return String(phone || '').trim();
}

export function clampText(s, max = 120) {
  const str = String(s || '');
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

