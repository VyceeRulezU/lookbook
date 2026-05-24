# BUILD-ORDER.md

A step-by-step implementation sequence. Each phase is independently testable before moving on.

---

## Phase 1 — Project Scaffolding

- [ ] `npx create-next-app@latest the-lookbook --typescript --tailwind --app --src-dir=no --import-alias="@/*"`
- [ ] Delete boilerplate (`app/page.tsx` content, `globals.css` content beyond directives)
- [ ] Add `playfair_display` and `dm_sans` to `app/layout.tsx` via `next/font/google`
- [ ] Set up `tailwind.config.ts` with custom tokens (colours, fonts, spacing)
- [ ] Set up `app/globals.css` with CSS custom properties and Tailwind directives
- [ ] Configure `next.config.mjs` with Unsplash `remotePatterns`

**Checkpoint:** `npm run dev` shows blank warm-background page, correct fonts loading.

---

## Phase 2 — Types + Data Layer

- [ ] Create `types/index.ts` with `Category`, `ImageItem`, `Project` types
- [ ] Create `lib/utils.ts` with `cn()`, `formatDate()`, `slugify()`
- [ ] Create `lib/metadata.ts` with shared OG helper function
- [ ] Create `lib/projects.ts` with 8 mock projects and all 4 getter functions
- [ ] Verify TypeScript compiles with no errors: `npx tsc --noEmit`

**Checkpoint:** No TS errors. All 8 projects have valid slugs, correct category spread, exactly 3 `featured: true`.

---

## Phase 3 — Shell (Layout + Header + Footer)

- [ ] Create `components/Header.tsx` (static shell)
- [ ] Create `components/NavLinks.tsx` (Client Component, `usePathname`)
- [ ] Create `components/Footer.tsx`
- [ ] Wire both into `app/layout.tsx`
- [ ] Add root `metadata` export with `metadataBase`, `title.template`, default OG

**Checkpoint:** Header and footer visible on all routes. Nav links work.

---

## Phase 4 — Home Page

- [ ] Create `components/Hero.tsx`
- [ ] Create `components/ProjectCard.tsx` with `default` and `featured` variants
- [ ] Create `components/FeaturedStrip.tsx` (calls `getFeaturedProjects()`)
- [ ] Build `app/page.tsx` composing Hero + FeaturedStrip
- [ ] Add home page `metadata` export

**Checkpoint:** Home page renders hero + 3 featured cards. Cards link to `/projects/[slug]` (will 404 until Phase 6).

---

## Phase 5 — Projects Index

- [ ] Create `components/ProjectsSubNav.tsx` (Client Component)
- [ ] Create `components/ProjectsGrid.tsx` (Client Component, filter state)
- [ ] Create `app/projects/layout.tsx` with `ProjectsSubNav`
- [ ] Build `app/projects/page.tsx` — fetches all projects server-side, passes to `ProjectsGrid`
- [ ] Create `app/projects/loading.tsx` with `<LoadingSpinner variant="grid" />`
- [ ] Create `app/projects/error.tsx` (Client Component)
- [ ] Add projects index `metadata` export

**Checkpoint:** `/projects` shows all 8 project cards. Filter tabs work. Correct sub-nav visible.

---

## Phase 6 — Project Detail

- [ ] Create `components/ImageGallery.tsx`
- [ ] Build `app/projects/[slug]/page.tsx` with:
  - `generateStaticParams()`
  - `export const dynamicParams = false`
  - `generateMetadata({ params })`
  - `notFound()` call if slug missing
  - Project detail layout (cover image, title, meta, description, gallery)
- [ ] Create `app/projects/[slug]/loading.tsx` with `<LoadingSpinner variant="detail" />`
- [ ] Create `app/projects/not-found.tsx` (slug-specific 404)

**Checkpoint:** All 8 project slugs render correct detail pages. `/projects/nonexistent` shows 404. `npm run build` pre-renders all 8 static pages.

---

## Phase 7 — About Page

- [ ] Build `app/about/page.tsx` with creator bio content
- [ ] Add about page `metadata` export

**Checkpoint:** `/about` renders, title shows "About — The Lookbook".

---

## Phase 8 — Error Boundaries + Global 404

- [ ] Create `app/projects/[slug]/error.tsx` (Client Component)
- [ ] Create `app/not-found.tsx` (global 404)
- [ ] Create `app/global-error.tsx` (Client Component with `<html>/<body>`)

**Checkpoint:** Navigate to `/nonexistent-route` → global 404. Verify error boundaries by temporarily throwing in a page.

---

## Phase 9 — Polish + Audit

- [ ] Run Lighthouse on `/`, `/projects`, and one `/projects/[slug]` — target 90+ all categories
- [ ] Check all images have descriptive `alt` text
- [ ] Verify all `<Link>` components — no raw `<a>` for internal links
- [ ] Test keyboard navigation: Tab through entire page, all interactive elements focusable
- [ ] Check `npm run build` output — no warnings, all static pages listed
- [ ] Verify OG metadata in browser dev tools (Network tab → page HTML → `<head>`)
- [ ] Test social preview with [opengraph.xyz](https://www.opengraph.xyz) or similar
- [ ] Check `metadataBase` is set to production URL before deploy

---

## Deploy Checklist

- [ ] Set `metadataBase` URL in root layout to production domain
- [ ] Verify `NEXT_PUBLIC_*` env vars if any were added
- [ ] `npm run build` passes with no errors
- [ ] Add `og-image.png` (1200×630) to `/public`
- [ ] Deploy to Vercel (recommended) — zero config for Next.js
