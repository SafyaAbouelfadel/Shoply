const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const path = require('path');

// Load environment variables from the correct path
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const girlyProducts = [
  {
    name: "Lavender Dreams Midi Dress",
    description: "Ethereal lavender midi dress with delicate lace details and flowing chiffon fabric. Perfect for romantic dates or garden parties. Features adjustable straps and a dreamy silhouette.",
    price: 89.99,
    category: "Dresses",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1566479179817-c0a06b6b5bff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Soft Pink Cashmere Sweater",
    description: "Luxuriously soft cashmere sweater in blush pink. Cozy and feminine with a relaxed fit. Perfect for chilly mornings with your favorite latte. Cloud-like comfort meets timeless elegance.",
    price: 129.99,
    category: "Sweaters",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Floral Butterfly Crop Top",
    description: "Adorable crop top featuring hand-painted butterfly and flower motifs. Made from organic cotton with a flattering feminine cut. Perfect for pairing with high-waisted jeans or skirts.",
    price: 45.99,
    category: "Tops",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Princess Tulle Skirt",
    description: "Dreamy tulle skirt in soft lavender that makes you feel like a fairy tale princess. Multiple layers create beautiful movement. Perfect for special occasions or when you want to feel magical.",
    price: 69.99,
    category: "Skirts",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Romantic Lace Cardigan",
    description: "Delicate lace cardigan in cream with intricate floral patterns. Lightweight and feminine, perfect for layering over dresses or tank tops. Vintage-inspired with modern comfort.",
    price: 79.99,
    category: "Cardigans",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Pastel Rainbow Striped Tee",
    description: "Adorable t-shirt featuring soft pastel rainbow stripes. Made from super soft cotton blend. Brings joy and color to any outfit. Perfect for casual days when you want to spread happiness.",
    price: 32.99,
    category: "T-Shirts",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Cottagecore Floral Blouse",
    description: "Whimsical blouse with vintage-inspired floral print and puff sleeves. Features pearl buttons and a feminine bow tie. Perfect for channeling your inner cottage fairy aesthetic.",
    price: 89.99,
    category: "Blouses",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551048632-6f0b5d3b42fa?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Cozy Lavender Hoodie",
    description: "Ultra-soft hoodie in dreamy lavender with embroidered moon and stars. Oversized fit perfect for lounging or casual outings. Kangaroo pocket perfect for snacks and treasures.",
    price: 65.99,
    category: "Hoodies",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Pearl Button Denim Jacket",
    description: "Feminine denim jacket with pearl buttons and embroidered flower details. Light wash denim with a cropped fit. Perfect for adding a girly touch to any outfit.",
    price: 95.99,
    category: "Jackets",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Aesthetic Corset Top",
    description: "Trendy corset top in soft pink with adjustable lacing. Flattering silhouette that can be dressed up or down. Perfect for date nights or Instagram-worthy outfits.",
    price: 55.99,
    category: "Tops",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Butterfly Hair Scrunchie Set",
    description: "Set of 5 adorable scrunchies in pastel colors with embroidered butterflies. Gentle on hair and perfect for creating cute hairstyles. Comes in a lovely gift box.",
    price: 24.99,
    category: "Accessories",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop"
    ]
  },
  {
    name: "Kawaii Cat Ear Beanie",
    description: "Super cute beanie with 3D cat ears in soft lavender. Warm and cozy with adorable embroidered whiskers. Perfect for adding a playful touch to winter outfits.",
    price: 35.99,
    category: "Accessories",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop"
    ]
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting girly product seeding...');
    console.log('💜 Creating a dreamy lavender-themed collection...');
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('🔗 Connecting to MongoDB...');
    console.log('📍 MongoDB URI:', mongoUri);
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Find an admin user to assign as creator
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('❌ No admin user found. Creating default admin...');
      
      // Create default admin user
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const defaultAdmin = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
      
      await defaultAdmin.save();
      adminUser = defaultAdmin;
      console.log('✅ Default admin user created');
    }

    console.log('👤 Using admin user:', adminUser.email);

    // Clear existing products (optional)
    console.log('🗑️ Clearing existing products...');
    const deleteResult = await Product.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing products`);

    // Add creator ID to each product
    const productsWithCreator = girlyProducts.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));

    // Insert products
    console.log('📦 Inserting girly products...');
    const insertedProducts = await Product.insertMany(productsWithCreator);
    
    console.log(`✅ Successfully added ${insertedProducts.length} adorable products:`);
    
    // Display inserted products
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. 💜 ${product.name} - $${product.price} (${product.category})`);
    });

    // Summary
    console.log('\n📊 GIRLY COLLECTION SUMMARY:');
    console.log('💜'.repeat(50));
    console.log(`Total Products Added: ${insertedProducts.length}`);
    console.log(`Categories: ${[...new Set(insertedProducts.map(p => p.category))].join(', ')}`);
    console.log(`Price Range: $${Math.min(...insertedProducts.map(p => p.price))} - $${Math.max(...insertedProducts.map(p => p.price))}`);
    console.log(`Total Stock: ${insertedProducts.reduce((sum, p) => sum + p.stock, 0)} items`);
    
    console.log('\n🎉 Girly product seeding completed successfully!');
    console.log('💜 Your lavender-themed store is ready to enchant customers!');
    
  } catch (error) {
    console.error('❌ Error seeding girly products:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('📡 Database connection closed');
    }
  }
}

// Run the seeder
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, girlyProducts };