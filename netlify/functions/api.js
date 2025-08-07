const express = require('express');
const serverless = require('serverless-http');

// Create express app
const app = express();
app.use(express.json());

// Sample products data that matches your schema
const allProducts = [
  {
    id: 1,
    name: 'Royal Oud Collection',
    price: '25000',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'arabian',
    description: 'Premium Arabian oud perfume with rich, woody notes and exotic spices. Long-lasting fragrance perfect for special occasions.',
    featured: true,
    newArrival: false
  },
  {
    id: 2,
    name: 'English Rose Garden',
    price: '18000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'english',
    description: 'Elegant English perfume with fresh rose petals, bergamot, and subtle vanilla undertones. Perfect for daily wear.',
    featured: true,
    newArrival: true
  },
  {
    id: 3,
    name: 'Amber Oil Essence',
    price: '15000',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'oil',
    description: 'Pure amber oil perfume with warm, sensual notes. Alcohol-free formula that lasts all day.',
    featured: false,
    newArrival: true
  },
  {
    id: 4,
    name: 'Luxury Platinum',
    price: '35000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'luxury',
    description: 'Exclusive luxury perfume with rare ingredients. A sophisticated blend of citrus, florals, and musk.',
    featured: true,
    newArrival: false
  },
  {
    id: 5,
    name: 'Musk Al-Sharq',
    price: '22000',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'arabian',
    description: 'Traditional Arabian musk with deep, intoxicating notes. A timeless fragrance that captures the essence of the Middle East.',
    featured: false,
    newArrival: true
  },
  {
    id: 6,
    name: 'Lavender Dreams',
    price: '16000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'english',
    description: 'Calming English lavender perfume with chamomile and soft woods. Perfect for relaxation and evening wear.',
    featured: false,
    newArrival: false
  },
  {
    id: 7,
    name: 'Sandalwood Oil',
    price: '20000',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'oil',
    description: 'Premium sandalwood oil with creamy, woody fragrance. Natural and long-lasting with therapeutic properties.',
    featured: false,
    newArrival: false
  },
  {
    id: 8,
    name: 'Diamond Elite',
    price: '45000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'luxury',
    description: 'Ultra-premium luxury perfume with rare French ingredients. Limited edition collection for the discerning connoisseur.',
    featured: true,
    newArrival: true
  }
];

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check called');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products called');
  res.json(allProducts);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  console.log(`GET /api/products/category/${category} called`);
  
  const categoryProducts = allProducts.filter(product => product.category === category);
  res.json(categoryProducts);
});

// Get featured products
app.get('/api/products/featured', (req, res) => {
  console.log('GET /api/products/featured called');
  const featuredProducts = allProducts.filter(product => product.featured === true);
  res.json(featuredProducts);
});

// Get new arrival products
app.get('/api/products/new-arrivals', (req, res) => {
  console.log('GET /api/products/new-arrivals called');
  const newArrivals = allProducts.filter(product => product.newArrival === true);
  res.json(newArrivals);
});

// Search products
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  console.log(`GET /api/products/search?q=${q} called`);
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  const searchResults = allProducts.filter(product =>
    product.name.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase()) ||
    product.category.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(searchResults);
});

// Get product by id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /api/products/${id} called`);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// Create new product (for admin functionality)
app.post('/api/products', (req, res) => {
  console.log('POST /api/products called');
  const newProduct = {
    id: Math.max(...allProducts.map(p => p.id)) + 1,
    ...req.body,
    featured: req.body.featured || false,
    newArrival: req.body.newArrival || false
  };
  
  allProducts.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /api/products/${id} called`);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  
  const productIndex = allProducts.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  allProducts[productIndex] = { ...allProducts[productIndex], ...req.body };
  res.json(allProducts[productIndex]);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/products/${id} called`);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  
  const productIndex = allProducts.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  allProducts.splice(productIndex, 1);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Export the serverless function
module.exports.handler = serverless(app);