import { Router } from 'express';
import { IntentController } from '../controllers/intentController';

const router = Router();
const intentController = new IntentController();

router.post('/clarify-intent', intentController.clarifyIntent);

export default router;