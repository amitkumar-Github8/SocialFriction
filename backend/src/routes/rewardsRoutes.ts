import { Router } from 'express';
import RewardsController from '../controllers/rewardsController';

const router = Router();
const rewardsController = new RewardsController();

router.post('/earn', rewardsController.earnReward);
router.post('/redeem', rewardsController.redeemReward);
router.get('/balance', rewardsController.getBalance);
router.get('/history', rewardsController.getRewardHistory);

export default router;