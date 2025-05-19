import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-friction';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Social Friction API' });
});

// Import routes
import authRoutes from './routes/authRoutes';
import usageRoutes from './routes/usageRoutes';
import goalRoutes from './routes/goalRoutes';
import journalRoutes from './routes/journalRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/journal', journalRoutes);

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch(err => console.error('Server startup error:', err));
