const express = require('express');

// Debug: Check what's being imported
console.log('🔍 Checking auth controller imports...');
try {
  const authController = require('../../controllers/auth.controller');
  console.log('✅ Auth controller loaded:', Object.keys(authController));
  
  const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    logout
  } = authController;

  // Check each function
  console.log('📋 Auth function types:', {
    register: typeof register,
    login: typeof login,
    getProfile: typeof getProfile,
    updateProfile: typeof updateProfile,
    changePassword: typeof changePassword,
    logout: typeof logout
  });

  // Import middleware with correct names
  const { protect } = require('../../middleware/auth.middleware');
  console.log('🔐 Auth middleware loaded:', { protect: typeof protect });

  const router = express.Router();

  // Public routes
  router.post('/register', register);
  router.post('/login', login);

  // Protected routes - Apply auth middleware to all routes below
  router.use(protect);

  router.get('/profile', getProfile);
  router.put('/profile', updateProfile);
  router.put('/change-password', changePassword);
  router.post('/logout', logout);

  module.exports = router;
  
} catch (error) {
  console.error('❌ Error loading auth routes:', error);
  throw error;
}