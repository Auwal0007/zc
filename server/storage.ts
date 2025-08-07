import { users, products, type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { readFileSync } from 'fs';
import { join } from 'path';

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product CRUD operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private currentUserId: number;
  private currentProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.loadCMSProducts();
  }

  private loadCMSProducts() {
    try {
      // Load products from CMS-generated static content
      const staticProductsPath = join(process.cwd(), 'client/src/data/staticProducts.json');
      const staticProducts = JSON.parse(readFileSync(staticProductsPath, 'utf-8'));
      
      if (staticProducts.products && Array.isArray(staticProducts.products)) {
        staticProducts.products.forEach((product: any) => {
          const id = typeof product.id === 'string' ? parseInt(product.id) || Math.floor(Math.random() * 10000) : product.id;
          const productWithId: Product = {
            id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            featured: product.featured ?? false,
            newArrival: product.newArrival ?? false
          };
          this.products.set(id, productWithId);
          
          // Update currentProductId to avoid conflicts
          if (id >= this.currentProductId) {
            this.currentProductId = id + 1;
          }
        });
        
        console.log(`✅ Loaded ${staticProducts.products.length} products from CMS`);
      }
    } catch (error) {
      console.warn('⚠️  Could not load CMS products, falling back to hardcoded products:', error);
      this.seedProducts();
    }
  }

  private seedProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: 'Royal Oud Collection',
        price: '25000',
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'arabian',
        description: 'Premium Arabian oud perfume with rich, woody notes and exotic spices. Long-lasting fragrance perfect for special occasions.',
        featured: true,
        newArrival: true
      },
      {
        name: 'English Rose Garden',
        price: '18000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'english',
        description: 'Elegant English perfume with fresh rose petals, bergamot, and subtle vanilla undertones. Perfect for daily wear.',
        featured: true,
        newArrival: false
      },
      {
        name: 'Amber Oil Essence',
        price: '15000',
        image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'oil',
        description: 'Pure amber oil perfume with warm, sensual notes. Alcohol-free formula that lasts all day.',
        featured: false,
        newArrival: true
      },
      {
        name: 'Luxury Platinum',
        price: '35000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'luxury',
        description: 'Exclusive luxury perfume with rare ingredients. A sophisticated blend of citrus, florals, and musk.',
        featured: true,
        newArrival: false
      },
      {
        name: 'Musk Al-Sharq',
        price: '22000',
        image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'arabian',
        description: 'Traditional Arabian musk with deep, intoxicating notes. A timeless fragrance that captures the essence of the Middle East.',
        featured: false,
        newArrival: true
      },
      {
        name: 'Lavender Dreams',
        price: '16000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'english',
        description: 'Calming English lavender perfume with chamomile and soft woods. Perfect for relaxation and evening wear.',
        featured: false,
        newArrival: false
      },
      {
        name: 'Sandalwood Oil',
        price: '20000',
        image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'oil',
        description: 'Premium sandalwood oil with creamy, woody fragrance. Natural and long-lasting with therapeutic properties.',
        featured: false,
        newArrival: false
      },
      {
        name: 'Diamond Elite',
        price: '45000',
        image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'luxury',
        description: 'Ultra-premium luxury perfume with rare French ingredients. Limited edition collection for the discerning connoisseur.',
        featured: true,
        newArrival: true
      }
    ];

    initialProducts.forEach(product => {
      const id = this.currentProductId++;
      const productWithId: Product = { 
        ...product, 
        featured: product.featured ?? false, 
        newArrival: product.newArrival ?? false,
        id 
      };
      this.products.set(id, productWithId);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured === true,
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.newArrival === true,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      featured: insertProduct.featured ?? false, 
      newArrival: insertProduct.newArrival ?? false,
      id 
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return undefined;
    }
    
    const updatedProduct: Product = { ...existingProduct, ...productUpdate };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery),
    );
  }
}

export const storage = new MemStorage();
