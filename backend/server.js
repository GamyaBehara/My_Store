import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// In-memory storage
export const users = [];
export const products = [
  {
    _id: '1',
    name: 'Sample Product 1',
    price: 99.99,
    description: 'This is a sample product',
    countInStock: 10,
    image: 'https://via.placeholder.com/200',
  },
  {
    _id: '2',
    name: 'Sample Product 2',
    price: 149.99,
    description: 'Another sample product',
    countInStock: 15,
    image: 'https://via.placeholder.com/200',
  },
];
export const orders = [];

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 