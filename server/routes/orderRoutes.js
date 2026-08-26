import { Router } from 'express';
import { OrderController } from '../controllers/OrderController.js';
import { orderLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', orderLimiter, OrderController.createOrder);

export default router;
