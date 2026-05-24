# 02 — Page Structure Principles

Each principle is defined plainly, then mapped to explicit lines in the project docs/code.

---

## 1. Composition over Duplication

**Definition:** Instead of copying the same UI shell into every page file, build small reusable pieces and nest them. Each piece has one job, and you combine (compose) them to make a page.

**In The Lookbook:**

- The Header and Footer live in `app/layout.tsx` once, not copied into every `page.tsx` (ARCHITECTURE.md:20–28).
- The `<ProjectsSubNav />` is in `app/projects/layout.tsx` (ARCHITECTURE.md:29–34), so both the grid page and the detail page get it without copy-pasting.
- `ProjectCard` is a single component used by both `FeaturedStrip` and `ProjectsGrid` (COMPONENTS.md:59–81, 84–95).
- `LoadingSpinner` is a single component with variants, reused by two `loading.tsx` files (COMPONENTS.md:164–181).

**Line refs:**
- ARCHITECTURE.md:20–34 — layout tree shows composition
- COMPONENTS.md:59 — ProjectCard reusable across two contexts
- COMPONENTS.md:164 — LoadingSpinner with variant prop avoids two separate skeletons

---

## 2. Separation of Concerns between Layout and Content

**Definition:** The layout handles structure (chrome, navigation, wrapping). The page handles content (data, unique UI). They shouldn't mix.

**In The Lookbook:**

| Concern | Owned by | Files |
|---|---|---|
| HTML shell, fonts, global nav | Root layout | `app/layout.tsx` |
| Projects sub-navigation | Nested layout | `app/projects/layout.tsx` |
| Hero + featured cards | Home page | `app/page.tsx` |
| Filtered project list | Projects page | `app/projects/page.tsx` |
| Single project detail | Detail page | `app/projects/[slug]/page.tsx` |

- Layouts never fetch project data. Pages never render `<nav>` elements.
- `ProjectsGrid` is a *client* component for interactivity, but its *data* is fetched server-side by the page and passed down as a prop (COMPONENTS.md:97–117). The page fetches, the component displays.

**Line refs:**
- ARCHITECTURE.md:18–34 — layout vs page separation
- COMPONENTS.md:109–116 — "Keep data fetching in the server `page.tsx` and pass it as a prop"
- CONVENTIONS.md:82 — "Pass data as props across the boundary, never fetch inside client components"

---

## 3. Semantic HTML

**Definition:** Use HTML elements for their intended purpose. `<nav>` for navigation, `<main>` for primary content, `<figure>` for images with captions, `<a>` for links. This helps screen readers, SEO, and future maintainers.

**In The Lookbook:**

- `<nav aria-label="Main navigation">` in Header (COMPONENTS.md:27)
- `<nav>` for category tabs in ProjectsSubNav (COMPONENTS.md:136–138)
- `aria-current="page"` on active nav link (COMPONENTS.md:29)
- `<figure>` + `<figcaption>` for gallery images (COMPONENTS.md:159)
- `<Link>` from `next/link` for internal navigation, never raw `<a>` (ROUTING.md:135–136)

**Line refs:**
- COMPONENTS.md:27 — `<nav aria-label="Main navigation">`
- COMPONENTS.md:29 — `aria-current="page"`
- COMPONENTS.md:136–138 — `role="tablist"` approach
- COMPONENTS.md:159 — `<figure>` + `<figcaption>`
- ROUTING.md:135 — "Use `next/link` for all internal navigation"

---

## 4. Progressive Enhancement

**Definition:** The page works at a basic level first (HTML + server rendering). Interactive features (JavaScript, client state) are layered on top. If JS fails or is slow, core content and navigation still work.

**In The Lookbook:**

- All pages are Server Components by default — they render HTML on the server before any JS loads (COMPONENTS.md:3).
- `loading.tsx` provides a non-interactive skeleton while the page resolves (ROUTING.md:28–47).
- `error.tsx` provides a fallback if client-side JS crashes (ROUTING.md:51–79).
- `dynamicParams = false` means invalid slugs 404 at the edge without any JS execution (ROUTING.md:198–206).
- The filter in `ProjectsGrid` is client-side, but the *list of projects* is rendered from server-passed props. Without JS, the server-rendered initial list with `initialCategory` still shows (COMPONENTS.md:97–117, BUILD-ORDER.md:58–66).

**Line refs:**
- COMPONENTS.md:3 — "All components are React Server Components by default"
- COMPONENTS.md:97–117 — ProjectsGrid data passed from server
- ROUTING.md:28–47 — loading.tsx as fallback during resolution
- ROUTING.md:51–79 — error.tsx catches client crashes
- ROUTING.md:198–206 — dynamicParams = false

---

## 5. Single Responsibility per Page

**Definition:** Each `page.tsx` does exactly one job. If a page has multiple responsibilities (fetching, filtering, displaying, sharing a nav), those get split into components or layouts.

**In The Lookbook:**

| Page | Its single job | Delegates to |
|---|---|---|
| `app/page.tsx` | Compose Hero + FeaturedStrip | `Hero.tsx`, `FeaturedStrip.tsx` |
| `app/projects/page.tsx` | Fetch all projects, pass to grid | `ProjectsGrid.tsx` |
| `app/projects/[slug]/page.tsx` | Fetch single project, render detail | `ImageGallery.tsx` |
| `app/about/page.tsx` | Render static bio content | (none needed) |

No page file exceeds ~30 lines of meaningful code. The heavy lifting is in components.

**Line refs:**
- BUILD-ORDER.md:46–52 — Home page composes Hero + FeaturedStrip
- BUILD-ORDER.md:58–66 — Projects page fetches, delegates to ProjectsGrid
- BUILD-ORDER.md:72–82 — Detail page fetches, delegates to ImageGallery
- COMPONENTS.md:97–117 — "Keep data fetching in the server page.tsx"

---

## Why These Principles Matter Together

Each principle reinforces the others:

- **Composition** makes it easy to give each thing **single responsibility**.
- **Separation of concerns** forces **semantic HTML** (structure in layout, content in page).
- **Progressive enhancement** is natural when server components do data and client components do interaction — **separation of concerns** in action.
- **Semantic HTML** is the foundation of **progressive enhancement** (screen readers get `<nav>`, JS users get interactivity).

This project is intentionally small (8 projects, 4 routes) so these principles can be learned clearly before scaling up.
