import Recipe from '../models/Recipe.js';

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    let query = {};
    
    // Handle search query
    if (req.query.search) {
      query = { $text: { $search: req.query.search } };
    }
    
    // Handle category filter
    if (req.query.category) {
      query.category = { $regex: new RegExp(req.query.category, 'i') };
    }
    
    // Handle cuisine filter
    if (req.query.cuisine) {
      query.cuisine = { $regex: new RegExp(req.query.cuisine, 'i') };
    }
    
    const recipes = await Recipe.find(query).populate('createdBy', 'username name');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username name');
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      category,
      cuisine,
      imageUrl
    } = req.body;
    
    // Validate required fields
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create new recipe
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      category,
      cuisine,
      imageUrl,
      createdBy: req.user.id // From auth middleware
    });
    
    // Save recipe to database
    const savedRecipe = await newRecipe.save();
    
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Check if user is the creator of the recipe
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this recipe' });
    }
    
    // Update recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Check if user is the creator of the recipe
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }
    
    // Delete recipe
    await Recipe.findByIdAndDelete(req.params.id);
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};