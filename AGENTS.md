# Portfolio Website - Agent Context

## Project Overview
This is a modern, single-page portfolio website for Fabio Sdringola Maranga, a Full-Stack Engineer specializing in backend, geospatial, and real-time systems.

## Tech Stack
- **Framework:** React 19 + Vite + TypeScript
- **Routing:** TanStack Router (file-based)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **3D/Animation:** React Three Fiber (@react-three/fiber, @react-three/drei), Framer Motion
- **Icons:** Lucide React
- **Package Manager:** Bun

## Architecture Principles
- **SOLID:** Single responsibility for components, open for extension
- **DRY:** Reusable components in `/components`, shared utilities in `/lib`
- **Composition over inheritance:** Use React composition patterns
- **Type safety:** Strict TypeScript with no `any` types

## Project Structure
```
src/
  components/
    ui/           # shadcn/ui components (reusable)
    3d/           # Three.js/R3F components
    sections/     # Page sections (Hero, Skills, Experience)
    Navigation.tsx
    Footer.tsx
    SEO.tsx       # SEO component with meta tags
  routes/
    __root.tsx    # Root layout
    index.tsx     # Home page
  lib/
    utils.ts      # cn() utility, helpers
    seo.ts        # SEO configuration and helpers
  hooks/
    useScrollProgress.ts
    useMousePosition.ts
  router.tsx      # Router configuration
  App.tsx         # App entry
  main.tsx        # React root render
```

## SEO Strategy
- Semantic HTML5 elements
- Structured data (JSON-LD) for Person schema
- Open Graph and Twitter Card meta tags
- Semantic headings hierarchy (h1 → h2 → h3)
- Alt text for all images
- Proper meta descriptions and keywords

## Design System
- **Theme:** Dark mode only
- **Colors:** Deep blue background (#0a0e1a), electric blue accents (#3b82f6)
- **Typography:** Inter (system fallback)
- **Spacing:** Consistent 4px grid system
- **Animations:** Subtle, performance-conscious

## 3D Guidelines
- Lazy load 3D components
- Respect `prefers-reduced-motion`
- Optimize geometries (low poly)
- Use `drei` helpers for performance

## Development Commands
```bash
bun dev          # Start dev server
bun build        # Production build
bun lint         # ESLint check
bun lint:fix     # ESLint fix
bun format       # Prettier format
```

## Linting & Formatting Setup
- **ESLint:** Configured in `eslint.config.js` for TypeScript/React rules. Uses `eslint-config-prettier` to disable overlapping formatting rules.
- **Prettier:** Configured in `.prettierrc` for code formatting (semicolons, single quotes, 2-space tabs, trailing commas).
- **VS Code:** `.vscode/settings.json` enables "Format on Save" using Prettier only. ESLint runs separately but does not format on save.

## Key Person Details (for content)
- **Name:** Fabio Sdringola Maranga
- **Role:** Full-Stack Engineer
- **Specialties:** Backend, Geospatial, Real-Time Systems
- **Location:** Perugia, Umbria, Italy
- **Email:** fabio.sdringola@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/fabio-sdringola-maranga/
- **GitHub:** https://github.com/FabioSM46

## Versioning
- **Strategy:** Git commit hash (automated, zero maintenance)
- **Display:** Short commit hash (e.g., `97ee2d7`) shown in the footer as "Build {hash}"
- **Source:** `__GIT_COMMIT_SHORT__` injected at build time via Vite `define`
- **Location:** `src/components/Footer.tsx`
- **Update:** Automatic — changes with every commit, no manual intervention needed
- **Config:** `vite.config.ts` reads hash via `git rev-parse --short HEAD`

## Critical Constraints
- Single-page application (SPA)
- Mobile-first responsive design
- Performance: < 3s LCP, < 100ms INP
- No external 3D asset dependencies (procedural geometry only)
