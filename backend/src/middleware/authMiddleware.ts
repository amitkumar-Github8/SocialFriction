import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { mockUsers } from '../utils/mockData';
import mongoose from 'mongoose';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    // Verify token
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

    try {
      const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        // Connected to MongoDB - use real database
        console.log('Using MongoDB for auth middleware');

        // Add user to request
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
          res.status(401).json({ message: 'User not found' });
          return;
        }

        req.user = user;
      } else {
        // Not connected to MongoDB - use mock data
        console.log('Using mock data for auth middleware');

        // Find user in mock data
        const mockUser = mockUsers.find(u => u.id === decoded.id);

        if (!mockUser) {
          res.status(401).json({ message: 'User not found' });
          return;
        }

        // Add user to request (without password)
        const { password, ...userWithoutPassword } = mockUser;
        req.user = { ...userWithoutPassword, id: mockUser.id };
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in auth middleware' });
  }
};
