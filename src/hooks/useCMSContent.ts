import { useState, useEffect } from 'react';
import { Product } from '../../shared/schema';
import { CMSCategory, CMSSiteSettings } from '../utils/contentLoader';

// Import the static data generated at build time
let staticProductsData: { products: Product[]; lastGenerated: string; count: number } | null = null;
let staticCategoriesData: CMSCategory[] | null = null;
let staticSettingsData: CMSSiteSettings | null = null;

// Dynamically import static data with fallback
async function initializeStaticData() {
  try {
    const productData = await import('../data/staticProducts.json');
    staticProductsData = productData.default as { products: Product[]; lastGenerated: string; count: number };
  } catch (error) {
    console.warn('Static products data not found, will use fallback');
  }

  try {
    const categoryData = await import('../data/staticCategories.json');
    staticCategoriesData = categoryData.default as CMSCategory[];
  } catch (error) {
    console.warn('Static categories data not found, will use fallback');
  }

  try {
    const settingsData = await import('../data/staticSettings.json');
    staticSettingsData = settingsData.default as CMSSiteSettings;
  } catch (error) {
    console.warn('Static settings data not found, will use fallback');
  }
}

export function useCMSContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CMSCategory[]>([]);
  const [siteSettings, setSiteSettings] = useState<CMSSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Initialize static data if not already done
      if (!staticProductsData || !staticCategoriesData || !staticSettingsData) {
        await initializeStaticData();
      }
      
      if (staticProductsData?.products) {
        setProducts(staticProductsData.products);
      } else {
        // Fallback: Load from content files directly (development mode)
        const { loadCMSProducts } = await import('../utils/contentLoader');
        const products = await loadCMSProducts();
        setProducts(products);
      }

      if (staticCategoriesData) {
        setCategories(staticCategoriesData);
      } else {
        const { loadCMSCategories } = await import('../utils/contentLoader');
        const categories = await loadCMSCategories();
        setCategories(categories);
      }

      if (staticSettingsData) {
        setSiteSettings(staticSettingsData);
      } else {
        const { loadCMSSettings } = await import('../utils/contentLoader');
        const settings = await loadCMSSettings();
        setSiteSettings(settings);
      }

      setError(null);
    } catch (err) {
      console.error('Error loading CMS content:', err);
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

  return {
    products,
    categories,
    siteSettings,
    featuredProducts,
    loading,
    error,
    getProductsByCategory,
    searchProducts,
  };
}

export default useCMSContent;
