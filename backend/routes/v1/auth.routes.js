const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
} = require('../../controllers/auth.controller');
const { protect } = require('../../middleware/auth.middleware'); // Changed from authenticateToken

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect); // Apply auth middleware to all routes below

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.post('/logout', logout);

module.exports = router;
