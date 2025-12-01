import express from 'express';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillsByCategory
} from '../controllers/skillController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/category/:category', getSkillsByCategory);
router.post('/', protect, createSkill);
router.put('/:id', protect, admin, updateSkill);
router.delete('/:id', protect, admin, deleteSkill);

export default router;
