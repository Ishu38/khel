import { SUBSCRIPTION_TIERS } from '@khel/shared';

/**
 * Middleware to check if user's subscription is expired
 */
export function checkSubscriptionActive(req, res, next) {
  const subscription = req.user.subscription;
  
  if (!subscription) {
    return next(); // No subscription data, allow (will be treated as free tier)
  }

  // Check if subscription has expired
  if (subscription.expiresAt) {
    const now = new Date();
    const expiresAt = new Date(subscription.expiresAt);
    
    if (now > expiresAt) {
      // Subscription expired - downgrade to free tier
      return res.status(403).json({
        error: 'Subscription expired',
        message: 'Your subscription has expired. Please renew to continue using premium features.',
        expiredAt: expiresAt.toISOString(),
        renew: '/subscription',
      });
    }
  }

  next();
}

/**
 * Middleware to check if user has premium subscription (not free tier)
 */
export function requirePremium(req, res, next) {
  const tier = req.user.subscription?.tier || 'free';
  
  if (tier === 'free') {
    return res.status(403).json({
      error: 'Premium subscription required',
      message: 'This feature requires a premium subscription.',
      currentTier: tier,
      upgrade: '/subscription',
    });
  }

  // Check if subscription is expired
  if (req.user.subscription?.expiresAt) {
    const now = new Date();
    const expiresAt = new Date(req.user.subscription.expiresAt);
    
    if (now > expiresAt) {
      return res.status(403).json({
        error: 'Subscription expired',
        message: 'Your subscription has expired. Please renew to continue using premium features.',
        expiredAt: expiresAt.toISOString(),
        renew: '/subscription',
      });
    }
  }

  next();
}

/**
 * Get subscription tier config for a user
 */
export function getTierConfig(user) {
  const tier = user.subscription?.tier || 'free';
  return Object.values(SUBSCRIPTION_TIERS).find(t => t.id === tier) || SUBSCRIPTION_TIERS.FREE;
}

/**
 * Check if user can create more games based on their subscription tier
 */
export async function canCreateGame(user) {
  const tier = user.subscription?.tier || 'free';
  const tierConfig = getTierConfig(user);
  
  // Unlimited games
  if (tierConfig.maxGames === -1) {
    return { canCreate: true };
  }
  
  // Check game count
  const Game = (await import('../models/Game.js')).default;
  const gameCount = await Game.countDocuments({ createdBy: user._id });
  
  if (gameCount >= tierConfig.maxGames) {
    return {
      canCreate: false,
      error: 'Game creation limit reached',
      limit: tierConfig.maxGames,
      current: gameCount,
      tier,
      upgrade: 'Upgrade to Parent or Classroom tier for unlimited games',
    };
  }
  
  return { canCreate: true };
}
