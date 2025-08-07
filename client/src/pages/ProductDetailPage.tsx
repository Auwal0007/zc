import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, Star, Plus, Minus, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { Product } from '@shared/schema';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['api', 'products', id],
    enabled: !!id,
  });

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

  const handleWhatsAppOrder = () => {
    if (product) {
      const message = `Hi! I'm interested in ${product.name} (${formatPrice(product.price)}). Quantity: ${quantity}. Could you provide more details and help me place an order?`;
      const whatsappUrl = `https://wa.me/2348038507754?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleAskQuestions = () => {
    if (product) {
      const message = `Hi! I have some questions about ${product.name}. Could you help me with more information?`;
      const whatsappUrl = `https://wa.me/2348038507754?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (product) {
      const shareData = {
        title: product.name,
        text: `Check out this amazing perfume: ${product.name} - ${formatPrice(product.price)}`,
        url: window.location.href
      };

      try {
        // Try to use native Web Share API (works on mobile)
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(window.location.href);
          // You could show a toast notification here
          alert('Product link copied to clipboard!');
        }
      } catch (error) {
        // Fallback if clipboard API fails
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Product link copied to clipboard!');
      }
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Mock images array (in real app, you'd have multiple product images)
  const productImages = [
    product?.image || '',
    product?.image || '',
    product?.image || '',
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Product not found</div>
          <Link href="/" className="text-burgundy-600 hover:text-burgundy-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-burgundy-600 hover:text-burgundy-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cream-100 to-gold-50">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-burgundy-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Featured
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-burgundy-500' : 'border-gray-200 hover:border-burgundy-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(product.category)}`}>
                  {getCategoryName(product.category)}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2 text-gray-400 hover:text-burgundy-600 transition-colors"
                    title="Share this product"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-burgundy-900 mb-2 font-playfair">
                  {product.name}
                </h1>
                <p className="text-burgundy-600 font-medium">Luxury Perfume Collection</p>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.9)</span>
                <span className="text-burgundy-600 font-medium">127 reviews</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gray-600 mt-2 text-sm">
                  Elevate your style with our premium perfume collection! Available in stunning vibrant scents and intricate compositions, these high-quality fragrances are perfect for any occasion. Soft, durable, and guaranteed to stand out at any event.
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-lg font-semibold">
                    Total: {formatPrice((parseFloat(product.price) * quantity).toString())}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Order on WhatsApp</span>
                </button>
                
                <button 
                  onClick={handleAskQuestions}
                  className="w-full bg-white border-2 border-burgundy-600 text-burgundy-600 hover:bg-burgundy-50 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Ask Questions</span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Free delivery available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>100% authentic products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>WhatsApp support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}