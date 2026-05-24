# The Lookbook

A creator portfolio built with Next.js 15 App Router. Every page has a clean URL, static generation where it counts, proper SEO metadata, and graceful error handling — the bones of a real production site.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export check
npm run lint
```

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing, RSC, built-in image/metadata/ISR |
| Language | TypeScript (strict) | Type-safe data shapes across routes |
| Styling | Tailwind CSS v3 | Utility-first, no runtime overhead |
| Data | `/lib/projects.ts` (mock) | No backend needed; swap for CMS later |
| Images | `next/image` | Automatic optimisation, lazy loading, blur placeholder |
| SEO | Next.js Metadata API | Per-page title, description, OpenGraph, Twitter card |

---

## Docs Index

| File | What it covers |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Full directory tree, route table, rendering strategy |
| [DATA-MODEL.md](./DATA-MODEL.md) | `Project` type, category enum, mock data spec |
| [COMPONENTS.md](./COMPONENTS.md) | Every component — props, variants, accessibility notes |
| [METADATA.md](./METADATA.md) | SEO + OpenGraph setup for each route |
| [ROUTING.md](./ROUTING.md) | Layouts, nested layouts, special files map |
| [STYLING.md](./STYLING.md) | Tailwind config, design tokens, typography scale |
| [CONVENTIONS.md](./CONVENTIONS.md) | Naming, imports, file organisation rules |

---

## Project Anatomy (one-liner per file)

```
the-lookbook/
├── app/
│   ├── layout.tsx              ← Root shell: fonts, Header, Footer, html/body
│   ├── page.tsx                ← Home: Hero + FeaturedStrip
│   ├── globals.css             ← Tailwind directives + CSS custom properties
│   ├── not-found.tsx           ← Global 404
│   ├── global-error.tsx        ← Root error boundary (client component)
│   ├── about/
│   │   └── page.tsx            ← Creator bio, skills, contact CTA
│   └── projects/
│       ├── layout.tsx          ← Projects shell: ProjectsSubNav
│       ├── page.tsx            ← Filterable grid of all projects
│       ├── loading.tsx         ← Suspense skeleton for grid
│       ├── error.tsx           ← Error boundary for /projects
│       ├── not-found.tsx       ← 404 for bad project slugs
│       └── [slug]/
│           ├── page.tsx        ← Single project detail
│           └── loading.tsx     ← Skeleton for detail page
├── components/
│   ├── Header.tsx              ← Sticky nav with logo
│   ├── Footer.tsx              ← Site footer
│   ├── Hero.tsx                ← Homepage hero section
│   ├── FeaturedStrip.tsx       ← 3-card featured row on home
│   ├── ProjectCard.tsx         ← Reusable card (grid + featured)
│   ├── ProjectsGrid.tsx        ← Full grid with category filter
│   ├── ProjectsSubNav.tsx      ← All / Web / Mobile / Print tabs
│   ├── ImageGallery.tsx        ← next/image gallery for detail page
│   └── LoadingSpinner.tsx      ← Skeleton UI shared by loading files
├── lib/
│   ├── projects.ts             ← Mock data array + getter functions
│   ├── metadata.ts             ← Shared OG/SEO helper
│   └── utils.ts                ← cn(), formatDate(), slugify()
├── types/
│   └── index.ts                ← Project, Category, ImageItem types
├── public/
│   ├── og-image.png            ← Default OpenGraph image (1200×630)
│   └── favicon.ico
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```
