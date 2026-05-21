export function splitLinesToBullets(text) {
  const raw = String(text || '').trim();
  if (!raw) return [];

  // allow commas or new lines
  return raw
    .split(/\n|\r|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitSkillString(text) {
  // user might enter: React, Node.js, MongoDB
  return splitLinesToBullets(text);
}

