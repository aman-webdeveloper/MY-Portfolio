# Portfolio Website

## Overview

This is a modern, responsive single-page portfolio website built for a Frontend Developer named Aman Kumar. The application is a full-stack TypeScript project combining a React frontend with an Express.js backend, featuring a comprehensive UI component library and modern development tools.

The portfolio showcases typical sections including Hero, About, Skills, Projects, Services, Experience, Education, and Contact, with interactive features like theme switching, smooth scrolling, typing animations, and form handling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with custom CSS variables for theming, shadcn/ui component library
- **State Management**: React Context for theme management, React Hook Form for form handling
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Animations**: AOS (Animate On Scroll) library for section animations, custom typing animations
- **Theme System**: Light/dark mode toggle with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database Integration**: Drizzle ORM configured for PostgreSQL (Neon Database)
- **Session Management**: Express sessions with PostgreSQL storage (connect-pg-simple)
- **Development Setup**: Hot reloading with tsx, Vite integration for serving static assets

### Component System
- **UI Components**: Complete shadcn/ui component library with Radix UI primitives
- **Styling Approach**: CSS-in-JS with Tailwind utility classes and CSS custom properties
- **Design System**: Consistent spacing, typography, and color palette with dark/light theme support

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: User management system with username/password authentication structure
- **Migrations**: Drizzle Kit for database schema management and migrations

### Development and Build Process
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **TypeScript Configuration**: Strict typing with path aliases for clean imports
- **Development Server**: Integrated development experience with Vite middleware
- **Code Organization**: Monorepo structure with shared types and utilities

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon Database PostgreSQL driver for serverless environments
- **drizzle-orm** and **drizzle-kit**: Type-safe database toolkit and migration management
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight React router alternative

### UI and Styling
- **@radix-ui/react-***: Comprehensive set of headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component styles
- **clsx** and **tailwind-merge**: Conditional class name utilities

### Form and Validation
- **react-hook-form**: Form management with minimal re-renders
- **@hookform/resolvers**: Form validation resolvers
- **drizzle-zod**: Zod schema generation from Drizzle schemas

### Animation and Interaction
- **embla-carousel-react**: Modern carousel component
- **cmdk**: Command palette and search interface
- **date-fns**: Date manipulation and formatting

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error display in development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **tsx**: TypeScript execution for Node.js development server