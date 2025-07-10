const express = require('express');
const {
  generateTestUsers,
  getAllUsers,
  getUserById,
  deleteTestUsers,
  getUserStats
} = require('../../controllers/user.controller');
const { protect, adminOnly } = require('../../middleware/auth.middleware');

const router = express.Router();

// Admin only routes for user management
router.use(protect); // All routes require authentication
router.use(adminOnly); // All routes require admin role

// Generate test users
router.post('/generate-test-users', generateTestUsers);

// Get all users
router.get('/', getAllUsers);

// Get user statistics
router.get('/stats', getUserStats);

// Get user by ID
router.get('/:id', getUserById);

// Delete test users
router.delete('/test-users', deleteTestUsers);

module.exports = router;