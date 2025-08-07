import { useEffect } from 'react';
import { useLocation } from 'wouter';

const ScrollToTop: React.FC = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top immediately when location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
