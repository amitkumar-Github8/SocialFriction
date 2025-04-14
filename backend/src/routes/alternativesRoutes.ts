import { Router } from 'express';
import AlternativesController from '../controllers/alternativesController';

const router = Router();
const alternativesController = new AlternativesController();

router.get('/suggest', alternativesController.suggestAlternatives.bind(alternativesController));

export default router;