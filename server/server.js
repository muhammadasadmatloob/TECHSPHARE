import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import databaseService from './config/DatabaseService.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { sanitizeInput } from './middleware/sanitize.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow dynamic visual resources & fonts
}));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(compression()); // Brotli/Gzip speed acceleration
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Apply Security Rate Limiting & Input Sanitization
app.use(globalLimiter);
app.use(sanitizeInput);

// Connect to Database (With non-blocking fallback)
databaseService.connect();

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPTIMAL',
    system: 'TechSphere Neural API Engine',
    database: databaseService.getStatus(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Exception:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal system error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [TechSphere Server] Running on http://localhost:${PORT}`);
});
