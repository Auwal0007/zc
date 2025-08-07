import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Product } from './types/Product';
import { productData } from './data/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
    // In a real app, you would save to a database here
    console.log('Products updated:', newProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Hero />
      <ProductGrid 
        products={filteredProducts} 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
      <Footer />
      <WhatsAppFloat />
      <AdminPanel products={products} onProductsChange={handleProductsChange} />
    </div>
  );
}

export default App;
