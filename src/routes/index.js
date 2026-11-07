import express from 'express';
import viewRoutes from './viewRoutes.js';
import itemRoutes from './itemRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = express.Router();

router.use('/', viewRoutes);
router.use('/api/items', itemRoutes);
router.use('/api/contact', contactRoutes);

export default router;