import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, name, bio } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
      name,
      bio
    });
    
    // Save user to database
    const savedUser = await user.save();
    
    // Generate token
    const token = generateToken(savedUser._id);
    
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      bio: savedUser.bio,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and password is correct
    if (user && (await user.comparePassword(password))) {
      // Generate token
      const token = generateToken(user._id);
      
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.bio,
        token
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if username or email is being updated and if they're already taken
    if (req.body.username && req.body.username !== user.username) {
      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }
    
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ error: 'Email already taken' });
      }
    }
    
    // Update user fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    
    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    // Save updated user
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      bio: updatedUser.bio
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add recipe to favorites
export const addFavoriteRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Check if recipe is already in favorites
    if (user.favoriteRecipes.includes(recipeId)) {
      return res.status(400).json({ error: 'Recipe already in favorites' });
    }
    
    // Add recipe to favorites
    user.favoriteRecipes.push(recipeId);
    await user.save();
    
    res.json({ message: 'Recipe added to favorites', favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove recipe from favorites
export const removeFavoriteRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipeId = req.params.recipeId;
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if recipe is in favorites
    if (!user.favoriteRecipes.includes(recipeId)) {
      return res.status(400).json({ error: 'Recipe not in favorites' });
    }
    
    // Remove recipe from favorites
    user.favoriteRecipes = user.favoriteRecipes.filter(
      id => id.toString() !== recipeId
    );
    await user.save();
    
    res.json({ message: 'Recipe removed from favorites', favoriteRecipes: user.favoriteRecipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's favorite recipes
export const getFavoriteRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favoriteRecipes');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user.favoriteRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's created recipes
export const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user.id });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};