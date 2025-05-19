import express from 'express';
import { createGoal, getUserGoals, updateGoal } from '../controllers/goalController';
import { protect } from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const goalValidation = [
  body('platform').notEmpty().withMessage('Platform is required'),
  body('targetTimePerDay')
    .isNumeric()
    .withMessage('Target time must be a number')
    .isFloat({ min: 0 })
    .withMessage('Target time cannot be negative'),
  body('endDate').isISO8601().withMessage('End date must be a valid date'),
];

// Routes
router.post('/', protect, goalValidation, createGoal);
router.get('/', protect, getUserGoals);
router.put('/:id', protect, updateGoal);

export default router;
