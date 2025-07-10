const { generateTestUsers } = require('./generate-test-users');
const { createTestProducts } = require('./create-test-products');
const { testOrderCreation } = require('./test-order-creation');

const setupCompleteTestEnvironment = async () => {
  try {
    console.log('🎯 Setting up complete test environment...\n');
    console.log('='.repeat(60));

    // Step 1: Generate users
    console.log('STEP 1: Generating test users...');
    const users = await generateTestUsers();
    console.log('✅ Users generated successfully');

    // Wait a moment for database operations
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 2: Create products
    console.log('\nSTEP 2: Creating test products...');
    const products = await createTestProducts();
    console.log('✅ Products created successfully');

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Test order creation
    console.log('\nSTEP 3: Testing order creation...');
    const orderResult = await testOrderCreation();
    console.log('✅ Order created successfully');

    console.log('\n🎉 COMPLETE TEST ENVIRONMENT READY!');
    console.log('='.repeat(60));
    console.log('✅ Test users created and logged in');
    console.log('✅ Test products created');
    console.log('✅ Test order created successfully');
    console.log('✅ API endpoints tested and working');
    console.log('='.repeat(60));

    console.log('\n📋 QUICK ACCESS INFO:');
    console.log('User Email: testuser@example.com | Password: password123');
    console.log('Admin Email: testadmin@example.com | Password: admin123');
    console.log(`Products Created: ${products ? products.length : 0}`);
    console.log(`Order ID: ${orderResult ? orderResult.orderId : 'None'}`);

    return {
      users,
      products,
      order: orderResult
    };

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('Make sure your server is running on http://localhost:5000');
    process.exit(1);
  }
};

// Run setup
if (require.main === module) {
  setupCompleteTestEnvironment()
    .then(() => {
      console.log('\n🏁 Setup completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupCompleteTestEnvironment };