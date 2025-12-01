import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateProfile,
  searchUsers,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (none for users)

// Protected routes (require authentication)
router.get('/', protect, getAllUsers);
router.get('/search', protect, searchUsers);
router.put('/profile', protect, updateProfile);
router.get('/:id', protect, getUserById);

// Admin only routes
router.delete('/:id', protect, admin, deleteUser);

export default router;
