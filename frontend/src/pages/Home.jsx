import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia, Snackbar } from '@mui/material';
import { addToCart } from '../features/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Sample featured products with better images
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 9999,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 14999,
    description: 'Modern smartwatch with health tracking features.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 19999,
    description: 'Portable wireless speaker with premium sound quality.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setMessage(`${product.name} added to cart!`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Welcome to Our Store
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ mb: 3 }}
              >
                Discover amazing products at unbeatable prices
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80"
                alt="Hero"
                sx={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Rs. {product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/product/${product.id}`}
                        size="small"
                        sx={{ minWidth: '90px', fontSize: '0.75rem' }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                        startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}
                        size="small"
                        sx={{ minWidth: '110px', fontSize: '0.75rem' }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Home; 