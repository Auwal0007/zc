import { Product } from '@shared/schema';

// Content loading utilities for the perfume store
export class ContentLoader {
  private static instance: ContentLoader;
  private cache: Map<string, any> = new Map();

  static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  async loadProducts(): Promise<Product[]> {
    const cacheKey = 'products';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      this.cache.set(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Failed to load products:', error);
      return [];
    }
  }

  async loadProductsByCategory(category: string): Promise<Product[]> {
    const cacheKey = `products-${category}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`/api/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      this.cache.set(cacheKey, products);
      return products;
    } catch (error) {
      console.error(`Failed to load products for category ${category}:`, error);
      return [];
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to search products:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  invalidateCache(key: string): void {
    this.cache.delete(key);
  }
}

export const contentLoader = ContentLoader.getInstance();