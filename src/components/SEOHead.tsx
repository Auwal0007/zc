import React from 'react';
import { useCMSContent } from '../hooks/useCMSContent';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  image = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = window.location.href 
}) => {
  const { siteSettings } = useCMSContent();
  
  const siteTitle = siteSettings?.title || 'Zubees Collectibles';
  const siteDescription = siteSettings?.description || 'Premium perfumes and fragrances collection';
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;

  React.useEffect(() => {
    // Update document title
    document.title = pageTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('og:title', pageTitle);
    updateMetaTag('og:description', pageDescription);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', 'website');

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', pageTitle);
    updateTwitterTag('twitter:description', pageDescription);
    updateTwitterTag('twitter:image', image);

  }, [pageTitle, pageDescription, image, url]);

  return null; // This component doesn't render anything
};

export default SEOHead;