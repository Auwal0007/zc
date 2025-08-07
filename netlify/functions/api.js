// netlify/functions/api.ts
import serverless from "serverless-http";

// server/app.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  products;
  currentUserId;
  currentProductId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.seedProducts();
  }
  seedProducts() {
    const initialProducts = [
      {
        name: "Royal Oud Collection",
        price: "25000",
        image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "arabian",
        description: "Premium Arabian oud perfume with rich, woody notes and exotic spices. Long-lasting fragrance perfect for special occasions.",
        featured: true
      },
      {
        name: "English Rose Garden",
        price: "18000",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "english",
        description: "Elegant English perfume with fresh rose petals, bergamot, and subtle vanilla undertones. Perfect for daily wear.",
        featured: true
      },
      {
        name: "Amber Oil Essence",
        price: "15000",
        image: "https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "oil",
        description: "Pure amber oil perfume with warm, sensual notes. Alcohol-free formula that lasts all day.",
        featured: false
      },
      {
        name: "Luxury Platinum",
        price: "35000",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "luxury",
        description: "Exclusive luxury perfume with rare ingredients. A sophisticated blend of citrus, florals, and musk.",
        featured: true
      },
      {
        name: "Musk Al-Sharq",
        price: "22000",
        image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "arabian",
        description: "Traditional Arabian musk with deep, intoxicating notes. A timeless fragrance that captures the essence of the Middle East.",
        featured: false
      },
      {
        name: "Lavender Dreams",
        price: "16000",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "english",
        description: "Calming English lavender perfume with chamomile and soft woods. Perfect for relaxation and evening wear.",
        featured: false
      },
      {
        name: "Sandalwood Oil",
        price: "20000",
        image: "https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "oil",
        description: "Premium sandalwood oil with creamy, woody fragrance. Natural and long-lasting with therapeutic properties.",
        featured: false
      },
      {
        name: "Diamond Elite",
        price: "45000",
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "luxury",
        description: "Ultra-premium luxury perfume with rare French ingredients. Limited edition collection for the discerning connoisseur.",
        featured: true
      }
    ];
    initialProducts.forEach((product) => {
      const id = this.currentProductId++;
      const productWithId = { ...product, featured: product.featured ?? false, id };
      this.products.set(id, productWithId);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter(
      (product) => product.featured === true
    );
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = { ...insertProduct, featured: insertProduct.featured ?? false, id };
    this.products.set(id, product);
    return product;
  }
  async updateProduct(id, productUpdate) {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return void 0;
    }
    const updatedProduct = { ...existingProduct, ...productUpdate };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  async deleteProduct(id) {
    return this.products.delete(id);
  }
  async searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery) || product.category.toLowerCase().includes(lowercaseQuery)
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  featured: boolean("featured").default(false)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products2 = await storage.getProductsByCategory(category);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  app2.get("/api/products/featured", async (req, res) => {
    try {
      const products2 = await storage.getFeaturedProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  app2.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products2 = await storage.searchProducts(q);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  app2.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets")
    }
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    outDir: path.resolve(process.cwd(), "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// server/app.ts
async function createApp() {
  const app2 = express2();
  app2.use(express2.json());
  app2.use(express2.urlencoded({ extended: false }));
  app2.use((req, res, next) => {
    const start = Date.now();
    const path2 = req.path;
    let capturedJsonResponse = void 0;
    const originalResJson = res.json;
    res.json = function(bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path2.startsWith("/api")) {
        let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "\u2026";
        }
        log(logLine);
      }
    });
    next();
  });
  await registerRoutes(app2);
  app2.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  return app2;
}

// netlify/functions/api.ts
var app;
var getApp = async () => {
  if (!app) {
    app = await createApp();
  }
  return app;
};
var appPromise = getApp();
var handler = async (event, context) => {
  const app2 = await appPromise;
  const serverlessHandler = serverless(app2, {
    binary: false
  });
  return serverlessHandler(event, context);
};
export {
  handler
};
