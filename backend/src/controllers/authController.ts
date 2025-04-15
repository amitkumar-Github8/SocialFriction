import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { mockUsers } from '../utils/mockData';
import mongoose from 'mongoose';

export class AuthController {
  /**
   * Register a new user
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        // Connected to MongoDB - use real database
        console.log('Using MongoDB for registration');

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
          res.status(400).json({ message: 'User already exists' });
          return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
          username,
          email,
          password: hashedPassword
        });

        await user.save();

        // Generate JWT token
        const token = this.generateToken(user._id);

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        // Not connected to MongoDB - use mock data
        console.log('Using mock data for registration');

        // Check if user already exists in mock data
        const existingUser = mockUsers.find(u => u.email === email || u.username === username);
        if (existingUser) {
          res.status(400).json({ message: 'User already exists' });
          return;
        }

        // Create a new mock user
        const newUserId = (mockUsers.length + 1).toString();
        const newUser = {
          id: newUserId,
          username,
          email,
          password: 'mock_hashed_password' // In a real app, you'd hash the password
        };

        // Add to mock users (this won't persist after server restart)
        mockUsers.push(newUser);

        // Generate JWT token
        const token = this.generateToken(newUserId);

        res.status(201).json({
          message: 'User registered successfully (mock data)',
          token,
          user: {
            id: newUserId,
            username: newUser.username,
            email: newUser.email
          }
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }

  /**
   * Login user
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        // Connected to MongoDB - use real database
        console.log('Using MongoDB for login');
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // Generate JWT token
        const token = this.generateToken(user._id);

        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        // Not connected to MongoDB - use mock data
        console.log('Using mock data for login');
        // Find user in mock data
        const mockUser = mockUsers.find(u => u.email === email);
        if (!mockUser) {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // For mock data, we'll just check if the password is 'password123'
        // In a real app, you'd use bcrypt.compare
        if (password !== 'password123') {
          res.status(400).json({ message: 'Invalid credentials' });
          return;
        }

        // Generate JWT token
        const token = this.generateToken(mockUser.id);

        res.status(200).json({
          message: 'Login successful (mock data)',
          token,
          user: {
            id: mockUser.id,
            username: mockUser.username,
            email: mockUser.email
          }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }

  /**
   * Get current user profile
   */
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // @ts-ignore - We'll add the user property to the request in the auth middleware
      const userId = req.user.id;

      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        // Connected to MongoDB - use real database
        console.log('Using MongoDB for profile');

        const user = await User.findById(userId).select('-password');

        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        res.status(200).json({ user });
      } else {
        // Not connected to MongoDB - use mock data
        console.log('Using mock data for profile');

        const mockUser = mockUsers.find(u => u.id === userId);
        if (!mockUser) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        // Return user without password
        const { password, ...userWithoutPassword } = mockUser;
        res.status(200).json({ user: userWithoutPassword });
      }
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Server error while fetching profile' });
    }
  }

  /**
   * Generate JWT token
   */
  private generateToken(userId: string): string {
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '30d' });
  }
}

export default new AuthController();
