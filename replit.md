# VS Code-Inspired Developer Portfolio

A minimal, developer-focused portfolio website styled to look like the VS Code editor. Built with React, Node.js, Express, and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## Overview

This is a developer portfolio website that mimics the VS Code editor interface. The entire site is themed to look and feel like working in VS Code, with features like:

- File explorer sidebar with collapsible folders
- Tab-based navigation between portfolio sections
- Code-style content display (JSON, TypeScript, Markdown formatting)
- Command palette for quick navigation (Ctrl/Cmd+K)
- Status bar with git branch info and file details
- Multiple color themes (Dark+, Light+, Monokai, Dracula, GitHub)
- Terminal panel simulation
- Keyboard shortcuts matching VS Code

Portfolio sections are presented as "files" - bio.ts, experience.json, projects.ts, skills.json, etc.

## System Architecture

### Frontend (React + Vite)

The client lives in `client/src/` and uses:

- **React 18** with functional components and hooks
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **Framer Motion** for animations and transitions
- **Tailwind CSS** for styling with custom VS Code theme colors defined in `client/src/index.css`
- **shadcn/ui** components (Radix UI primitives) in `client/src/components/ui/`

Key architectural patterns:
- Pages in `client/src/pages/` correspond to portfolio sections
- Reusable VS Code UI components in `client/src/components/` (Sidebar, TabHeader, StatusBar, etc.)
- Custom hooks in `client/src/hooks/` for data fetching (use-portfolio.ts)
- Context for scratch file management (`ScratchFilesContext`)
- Theme system with CSS variables for multi-theme support

### Backend (Express + Node.js)

The server lives in `server/` and provides:

- **Express 5** REST API
- Routes defined in `server/routes.ts` 
- Database operations through `server/storage.ts`
- API endpoints match the structure in `shared/routes.ts`

API endpoints:
- GET /api/profile - Personal info
- GET /api/experiences - Work history
- GET /api/projects - Portfolio projects
- GET /api/skills - Technical skills
- GET /api/education - Education background
- GET /api/music - Music recommendations
- GET /api/books - Book recommendations
- GET /api/writings - Papers and articles
- GET /api/achievements - Certifications and awards
- GET /api/blog - Blog posts

### Shared Code

The `shared/` directory contains code used by both frontend and backend:

- `schema.ts` - Drizzle ORM table definitions and Zod schemas
- `routes.ts` - API route definitions with type-safe response schemas

### Database (PostgreSQL + Drizzle)

- **Drizzle ORM** for type-safe database operations
- Schema defined in `shared/schema.ts`
- Tables: profile, experiences, projects, skills, education, musicRecs, bookRecs, writings, achievements, blogPosts
- Configuration in `drizzle.config.ts`
- Requires DATABASE_URL environment variable

### Build System

- Development: `npm run dev` - Uses Vite dev server with HMR
- Production build: `npm run build` - Vite builds client, esbuild bundles server
- Database migrations: `npm run db:push` - Pushes schema changes via Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL** - Primary data store, connection via DATABASE_URL environment variable

### UI Component Libraries
- **Radix UI** - Headless UI primitives (dialogs, menus, etc.)
- **shadcn/ui** - Pre-built component patterns using Radix
- **Lucide React** - Icon library

### Development Tools
- **Vite** - Frontend build tool and dev server
- **esbuild** - Server bundling for production
- **TypeScript** - Type checking across the codebase
- **Tailwind CSS** - Utility-first CSS framework

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` - Error display in development
- `@replit/vite-plugin-cartographer` - Source mapping
- `@replit/vite-plugin-dev-banner` - Development banner