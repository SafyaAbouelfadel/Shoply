# 🛒  Shoply — E-Commerce Website

**Developed Safya Abou El-Fadel & Hajar Hafdi**

Shoply is a modern, e-commerce website designed to deliver a seamless online shopping experience. The platform supports product browsing, secure authentication, and order management, offering both user and admin functionality.

## 📌 Overview

This platform delivers a fully functional e-commerce experience, featuring:

- 🛒 Product catalog and cart system  
- 🔐 Authentication and authorization  
- 🧾 Order processing and payment integration  
- 📈 Backend API for managing products, users, and orders  
- 🌐 A modern frontend interface for customers  
- ⚙️ Admin controls for managing the store

## 🏗️ Project Architecture:

Shoply/
│
├── backend/
│ ├── config/ # Configuration files (e.g., DB, environment)
│ ├── controllers/ # Route logic and handlers
│ ├── middleware/ # Custom middleware (auth, errors, etc.)
│ ├── models/ # Mongoose data models (User, Product, Order)
│ ├── routes/ # API route definitions
│ ├── test-endpoints/ # Automated endpoint tests
│ ├── server.js # App entry point
│ ├── package.json # Backend dependencies
│ └── .env # Environment variables
│
├── frontend/
│ ├── public/ # Static files and assets
│ ├── src/ # React components and logic
│ ├── package.json # Frontend dependencies
│ ├── .gitignore # Ignored files for Git
│ └── README.md # Project documentation


## Usage Guidelines

Customer Features:

 - Browse products
 - Add to cart and checkout
 - Secure login and signup
 - View order history

Admin Features:

 - Add/edit/delete products
 - Manage users and orders
 - View sales reports

## setup instructions

 1. Clone the repository:

git clone https://github.com/SfyaAbouElFadel/Shoply.git
cd Shoply

 2. Install dependencies:

cd backend && npm install
cd ../frontend && npm install

 3. Configure environment variables:

Create a .env file in /backend with:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key

 4. Run the app:

# In /backend
npm run dev

# In another terminal, in /frontend
npm start


## Authors:

Safya Abou-El Fadel <email>
Hajar Hafdi <Hajarlakbir@outlook.com>
