import rateLimit from 'express-rate-limit';

/**
 * Security: Express Rate Limiters
 * Protects endpoints from brute force and denial of service attacks.
 */

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Limit order placement
  message: {
    success: false,
    message: 'Order creation rate limit exceeded. Please wait a few minutes before trying again.'
  }
});

export const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Limit waitlist signups
  message: {
    success: false,
    message: 'Newsletter subscription limit exceeded.'
  }
});
