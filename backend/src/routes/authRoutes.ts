import express, { RequestHandler } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', registerValidation, register as RequestHandler);
router.post('/login', loginValidation, login as RequestHandler);
router.get('/me', protect as RequestHandler, getCurrentUser as RequestHandler);

export default router;
