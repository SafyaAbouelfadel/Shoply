const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/auth.middleware');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus
} = require('../../controllers/order.controller');

// User routes (protected)
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);

// Admin routes
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
