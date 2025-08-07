// Simple test script to verify new arrivals functionality
const { storage } = require('./server/storage.js');

async function testNewArrivals() {
  console.log('Testing New Arrivals functionality...\n');
  
  try {
    // Get all products
    const allProducts = await storage.getAllProducts();
    console.log('Total products:', allProducts.length);
    
    // Get new arrivals
    const newArrivals = await storage.getNewArrivals();
    console.log('New arrivals count:', newArrivals.length);
    
    console.log('\nNew Arrival Products:');
    newArrivals.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - ₦${product.price}`);
    });
    
    // Get featured products for comparison
    const featured = await storage.getFeaturedProducts();
    console.log('\nFeatured products count:', featured.length);
    
    console.log('\nFeatured Products:');
    featured.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - ₦${product.price}`);
    });
    
  } catch (error) {
    console.error('Error testing new arrivals:', error);
  }
}

testNewArrivals();
