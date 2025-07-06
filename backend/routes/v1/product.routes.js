const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/auth.middleware');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../../controllers/product.controller');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin-only routes (protected)
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
