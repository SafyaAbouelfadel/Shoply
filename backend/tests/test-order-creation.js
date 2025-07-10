const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api/v1';

// Test order creation
const testOrderCreation = async () => {
  try {
    console.log('🚀 Testing Order Creation...\n');

    // Step 1: Login as user
    console.log('1️⃣ Logging in as test user...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'testuser@example.com',
      password: 'password123'
    });

    const userToken = loginResponse.data.data.token;
    const userId = loginResponse.data.data.user.userId;
    
    console.log(`✅ User logged in: ${userId}`);

    // Step 2: Get products
    console.log('\n2️⃣ Fetching available products...');
    const productsResponse = await axios.get(`${BASE_URL}/products`);
    
    if (productsResponse.data.data.products.length === 0) {
      throw new Error('No products found. Create products first.');
    }

    const products = productsResponse.data.data.products;
    console.log(`✅ Found ${products.length} products`);

    // Step 3: Create order with multiple items
    console.log('\n3️⃣ Creating test order...');
    const orderData = {
      items: [
        {
          product: products[0]._id,
          quantity: 2
        },
        {
          product: products[1]._id,
          quantity: 1
        }
      ],
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Test Street',
        city: 'Test City',
        state: 'California',
        zipCode: '12345',
        country: 'USA'
      },
      paymentMethod: 'cash_on_delivery'
    };

    const orderResponse = await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    const order = orderResponse.data.data.order;
    console.log(`✅ Order created successfully!`);
    console.log(`📦 Order ID: ${order._id}`);
    console.log(`💰 Total: $${order.total}`);
    console.log(`📋 Status: ${order.status}`);
    console.log(`📦 Items: ${order.items.length} item(s)`);

    // Step 4: Fetch user's orders
    console.log('\n4️⃣ Fetching user orders...');
    const userOrdersResponse = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    console.log(`✅ User has ${userOrdersResponse.data.data.orders.length} order(s)`);

    return {
      userId,
      userToken,
      orderId: order._id,
      order,
      userOrders: userOrdersResponse.data.data.orders
    };

  } catch (error) {
    console.error('❌ Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  testOrderCreation();
}

module.exports = { testOrderCreation };