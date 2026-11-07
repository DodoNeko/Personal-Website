import express from 'express';
import { renderHome, renderAbout, renderOffer, renderContact, renderOfferDetail } from '../controllers/viewController.js';

const router = express.Router();

router.get('/', renderHome);
router.get('/about', renderAbout);
router.get('/offer', renderOffer);
router.get('/contact', renderContact);
router.get('/offer-detail', renderOfferDetail);

export default router;