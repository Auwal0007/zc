import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import CategoryShowcase from '../components/CategoryShowcase';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { useState } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['api', 'products'],
  });

  const { data: newArrivals = [] } = useQuery<Product[]>({
    queryKey: ['api', 'products', 'new-arrivals'],
  });

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <div className="container mx-auto px-4 py-4">
        <ProductGrid 
          products={filteredProducts}
          newArrivals={newArrivals}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          showFeatured={true}
        />
      </div>
    </>
  );
}
