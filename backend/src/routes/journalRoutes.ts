import express from 'express';
import { createJournal, getUserJournals, getJournal } from '../controllers/journalController';
import { protect } from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const journalValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('mood')
    .isIn(['great', 'good', 'neutral', 'bad', 'terrible'])
    .withMessage('Mood must be one of: great, good, neutral, bad, terrible'),
];

// Routes
router.post('/', protect, journalValidation, createJournal);
router.get('/', protect, getUserJournals);
router.get('/:id', protect, getJournal);

export default router;
