import { Router } from 'express';
import FocusModeController from '../controllers/focusModeController';

const router = Router();
const focusModeController = new FocusModeController();

router.post('/start', focusModeController.startFocusMode);
router.post('/stop', focusModeController.stopFocusMode);
router.get('/status', focusModeController.getFocusModeStatus);
router.post('/pomodoro', focusModeController.startPomodoroTimer);
router.get('/pomodoro/status', focusModeController.getPomodoroStatus);

export default router;