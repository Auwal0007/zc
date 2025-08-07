// @ts-ignore
import serverless from 'serverless-http';
import express from 'express';

// Create a simple express app for testing
const app = express();
app.use(express.json());

// Sample products data
const allProducts = [
  {
    id: 1,
    name: 'Royal Oud Collection',
    price: '25000',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'arabian',
    description: 'Premium Arabian oud perfume with rich, woody notes and exotic spices.',
    featured: true
  },
  {
    id: 2,
    name: 'English Rose Garden',
    price: '18000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'english',
    description: 'Elegant English perfume with fresh rose petals, bergamot, and subtle vanilla.',
    featured: true
  },
  {
    id: 3,
    name: 'Amber Oil Essence',
    price: '15000',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'oil',
    description: 'Pure amber oil perfume with warm, sensual notes. Alcohol-free formula that lasts all day.',
    featured: false
  },
  {
    id: 4,
    name: 'Luxury Platinum',
    price: '35000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'luxury',
    description: 'Exclusive luxury perfume with rare ingredients. A sophisticated blend of citrus, florals, and musk.',
    featured: true
  },
  {
    id: 5,
    name: 'Musk Al-Sharq',
    price: '22000',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'arabian',
    description: 'Traditional Arabian musk with deep, intoxicating notes. A timeless fragrance.',
    featured: false
  },
  {
    id: 6,
    name: 'Lavender Dreams',
    price: '16000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'english',
    description: 'Calming English lavender perfume with chamomile and soft woods.',
    featured: false
  },
  {
    id: 7,
    name: 'Sandalwood Oil',
    price: '20000',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'oil',
    description: 'Premium sandalwood oil with creamy, woody fragrance. Natural and long-lasting.',
    featured: false
  },
  {
    id: 8,
    name: 'Diamond Elite',
    price: '45000',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'luxury',
    description: 'Ultra-premium luxury perfume with rare French ingredients. Limited edition collection.',
    featured: true
  }
];

// Add a simple test route
app.get('/api/test', (req: any, res: any) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Get all products
app.get('/api/products', (req: any, res: any) => {
  console.log('All products API called');
  res.json(allProducts);
});

// Get products by category
app.get('/api/products/category/:category', (req: any, res: any) => {
  const { category } = req.params;
  console.log(`Category API called for: ${category}`);
  
  const categoryProducts = allProducts.filter(product => product.category === category);
  res.json(categoryProducts);
});

// Get featured products
app.get('/api/products/featured', (req: any, res: any) => {
  console.log('Featured products API called');
  const featuredProducts = allProducts.filter(product => product.featured === true);
  res.json(featuredProducts);
});

// Search products
app.get('/api/products/search', (req: any, res: any) => {
  const { q } = req.query;
  console.log(`Search API called for: ${q}`);
  
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
app.get('/api/products/:id', (req: any, res: any) => {
  const id = parseInt(req.params.id);
  console.log(`Product by ID API called for: ${id}`);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// Add error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

export const handler = serverless(app);
