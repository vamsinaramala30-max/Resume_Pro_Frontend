import { Navigate, useLocation } from 'react-router-dom';
import { readJSON, STORAGE_KEYS } from '../lib/storage';
import { isPremiumUser } from '../lib/premium.js';

// Higher-order component to protect premium routes requiring subscription
// Behavior:
// - Not Logged In -> Redirect to Login
// - Logged In + No Subscription -> Redirect to Pricing
// - Subscribed User -> Allow Access
export default function PremiumRoute({ children }) {
  const location = useLocation();
  const auth = readJSON(STORAGE_KEYS.auth, null);

  // Check if user is logged in
  const isLoggedIn = Boolean(auth?.token || auth?.accessToken);

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  // Check if user has premium subscription
  const hasPremium = isPremiumUser(auth?.user);

  if (!hasPremium) {
    // Redirect to pricing page for upgrade
    return <Navigate to="/select" replace state={{ from: location.pathname, upgrade: true }} />;
  }

  return children;
}

// Also export as ProtectedPremiumRoute for clarity
export { PremiumRoute as ProtectedPremiumRoute };
