# VS Code-Inspired Developer Portfolio

A minimal, developer-focused portfolio website styled like VS Code. See README.md for full documentation.

## Quick Reference

### Pages
| File | Route | Description |
|------|-------|-------------|
| bio.ts | / | Personal introduction |
| experience.json | /experience | Work history |
| projects.ts | /projects | Portfolio projects |
| skills.json | /skills | Technical skills |
| education.md | /education | Education |
| music.json | /music | Music recommendations |
| books.json | /books | Book recommendations |
| writings.md | /writings | Papers and articles |

### API Endpoints
- GET /api/profile
- GET /api/experiences
- GET /api/projects
- GET /api/skills
- GET /api/education
- GET /api/music
- GET /api/books
- GET /api/writings

### Key Files
- `server/routes.ts` - API routes and seed data
- `shared/schema.ts` - Database tables
- `client/src/index.css` - VS Code theme colors

### Commands
```bash
npm run dev        # Start development
npm run db:push    # Push schema changes
npm run build      # Build for production
```

### Customizing Content
Edit the `seedDatabase()` function in `server/routes.ts` to update portfolio content.
