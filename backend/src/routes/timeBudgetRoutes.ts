import { Router } from 'express';
import { TimeBudgetController } from '../controllers/timeBudgetController';

const router = Router();
const timeBudgetController = new TimeBudgetController();

router.post('/set-budget', timeBudgetController.setBudget);
router.get('/get-budget/:userId', timeBudgetController.getBudget);
router.put('/update-budget/:userId', timeBudgetController.updateBudget);
router.delete('/delete-budget/:userId', timeBudgetController.deleteBudget);

export default router;