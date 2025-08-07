# Netlify CMS Integration Guide for E-commerce

This document outlines all the files responsible for Netlify CMS integration in the MFS project and explains how they work together to create a complete content management system for an e-commerce site.

## Core Netlify CMS Files

### 1. **Admin Interface Files**

#### `public/admin/index.html`
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maiblouse Fashion - Admin</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  
  <script>
    // Initialize Netlify Identity - simplified version
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            // Simple redirect without reload loop
            if (window.location.pathname !== "/admin/") {
              document.location.href = "/admin/";
            }
          });
        }
      });
      
      // Handle logout
      window.netlifyIdentity.on("logout", () => {
        document.location.href = "/";
      });
    }
  </script>
</body>
</html>
```
**Purpose:** Creates the admin interface accessible at `/admin/`. Loads Netlify CMS and handles authentication.

#### `public/admin/config.yml`
```yaml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'Create {{collection}} "{{slug}}"'
    update: 'Update {{collection}} "{{slug}}"'
    delete: 'Delete {{collection}} "{{slug}}"'
    uploadMedia: 'Upload "{{path}}"'
    deleteMedia: 'Delete "{{path}}"'

# Media configuration - simplified for better compatibility
media_folder: "public/images/products"
public_folder: "/images/products"

collections:
  - name: "products"
    label: "Products"
    folder: "src/content/products"
    create: true
    slug: "{{id}}"
    fields:
      - {label: "Product Name", name: "name", widget: "string", required: true}
      - {label: "Product ID", name: "id", widget: "string", required: true}
      - {label: "Price", name: "price", widget: "number", required: true}
      - {label: "Category", name: "category", widget: "select", options: ["men", "women", "children", "bedsheets", "curtains", "home"], required: true}
      - {label: "Description", name: "description", widget: "text", required: true}
      - {label: "Images", name: "images", widget: "list", field: {label: "Image", name: "image", widget: "image"}}
      - {label: "In Stock", name: "inStock", widget: "boolean", default: true}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Tags", name: "tags", widget: "list", field: {label: "Tag", name: "tag", widget: "string"}}
      - {label: "Variants", name: "variants", widget: "list", fields: [
          {label: "Size", name: "size", widget: "string"},
          {label: "Color", name: "color", widget: "string"},
          {label: "Price", name: "price", widget: "number"},
          {label: "Stock", name: "stock", widget: "number", default: 0}
        ]}
```
**Purpose:** Configures the CMS structure, defines content collections, field types, and file storage locations.

### 2. **Content Processing Files**

#### `src/utils/contentLoader.ts`
```typescript
import { Product, ProductVariant } from '../data/products';
import matter from 'gray-matter';
import yaml from 'js-yaml';

// Content loader utilities for Netlify CMS
export interface CMSProduct {
  name: string;
  id: string;
  price: number;
  category: 'men' | 'women' | 'children' | 'bedsheets' | 'curtains' | 'home';
  description: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  tags: string[];
  variants?: Array<{
    size: string;
    color: string;
    price: number;
    stock: number;
  }>;
}

// Function to load products from CMS content
export async function loadCMSProducts(): Promise<Product[]> {
  // Dynamically import all markdown files using Vite's import.meta.glob
  const productFiles = import.meta.glob('../content/products/*.md', { eager: true, query: '?raw', import: 'default' });
  const products: Product[] = [];

  for (const path in productFiles) {
    try {
      const raw = productFiles[path];
      const { data } = matter(raw as string);
      // Process and convert markdown frontmatter to Product objects
      products.push(convertCMSProduct(data as CMSProduct));
    } catch (err) {
      console.error('Error parsing product file:', path, err);
    }
  }

  return products;
}

// Convert CMS product data to internal Product format
function convertCMSProduct(cmsProduct: CMSProduct): Product {
  const variants: ProductVariant[] = cmsProduct.variants?.map(v => ({
    size: v.size,
    color: v.color,
    price: v.price,
    stock: v.stock
  })) || [];

  return {
    id: cmsProduct.id,
    name: cmsProduct.name,
    price: cmsProduct.price,
    category: cmsProduct.category,
    description: cmsProduct.description,
    images: cmsProduct.images || [],
    inStock: cmsProduct.inStock,
    featured: cmsProduct.featured,
    tags: cmsProduct.tags || [],
    variants: variants.length > 0 ? variants : undefined
  };
}
```
**Purpose:** Loads and processes markdown files created by CMS, converts them to usable Product objects.

#### `scripts/generateStaticContent.js`
```javascript
// Build script to generate static content from CMS
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateStaticContent() {
  console.log('🔄 Generating static content from CMS...');
  
  const products = [];
  const contentDir = path.join(__dirname, '../src/content/products');
  
  try {
    // Ensure content directory exists
    if (!fs.existsSync(contentDir)) {
      console.log('📁 Creating content directory...');
      fs.mkdirSync(contentDir, { recursive: true });
      return;
    }

    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📄 Processing ${markdownFiles.length} product files...`);
    
    for (const file of markdownFiles) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      // Process and normalize product data
      const product = {
        id: String(data.id),
        name: String(data.name),
        price: Number(data.price),
        category: String(data.category),
        description: String(data.description || ''),
        images: Array.isArray(data.images) ? data.images : [],
        inStock: Boolean(data.inStock !== false),
        featured: Boolean(data.featured),
        tags: Array.isArray(data.tags) ? data.tags : [],
        variants: Array.isArray(data.variants) ? data.variants.map(v => ({
          size: String(v.size || ''),
          color: String(v.color || ''),
          price: Number(v.price || data.price),
          stock: Number(v.stock || 0)
        })) : undefined
      };
      
      products.push(product);
    }
    
    await saveProductsData(products);
    console.log(`✅ Generated static content for ${products.length} products`);
    
  } catch (error) {
    console.error('❌ Error generating static content:', error);
    process.exit(1);
  }
}

async function saveProductsData(products) {
  const outputDir = path.join(__dirname, '../src/data');
  const outputFile = path.join(outputDir, 'staticProducts.json');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const data = {
    products,
    lastGenerated: new Date().toISOString(),
    count: products.length
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`💾 Saved ${products.length} products to ${outputFile}`);
}

// Run the script
generateStaticContent().catch(console.error);
```
**Purpose:** Build-time script that converts CMS markdown files to JSON for faster loading.

### 3. **Content Consumption Files**

#### `src/hooks/useCMSContent.ts`
```typescript
import { useState, useEffect } from 'react';
import { Product } from '../data/products';

// Import the static data generated at build time
let staticProductsData: { products: Product[]; lastGenerated: string; count: number } | null = null;

// Dynamically import static data with fallback
try {
  staticProductsData = await import('../data/staticProducts.json').then(module => module.default);
} catch (error) {
  console.warn('Static products data not found, will use fallback');
}

export function useCMSProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      
      if (staticProductsData?.products) {
        // Load from static JSON generated at build time
        const products = staticProductsData.products as Product[];
        setProducts(products);
        setError(null);
        console.log(`📦 Loaded ${products.length} products from static data`);
      } else {
        // Fallback: Load from content files directly (development mode)
        const { loadCMSProducts } = await import('../utils/contentLoader');
        const products = await loadCMSProducts();
        setProducts(products);
        setError(null);
        console.log(`📁 Loaded ${products.length} products from content files`);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { 
    products, 
    loading, 
    error, 
    refetch: fetchProducts,
    lastGenerated: staticProductsData?.lastGenerated
  };
}

// Hook for loading individual product
export function useCMSProduct(productId: string) {
  const { products, loading, error } = useCMSProducts();
  const product = products.find(p => p.id === productId);
  
  return {
    product,
    loading,
    error,
    notFound: !loading && !error && !product
  };
}
```
**Purpose:** React hook that provides CMS content to components throughout the application.

### 4. **Content Storage Structure**

#### Content Folders
- `src/content/products/` - Stores product markdown files
- `src/content/categories/` - Stores category configurations  
- `src/content/settings/` - Stores site settings

#### Example Product File: `src/content/products/001.md`
```markdown
---
name: High QUALITY Polish Lace for MEN Cotton Material
id: "001"
price: 59999
category: men
description: Home to Unique & Exotic Fabrics. We Deal on Turkish Lace, Dry Lace, Polish Lace and Hollandis. We also Deal on Bedsheets of all kinds, Curtains and lots more.
images:
  - /images/products/lat44.jpg
  - /images/products/latest-high-quality-polish-laces.jpeg
inStock: true
featured: true
tags:
  - polish lace
  - men
  - cotton
  - high quality
variants:
  - size: "2 yards"
    color: "White" 
    price: 59999
    stock: 10
  - size: "2 yards"
    color: "Blue"
    price: 59999
    stock: 5
---

High quality Polish lace material perfect for men's traditional wear. Made from premium cotton with intricate patterns.
```
**Purpose:** Individual product data files created/managed by CMS.

### 5. **Deployment Configuration**

#### `netlify.toml`
```toml
[build]
  publish = "dist"
  command = "npm ci && npm run generate-content && npm run build"

[build.environment]
  NODE_VERSION = "18"
  NODE_ENV = "production"
  NPM_CONFIG_PRODUCTION = "false"

# Trigger builds when content changes
[build.processing]
  skip_processing = false

# Force rebuild on content changes
[context.deploy-preview]
  command = "npm ci && npm run generate-content && npm run build"

[context.branch-deploy]
  command = "npm ci && npm run generate-content && npm run build"

# Headers for admin access
[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"

# Redirects for SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
**Purpose:** Configures Netlify to run content generation script during builds and handle routing.

#### `package.json` - Relevant Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "npm run generate-content",
    "build": "tsc && vite build",
    "generate-content": "node scripts/generateStaticContent.js",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
```
**Purpose:** Defines build scripts and CMS-related dependencies.

### 6. **Identity Integration**

#### Main HTML File: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maiblouse Fashion Store</title>
    
    <!-- Netlify Identity Widget -->
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    
    <script>
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
          if (!user) {
            window.netlifyIdentity.on("login", () => {
              if (!window.location.pathname.includes('/admin')) {
                document.location.href = "/admin/";
              }
            });
          }
        });
        
        // Handle logout
        window.netlifyIdentity.on("logout", () => {
          document.location.href = "/";
        });
      }
    </script>
  </body>
</html>
```
**Purpose:** Enables user authentication for CMS access.

## How It All Works Together

### 1. **Content Creation Flow**
1. Admin accesses `/admin/` → Netlify Identity authenticates user
2. CMS interface loads based on `config.yml` configuration
3. Admin creates/edits content using the CMS interface
4. Content is saved as markdown files in `src/content/products/`
5. Git Gateway commits changes to the repository
6. Netlify detects changes and triggers a new build

### 2. **Build Process**
1. `netlify.toml` specifies build command that includes content generation
2. `scripts/generateStaticContent.js` runs during build
3. Script processes all markdown files in `src/content/products/`
4. Static JSON file is created at `src/data/staticProducts.json`
5. React application builds with pre-processed content included

### 3. **Content Consumption**
1. `useCMSContent.ts` hook loads the static JSON data
2. Components like `CategoryPage.tsx` use the hook to get product data
3. Content displays immediately on the website without additional API calls

### 4. **Category Page Integration**
The `CategoryPage.tsx` demonstrates how CMS content is consumed:

```typescript
// filepath: c:\Users\Dell\mfs\src\pages\CategoryPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SortAsc, SortDesc, Calendar, ChevronDown, Grid, List } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/products';
import { useCMSProducts } from '../hooks/useCMSContent';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products, loading } = useCMSProducts(); // CMS integration point
  
  // ... filtering and sorting logic uses CMS products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products; // Products from CMS
    
    // Filter by category
    if (categoryId && categoryId !== 'all') {
      filtered = filtered.filter(product => product.category === categoryId);
    }
    
    // ... additional filtering logic
    
    return sorted;
  }, [categoryId, searchQuery, sortBy, priceRange, inStockOnly, products]);
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      {/* UI renders filtered CMS products */}
      <ProductGrid products={filteredAndSortedProducts} loading={loading} />
    </main>
  );
};
```

### 5. **Key Benefits**
- **Git-based**: All content stored in version control with full history
- **Build-time optimization**: Content processed once during build for fast loading
- **Type-safe**: TypeScript interfaces ensure data consistency
- **Offline editing**: CMS works without database dependency
- **Version control**: All content changes are tracked in Git
- **Preview support**: Content can be previewed before publishing
- **Media management**: Images are handled through the CMS interface

## Setup Instructions for New E-commerce Site

### 1. **Initial Setup**
```bash
# Install required dependencies
npm install gray-matter js-yaml netlify-cms-app

# Create directory structure
mkdir -p public/admin
mkdir -p src/content/products
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p scripts
```

### 2. **Copy Core Files**
1. Copy `public/admin/index.html` and `public/admin/config.yml`
2. Adapt `config.yml` to your product structure and categories
3. Copy `src/utils/contentLoader.ts` and modify for your data types
4. Copy `scripts/generateStaticContent.js` and customize paths
5. Copy `src/hooks/useCMSContent.ts` for React integration

### 3. **Configure Build Process**
1. Update `package.json` scripts section
2. Create or update `netlify.toml` with build commands
3. Add Netlify Identity script to your main HTML file

### 4. **Set Up Authentication**
1. Enable Netlify Identity in your Netlify dashboard
2. Configure Git Gateway in Netlify CMS settings
3. Add admin users through Netlify Identity

### 5. **Customize for Your Products**
1. Update the TypeScript interfaces in `contentLoader.ts`
2. Modify the CMS configuration fields in `config.yml`
3. Adjust the content processing logic in `generateStaticContent.js`
4. Update your React components to use the CMS hook

### 6. **Deploy and Test**
1. Deploy to Netlify
2. Access `/admin/` to test CMS functionality
3. Create test products through the interface
4. Verify content appears on your site after build

## File Structure Summary

```
your-ecommerce-site/
├── public/
│   └── admin/
│       ├── index.html          # CMS admin interface
│       └── config.yml          # CMS configuration
├── src/
│   ├── content/
│   │   └── products/           # Product markdown files
│   ├── data/
│   │   └── staticProducts.json # Generated static data
│   ├── hooks/
│   │   └── useCMSContent.ts    # React hook for CMS data
│   ├── utils/
│   │   └── contentLoader.ts    # Content processing utilities
│   └── pages/
│       └── CategoryPage.tsx    # Example consumption
├── scripts/
│   └── generateStaticContent.js # Build-time content processing
├── netlify.toml                # Netlify deployment config
└── package.json               # Dependencies and scripts
```

This system provides a robust, scalable solution for managing e-commerce content through Netlify CMS while maintaining excellent performance through static generation.