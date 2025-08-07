@@ .. @@
 import Hero from '../components/Hero';
 import ProductGrid from '../components/ProductGrid';
 import CategoryShowcase from '../components/CategoryShowcase';
+import SEOHead from '../components/SEOHead';
 import { useQuery } from '@tanstack/react-query';
@@ .. @@
   return (
     <>
+      <SEOHead 
   )
+        title="Premium Perfumes & Fragrances"
+        description="Discover our exquisite collection of Arabian, English, Oil, and Luxury perfumes. Premium fragrances for every occasion."
+      />
       <Hero />
       <CategoryShowcase />