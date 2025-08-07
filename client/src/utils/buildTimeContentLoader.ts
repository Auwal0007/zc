// Build-time content processing utilities
export interface ContentConfig {
  siteName: string;
  description: string;
  categories: CategoryConfig[];
  branding: BrandingConfig;
}

export interface CategoryConfig {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  favicon?: string;
}

// Default configuration for the perfume store
export const defaultConfig: ContentConfig = {
  siteName: "Zubees Collectibles",
  description: "Premium perfumes and fragrances collection featuring Arabian, English, Oil, and Luxury perfumes.",
  categories: [
    {
      id: "arabian",
      name: "Arabian Perfumes",
      description: "Authentic Arabian fragrances with rich, exotic scents"
    },
    {
      id: "english",
      name: "English Perfumes", 
      description: "Classic English fragrances with floral and fresh notes"
    },
    {
      id: "oil",
      name: "Oil Perfumes",
      description: "Pure oil-based perfumes for long-lasting fragrance"
    },
    {
      id: "luxury",
      name: "Luxury Collection",
      description: "Premium luxury fragrances for special occasions"
    }
  ],
  branding: {
    primaryColor: "#7c2d12", // burgundy
    secondaryColor: "#d97706", // gold
  }
};

export class BuildTimeContentLoader {
  static async generateStaticContent(): Promise<ContentConfig> {
    // In a real implementation, this would read from CMS or config files
    return defaultConfig;
  }

  static async processCategories(categories: CategoryConfig[]): Promise<CategoryConfig[]> {
    return categories.map(category => ({
      ...category,
      description: category.description || `Explore our ${category.name.toLowerCase()} collection`
    }));
  }

  static generateSEOMetadata(config: ContentConfig) {
    return {
      title: config.siteName,
      description: config.description,
      keywords: config.categories.map(cat => cat.name).join(', '),
      author: config.siteName,
      viewport: 'width=device-width, initial-scale=1.0',
    };
  }
}

export default BuildTimeContentLoader;