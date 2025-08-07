import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';

interface SearchBarProps {
  onSearchResults?: (results: Product[]) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearchResults, 
  placeholder = "Search perfumes...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [, setLocation] = useLocation();

  const { data: searchResults = [], isLoading } = useQuery<Product[]>({
    queryKey: ['api', 'products', 'search', query],
    enabled: query.length > 2,
    queryFn: () => {
      if (query.length <= 2) return [];
      return fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json());
    },
  });

  useEffect(() => {
    if (onSearchResults && searchResults) {
      onSearchResults(searchResults);
    }
  }, [searchResults, onSearchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsSearching(false);
    if (onSearchResults) {
      onSearchResults([]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearching(true)}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-burgundy-500 focus:border-transparent transition-all duration-200"
          placeholder={placeholder}
          data-testid="input-search"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isSearching && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setLocation(`/product/${product.id}`);
                    setIsSearching(false);
                    setQuery('');
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                  data-testid={`search-result-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">₦{Number(product.price).toLocaleString()}</div>
                  </div>
                </button>
              ))}
              {searchResults.length > 5 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-t">
                  {searchResults.length - 5} more results...
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close search */}
      {isSearching && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSearching(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;