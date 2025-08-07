import React, { useState } from 'react';
import { Share2, X } from 'lucide-react';

// Social Media Icons (same as in header/footer)
const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.637-2.074-4.637-4.637S9.437 7.35 12 7.35s4.637 2.074 4.637 4.637S14.563 16.624 12 16.624zm4.875-8.362c-.598 0-1.083-.485-1.083-1.083s.485-1.083 1.083-1.083 1.083.485 1.083 1.083-.485 1.083-1.083 1.083z"/>
    <path d="M12 9.435c-1.422 0-2.565 1.143-2.565 2.565S10.578 14.565 12 14.565s2.565-1.143 2.565-2.565S13.422 9.435 12 9.435z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const FloatingSocial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50 md:hidden">
      {/* Social Icons - Only show when open */}
      {isOpen && (
        <div className="flex flex-col space-y-2 mb-3 animate-in slide-in-from-bottom-2 duration-300">
          <a
            href="https://www.facebook.com/zubeescollectibles"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 touch-manipulation transform hover:scale-105"
            aria-label="Follow us on Facebook"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/zubeescollectibles"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.twitter.com/zubeescollect"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all duration-200 touch-manipulation transform hover:scale-105"
            aria-label="Follow us on Twitter"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@zubeescollectibles"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 touch-manipulation transform hover:scale-105"
            aria-label="Follow us on TikTok"
          >
            <TikTokIcon className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 touch-manipulation transform hover:scale-105 ${
          isOpen 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-burgundy-600 text-white hover:bg-burgundy-700'
        }`}
        aria-label={isOpen ? 'Close social media' : 'Open social media'}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default FloatingSocial;
