import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Store, ShoppingCart, LocalShipping } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Store sx={{ fontSize: 40 }} />,
      title: 'Wide Selection',
      description: 'Browse through thousands of products from various categories',
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      title: 'Easy Shopping',
      description: 'Add items to cart and checkout with just a few clicks',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and safely',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 2,
          color: 'white',
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to E-Commerce Store
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your one-stop shop for everything you need
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3, backgroundColor: 'white', color: 'primary.main' }}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
        Why Choose Us
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ready to start shopping?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{ mr: 2 }}
        >
          Browse Products
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/register')}
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
