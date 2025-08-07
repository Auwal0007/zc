import matter from 'gray-matter';
import { Product } from '@shared/schema';

export interface CMSProduct extends Omit<Product, 'id'> {
  slug: string;
  tags?: string[];
  brand?: string;
  size?: string;
  ingredients?: string;
  inStock?: boolean;
}

export interface CMSCategory {
  name: string;
  id: string;
  description: string;
  image: string;
  featured: boolean;
  slug: string;
}

export interface CMSSiteSettings {
  title: string;
  description: string;
  whatsapp: string;
  email: string;
  address: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

class CMSLoader {
  private static instance: CMSLoader;
  private cache: Map<string, any> = new Map();

  static getInstance(): CMSLoader {
    if (!CMSLoader.instance) {
      CMSLoader.instance = new CMSLoader();
    }
    return CMSLoader.instance;
  }

  async loadProducts(): Promise<CMSProduct[]> {
    const cacheKey = 'cms-products';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // In a real implementation, this would load from the CMS
      // For now, we'll return the existing products with CMS structure
      const products: CMSProduct[] = [
        {
          name: 'Royal Oud Collection',
          price: '25000',
          image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'arabian',
          description: 'Premium Arabian oud perfume with rich, woody notes and exotic spices. Long-lasting fragrance perfect for special occasions.',
          featured: true,
          inStock: true,
          brand: 'Zubees Premium',
          size: '50ml',
          tags: ['oud', 'woody', 'luxury', 'long-lasting'],
          ingredients: 'Oud wood, Rose, Saffron, Amber',
          slug: 'royal-oud-collection'
        },
        {
          name: 'English Rose Garden',
          price: '18000',
          image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'english',
          description: 'Elegant English perfume with fresh rose petals, bergamot, and subtle vanilla undertones. Perfect for daily wear.',
          featured: true,
          inStock: true,
          brand: 'Zubees Classic',
          size: '30ml',
          tags: ['floral', 'fresh', 'daily-wear', 'elegant'],
          ingredients: 'Rose petals, Bergamot, Vanilla, White musk',
          slug: 'english-rose-garden'
        }
      ];

      this.cache.set(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Failed to load CMS products:', error);
      return [];
    }
  }

  async loadCategories(): Promise<CMSCategory[]> {
    const cacheKey = 'cms-categories';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const categories: CMSCategory[] = [
        {
          name: 'Arabian Perfumes',
          id: 'arabian',
          description: 'Rich, exotic fragrances with traditional Middle Eastern notes',
          image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
          featured: true,
          slug: 'arabian'
        },
        {
          name: 'English Perfumes',
          id: 'english',
          description: 'Classic floral and fresh scents with European elegance',
          image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
          featured: true,
          slug: 'english'
        },
        {
          name: 'Oil Perfumes',
          id: 'oil',
          description: 'Pure, alcohol-free oil-based fragrances for lasting wear',
          image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
          featured: true,
          slug: 'oil'
        },
        {
          name: 'Luxury Collection',
          id: 'luxury',
          description: 'Premium fragrances for the most discerning tastes',
          image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
          featured: true,
          slug: 'luxury'
        }
      ];

      this.cache.set(cacheKey, categories);
      return categories;
    } catch (error) {
      console.error('Failed to load CMS categories:', error);
      return [];
    }
  }

  async loadSiteSettings(): Promise<CMSSiteSettings> {
    const cacheKey = 'cms-settings';
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const settings: CMSSiteSettings = {
        title: 'Zubees Collectibles',
        description: 'Premium perfumes and fragrances collection featuring Arabian, English, Oil, and Luxury perfumes.',
        whatsapp: '+2348038507754',
        email: 'info@zubeescollectibles.com',
        address: 'Lagos, Nigeria',
        social: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      };

      this.cache.set(cacheKey, settings);
      return settings;
    } catch (error) {
      console.error('Failed to load CMS settings:', error);
      return {
        title: 'Zubees Collectibles',
        description: 'Premium perfumes and fragrances',
        whatsapp: '+2348038507754',
        email: 'info@zubeescollectibles.com',
        address: 'Lagos, Nigeria',
        social: {}
      };
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const cmsLoader = CMSLoader.getInstance();