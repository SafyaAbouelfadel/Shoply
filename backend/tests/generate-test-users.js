const mongoose = require('mongoose');
const User = require('../models/user.model'); // Fixed path - go up one level
require('dotenv').config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for user generation');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Generate test users
const generateTestUsers = async () => {
  try {
    await connectDB();

    // Clear existing test users (optional)
    await User.deleteMany({ 
      email: { 
        $in: ['testuser@example.com', 'testadmin@example.com'] 
      } 
    });

    // Create test user
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user'
    });

    // Create test admin
    const testAdmin = await User.create({
      firstName: 'Test',
      lastName: 'Admin',
      email: 'testadmin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('\n✅ Test users generated successfully!');
    console.log('\n📋 USER CREDENTIALS:');
    console.log('='.repeat(50));
    console.log(`👤 Regular User:`);
    console.log(`   ID: ${testUser._id}`);
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Password: password123`);
    console.log(`   Role: ${testUser.role}`);
    
    console.log(`\n👨‍💼 Admin User:`);
    console.log(`   ID: ${testAdmin._id}`);
    console.log(`   Email: ${testAdmin.email}`);
    console.log(`   Password: admin123`);
    console.log(`   Role: ${testAdmin.role}`);
    console.log('='.repeat(50));

    // Generate login tokens for immediate use
    const jwt = require('jsonwebtoken');
    
    const userToken = jwt.sign(
      { userId: testUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const adminToken = jwt.sign(
      { userId: testAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('\n🔑 TOKENS FOR API TESTING:');
    console.log('='.repeat(50));
    console.log(`👤 User Token:`);
    console.log(`Bearer ${userToken}`);
    console.log(`\n👨‍💼 Admin Token:`);
    console.log(`Bearer ${adminToken}`);
    console.log('='.repeat(50));

    await mongoose.connection.close();

    return {
      user: {
        id: testUser._id,
        email: testUser.email,
        token: userToken
      },
      admin: {
        id: testAdmin._id,
        email: testAdmin.email,
        token: adminToken
      }
    };

  } catch (error) {
    console.error('Error generating test users:', error);
    await mongoose.connection.close();
    throw error;
  }
};

// Run the script
if (require.main === module) {
  generateTestUsers();
}

module.exports = { generateTestUsers };