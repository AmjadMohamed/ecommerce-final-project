# FreshCart - E-commerce Grocery Store

## 🛒 Project Overview

**FreshCart** is a modern, full-stack e-commerce web application built as the final project for the Route Frontend Diploma. This comprehensive grocery shopping platform provides users with a seamless online shopping experience, featuring product browsing, cart management, wishlist functionality, user authentication, and secure payment processing.

## 🚀 Live Demo

The application is deployed on **Vercel** and is accessible at: [Your Vercel Deployment URL]

## 📹 Video Demonstration

Watch the complete walkthrough of FreshCart features and functionality:

[![FreshCart Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

*Click the image above to watch the full demonstration video showcasing all features of the FreshCart e-commerce platform.*

## 🛠️ Technologies & Libraries

### Core Framework & Runtime
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - Frontend library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime environment

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material Tailwind React 2.1.10** - Material Design components
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-label`
  - `@radix-ui/react-slot`
- **Lucide React 0.544.0** - Icon library
- **FontAwesome 7.0.1** - Icon toolkit
- **Flowbite 3.1.2** - Tailwind CSS component library

### State Management & Context
- **React Context API** - Global state management
- **Custom Context Providers**:
  - CartContext - Shopping cart state
  - WishlistContext - User wishlist management
  - CategoryContext - Product categorization

### Authentication & Security
- **NextAuth.js 4.24.11** - Authentication framework
- **JWT Decode 4.0.0** - Token handling
- **Custom middleware** - Route protection

### Form Handling & Validation
- **React Hook Form 7.63.0** - Form state management
- **Zod 4.1.11** - Schema validation
- **Hookform Resolvers 5.2.2** - Form validation integration

### HTTP Client & API
- **Axios 1.12.2** - HTTP client for API requests
- **Custom API layer** - Organized API actions

### UI Components & Interactions
- **Swiper 12.0.1** - Touch slider component
- **Sonner 2.0.7** - Toast notifications
- **Class Variance Authority 0.7.1** - Component variant management
- **CLSX 2.1.1** - Conditional class names
- **Tailwind Merge 3.3.1** - Tailwind class merging

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS 4** - CSS processing
- **Turbopack** - Fast bundler (development)

## 🏗️ Project Architecture

### Directory Structure
```
src/
├── apis/                    # API integration layer
│   ├── AuthActions/         # Authentication endpoints
│   ├── BrandsActions/       # Brand management
│   ├── CartActions/         # Shopping cart operations
│   ├── PaymentActions/      # Payment processing
│   └── WishlistActions/     # Wishlist management
├── app/                     # Next.js App Router pages
│   ├── _components/         # Reusable UI components
│   ├── api/                 # API routes
│   └── [pages]/            # Application pages
├── components/              # Shared UI components
├── context/                 # React Context providers
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── schema/                  # Zod validation schemas
├── types/                   # TypeScript type definitions
└── utilities/               # Helper functions
```

### Key Features

#### 🛍️ Shopping Experience
- **Product Catalog** - Browse products by categories and brands
- **Product Search** - Find products quickly
- **Product Details** - Comprehensive product information
- **Image Gallery** - High-quality product images
- **Responsive Design** - Mobile-first approach

#### 🛒 Cart Management
- **Add to Cart** - Seamless product addition
- **Quantity Control** - Update item quantities
- **Remove Items** - Easy cart item removal
- **Real-time Updates** - Live cart state management
- **Price Calculation** - Automatic total calculation

#### ❤️ Wishlist Functionality
- **Save Products** - Add items to wishlist
- **Quick Toggle** - Easy add/remove from wishlist
- **Wishlist Page** - Dedicated wishlist management
- **Persistent Storage** - User-specific wishlist

#### 🔐 User Authentication
- **User Registration** - Account creation
- **Secure Login** - JWT-based authentication
- **Password Reset** - Email-based password recovery
- **Session Management** - Persistent user sessions
- **Protected Routes** - Authentication-based access control

#### 💳 Payment Processing
- **Multiple Payment Methods** - Cash and online payments
- **Order Management** - Complete order tracking
- **Order History** - User order records
- **Secure Transactions** - Safe payment processing

#### 🎨 User Interface
- **Modern Design** - Clean, professional appearance
- **Responsive Layout** - Works on all devices
- **Interactive Elements** - Smooth animations and transitions
- **Accessibility** - WCAG compliant components
- **Dark/Light Mode** - Theme support via Next Themes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ecommerce-final-project-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   API=https://ecommerce.routemisr.com
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📱 Pages & Features

### Public Pages
- **Home** - Featured products and categories
- **Product Details** - Individual product information
- **Categories** - Browse products by category
- **Brands** - Brand-specific product listings
- **Sign In/Sign Up** - User authentication
- **Password Reset** - Account recovery

### Protected Pages
- **Cart** - Shopping cart management
- **Wishlist** - Saved products
- **Payment** - Checkout process
- **Orders** - Order history and tracking

## 🔧 API Integration

The application integrates with a RESTful API backend providing:
- **Product Management** - CRUD operations for products
- **User Authentication** - Login, registration, password reset
- **Cart Operations** - Add, remove, update cart items
- **Wishlist Management** - Save and manage favorite products
- **Order Processing** - Create and track orders
- **Payment Integration** - Secure payment processing

## 🎯 Key Learning Outcomes

This project demonstrates proficiency in:
- **Modern React Development** - Hooks, Context, and component architecture
- **Next.js Framework** - App Router, Server Components, and optimization
- **TypeScript** - Type safety and development experience
- **State Management** - Context API and custom hooks
- **Authentication** - NextAuth.js integration and JWT handling
- **API Integration** - RESTful API consumption and error handling
- **UI/UX Design** - Responsive design and user experience
- **Performance Optimization** - Code splitting and lazy loading
- **Deployment** - Vercel platform deployment

## 🚀 Deployment

The application is deployed on **Vercel**, providing:
- **Automatic Deployments** - Git-based continuous deployment
- **Global CDN** - Fast content delivery worldwide
- **SSL Certificates** - Secure HTTPS connections
- **Environment Variables** - Secure configuration management
- **Performance Monitoring** - Built-in analytics and monitoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Amjad** - Route Frontend Diploma Graduate

---

*This project represents the culmination of the Route Frontend Diploma program, showcasing modern web development practices and full-stack e-commerce application development.*