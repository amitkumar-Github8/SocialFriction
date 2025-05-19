import express from 'express';
import { createUsage, getUserUsage, getUsageSummary } from '../controllers/usageController';
import { protect } from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const usageValidation = [
  body('platform').notEmpty().withMessage('Platform is required'),
  body('timeSpent')
    .isNumeric()
    .withMessage('Time spent must be a number')
    .isFloat({ min: 0 })
    .withMessage('Time spent cannot be negative'),
];

// Routes
router.post('/', protect, usageValidation, createUsage);
router.get('/', protect, getUserUsage);
router.get('/summary', protect, getUsageSummary);

export default router;
