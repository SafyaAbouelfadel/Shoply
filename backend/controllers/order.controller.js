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
    res.status(500).json({
      status: 'error',
      message: 'Failed to create order'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus
};
