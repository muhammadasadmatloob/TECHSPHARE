/**
 * Security Middleware: Sanitize Input Data
 * Strips potential MongoDB operator injections ($gt, $ne, etc.) and XSS vectors.
 */
export const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    sanitizeObject(req.params);
  }
  next();
};

function sanitizeObject(obj) {
  for (const key in obj) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    } else if (typeof obj[key] === 'string') {
      // Basic XSS string clean
      obj[key] = obj[key].replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }
}
