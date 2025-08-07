import { useState, useEffect } from 'react';
import { Product } from '../../../shared/schema';

// Import the static data generated at build time
let staticProductsData: { products: Product[]; lastGenerated: string; count: number } | null = null;
let staticCategoriesData: any[] | null = null;
let staticSettingsData: any | null = null;

// Dynamically import static data with fallback
async function initializeStaticData() {
  try {
    const productData = await import('../data/staticProducts.json');
    staticProductsData = productData.default as { products: Product[]; lastGenerated: string; count: number };
    console.log('✅ Loaded static products data:', staticProductsData?.count || 0, 'products');
  } catch (error) {
    console.warn('⚠️  Static products data not found, will use API fallback');
  }

  try {
    const categoryData = await import('../data/staticCategories.json');
    staticCategoriesData = categoryData.default as any[];
    console.log('✅ Loaded static categories data:', staticCategoriesData?.length || 0, 'categories');
  } catch (error) {
    console.warn('⚠️  Static categories data not found, will use fallback');
  }

  try {
    const settingsData = await import('../data/staticSettings.json');
    staticSettingsData = settingsData.default as any;
    console.log('✅ Loaded static settings data');
  } catch (error) {
    console.warn('⚠️  Static settings data not found, will use fallback');
  }
}

export function useCMSContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Initialize static data if not already done
      if (!staticProductsData || !staticCategoriesData || !staticSettingsData) {
        await initializeStaticData();
      }
      
      // Load products - try static first, then API fallback
      if (staticProductsData?.products && staticProductsData.products.length > 0) {
        setProducts(staticProductsData.products);
        console.log(`📦 Using static products: ${staticProductsData.products.length} items`);
      } else {
        // Fallback: Load from API
        try {
          const response = await fetch('/api/products');
          if (response.ok) {
            const apiProducts = await response.json();
            setProducts(apiProducts);
            console.log(`🌐 Using API products: ${apiProducts.length} items`);
          } else {
            throw new Error('API request failed');
          }
        } catch (apiError) {
          console.error('❌ Both static and API loading failed:', apiError);
          setProducts([]);
        }
      }

      // Load categories
      if (staticCategoriesData && staticCategoriesData.length > 0) {
        setCategories(staticCategoriesData);
      } else {
        // Fallback categories
        setCategories([
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
        ]);
      }

      // Load settings
      if (staticSettingsData) {
        setSiteSettings(staticSettingsData);
      } else {
        setSiteSettings({
          title: 'Zubees Collectibles',
          description: 'Premium perfumes and fragrances collection',
          whatsapp: '+2348038507754',
          email: 'info@zubeescollectibles.com',
          address: 'Lagos, Nigeria',
          social: {}
        });
      }

      setError(null);
    } catch (err) {
      console.error('❌ Error loading CMS content:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
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
    refetch: fetchData,
    lastGenerated: staticProductsData?.lastGenerated
  };
}

export default useCMSContent;