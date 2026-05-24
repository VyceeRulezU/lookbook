# COMPONENTS.md

All components are **React Server Components by default** unless they need client-side interactivity (event handlers, useState, useEffect). Mark client components with `'use client'` at the top.

---

## Header.tsx

**Type:** Server Component  
**Location:** `components/Header.tsx`  
**Used in:** `app/layout.tsx`

**Responsibilities**
- Renders the site logo (text or SVG mark)
- Renders primary nav links: Home, Projects, About
- Sticky positioning (`position: sticky; top: 0`)
- Active link state via `usePathname()` — this forces it to be a Client Component unless you split the nav links into a child `NavLinks` client component

**Recommended split:**
```
Header.tsx (Server)  →  NavLinks.tsx (Client, uses usePathname)
```

**Props:** None (reads no external props; data is static)

**Accessibility**
- Wraps nav in `<nav aria-label="Main navigation">`
- Logo links to `/` with `aria-label="The Lookbook — home"`
- Current page link gets `aria-current="page"`

---

## Footer.tsx

**Type:** Server Component  
**Props:** None

**Responsibilities**
- Copyright line with dynamic year (`new Date().getFullYear()`)
- Secondary nav: Projects, About, (optional) RSS
- Social links with `aria-label` per icon

---

## Hero.tsx

**Type:** Server Component  
**Props:** None (content is hardcoded or from a config constant)

**Responsibilities**
- Full-viewport or large hero section on the home page
- Headline, sub-headline, and CTA button ("View Work" → `/projects`)
- Optional background image via `next/image` with `fill` and `priority`

**Design note:** This is the first thing visitors see. The headline should be the creator's name or a strong positioning statement. Keep the CTA to one action.

---

## ProjectCard.tsx

**Type:** Server Component  
**Props:**

```ts
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';  // featured = larger, different aspect ratio
  priority?: boolean;                 // passes to next/image for above-fold cards
}
```

**Responsibilities**
- Renders cover image using `next/image`
- Title, tagline, category badge, year
- Full card is a link to `/projects/${project.slug}`
- Hover state: subtle image scale + shadow lift

**Accessibility**
- The `<a>` wraps the whole card; add `aria-label={project.title}` if the visible text is ambiguous
- Image alt comes from `project.coverImage.alt`

---

## FeaturedStrip.tsx

**Type:** Server Component  
**Props:** None (calls `getFeaturedProjects()` internally)

**Responsibilities**
- Fetches exactly 3 featured projects
- Renders them in a responsive row: `grid-cols-1 md:grid-cols-3`
- Each item is a `<ProjectCard variant="featured" />`
- Section heading: "Selected Work" or similar

---

## ProjectsGrid.tsx

**Type:** Client Component (`'use client'`)  — needs filter state  
**Props:**

```ts
interface ProjectsGridProps {
  projects: Project[];       // passed down from server page
  initialCategory?: Category | 'all';
}
```

**Responsibilities**
- Receives all projects as a prop (data fetched server-side in `page.tsx`)
- Manages `activeCategory` state locally
- Filters displayed projects based on active category
- Renders a `<ProjectCard />` for each filtered project
- Animated grid transitions (CSS or Framer Motion optional)

**Why client?** The filter interaction (clicking All / Web / Mobile / Print) requires state. Keep data fetching in the server `page.tsx` and pass it as a prop — don't fetch inside the client component.

---

## ProjectsSubNav.tsx

**Type:** Client Component  
**Props:**

```ts
interface ProjectsSubNavProps {
  counts: Record<'all' | Category, number>;  // e.g. { all: 8, web: 3, mobile: 2, print: 3 }
}
```

**Responsibilities**
- Renders tab bar: All (8) / Web (3) / Mobile (2) / Print (3)
- Syncs active state with URL search param `?category=web` (optional but good for shareability)
- Or manages local state only if URL sync isn't required

**Accessibility**
- Use `role="tablist"` + `role="tab"` + `aria-selected`
- Or use `<nav>` with `<a>` tags if syncing to URL — simpler and more robust

---

## ImageGallery.tsx

**Type:** Client Component (needs click/keyboard lightbox interaction)  
**Props:**

```ts
interface ImageGalleryProps {
  images: ImageItem[];
}
```

**Responsibilities**
- Renders the first image large, rest in a row below
- Click to open a simple lightbox/modal (or just scroll)
- All images via `next/image` with explicit dimensions

**Accessibility**
- `<figure>` + `<figcaption>` wrapping each image
- Lightbox must trap focus and close on Escape

---

## LoadingSpinner.tsx

**Type:** Server Component (renders static HTML skeleton)  
**Props:**

```ts
interface LoadingSpinnerProps {
  variant?: 'grid' | 'detail' | 'card';
}
```

**Responsibilities**
- Renders an animated CSS skeleton that matches the shape of the content it replaces
- `variant="grid"` → 6 skeleton card rectangles
- `variant="detail"` → hero image skeleton + text lines
- `variant="card"` → single card skeleton

**Note:** This is rendered by `loading.tsx` files, not used directly in pages.

---

## Component Rules

1. **No data fetching in client components.** Fetch in server pages/layouts, pass as props.
2. **No `useState` in server components.** If you need interactivity, split into server shell + client leaf.
3. **Prefer RSC.** Only reach for `'use client'` when you actually need browser APIs or React hooks.
4. **Co-locate styles.** Use Tailwind utilities inline; no separate `.module.css` unless animating something complex.
5. **Export one component per file.** File name matches component name.
