import { v4 as uuidv4 } from 'uuid';

// In-memory database for recipes
let recipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    ingredients: [
      '350g spaghetti',
      '150g pancetta or guanciale, diced',
      '3 large eggs',
      '50g pecorino romano cheese, grated',
      '50g parmesan cheese, grated',
      'Freshly ground black pepper',
      'Salt to taste'
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
      'While pasta cooks, heat a large skillet over medium heat and cook the pancetta until crispy.',
      'In a bowl, whisk together eggs, grated cheeses, and black pepper.',
      'Drain pasta, reserving 1/2 cup of pasta water.',
      'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
      'Pour egg mixture over pasta and toss quickly to create a creamy sauce.',
      'Add a splash of reserved pasta water if needed to loosen the sauce.',
      'Serve immediately with extra grated cheese and black pepper.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'Intermediate',
    category: 'Main Course',
    cuisine: 'Italian',
    createdBy: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Grilled chunks of chicken enveloped in a creamy spiced tomato sauce.',
    ingredients: [
      '800g boneless chicken thighs, cut into bite-sized pieces',
      '2 cups plain yogurt',
      '3 tbsp lemon juice',
      '4 tsp ground cumin',
      '4 tsp ground coriander',
      '4 tsp garam masala',
      '1 tbsp ginger paste',
      '2 tbsp garlic paste',
      '2 tsp salt',
      '2 tbsp vegetable oil',
      '1 large onion, finely chopped',
      '400g canned tomatoes',
      '1 cup heavy cream',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'In a large bowl, combine yogurt, lemon juice, cumin, coriander, garam masala, ginger, garlic, and salt.',
      'Add chicken pieces and marinate for at least 2 hours, preferably overnight.',
      'Preheat oven to 400°F (200°C). Place chicken on a baking sheet and bake for 15 minutes.',
      'Heat oil in a large skillet over medium heat. Add onion and cook until soft.',
      'Add tomatoes and simmer for 15 minutes until sauce thickens.',
      'Add cooked chicken pieces and simmer for 5 minutes.',
      'Stir in cream and simmer for another 5 minutes.',
      'Garnish with fresh cilantro and serve with rice or naan bread.'
    ],
    cookingTime: 60,
    servings: 6,
    difficulty: 'Intermediate',
    category: 'Main Course',
    cuisine: 'Indian',
    createdBy: 'user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80'
  }
];

// Get all recipes
export const getAllRecipes = () => {
  return recipes;
};

// Get recipe by ID
export const getRecipeById = (id) => {
  return recipes.find(recipe => recipe.id === id);
};

// Create a new recipe
export const createRecipe = (recipeData) => {
  const newRecipe = {
    id: uuidv4(),
    ...recipeData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  recipes.push(newRecipe);
  return newRecipe;
};

// Update a recipe
export const updateRecipe = (id, recipeData) => {
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index === -1) return null;
  
  const updatedRecipe = {
    ...recipes[index],
    ...recipeData,
    updatedAt: new Date().toISOString()
  };
  
  recipes[index] = updatedRecipe;
  return updatedRecipe;
};

// Delete a recipe
export const deleteRecipe = (id) => {
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index === -1) return false;
  
  recipes.splice(index, 1);
  return true;
};

// Search recipes
export const searchRecipes = (query) => {
  const searchTerm = query.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm) ||
    recipe.description.toLowerCase().includes(searchTerm) ||
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
    recipe.category.toLowerCase().includes(searchTerm) ||
    recipe.cuisine.toLowerCase().includes(searchTerm)
  );
};

// Filter recipes by category
export const filterRecipesByCategory = (category) => {
  return recipes.filter(recipe => 
    recipe.category.toLowerCase() === category.toLowerCase()
  );
};

// Filter recipes by cuisine
export const filterRecipesByCuisine = (cuisine) => {
  return recipes.filter(recipe => 
    recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
  );
};