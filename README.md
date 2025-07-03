# Price Comparison Website

A full-stack web application for comparing product prices across different stores.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- Real-time price comparison across multiple stores
- Product search and filtering
- Detailed product pages with image galleries
- User reviews and ratings
- MongoDB backend with REST API

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Heroicons for icons
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS enabled
- Environment variables support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Update MongoDB connection string if needed

4. Seed the database:
```bash
cd backend
node seed.js
```

5. Start the servers:

```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
```

6. Open http://localhost:3000 in your browser

## API Endpoints

- GET /api/products - Get all products with optional filters
- GET /api/products/:id - Get a single product
- POST /api/products - Add a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product
- POST /api/products/:id/reviews - Add a review to a product

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request
