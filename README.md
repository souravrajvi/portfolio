# VS Code-Inspired Developer Portfolio

A minimal, developer-focused portfolio website styled to look like the VS Code editor. Built with React, Node.js, Express, and PostgreSQL.

## Features

- **VS Code Theme**: Dark editor-style interface with syntax highlighting
- **File Explorer Navigation**: Sidebar mimics VS Code's file explorer with collapsible folders
- **Code-Style Content Display**: Portfolio sections displayed as JSON/TypeScript code
- **Responsive Design**: Mobile navigation with horizontal scroll
- **Database-Driven Content**: All content stored in PostgreSQL for easy updates
- **Command Palette**: Quick navigation with Ctrl/Cmd+K
- **Keyboard Shortcuts**: Ctrl/Cmd+B to toggle sidebar, Ctrl/Cmd+/ for help
- **Breadcrumb Navigation**: Shows current file path like VS Code
- **Enhanced Status Bar**: Git branch info, file type, line numbers

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Schema validation

## Project Structure

```
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── CodeBlock.tsx        # Syntax-highlighted code display
│   │   │   ├── CommandPalette.tsx   # Quick file search (Ctrl+K)
│   │   │   ├── KeyboardShortcuts.tsx # Shortcuts help dialog
│   │   │   ├── Layout.tsx           # Main layout with keyboard handling
│   │   │   ├── MobileNav.tsx        # Mobile bottom navigation
│   │   │   ├── Sidebar.tsx          # VS Code file explorer with folders
│   │   │   ├── StatusBar.tsx        # Enhanced status bar footer
│   │   │   └── TabHeader.tsx        # Tab bar with sidebar toggle
│   │   ├── hooks/
│   │   │   └── use-portfolio.ts   # Data fetching hooks
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.tsx           # Bio/intro page
│   │   │   ├── Experiences.tsx    # Work experience
│   │   │   ├── Projects.tsx       # Portfolio projects
│   │   │   ├── Skills.tsx         # Technical skills
│   │   │   ├── Education.tsx      # Education history
│   │   │   ├── Music.tsx          # Music recommendations
│   │   │   ├── Books.tsx          # Book recommendations
│   │   │   └── Writings.tsx       # Papers and articles
│   │   ├── App.tsx          # Root component with routing
│   │   ├── index.css        # Global styles and VS Code theme
│   │   └── main.tsx         # Entry point
│   └── index.html
├── server/                  # Backend application
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API endpoints + seed data
│   ├── storage.ts          # Database operations
│   ├── static.ts           # Static file serving
│   └── vite.ts             # Vite integration
├── shared/                  # Shared between frontend/backend
│   ├── schema.ts           # Database schema + types
│   └── routes.ts           # API contract definitions
└── package.json
```

## Pages Overview

| File Name | Route | Description |
|-----------|-------|-------------|
| `bio.ts` | `/` | Personal introduction with TypeScript class styling |
| `experience.json` | `/experience` | Work history displayed as JSON array |
| `projects.ts` | `/projects` | Portfolio projects as TypeScript objects |
| `skills.json` | `/skills` | Technical skills grouped by category |
| `education.md` | `/education` | Educational background in markdown style |
| `music.json` | `/music` | Music recommendations |
| `books.json` | `/books` | Book recommendations |
| `writings.md` | `/writings` | Published papers and articles |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile information |
| GET | `/api/experiences` | List all work experiences |
| GET | `/api/projects` | List all projects |
| GET | `/api/skills` | List all skills by category |
| GET | `/api/education` | List education history |
| GET | `/api/music` | List music recommendations |
| GET | `/api/books` | List book recommendations |
| GET | `/api/writings` | List writings and papers |

## Database Schema

### Tables

**profile**
- `id` - Primary key
- `name` - Full name
- `title` - Job title
- `bio` - Short biography
- `avatarUrl` - Profile image URL (optional)
- `githubUrl` - GitHub profile link
- `linkedinUrl` - LinkedIn profile link
- `email` - Contact email

**experiences**
- `id` - Primary key
- `company` - Company name
- `role` - Job title/role
- `duration` - Time period (e.g., "Jan 2024 - Present")
- `description` - Job description
- `order` - Display order

**projects**
- `id` - Primary key
- `title` - Project name
- `description` - Project description
- `techStack` - Array of technologies used
- `link` - Live demo URL (optional)
- `githubLink` - Repository URL (optional)
- `order` - Display order

**skills**
- `id` - Primary key
- `category` - Skill category (e.g., "Languages", "Frameworks")
- `items` - Array of skill names
- `order` - Display order

**education**
- `id` - Primary key
- `institution` - School/university name
- `degree` - Degree obtained
- `year` - Graduation year or period
- `order` - Display order

**music_recs**
- `id` - Primary key
- `title` - Song title
- `artist` - Artist name
- `genre` - Music genre (optional)
- `note` - Personal note (optional)
- `order` - Display order

**book_recs**
- `id` - Primary key
- `title` - Book title
- `author` - Author name
- `genre` - Book genre (optional)
- `note` - Personal note (optional)
- `order` - Display order

**writings**
- `id` - Primary key
- `title` - Article/paper title
- `description` - Brief description
- `link` - URL to full text (optional)
- `publishedAt` - Publication date (optional)
- `order` - Display order

## Color Theme

The portfolio uses the One Dark Pro color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#1e1e1e` | Main background |
| Sidebar | `#252526` | Sidebar and navigation |
| Card | `#282c34` | Code blocks and cards |
| Blue | `#61afef` | Functions, links |
| Green | `#98c379` | Strings |
| Purple | `#c678dd` | Keywords |
| Yellow | `#e5c07b` | Classes, types |
| Red | `#e06c75` | Variables, keys |
| Orange | `#d19a66` | Numbers |
| Grey | `#5c6370` | Comments |

## Development

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string

### Commands

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev

# Build for production
npm run build
```

### Customizing Content

To update portfolio content, modify the `seedDatabase()` function in `server/routes.ts`. The seed function populates the database with initial data on first run.

For production updates, you can:
1. Update the seed data and clear the database tables
2. Create an admin interface to manage content
3. Directly modify database records

## Deployment

The application is configured for deployment on Replit. Click "Deploy" to publish your portfolio with a live URL.

## License

MIT License - Feel free to use this template for your own portfolio.
