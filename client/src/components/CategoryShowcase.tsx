import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';

interface CategoryShowcaseProps {
  title?: string;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ 
  title = "Shop by Category" 
}) => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['api', 'products'],
  });

  const categories = [
    {
      id: 'arabian',
      name: 'Arabian Perfumes',
      description: 'Rich, exotic fragrances with traditional Middle Eastern notes',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'english',
      name: 'English Perfumes',
      description: 'Classic floral and fresh scents with European elegance',
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'oil',
      name: 'Oil Perfumes',
      description: 'Pure, alcohol-free oil-based fragrances for lasting wear',
      image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'luxury',
      name: 'Luxury Collection',
      description: 'Premium fragrances for the most discerning tastes',
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const getCategoryProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-cream-50 to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium fragrances from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const productCount = getCategoryProductCount(category.id);
            
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                data-testid={`category-card-${category.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-burgundy-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {productCount} Products
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-burgundy-900 mb-2 group-hover:text-burgundy-700 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-burgundy-600 group-hover:text-burgundy-700 transition-colors duration-200">
                    <span className="text-sm font-medium">Explore Collection</span>
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-burgundy-600 text-white px-8 py-3 rounded-full hover:bg-burgundy-700 transition-colors duration-200 font-medium"
            data-testid="button-view-all-products"
          >
            <span>View All Products</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;