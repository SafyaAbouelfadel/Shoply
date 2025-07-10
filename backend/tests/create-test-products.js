const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api/v1';

// Create test products
const createTestProducts = async () => {
  try {
    console.log('🚀 Creating Test Products...\n');

    // Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'testadmin@example.com',
      password: 'admin123'
    });

    const adminToken = loginResponse.data.data.token;
    console.log(`✅ Admin logged in`);

    // Create test products with clothing images and short descriptions
    const testProducts = [
      {
        name: 'Classic White T-Shirt',
        description: 'Premium cotton basic tee. Comfortable fit.',
        price: 29.99,
        category: 'T-Shirts',
        stock: 50,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Vintage Denim Jacket',
        description: 'Classic blue denim with vintage wash.',
        price: 89.99,
        category: 'Jackets',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Floral Summer Dress',
        description: 'Light floral dress perfect for summer.',
        price: 69.99,
        category: 'Dresses',
        stock: 30,
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Cozy Knit Sweater',
        description: 'Soft knit sweater in neutral tones.',
        price: 79.99,
        category: 'Sweaters',
        stock: 20,
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'High-Waisted Jeans',
        description: 'Classic jeans with comfortable stretch.',
        price: 89.99,
        category: 'Jeans',
        stock: 35,
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Silk Blouse',
        description: 'Elegant silk blouse in soft pink.',
        price: 99.99,
        category: 'Blouses',
        stock: 18,
        images: ['https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Casual Hoodie',
        description: 'Comfortable cotton hoodie in gray.',
        price: 59.99,
        category: 'Hoodies',
        stock: 40,
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Midi Skirt',
        description: 'Versatile skirt for any occasion.',
        price: 49.99,
        category: 'Skirts',
        stock: 28,
        images: ['https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Cropped Cardigan',
        description: 'Lightweight cardigan for layering.',
        price: 65.99,
        category: 'Cardigans',
        stock: 22,
        images: ['https://images.unsplash.com/photo-1551048632-6f0b5d3b42fa?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Striped Long Sleeve',
        description: 'Classic striped shirt. Timeless style.',
        price: 39.99,
        category: 'Shirts',
        stock: 45,
        images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Leather Ankle Boots',
        description: 'Stylish boots with comfortable heel.',
        price: 129.99,
        category: 'Shoes',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Lace Camisole',
        description: 'Delicate camisole perfect for layering.',
        price: 34.99,
        category: 'Tops',
        stock: 32,
        images: ['https://images.unsplash.com/photo-1609205265047-7b2c1e49a264?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Black Leather Jacket',
        description: 'Edgy leather jacket with silver zippers.',
        price: 199.99,
        category: 'Jackets',
        stock: 12,
        images: ['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Summer Tank Top',
        description: 'Breathable tank for hot days.',
        price: 24.99,
        category: 'Tops',
        stock: 60,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f37f3036?w=300&h=300&fit=crop&crop=center']
      },
      {
        name: 'Pleated Mini Skirt',
        description: 'Cute pleated skirt in navy blue.',
        price: 45.99,
        category: 'Skirts',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop&crop=center']
      }
    ];

    const createdProducts = [];

    for (const productData of testProducts) {
      console.log(`\n2️⃣ Creating product: ${productData.name}...`);
      
      try {
        const productResponse = await axios.post(`${BASE_URL}/products`, productData, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });

        const product = productResponse.data.data.product;
        createdProducts.push(product);
        
        console.log(`✅ Product created: ${product._id}`);
      } catch (productError) {
        console.log(`❌ Failed to create ${productData.name}:`, productError.response?.data?.message || productError.message);
      }
    }

    console.log('\n📋 CREATED CLOTHING PRODUCTS:');
    console.log('='.repeat(50));
    createdProducts.forEach(product => {
      console.log(`👕 ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Stock: ${product.stock}`);
      console.log(`   Category: ${product.category}`);
      console.log('');
    });

    console.log(`\n🎉 Successfully created ${createdProducts.length} clothing products!`);
    console.log('✅ All images are clothing items, properly sized');
    console.log('📝 Short descriptions for clean card layout');
    console.log('🎨 Perfect for 3-column grid display');

    return createdProducts;

  } catch (error) {
    console.error('❌ Error creating products:', error.response?.data || error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  createTestProducts();
}

module.exports = { createTestProducts };