# Recipe Website Backend

A comprehensive backend API for a recipe website built with Node.js and Express.

## Features

- **Recipe Management**: Create, read, update, and delete recipes
- **User Management**: User registration, authentication, and profile management
- **Search & Filter**: Search recipes by keywords, filter by category or cuisine
- **Favorites**: Users can add/remove recipes to/from their favorites

## API Endpoints

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes?search=query` - Search recipes
- `GET /api/recipes?category=category` - Filter recipes by category
- `GET /api/recipes?cuisine=cuisine` - Filter recipes by cuisine
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `POST /api/users/:id/favorites/:recipeId` - Add a recipe to user's favorites
- `DELETE /api/users/:id/favorites/:recipeId` - Remove a recipe from user's favorites
- `POST /api/users/login` - User login

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Development

This project uses:
- Node.js and Express for the API
- In-memory data storage (can be replaced with a database)
- Nodemon for development

## Future Improvements

- Add a database (MongoDB, PostgreSQL)
- Implement proper authentication with JWT
- Add image upload functionality
- Create categories and tags management
- Add rate limiting and security features