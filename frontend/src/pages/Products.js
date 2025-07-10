import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Stack,
} from '@mui/material';
import { Search, ShoppingCart, FilterList } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { productAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      const fetchedProducts = response.data.data?.products || [];
      setProducts(fetchedProducts);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(fetchedProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchProducts}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredProducts.length} of {products.length} products
        </Typography>
      </Box>

      {/* Products Grid with Stack and Flex */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Stack
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card 
                  className="MuiCard-root"
                  sx={{ 
                    height: '100%', 
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    flex: 1,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  {/* Product Image Container */}
                  <Box
                    sx={{
                      height: '200px',
                      width: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={product.name}
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    p: 2
                  }}>
                    {/* Category Chip */}
                    <Box sx={{ mb: 1 }}>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    
                    {/* Product Name */}
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        minHeight: '2.6rem',
                      }}
                    >
                      {product.name}
                    </Typography>
                    
                    {/* Product Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2, 
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.4,
                        minHeight: '4.2rem',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        hyphens: 'auto',
                      }}
                    >
                      {product.description}
                    </Typography>
                    
                    {/* Price and Stock */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 2 
                    }}>
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        Stock: {product.stock}
                      </Typography>
                    </Box>
                    
                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      sx={{
                        mt: 'auto',
                        py: 1.2,
                        fontWeight: 600
                      }}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Products;