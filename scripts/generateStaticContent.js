import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StaticContentGenerator {
  constructor() {
    this.contentDir = path.join(__dirname, '../src/content');
    this.outputDir = path.join(__dirname, '../src/data');
  }

  async generateProducts() {
    const productsDir = path.join(this.contentDir, 'products');
    const products = [];

    if (!fs.existsSync(productsDir)) {
      console.log('📁 Products directory not found, creating sample data...');
      return this.createSampleProducts();
    }

    const files = fs.readdirSync(productsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📄 Processing ${markdownFiles.length} product files...`);
    
    for (const file of markdownFiles) {
      try {
        const filePath = path.join(productsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Validate required fields
        if (!data.name || !data.id || !data.price || !data.category) {
          console.warn(`⚠️  Skipping ${file}: Missing required fields`);
          continue;
        }
        
        // Process and normalize product data to match schema
        const product = {
          id: parseInt(data.id) || Math.floor(Math.random() * 10000),
          name: String(data.name || ''),
          price: String(data.price || '0'),
          category: String(data.category || ''),
          description: String(data.description || ''),
          image: String(data.image || ''),
          featured: Boolean(data.featured),
          newArrival: Boolean(data.newArrival)
        };
        
        // Validate the processed product
        if (product.name && product.price && product.category && product.image) {
          products.push(product);
          console.log(`✅ Processed: ${product.name}`);
        } else {
          console.warn(`⚠️  Skipping ${file}: Invalid product data after processing`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }

    return products.length > 0 ? products : this.createSampleProducts();
  }

  async generateCategories() {
    const categoriesDir = path.join(this.contentDir, 'categories');
    const categories = [];

    if (!fs.existsSync(categoriesDir)) {
      console.log('📂 Categories directory not found, creating sample data...');
      return this.createSampleCategories();
    }

    const files = fs.readdirSync(categoriesDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📂 Processing ${markdownFiles.length} category files...`);
    
    for (const file of markdownFiles) {
      try {
        const filePath = path.join(categoriesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        if (data.name && data.id) {
          categories.push({
            id: String(data.id || path.basename(file, '.md')),
            name: String(data.name || ''),
            description: String(data.description || ''),
            image: String(data.image || ''),
            featured: Boolean(data.featured),
            sortOrder: Number(data.sortOrder || 0)
          });
        }
      } catch (error) {
        console.error(`❌ Error processing category ${file}:`, error.message);
      }
    }

    // Sort categories by sortOrder
    return categories.length > 0 ? 
      categories.sort((a, b) => a.sortOrder - b.sortOrder) : 
      this.createSampleCategories();
  }

  async generateSiteSettings() {
    const settingsFile = path.join(this.contentDir, 'settings/general.md');
    
    if (!fs.existsSync(settingsFile)) {
      console.log('⚙️ Settings file not found, creating default settings...');
      return this.createDefaultSettings();
    }

    try {
      const fileContent = fs.readFileSync(settingsFile, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        title: String(data.title || 'Zubees Collectibles'),
        description: String(data.description || 'Premium perfumes and fragrances collection'),
        whatsapp: String(data.whatsapp || '+2348038507754'),
        email: String(data.email || 'info@zubeescollectibles.com'),
        address: String(data.address || 'Lagos, Nigeria'),
        businessHours: String(data.businessHours || ''),
        currency: String(data.currency || '₦'),
        social: {
          facebook: String(data.social?.facebook || ''),
          instagram: String(data.social?.instagram || ''),
          twitter: String(data.social?.twitter || ''),
          whatsapp: String(data.social?.whatsapp || '')
        },
        seo: {
          keywords: String(data.seo?.keywords || ''),
          googleAnalytics: String(data.seo?.googleAnalytics || ''),
          metaImage: String(data.seo?.metaImage || '')
        }
      };
    } catch (error) {
      console.error('❌ Error processing settings:', error.message);
      return this.createDefaultSettings();
    }
  }

  createSampleProducts() {
    console.log('📦 Creating sample products...');
    return [
      {
        id: 1,
        name: 'Royal Oud Collection',
        price: '25000',
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'arabian',
        description: 'Premium Arabian oud perfume with rich, woody notes and exotic spices.',
        featured: true,
        newArrival: false
      },
      {
        id: 2,
        name: 'English Rose Garden',
        price: '18000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'english',
        description: 'Elegant English perfume with fresh rose petals and bergamot.',
        featured: true,
        newArrival: true
      }
    ];
  }

  createSampleCategories() {
    return [
      {
        id: 'arabian',
        name: 'Arabian Perfumes',
        description: 'Rich, exotic fragrances with traditional Middle Eastern notes',
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        sortOrder: 1
      },
      {
        id: 'english',
        name: 'English Perfumes',
        description: 'Classic floral and fresh scents with European elegance',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        sortOrder: 2
      },
      {
        id: 'oil',
        name: 'Oil Perfumes',
        description: 'Pure, alcohol-free oil-based fragrances for lasting wear',
        image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        sortOrder: 3
      },
      {
        id: 'luxury',
        name: 'Luxury Collection',
        description: 'Premium fragrances for the most discerning tastes',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        sortOrder: 4
      }
    ];
  }

  createDefaultSettings() {
    return {
      title: 'Zubees Collectibles',
      description: 'Premium perfumes and fragrances collection featuring Arabian, English, Oil, and Luxury perfumes.',
      whatsapp: '+2348038507754',
      email: 'info@zubeescollectibles.com',
      address: 'Lagos, Nigeria',
      businessHours: 'Mon-Sat 9AM-6PM',
      currency: '₦',
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        whatsapp: '+2348038507754'
      },
      seo: {
        keywords: 'perfumes, fragrances, Arabian perfumes, English perfumes, luxury perfumes',
        googleAnalytics: '',
        metaImage: ''
      }
    };
  }

  async generate() {
    console.log('🔄 Generating static content from CMS...');

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    try {
      const products = await this.generateProducts();
      const categories = await this.generateCategories();
      const settings = await this.generateSiteSettings();

      // Write static JSON files with proper structure
      const productsData = {
        products,
        lastGenerated: new Date().toISOString(),
        count: products.length
      };

      fs.writeFileSync(
        path.join(this.outputDir, 'staticProducts.json'),
        JSON.stringify(productsData, null, 2)
      );

      fs.writeFileSync(
        path.join(this.outputDir, 'staticCategories.json'),
        JSON.stringify(categories, null, 2)
      );

      fs.writeFileSync(
        path.join(this.outputDir, 'staticSettings.json'),
        JSON.stringify(settings, null, 2)
      );

      console.log('✅ Static content generated successfully!');
      console.log(`📦 Generated ${products.length} products`);
      console.log(`📂 Generated ${categories.length} categories`);
      console.log('⚙️ Generated site settings');
      console.log(`💾 Output saved to: ${this.outputDir}`);

    } catch (error) {
      console.error('❌ Error generating static content:', error);
      process.exit(1);
    }
  }
}

// Run the generator
const generator = new StaticContentGenerator();
generator.generate();