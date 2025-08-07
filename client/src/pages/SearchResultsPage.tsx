import React from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import ProductGrid from '../components/ProductGrid';
import { Search } from 'lucide-react';

const SearchResultsPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';

  const { data: searchResults = [], isLoading } = useQuery<Product[]>({
    queryKey: ['api', 'products', 'search', query],
    enabled: query.length > 0,
    queryFn: () => {
      if (!query) return [];
      return fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json());
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-xl">Searching for "{query}"...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-6 w-6 text-burgundy-600" />
          <h1 className="text-3xl font-bold text-burgundy-900">Search Results</h1>
        </div>
        <p className="text-gray-600">
          {searchResults.length > 0 
            ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'product' : 'products'} for "${query}"`
            : `No products found for "${query}"`
          }
        </p>
      </div>

      {searchResults.length > 0 ? (
        <ProductGrid 
          products={searchResults}
          searchQuery={query}
          selectedCategory="all"
          showFeatured={false}
        />
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try searching with different keywords or browse our categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Arabian', 'English', 'Oil', 'Luxury'].map((category) => (
              <a
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="px-4 py-2 bg-burgundy-100 text-burgundy-700 rounded-full hover:bg-burgundy-200 transition-colors"
                data-testid={`link-suggested-category-${category.toLowerCase()}`}
              >
                {category} Perfumes
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;