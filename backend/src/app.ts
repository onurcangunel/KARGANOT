// KARGANOT MVP Build - by Onur & Copilot
// Express Application Setup

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─────────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────────

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin.',
});
app.use('/v1/', limiter);

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'KARGANOT API is running',
    timestamp: new Date().toISOString(),
  });
});

// API v1 routes
app.use('/v1/auth', authRoutes);
// app.use('/v1/universities', universitiesRoutes); // TODO
// app.use('/v1/notes', notesRoutes); // TODO
// app.use('/v1/payments', paymentsRoutes); // TODO
// app.use('/v1/admin', adminRoutes); // TODO

// ─────────────────────────────────────────
// ERROR HANDLERS
// ─────────────────────────────────────────

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 KARGANOT Backend Server');
    console.log('───────────────────────────');
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString('tr-TR')}`);
    console.log('───────────────────────────');
    console.log('');
  });
}

export default app;
