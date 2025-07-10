const Order = require('../models/order.model');
const Product = require('../models/product.model');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Order items are required'
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        status: 'error',
        message: 'Shipping address is required'
      });
    }

    // Calculate simple total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(400).json({
          status: 'error',
          message: 'Product not found'
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    console.log('Creating order for user:', req.user?._id); // check if user is attached

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      total
    });

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
  console.error('Order creation error:', error); // 👈 add this line
  res.status(500).json({
    status: 'error',
    message: 'Failed to create order'
  });
  }
};

// @desc    Get user orders
// @route   GET /api/v1/orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name price');

    res.status(200).json({
      status: 'success',
      data: { orders }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch order'
    });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Order status updated',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update order status'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus
};
