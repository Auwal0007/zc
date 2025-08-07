import { Product } from '../../shared/schema';
import matter from 'gray-matter';

// Content loader utilities for Netlify CMS
export interface CMSProduct {
  name: string;
  id: string;
  price: number;
  category: 'arabian' | 'english' | 'oil' | 'luxury';
  description: string;
  image: string;
  images?: string[];
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  tags: string[];
  brand?: string;
  size?: string;
  ingredients?: string;
  variants?: Array<{
    size: string;
    color: string;
    price: number;
    stock: number;
  }>;
}

export interface CMSCategory {
  name: string;
  id: string;
  description: string;
  image: string;
  featured: boolean;
  sortOrder?: number;
}

export interface CMSSiteSettings {
  title: string;
  description: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours?: string;
  currency?: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
  };
  seo?: {
    keywords?: string;
    googleAnalytics?: string;
    metaImage?: string;
  };
}

// Function to load products from CMS content
export async function loadCMSProducts(): Promise<Product[]> {
  try {
    // Try to load from static data first
    const staticData = await import('../data/staticProducts.json');
    const productsData = staticData.default as { products: Product[] };
    
    if (productsData && productsData.products) {
      return productsData.products;
    }
    
    // Fallback to empty array if no data
    return [];
  } catch (err) {
    console.error('Error loading products:', err);
    return [];
  }
}

// Function to load categories from CMS content
export async function loadCMSCategories(): Promise<CMSCategory[]> {
  try {
    const staticData = await import('../data/staticCategories.json');
    const categories = staticData.default as CMSCategory[];
    return categories || [];
  } catch (err) {
    console.error('Error loading categories:', err);
    return [];
  }
}

// Function to load site settings from CMS content
export async function loadCMSSettings(): Promise<CMSSiteSettings> {
  try {
    const staticData = await import('../data/staticSettings.json');
    const settings = staticData.default as CMSSiteSettings;
    return settings || getDefaultSettings();
  } catch (err) {
    console.error('Error loading site settings:', err);
    return getDefaultSettings();
  }
}

// Get default settings
function getDefaultSettings(): CMSSiteSettings {
  return {
    title: 'Zubees Collectibles',
    description: 'Premium perfumes and fragrances collection',
    whatsapp: '+2348038507754',
    email: 'info@zubeescollectibles.com',
    address: 'Lagos, Nigeria',
    social: {}
  };
}

// Convert CMS product data to internal Product format
function convertCMSProduct(cmsProduct: CMSProduct): Product {
  return {
    id: parseInt(cmsProduct.id) || Math.floor(Math.random() * 10000), // Convert string to number
    name: cmsProduct.name,
    price: cmsProduct.price.toString(), // Convert number to string as expected by schema
    category: cmsProduct.category,
    description: cmsProduct.description,
    image: cmsProduct.image,
    featured: cmsProduct.featured || false,
    newArrival: cmsProduct.newArrival || false
  };
}

// Utility function to get products by category
export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Utility function to get featured products
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter(product => product.featured);
}

// Utility function to get new arrival products
export function getNewArrivalProducts(products: Product[]): Product[] {
  return products.filter(product => product.newArrival);
}

// Utility function to search products
export function searchProducts(products: Product[], query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}
