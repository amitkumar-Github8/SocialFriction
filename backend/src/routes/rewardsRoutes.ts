import { Router } from 'express';
import { RewardsController } from '../controllers/rewardsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const rewardsController = new RewardsController();

// All routes require authentication
router.use(authMiddleware);

// Get all available rewards
router.get('/', rewardsController.getRewards.bind(rewardsController));

// Get user's credit balance
router.get('/credits', rewardsController.getCredits.bind(rewardsController));

// Earn credits
router.post('/earn', rewardsController.earnCredits.bind(rewardsController));

// Purchase a reward
router.post('/purchase', rewardsController.purchaseReward.bind(rewardsController));

// Get purchase history
router.get('/history', rewardsController.getPurchaseHistory.bind(rewardsController));

export default router;