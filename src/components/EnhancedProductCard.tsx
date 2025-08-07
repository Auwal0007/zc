import React from 'react';
import { MessageCircle, Sparkles, ShoppingBag, Tag, Package, Heart } from 'lucide-react';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { useShoppingCart } from './ShoppingCart';

interface EnhancedProductCardProps {
  product: Product & {
    tags?: string[];
    brand?: string;
    size?: string;
    ingredients?: string;
    inStock?: boolean;
  };
  featured?: boolean;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useShoppingCart();
  
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'arabian': return 'bg-burgundy-100 text-burgundy-800';
      case 'english': return 'bg-green-100 text-green-800';
      case 'oil': return 'bg-amber-100 text-amber-800';
      case 'luxury': return 'bg-gold-100 text-gold-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'arabian': return 'Arabian';
      case 'english': return 'English';
      case 'oil': return 'Oil Perfume';
      case 'luxury': return 'Luxury';
      default: return category;
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name} (${formatPrice(product.price)}). Could you provide more details?`;
    const whatsappUrl = `https://wa.me/2348038507754?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${featured ? 'ring-2 ring-gold-300 shadow-xl' : ''}`}>
      {/* Status Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        {featured && (
          <div className="flex items-center space-x-1 bg-gold-500 text-burgundy-900 px-3 py-1 rounded-full text-sm font-bold">
            <Sparkles className="h-4 w-4" />
            <span>Featured</span>
          </div>
        )}
        {product.inStock === false && (
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cream-100 to-gold-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
            {getCategoryName(product.category)}
          </span>
          {product.size && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Package className="h-3 w-3" />
              <span>{product.size}</span>
            </div>
          )}
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-burgundy-900 mb-2 font-playfair line-clamp-2 group-hover:text-burgundy-700 transition-colors duration-200 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-burgundy-800">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              product.inStock === false
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-burgundy-600 hover:bg-burgundy-700 text-white'
            }`}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{product.inStock === false ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            data-testid={`button-whatsapp-${product.id}`}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;