import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingBag,
  ArrowBack,
  LocalOffer,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Order placement states
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);
  
  // Shipping address states
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handlePromoCode = () => {
    setPromoError('');
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(0.10);
      setPromoCode('');
    } else if (promoCode.toUpperCase() === 'WELCOME5') {
      setDiscount(0.05);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setOrderDialogOpen(true);
  };

  const submitOrder = async () => {
    setIsPlacingOrder(true);
    setOrderError('');

    try {
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod: 'cash_on_delivery'
      };

      console.log('🛒 Placing order:', orderData);

      // Get auth token
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make API call to create order
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }

      // Order successful
      console.log('✅ Order placed successfully:', result.data.order);
      
      setPlacedOrder(result.data.order);
      setOrderSuccess(true);
      setOrderDialogOpen(false);
      
      // Clear cart after successful order
      clearCart();
      
      // Show success message and redirect
      setTimeout(() => {
        // Fix: Use _id instead of id, or the id field from your backend response
        const orderId = result.data.order.id || result.data.order._id;
        console.log('🔗 Navigating to order:', orderId);
        navigate(`/orders/${orderId}`);
      }, 3000);

    } catch (error) {
      console.error('❌ Order placement failed:', error);
      setOrderError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isAddressValid = () => {
    return shippingAddress.firstName && 
           shippingAddress.lastName && 
           shippingAddress.street && 
           shippingAddress.city && 
           shippingAddress.state && 
           shippingAddress.zipCode;
  };

  const subtotal = getTotalPrice();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 2 }}
        >
          Continue Shopping
        </Button>
        <Typography variant="h4" component="h1">
          Shopping Cart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} in your cart
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.product._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            variant="rounded"
                            src={item.product.images?.[0] || 'https://via.placeholder.com/60'}
                            alt={item.product.name}
                            sx={{ width: 60, height: 60, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                              {item.product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.product.category}
                            </Typography>
                            {item.product.sku && (
                              <Typography variant="caption" color="text.secondary">
                                SKU: {item.product.sku}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          ${item.product.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Typography variant="body2" color="text.secondary">
                * Prices are inclusive of taxes
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal ({getTotalItems()} items)</Typography>
                  <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                </Box>
                
                {discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="success.main">
                      Discount ({(discount * 100).toFixed(0)}%)
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      -${discountAmount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">Free</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              {/* Promo Code */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Promo Code
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOffer />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handlePromoCode}
                    disabled={!promoCode.trim()}
                  >
                    Apply
                  </Button>
                </Box>
                {promoError && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {promoError}
                  </Alert>
                )}
                {discount > 0 && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Promo code applied! You saved ${discountAmount.toFixed(2)}
                  </Alert>
                )}
              </Box>

              {/* Available Promo Codes */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Available Offers
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label="SAVE10 - 10% off"
                    size="small"
                    variant="outlined"
                    onClick={() => setPromoCode('SAVE10')}
                  />
                  <Chip
                    label="WELCOME5 - 5% off"
                    size="small"
                    variant="outlined"
                    onClick={() => setPromoCode('WELCOME5')}
                  />
                </Box>
              </Box>

              {/* Place Order Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<ShoppingBag />}
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </Button>

              {!isAuthenticated && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Please login to place an order
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Order Confirmation Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                value={shippingAddress.firstName}
                onChange={(e) => handleAddressChange('firstName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) => handleAddressChange('lastName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={shippingAddress.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                value={shippingAddress.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="State"
                value={shippingAddress.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={shippingAddress.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
            <Typography variant="body2">
              {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''} • Total: ${total.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment Method: Cash on Delivery
            </Typography>
          </Box>

          {orderError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {orderError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)} disabled={isPlacingOrder}>
            Cancel
          </Button>
          <Button
            onClick={submitOrder}
            variant="contained"
            disabled={!isAddressValid() || isPlacingOrder}
            startIcon={isPlacingOrder ? <CircularProgress size={16} /> : <ShoppingBag />}
          >
            {isPlacingOrder ? 'Placing Order...' : 'Confirm Order'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={orderSuccess}
        autoHideDuration={6000}
        onClose={() => setOrderSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOrderSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
          icon={<CheckCircle />}
        >
          Order placed successfully! Redirecting to order details...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;