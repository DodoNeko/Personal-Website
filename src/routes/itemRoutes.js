import express from 'express';
import { getItems, getItemById } from '../controllers/itemController.js';
import { logPopularity } from '../middleware/analytics.js';

const router = express.Router();

router.get('/', logPopularity, getItems);
router.get('/:id', logPopularity, getItemById);

export default router;