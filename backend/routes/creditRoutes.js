import express from 'express';
import {
  getMyCreditHistory,
  getMyCredits,
  addBonusCredits
} from '../controllers/creditController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/history', protect, getMyCreditHistory);
router.get('/balance', protect, getMyCredits);
router.post('/bonus', protect, admin, addBonusCredits);

export default router;
