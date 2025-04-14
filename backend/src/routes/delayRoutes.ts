import { Router } from 'express';
import DelayController from '../controllers/delayController';

const router = Router();
const delayController = new DelayController();

router.post('/set-progressive-delay', delayController.setProgressiveDelay);
router.get('/get-progressive-delay', delayController.getProgressiveDelay);

export default router;