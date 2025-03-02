import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getFavoriteRecipes,
  getUserRecipes
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/favorites', protect, getFavoriteRecipes);
router.post('/favorites/:recipeId', protect, addFavoriteRecipe);
router.delete('/favorites/:recipeId', protect, removeFavoriteRecipe);
router.get('/recipes', protect, getUserRecipes);

export { router as userRoutes };