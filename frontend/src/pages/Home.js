import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Link,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  ShoppingCart, 
  LocalShipping,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Star,
  AddShoppingCart,
} from '@mui/icons-material';
import { productAPI } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  // Fetch featured products on component mount
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await productAPI.getProducts({ limit: 6 }); // Get first 6 products
      if (response.data.status === 'success') {
        setFeaturedProducts(response.data.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddToCart = (product) => {
    // Add to cart functionality
    console.log('Adding to cart:', product);
  };

  return (
    <>
      {/* Hero Section - With Background Image */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          mb: 6,
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          position: 'relative',
          minHeight: '500px', // Set minimum height
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Shoply
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Your one-stop shop for everything you need
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              mt: 3, 
              backgroundColor: 'white', 
              color: 'primary.main',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
              transition: 'all 0.3s ease',
            }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Features Section */}
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  minHeight: 250,
                  maxHeight: 280,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    p: 0,
                  }}
                >
                  <Box sx={{ mb: 1.5 }}>
                    <Box sx={{ 
                      color: 'primary.main', 
                      mb: 1.5,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        minHeight: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem'
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.5,
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Featured Products
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Discover our most popular items
          </Typography>

          {loadingProducts ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Loading products...</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.images?.[0] || '/placeholder-image.jpg'}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="h3" gutterBottom noWrap>
                        {product.name}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              sx={{
                                fontSize: 16,
                                color: i < 4 ? 'gold' : 'lightgray',
                              }}
                            />
                          ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          (4.0)
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            ${product.price}
                          </Typography>
                          {product.stock > 0 ? (
                            <Chip 
                              label="In Stock" 
                              size="small" 
                              color="success" 
                              variant="outlined"
                            />
                          ) : (
                            <Chip 
                              label="Out of Stock" 
                              size="small" 
                              color="error" 
                              variant="outlined"
                            />
                          )}
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<AddShoppingCart />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          disabled={product.stock === 0}
                          sx={{
                            '&:hover': {
                              transform: 'translateY(-2px)',
                            },
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* View All Products Button */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                px: 4,
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
                transition: 'all 0.3s ease',
              }}
            >
              View All Products
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          mt: 8,
          py: 6,
          px: 2,
          backgroundColor: 'grey.900',
          color: 'white',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Shoply
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Your trusted e-commerce platform for all your shopping needs. 
                Quality products, great prices, and exceptional service.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  sx={{ color: 'white', '&:hover': { color: '#1976d2' } }}
                  aria-label="Facebook"
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  sx={{ color: 'white', '&:hover': { color: '#1976d2' } }}
                  aria-label="Twitter"
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  sx={{ color: 'white', '&:hover': { color: '#1976d2' } }}
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  sx={{ color: 'white', '&:hover': { color: '#1976d2' } }}
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Button
                  color="inherit"
                  sx={{ 
                    justifyContent: 'flex-start',
                    opacity: 0.8,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    p: 0.5,
                    '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' } 
                  }}
                  onClick={() => navigate('/products')}
                >
                  Products
                </Button>
                <Button
                  color="inherit"
                  sx={{ 
                    justifyContent: 'flex-start',
                    opacity: 0.8,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    p: 0.5,
                    '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' } 
                  }}
                  onClick={() => navigate('/cart')}
                >
                  Cart
                </Button>
                <Button
                  color="inherit"
                  sx={{ 
                    justifyContent: 'flex-start',
                    opacity: 0.8,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    p: 0.5,
                    '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' } 
                  }}
                  onClick={() => navigate('/orders')}
                >
                  Orders
                </Button>
                <Button
                  color="inherit"
                  sx={{ 
                    justifyContent: 'flex-start',
                    opacity: 0.8,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    p: 0.5,
                    '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' } 
                  }}
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </Button>
              </Box>
            </Grid>

            {/* Customer Service */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Customer Service
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link 
                  href="#" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  Help Center
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  Returns & Exchanges
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  Shipping Info
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="#" 
                  color="inherit" 
                  underline="hover"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  Terms of Service
                </Link>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 18, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    support@shoply.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 18, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 18, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    123 Commerce St, City, ST 12345
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Bottom Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} Shoply. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;