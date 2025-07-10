const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Generate JWT token helper
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Format user response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

// @desc    Generate test users
// @route   POST /api/v1/users/generate-test-users
// @access  Private/Admin
const generateTestUsers = async (req, res) => {
  try {
    // Clear existing test users
    await User.deleteMany({ 
      email: { $in: ['testuser@example.com', 'testadmin@example.com'] } 
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

    // Generate tokens
    const userToken = generateToken(testUser._id);
    const adminToken = generateToken(testAdmin._id);

    res.status(201).json({
      status: 'success',
      message: 'Test users generated successfully',
      data: {
        testUser: {
          ...formatUserResponse(testUser),
          password: 'password123', // Only for testing
          token: userToken
        },
        testAdmin: {
          ...formatUserResponse(testAdmin),
          password: 'admin123', // Only for testing
          token: adminToken
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to generate test users'
    });
  }
};

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get users with pagination
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      status: 'success',
      data: {
        users: users.map(formatUserResponse),
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get users'
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: formatUserResponse(user)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user'
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/v1/users/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalUsers,
          activeUsers,
          adminUsers,
          regularUsers,
          recentRegistrations,
          inactiveUsers: totalUsers - activeUsers
        },
        breakdown: {
          usersByRole: {
            admin: adminUsers,
            user: regularUsers
          },
          usersByStatus: {
            active: activeUsers,
            inactive: totalUsers - activeUsers
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user statistics'
    });
  }
};

// @desc    Delete test users
// @route   DELETE /api/v1/users/test-users
// @access  Private/Admin
const deleteTestUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({ 
      email: { $in: ['testuser@example.com', 'testadmin@example.com'] } 
    });

    res.status(200).json({
      status: 'success',
      message: `Deleted ${result.deletedCount} test users`,
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete test users'
    });
  }
};

module.exports = {
  generateTestUsers,
  getAllUsers,
  getUserById,
  getUserStats,
  deleteTestUsers
};