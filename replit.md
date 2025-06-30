# ShopHand™ - Premium Auto Parts Delivery Platform

## Overview

ShopHand™ is a modern full-stack web application for ordering and delivering automotive parts. The platform connects customers with auto parts from various suppliers (dealerships, stores, dismantlers) and facilitates delivery through a driver network. Built with a React frontend, Express.js backend, and PostgreSQL database, it features dual interfaces for customers and drivers.

**Trademark**: ShopHand™ is a trademark of Star Soul Enterprise Limited Liability Company.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom automotive-themed design system
- **Build Tool**: Vite for development and production builds
- **Component Library**: shadcn/ui components for consistent UI

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints under `/api` prefix
- **Development**: tsx for TypeScript execution in development
- **Production**: ESBuild for server bundling

### Database & ORM
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Connection**: Neon Database serverless connection
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Type Safety**: Full TypeScript integration with Drizzle Zod schemas

## Key Components

### Data Models
- **Users**: Customer and driver accounts with authentication
- **Drivers**: Extended user profiles with vehicle info, ratings, online status
- **Partners**: Auto parts suppliers (dealerships, stores, dismantlers)
- **Vehicles**: Make/model/year database for part compatibility
- **Categories**: Parts organization and filtering
- **Parts**: Inventory with pricing, conditions, and supplier relationships
- **Orders**: Purchase transactions with multiple items
- **Order Items**: Individual parts within orders
- **Deliveries**: Driver assignments and delivery tracking

### Interface Modes
- **Customer Interface**: Parts browsing, ordering, order tracking
- **Driver Interface**: Available pickups, earnings tracking, delivery management

### UI System
- **Design System**: Custom automotive theme with dark backgrounds and gold accents
- **Responsive Design**: Mobile-first approach with bottom navigation on mobile
- **Component Library**: Comprehensive set of reusable UI components
- **Navigation**: Context-aware navigation with interface mode switching

## Data Flow

### Customer Journey
1. Vehicle selection (year/make/model) for compatible parts
2. Parts browsing with category and partner filtering
3. Shopping cart management with multi-partner support
4. Order placement and payment processing
5. Real-time delivery tracking with driver information

### Driver Journey
1. Online status management and availability toggle
2. Available pickup notifications and acceptance
3. Multi-stop route optimization for efficiency
4. Earnings and performance tracking
5. Customer communication and delivery confirmation

### API Architecture
- RESTful endpoints for all major entities
- Centralized error handling and logging
- Request/response logging for API calls
- Type-safe request/response schemas with Zod validation

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **connect-pg-simple**: PostgreSQL session storage

### Frontend Libraries
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form state management
- **date-fns**: Date manipulation utilities

### Development Tools
- **TypeScript**: Type safety across full stack
- **Vite**: Fast development and build tooling
- **ESBuild**: Production server bundling
- **PostCSS**: CSS processing and optimization

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- tsx for TypeScript execution in development
- Integrated development server setup
- Database migrations with Drizzle Kit

### Production Build
- Vite builds static frontend assets to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Single deployment artifact with both frontend and backend
- Environment-based configuration management

### Database Management
- Drizzle migrations stored in `./migrations`
- Schema definitions in `./shared/schema.ts`
- Database URL configuration via environment variables
- Push-based schema updates for development

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Added trademark under Star Soul Enterprise LLC
- June 30, 2025. Fixed order tracking component date parsing issue
- June 30, 2025. Added footer with company and trademark information
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```