# CONVENTIONS.md

## File Naming

| Type | Convention | Example |
|---|---|---|
| Pages & layouts | lowercase (`page.tsx`, `layout.tsx`) | `app/about/page.tsx` |
| Components | PascalCase | `ProjectCard.tsx` |
| Lib / utils | camelCase | `projects.ts`, `utils.ts` |
| Types | camelCase | `index.ts` (in `/types/`) |
| CSS | globals only | `globals.css` in `app/` |

---

## Import Paths

Use the `@/` path alias for everything — no relative `../../` imports.

```ts
// Good
import ProjectCard from '@/components/ProjectCard';
import { getProjectBySlug } from '@/lib/projects';
import type { Project } from '@/types';

// Bad
import ProjectCard from '../../../components/ProjectCard';
```

Configure in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

---

## Component Structure

Standard order inside a component file:

```tsx
// 1. Directives (if needed)
'use client';

// 2. Imports — external first, then internal
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';

// 3. Types / interfaces for this component only
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

// 4. The component (default export)
export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  // ...
}
```

---

## Server vs Client Components

Default to **Server Components**. Add `'use client'` only when you need:
- `useState` / `useReducer`
- `useEffect`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers that fire on the client (`onClick`, `onChange` that update state)

```
Page (Server)
  └── StaticSection (Server)
        └── InteractiveFilter (Client)  ← 'use client' boundary here
              └── ProjectCard (Server)  ← CANNOT be RSC once inside a client tree
```

Once a component tree enters the client boundary, everything below it is also a client component. This is why `ProjectsGrid` (which owns filter state) must be a client component, even though individual `ProjectCard` components don't need interactivity.

**Pass data as props across the boundary, never fetch inside client components.**

---

## Metadata Pattern

- Static pages: `export const metadata: Metadata = { ... }`
- Dynamic pages: `export async function generateMetadata({ params }): Promise<Metadata> { ... }`
- Never put metadata in client components — metadata API only works in server components.

---

## Error Handling

- `error.tsx` must be a Client Component with `'use client'` at top
- Always provide a `reset()` call — no dead ends
- `not-found.tsx` can be a Server Component
- Call `notFound()` (from `next/navigation`) when data is missing — never return a half-rendered page

---

## Image Usage

Always use `next/image`, never `<img>`:

```tsx
import Image from 'next/image';

// Fixed dimensions (project card)
<Image
  src={project.coverImage.src}
  alt={project.coverImage.alt}
  width={project.coverImage.width}
  height={project.coverImage.height}
  className="object-cover"
/>

// Fill parent container (hero, full-bleed)
<div className="relative aspect-featured">
  <Image
    src={hero.src}
    alt={hero.alt}
    fill
    className="object-cover"
    priority          // ← add for above-the-fold images
  />
</div>
```

---

## TypeScript Rules

- **No `any`** — use `unknown` and narrow, or create the proper type
- All component props typed with an `interface` (not `type` alias) when they have > 1 prop
- `type` alias for union types: `type Category = 'web' | 'mobile' | 'print'`
- Import types with `import type { ... }` when the import is type-only

---

## Exports

- **Default export** for components and pages (required for Next.js pages)
- **Named exports** for utility functions and data helpers
- **Type exports** using `export type { ... }` or inline `export interface`

```ts
// lib/projects.ts
export const projects: Project[] = [...];       // named
export function getProjectBySlug(...) {...}     // named

// components/ProjectCard.tsx
export default function ProjectCard(...) {...}  // default
```

---

## Comments

Write comments that explain *why*, not *what*. The code explains what; the comment explains intent.

```ts
// Good: explains non-obvious decision
// dynamicParams = false makes unknown slugs 404 at CDN edge
// instead of attempting a server render
export const dynamicParams = false;

// Unnecessary: restates the code
// Get project by slug
const project = getProjectBySlug(params.slug);
```
