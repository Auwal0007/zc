import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import ProductGrid from '../components/ProductGrid';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['api', 'products', 'category', category],
    enabled: !!category, // Only run query if category exists
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-burgundy-600 mx-auto mb-4"></div>
            <div className="text-lg sm:text-xl text-burgundy-700">Loading {category} products...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl mb-4">😕</div>
            <div className="text-lg sm:text-xl text-red-600 mb-2">
              Error loading {category} products
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const categoryTitle = category ? 
    category.charAt(0).toUpperCase() + category.slice(1) + ' Perfumes' : 
    'Category';

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-burgundy-900 px-2">{categoryTitle}</h1>
      <ProductGrid 
        products={products}
        searchQuery=""
        selectedCategory={category || 'all'}
        showFeatured={false}
      />
    </div>
  );
}