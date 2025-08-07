import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import SearchBar from './SearchBar';

// Social Media Icons (compact versions for header)
const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.637-2.074-4.637-4.637S9.437 7.35 12 7.35s4.637 2.074 4.637 4.637S14.563 16.624 12 16.624zm4.875-8.362c-.598 0-1.083-.485-1.083-1.083s.485-1.083 1.083-1.083 1.083.485 1.083 1.083-.485 1.083-1.083 1.083z"/>
    <path d="M12 9.435c-1.422 0-2.565 1.143-2.565 2.565S10.578 14.565 12 14.565s2.565-1.143 2.565-2.565S13.422 9.435 12 9.435z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

interface Category {
  id: string;
  name: string;
  value: string;
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories: Category[] = [
  { id: 'all', name: 'All Products', value: 'all' },
  { id: 'new', name: 'New Arrivals', value: 'new-arrivals' },
  { id: 'arabian', name: 'Arabian Perfumes', value: 'arabian' },
  { id: 'english', name: 'English Perfumes', value: 'english' },
  { id: 'oil', name: 'Oil Perfumes', value: 'oil' },
  { id: 'luxury', name: 'Luxury Collection', value: 'luxury' }
];

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gold-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-burgundy-600 mr-1 sm:mr-2" />
            <h1 className="text-lg sm:text-2xl font-bold text-burgundy-800 font-playfair">
              Zubees Collectibles
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.value === 'all' ? '/' : `/category/${category.value}`}
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  (category.value === 'all' && location === '/') || 
                  (location === `/category/${category.value}`)
                    ? 'text-burgundy-600 bg-gold-100/80 shadow-sm'
                    : 'text-gray-700 hover:text-burgundy-600 hover:bg-cream-50'
                }`}
                data-testid={`link-category-${category.value}`}
              >
                <span className="relative z-10">{category.name}</span>
                {/* Modern underline effect */}
                <div className={`absolute bottom-0 left-1/2 h-0.5 bg-burgundy-500 transition-all duration-300 ${
                  (category.value === 'all' && location === '/') || 
                  (location === `/category/${category.value}`)
                    ? 'w-3/4 -translate-x-1/2'
                    : 'w-0 -translate-x-1/2 group-hover:w-3/4'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Search Bar & Social Media */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar placeholder="Search perfumes..." className="w-64" />
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              <a
                href="https://www.facebook.com/zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.twitter.com/zubeescollect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.tiktok.com/@zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-burgundy-600 hover:bg-cream-100 transition-colors duration-200 touch-manipulation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-3 sm:py-4 space-y-3 sm:space-y-4 shadow-lg">
            {/* Mobile Search */}
            <div className="relative px-3 sm:px-4">
              <div className="absolute inset-y-0 left-6 sm:left-7 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-burgundy-500 focus:border-transparent text-sm sm:text-base touch-manipulation"
                placeholder="Search perfumes..."
                autoComplete="off"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="px-3 sm:px-4 space-y-1 sm:space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.value === 'all' ? '/' : `/category/${category.value}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-manipulation ${
                    (category.value === 'all' && location === '/') || 
                    (location === `/category/${category.value}`)
                      ? 'text-burgundy-600 bg-gold-100'
                      : 'text-gray-700 hover:text-burgundy-600 hover:bg-cream-100 active:bg-cream-200'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Social Media */}
            <div className="px-3 sm:px-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Follow Us</p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/zubeescollectibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Follow us on Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/zubeescollectibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.twitter.com/zubeescollect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Follow us on Twitter"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@zubeescollectibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;