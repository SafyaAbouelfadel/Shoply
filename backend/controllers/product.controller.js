const Product = require('../models/product.model');

// @desc    Get all products with filtering
// @route   GET /api/v1/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = { isActive: true };
    
    if (search) filter.name = new RegExp(search, 'i');
    if (category) filter.category = category;
    
    const products = await Product.find(filter);
    res.status(200).json({ 
      status: 'success',
      data: { products } 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch products' 
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Product not found' 
      });
    }
    res.status(200).json({ 
      status: 'success',
      data: { product } 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch product' 
    });
  }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ 
      status: 'success',
      message: 'Product created successfully',
      data: { product } 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error',
      message: error.message || 'Failed to create product' 
    });
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Product not found' 
      });
    }
    res.status(200).json({ 
      status: 'success',
      message: 'Product updated successfully',
      data: { product } 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error',
      message: error.message || 'Failed to update product' 
    });
  }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Product not found' 
      });
    }
    res.status(200).json({ 
      status: 'success',
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to delete product' 
    });
  }
};

// Export all controller functions
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
