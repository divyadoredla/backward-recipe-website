import { v4 as uuidv4 } from 'uuid';

// In-memory database for users
let users = [
  {
    id: 'user1',
    username: 'chef_john',
    email: 'chef_john@example.com',
    password: 'hashed_password_1', // In a real app, this would be properly hashed
    name: 'John Smith',
    bio: 'Professional chef with 15 years of experience',
    favoriteRecipes: ['1'],
    createdRecipes: ['1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user2',
    username: 'cooking_master',
    email: 'cooking_master@example.com',
    password: 'hashed_password_2', // In a real app, this would be properly hashed
    name: 'Sarah Johnson',
    bio: 'Home cook passionate about international cuisines',
    favoriteRecipes: ['2'],
    createdRecipes: ['2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get all users
export const getAllUsers = () => {
  // Return users without sensitive information
  return users.map(({ password, ...user }) => user);
};

// Get user by ID
export const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (!user) return null;
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Create a new user
export const createUser = (userData) => {
  // Check if username or email already exists
  const existingUser = users.find(
    user => user.username === userData.username || user.email === userData.email
  );
  
  if (existingUser) return null;
  
  const newUser = {
    id: uuidv4(),
    ...userData,
    favoriteRecipes: [],
    createdRecipes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Update a user
export const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) return null;
  
  // If updating username or email, check if they're already taken by another user
  if (userData.username || userData.email) {
    const existingUser = users.find(
      user => user.id !== id && (
        (userData.username && user.username === userData.username) || 
        (userData.email && user.email === userData.email)
      )
    );
    
    if (existingUser) return null;
  }
  
  const updatedUser = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  users[index] = updatedUser;
  
  // Return user without password
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

// Delete a user
export const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

// Add a recipe to user's favorites
export const addFavoriteRecipe = (userId, recipeId) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return null;
  
  if (!user.favoriteRecipes.includes(recipeId)) {
    user.favoriteRecipes.push(recipeId);
    user.updatedAt = new Date().toISOString();
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Remove a recipe from user's favorites
export const removeFavoriteRecipe = (userId, recipeId) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return null;
  
  const index = user.favoriteRecipes.indexOf(recipeId);
  
  if (index !== -1) {
    user.favoriteRecipes.splice(index, 1);
    user.updatedAt = new Date().toISOString();
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Add a recipe to user's created recipes
export const addCreatedRecipe = (userId, recipeId) => {
  const user = users.find(user => user.id === userId);
  
  if (!user) return null;
  
  if (!user.createdRecipes.includes(recipeId)) {
    user.createdRecipes.push(recipeId);
    user.updatedAt = new Date().toISOString();
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Authenticate user (simple version)
export const authenticateUser = (email, password) => {
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};