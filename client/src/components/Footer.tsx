import React from 'react';
import { MessageCircle, ShoppingBag, Heart } from 'lucide-react';

// Social Media Icons (inline SVGs for better performance)
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.637-2.074-4.637-4.637S9.437 7.35 12 7.35s4.637 2.074 4.637 4.637S14.563 16.624 12 16.624zm4.875-8.362c-.598 0-1.083-.485-1.083-1.083s.485-1.083 1.083-1.083 1.083.485 1.083 1.083-.485 1.083-1.083 1.083z"/>
    <path d="M12 9.435c-1.422 0-2.565 1.143-2.565 2.565S10.578 14.565 12 14.565s2.565-1.143 2.565-2.565S13.422 9.435 12 9.435z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-burgundy-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <ShoppingBag className="h-8 w-8 text-gold-400 mr-3" />
              <h3 className="text-2xl font-bold font-playfair">Zubees Collectibles</h3>
            </div>
            <p className="text-cream-200 mb-6 max-w-md leading-relaxed">
              Your premier destination for authentic Arabian perfumes, English fragrances, 
              and luxury oil collections. Each bottle tells a story of tradition and elegance.
            </p>
            <a
              href="https://wa.me/2348038507754"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat with Us</span>
            </a>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gold-300">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-cream-200 hover:text-gold-300 transition-colors duration-200">Arabian Perfumes</a></li>
              <li><a href="#" className="text-cream-200 hover:text-gold-300 transition-colors duration-200">English Perfumes</a></li>
              <li><a href="#" className="text-cream-200 hover:text-gold-300 transition-colors duration-200">Oil Perfumes</a></li>
              <li><a href="#" className="text-cream-200 hover:text-gold-300 transition-colors duration-200">Luxury Collection</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gold-300">Contact</h4>
            <ul className="space-y-3">
              <li className="text-cream-200">WhatsApp: +234 803 850 7754</li>
              <li className="text-cream-200">Available: 9AM - 9PM WAT</li>
              <li className="text-cream-200">Response time: Within 1 hour</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gold-300">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-pink-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.twitter.com/zubeescollect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.tiktok.com/@zubeescollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-white transition-colors duration-200 transform hover:scale-110"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
            <p className="text-cream-300 text-sm">
              Stay updated with our latest fragrances and exclusive offers!
            </p>
          </div>
        </div>

        <div className="border-t border-burgundy-700 mt-12 pt-8 text-center">
          <p className="text-cream-200 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>for fragrance lovers everywhere</span>
          </p>
          <p className="text-cream-300 mt-2">
            © 2025 Zubees Collectibles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;