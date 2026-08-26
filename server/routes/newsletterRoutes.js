import { Router } from 'express';
import { NewsletterController } from '../controllers/NewsletterController.js';
import { newsletterLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', newsletterLimiter, NewsletterController.subscribe);

export default router;
