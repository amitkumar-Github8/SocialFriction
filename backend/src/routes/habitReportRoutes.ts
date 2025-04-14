import { Router } from 'express';
import HabitReportController from '../controllers/habitReportController';

const router = Router();
const habitReportController = new HabitReportController();

router.get('/weekly', habitReportController.generateWeeklyReport);
router.get('/:userId', habitReportController.getHabitReportByUserId);

export default router;