import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import delayRoutes from './routes/delayRoutes';
import moodRoutes from './routes/moodRoutes';
import intentRoutes from './routes/intentRoutes';
import timeBudgetRoutes from './routes/timeBudgetRoutes';
import alternativesRoutes from './routes/alternativesRoutes';
import focusModeRoutes from './routes/focusModeRoutes';
import habitReportRoutes from './routes/habitReportRoutes';
import suggestionsRoutes from './routes/suggestionsRoutes';
import rewardsRoutes from './routes/rewardsRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/delay', delayRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/intent', intentRoutes);
app.use('/api/time-budget', timeBudgetRoutes);
app.use('/api/alternatives', alternativesRoutes);
app.use('/api/focus-mode', focusModeRoutes);
app.use('/api/habit-report', habitReportRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/rewards', rewardsRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});