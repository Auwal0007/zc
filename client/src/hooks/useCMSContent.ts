import { useState, useEffect } from 'react';
import { Product } from '../../../shared/schema';

// Direct static data - no API calls needed
const staticProducts: Product[] = [
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

const staticCategories = [
  {
    id: 'arabian',
    name: 'Arabian Perfumes',
    description: 'Rich, exotic fragrances with traditional Middle Eastern notes',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    sortOrder: 1
  },
  {
    id: 'english',
    name: 'English Perfumes',
    description: 'Classic floral and fresh scents with European elegance',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    sortOrder: 2
  },
  {
    id: 'oil',
    name: 'Oil Perfumes',
    description: 'Pure, alcohol-free oil-based fragrances for lasting wear',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    sortOrder: 3
  },
  {
    id: 'luxury',
    name: 'Luxury Collection',
    description: 'Premium fragrances for the most discerning tastes',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    sortOrder: 4
  }
];

const staticSettings = {
  title: 'Zubees Collectibles',
  description: 'Premium perfumes and fragrances collection featuring Arabian, English, Oil, and Luxury perfumes.',
  whatsapp: '+2348038507754',
  email: 'info@zubeescollectibles.com',
  address: 'Lagos, Nigeria',
  businessHours: 'Mon-Sat 9AM-6PM',
  currency: '₦',
  social: {
    facebook: 'https://www.facebook.com/zubeescollectibles',
    instagram: 'https://www.instagram.com/zubeescollectibles',
    twitter: 'https://www.twitter.com/zubeescollect',
    whatsapp: '+2348038507754'
  }
};

export function useCMSContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for better UX, then set static data
    const loadData = async () => {
      try {
        // Try to load from generated static files first
        try {
          const staticData = await import('../data/staticProducts.json');
          if (staticData.default?.products && staticData.default.products.length > 0) {
            setProducts(staticData.default.products);
            console.log('✅ Loaded from static JSON:', staticData.default.products.length, 'products');
          } else {
            throw new Error('No products in static data');
          }
        } catch {
          // Fallback to hardcoded data
          setProducts(staticProducts);
          console.log('✅ Using hardcoded products:', staticProducts.length, 'products');
        }

        // Load categories
        try {
          const categoryData = await import('../data/staticCategories.json');
          setCategories(categoryData.default || staticCategories);
        } catch {
          setCategories(staticCategories);
        }

        // Load settings
        try {
          const settingsData = await import('../data/staticSettings.json');
          setSiteSettings(settingsData.default || staticSettings);
        } catch {
          setSiteSettings(staticSettings);
        }

        setError(null);
      } catch (err) {
        console.error('❌ Error loading content:', err);
        // Even if there's an error, use the hardcoded data
        setProducts(staticProducts);
        setCategories(staticCategories);
        setSiteSettings(staticSettings);
        setError(null); // Don't show error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    // Small delay to show loading state
    setTimeout(loadData, 500);
  }, []);

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  };

  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = products.filter(product => product.newArrival);

  return {
    products,
    categories,
    siteSettings,
    featuredProducts,
    newArrivals,
    loading,
    error,
    getProductsByCategory,
    searchProducts,
    refetch: () => {}, // No need to refetch with static data
    lastGenerated: new Date().toISOString()
  };
}

export default useCMSContent;