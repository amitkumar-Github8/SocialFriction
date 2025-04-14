import { Router } from 'express';
import { MoodController } from '../controllers/moodController';

const router = Router();
const moodController = new MoodController();

router.post('/check-in', moodController.checkIn.bind(moodController));
router.get('/mood', moodController.getMood.bind(moodController));

export default router;