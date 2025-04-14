import { Router } from 'express';
import SuggestionsController from '../controllers/suggestionsController';

const router = Router();
const suggestionsController = new SuggestionsController();

router.get('/suggestions', suggestionsController.getSuggestions);
router.post('/suggestions', suggestionsController.createSuggestion);

export default router;