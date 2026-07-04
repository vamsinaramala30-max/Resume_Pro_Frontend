export const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL || 'vamsinaramala30@gmail.com').trim().toLowerCase();

export function isOwnerEmail(email) {
  return String(email || '').trim().toLowerCase() === OWNER_EMAIL;
}

export function normalizePlan(plan) {
  if (!plan) return 'FREE';
  const normalized = String(plan).trim().toUpperCase();
  if (normalized === 'PREMIUM') return 'PRO';
  return normalized;
}

export function getEffectivePlan(user) {
  if (!user) return 'FREE';
  if (isOwnerEmail(user.email)) return 'OWNER_PREMIUM';
  return normalizePlan(user.plan);
}

export function getEffectiveSubscriptionStatus(user) {
  if (!user) return 'inactive';
  if (isOwnerEmail(user.email)) return 'active';
  return String(user.subscriptionStatus || 'inactive').trim().toLowerCase();
}

export function isPremiumUser(user) {
  if (!user) return false;
  if (isOwnerEmail(user.email)) return true;

  const plan = getEffectivePlan(user);
  const status = getEffectiveSubscriptionStatus(user);
  return (plan === 'PRO' || plan === 'OWNER_PREMIUM') && status === 'active';
}
