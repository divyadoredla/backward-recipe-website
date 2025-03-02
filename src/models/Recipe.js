import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    type: String,
    required: true,
    trim: true
  }],
  instructions: [{
    type: String,
    required: true,
    trim: true
  }],
  cookingTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add text index for search functionality
recipeSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  cuisine: 'text'
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;