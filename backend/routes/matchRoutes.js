import express from 'express';
import {
  createMatch,
  getMyMatches,
  updateMatchStatus,
  addRating,
  deleteMatch
} from '../controllers/matchController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createMatch);
router.get('/my-matches', protect, getMyMatches);
router.put('/:id/status', protect, updateMatchStatus);
router.put('/:id/rating', protect, addRating);
router.delete('/:id', protect, admin, deleteMatch);

export default router;
