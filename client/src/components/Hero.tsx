import React, { useState, useEffect } from 'react';
import { Sparkles, Search, ShoppingBag, TrendingUp, Users, Award } from 'lucide-react';


const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Featured perfume images for carousel - focused on fragrances
  const featuredImages = [
    '/images/per.jpg', // Perfume bottles
    '/images/per2.jpg', // Elegant perfume application
    '/images/per4.jpg', // Luxury fragrance collection
    '/images/per3.jpg', // Artistic perfume display
    '/images/per1.jpg', // Premium fragrance showcase
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-700 min-h-[50vh] sm:min-h-[90vh]">
      {/* Enhanced Background with Perfume-focused Pattern */}
      <div className="absolute inset-0">
        {/* Perfume bottle silhouette pattern */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 10c-5 0-9 4-9 9v15c0 3-2 5-5 5h-6c-3 0-5 2-5 5v35c0 8 7 15 15 15h20c8 0 15-7 15-15V44c0-3-2-5-5-5h-6c-3 0-5-2-5-5V19c0-5-4-9-9-9z'/%3E%3Ccircle cx='50' cy='15' r='3'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        {/* Additional texture overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900/80 via-burgundy-800/70 to-burgundy-700/80"></div>
      </div>
      
      {/* Improved Smoke/Swirl Effect for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-burgundy-900/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-20 lg:py-24 flex items-center min-h-[50vh] sm:min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center w-full">
          
          {/* Left Content - Enhanced spacing and contrast */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Social Proof Banner - Better mobile spacing */}
            <div className="flex justify-center lg:justify-start mb-2 sm:mb-8 animate-fadeIn">
              <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-lg px-3 sm:px-8 py-1.5 sm:py-4 rounded-full border border-gold-300/30 shadow-xl">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 sm:h-5 sm:w-5 text-gold-300" />
                  <span className="text-white font-semibold text-xs sm:text-base drop-shadow-lg">10,000+ Perfumes Sold</span>
                </div>
                <div className="w-px h-3 sm:h-5 bg-gold-300/40"></div>
                <div className="flex items-center space-x-1">
                  <Award className="h-3 w-3 sm:h-5 sm:w-5 text-gold-300" />
                  <span className="text-white font-semibold text-xs sm:text-base drop-shadow-lg">Since 2022</span>
                </div>
              </div>
            </div>

            {/* Premium Badge - Enhanced contrast */}
            <div className="flex justify-center lg:justify-start mb-2 sm:mb-8 animate-slideUp">
              <div className="flex items-center space-x-2 bg-black/25 backdrop-blur-lg px-3 sm:px-8 py-1.5 sm:py-4 rounded-full border border-gold-400/40 shadow-lg">
                <Sparkles className="h-3 w-3 sm:h-6 sm:w-6 text-gold-300 animate-pulse" />
                <span className="text-white font-semibold text-xs sm:text-lg drop-shadow-lg">Premium Collection</span>
              </div>
            </div>
            
            {/* SEO-Optimized Subheading - Ultra compact mobile */}
            <div className="mb-2 sm:mb-8 animate-slideUp delay-300">
              <p className="text-xs sm:text-xl lg:text-2xl text-white font-semibold drop-shadow-lg bg-black/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg inline-block">
                Buy Arabian and English Perfumes Online – Fast Delivery
              </p>
            </div>
            
            <p className="text-sm sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-12 leading-relaxed animate-slideUp delay-400 drop-shadow-lg font-light">
              Explore our curated collection of premium perfumes and oils
            </p>
            
            {/* Enhanced CTA buttons - Ultra compact mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center lg:justify-start items-center animate-slideUp delay-500 mb-3 sm:mb-16">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="group w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 active:from-gold-700 active:to-gold-800 text-black font-bold py-2.5 sm:py-5 px-5 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-gold-500/30 touch-manipulation relative overflow-hidden text-sm sm:text-lg"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Search className="h-4 w-4 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore Collection</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <a
                href="https://wa.me/2348038507754"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-burgundy-900 active:bg-gray-100 font-bold py-2.5 sm:py-5 px-5 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation relative overflow-hidden text-sm sm:text-lg shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 group-hover:bounce transition-transform duration-300" />
                  <span>Chat with Us</span>
                </span>
              </a>
            </div>

            {/* Trust Indicators - Ultra compact mobile */}
            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-8 text-white/90 text-xs sm:text-base animate-slideUp delay-700">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="font-medium drop-shadow-md">Fast</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse delay-300 shadow-lg"></div>
                <span className="font-medium drop-shadow-md">Authentic</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse delay-500 shadow-lg"></div>
                <span className="font-medium drop-shadow-md">24/7</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase - Ultra compact mobile */}
          <div className="flex flex-col justify-center lg:justify-end order-1 lg:order-2 animate-slideRight max-w-full items-center">
            {/* Main heading with better contrast - Above images */}
            <div className="text-center mb-4">
              <h1 className="text-xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 font-playfair leading-tight animate-slideUp delay-200 drop-shadow-2xl">
                Discover the Art of
                <span className="block text-gold-300 animate-shimmer drop-shadow-lg">Fine Fragrances</span>
              </h1>
            </div>
            
            <div className="relative group max-w-full">
              {/* Main Product Image - Properly sized for mobile */}
              <div className="relative w-56 h-48 sm:w-80 sm:h-96 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700 mx-auto">
                <img
                  src={featuredImages[currentImageIndex]}
                  alt="Featured Perfume"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    console.log('Image failed to load:', featuredImages[currentImageIndex]);
                    // Fallback to a placeholder or first external image
                    e.currentTarget.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', featuredImages[currentImageIndex])}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/60 via-transparent to-gold-400/20"></div>
                
                {/* Product Info Overlay - Hidden on very small mobile */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6 text-white hidden sm:block">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-2 sm:p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-bold text-xs sm:text-lg mb-1">Featured Collection</h3>
                    <p className="text-xs text-gold-200">Premium Blends</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1 h-1 sm:w-2 sm:h-2 bg-gold-400 rounded-full"></div>
                        ))}
                      </div>
                      <span className="text-xs text-cream-200">5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Product Cards - Proportionally adjusted */}
              <div className="absolute -top-1 -left-1 sm:-top-4 sm:-left-4 w-12 h-10 sm:w-20 sm:h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-float"></div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-4 sm:-right-4 w-10 h-8 sm:w-16 sm:h-20 bg-gold-400/20 backdrop-blur-md rounded-2xl border border-gold-300/30 animate-float delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gold-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-cream-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-burgundy-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gold-300/20 rounded-full blur-lg animate-pulse delay-700"></div>
    </section>
  );
};

export default Hero;