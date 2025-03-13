import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  TextField,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../features/cartSlice';

// Sample product data (replace with actual data fetching)
const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 9999,
    description: 'High-quality wireless headphones with noise cancellation. Features include Bluetooth 5.0, 30-hour battery life, and premium audio drivers for an immersive listening experience.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    specs: ['Bluetooth 5.0', '30-hour battery life', 'Active noise cancellation', 'Premium audio drivers'],
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 14999,
    description: 'Modern smartwatch with health tracking features. Monitor your heart rate, track your fitness goals, and stay connected with notifications.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    specs: ['Heart rate monitoring', 'Fitness tracking', 'Notifications', 'Water resistant'],
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 19999,
    description: 'Portable wireless speaker with premium sound quality. Enjoy rich, immersive audio with deep bass and crystal-clear highs.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    specs: ['360° sound', '20-hour battery life', 'Water resistant', 'Bluetooth connectivity'],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // Find the product from our sample data
  // In a real app, this would come from an API call
  const product = {
    id: parseInt(id),
    name: 'Premium Headphones',
    price: 9999,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    longDescription: 'Experience premium sound quality with our wireless headphones. Featuring advanced noise cancellation technology, comfortable ear cups, and long battery life. Perfect for music enthusiasts and professionals alike.',
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.0',
      '30-hour battery life',
      'Premium sound quality',
      'Comfortable fit'
    ]
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton 
        onClick={() => navigate(-1)} 
        sx={{ mb: 2 }}
        color="primary"
      >
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ 
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              my: 2 
            }}
          >
            Rs. {product.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.longDescription}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Key Features:
          </Typography>
          <Box component="ul" sx={{ mb: 3 }}>
            {product.features.map((feature, index) => (
              <Typography 
                key={index} 
                component="li" 
                variant="body1"
                sx={{ mb: 1 }}
              >
                {feature}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ py: 1, px: 3 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 