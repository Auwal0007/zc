# Zubees Collectibles - Perfume E-commerce Store

## Project Overview

This is a modern perfume e-commerce website that has been successfully migrated from Bolt to Replit's fullstack architecture. The application provides a comprehensive platform for selling perfumes with features including product management, search, filtering, and WhatsApp integration.

## Technology Stack

### Backend
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage with product seeding
- **API**: RESTful endpoints with Zod validation
- **Architecture**: Clean separation between routes, storage, and business logic

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React

### Development
- **Build Tool**: Vite
- **Language**: TypeScript
- **Database Schema**: Drizzle ORM with PostgreSQL schema (using in-memory storage)

## Project Architecture

### Backend Structure
```
server/
├── index.ts          # Express server setup
├── routes.ts         # API routes for products
├── storage.ts        # In-memory storage implementation
└── vite.ts           # Vite development server setup
```

### Frontend Structure
```
client/src/
├── components/       # Reusable UI components
├── pages/           # Route-specific page components
├── lib/             # Query client and utilities
├── App.tsx          # Main application with routing
└── main.tsx         # Application entry point
```

### Shared Resources
```
shared/
└── schema.ts        # Database schema and type definitions
```

## Key Features

1. **Product Management**
   - Full CRUD operations via admin panel
   - Product categories: Arabian, English, Oil, Luxury
   - Featured product highlighting
   - Image upload and validation

2. **User Experience**
   - Responsive design for all devices
   - Search functionality across products
   - Category-based filtering
   - Product detail pages
   - WhatsApp integration for orders

3. **Technical Features**
   - Server-side API with validation
   - Client-side routing with wouter
   - Optimistic updates with React Query
   - Type-safe database operations
   - Error handling and loading states

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product

## Migration Details

### Date: January 5, 2025

**Successfully migrated from Bolt to Replit with the following improvements:**

1. **Backend Architecture**
   - Implemented proper Express.js server with TypeScript
   - Created RESTful API with comprehensive validation
   - Established clean storage interface pattern
   - Added proper error handling and logging

2. **Frontend Modernization**
   - Migrated to React Query for data fetching
   - Implemented wouter for client-side routing
   - Created page-based component structure
   - Added proper TypeScript types throughout

3. **Data Management**
   - Defined database schema with Drizzle ORM
   - Implemented type-safe CRUD operations
   - Added data validation with Zod schemas
   - Seeded initial product data

4. **Security & Best Practices**
   - Enforced client/server separation
   - Added input validation on all endpoints
   - Implemented proper error responses
   - Used TypeScript for type safety

## User Preferences

*To be updated as user provides feedback and preferences*

## Recent Changes

- **January 5, 2025**: Complete migration from Bolt to Replit completed
  - Backend API implementation
  - Frontend routing system  
  - Data management layer
  - Component architecture updates
  - Type safety improvements

- **January 5, 2025**: Enhanced with comprehensive e-commerce features
  - Advanced shopping cart system with localStorage persistence
  - Enhanced search functionality with live results
  - Category showcase component for improved navigation
  - Admin access panel for product management
  - Content management system hooks and utilities
  - Improved product cards with add-to-cart functionality
  - Mobile-responsive cart and search features

## Development Notes

- The application uses in-memory storage for development
- All products are seeded automatically on server start
- The admin panel provides full product management capabilities
- WhatsApp integration uses hardcoded phone number
- Responsive design supports mobile, tablet, and desktop views