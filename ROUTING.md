# ROUTING.md

## How App Router Routing Works (in this project)

Next.js App Router uses the file system to define routes. Every `page.tsx` is a public URL. Every `layout.tsx` wraps its segment and all descendants.

---

## Layout Nesting

```
app/layout.tsx          →  wraps EVERYTHING (html, body, Header, Footer)
  app/page.tsx          →  /
  app/about/page.tsx    →  /about
  app/projects/
    layout.tsx          →  wraps /projects and /projects/[slug]
    page.tsx            →  /projects
    [slug]/
      page.tsx          →  /projects/vessel-brand-identity  etc.
```

The `app/projects/layout.tsx` adds the `<ProjectsSubNav />` above `{children}`. This means the sub-nav appears on both the grid page and the detail page — which is the right UX (user can navigate back to the grid without a back button).

---

## Special Files Per Segment

### `loading.tsx`

Next.js automatically wraps the `page.tsx` in a `<Suspense>` boundary and shows `loading.tsx` while the page resolves.

**Where it's placed:**

| File | Triggers when |
|---|---|
| `app/projects/loading.tsx` | Navigating to `/projects` |
| `app/projects/[slug]/loading.tsx` | Navigating to any project detail |

Both render `<LoadingSpinner />` with the appropriate variant.

```tsx
// app/projects/loading.tsx
import LoadingSpinner from '@/components/LoadingSpinner';
export default function Loading() {
  return <LoadingSpinner variant="grid" />;
}
```

---

### `error.tsx`

Catches uncaught errors thrown inside the segment. **Must be a Client Component.**

```tsx
'use client';
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

**Where it's placed:**

| File | Catches errors in |
|---|---|
| `app/projects/error.tsx` | `/projects` grid |
| `app/projects/[slug]/error.tsx` | Project detail pages |

---

### `not-found.tsx`

Rendered when `notFound()` is called from within a page, or when a URL doesn't match any route.

```tsx
// app/projects/not-found.tsx  (shown when getProjectBySlug returns undefined)
import Link from 'next/link';
export default function NotFound() {
  return (
    <div>
      <h1>Project not found</h1>
      <Link href="/projects">← Back to all projects</Link>
    </div>
  );
}
```

**Where it's placed:**

| File | Shown when |
|---|---|
| `app/not-found.tsx` | URL doesn't match any route |
| `app/projects/not-found.tsx` | `notFound()` called in `[slug]/page.tsx` |

In `[slug]/page.tsx`:
```tsx
const project = getProjectBySlug(params.slug);
if (!project) notFound();  // ← triggers app/projects/not-found.tsx
```

---

### `global-error.tsx`

Catches errors in the root layout itself. Must render its own `<html>` and `<body>`.

```tsx
'use client';
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <h1>Something went wrong</h1>
        <button onClick={reset}>Reload</button>
      </body>
    </html>
  );
}
```

---

## Navigation

Use `next/link` for all internal navigation. Never use `<a>` for internal links.

```tsx
import Link from 'next/link';
<Link href={`/projects/${project.slug}`}>{project.title}</Link>
```

For the active link state in `Header.tsx`, extract a `NavLinks` client component:

```tsx
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

---

## Route Groups (Optional)

If you want to add a marketing landing page that doesn't share the site header, you can use a route group:

```
app/
  (marketing)/
    layout.tsx      ← no Header/Footer
    landing/page.tsx → /landing
  (site)/
    layout.tsx      ← Header + Footer
    page.tsx        → /
    projects/...
    about/...
```

Route groups (folders wrapped in parentheses) don't affect the URL — they're just for organising layouts.

This isn't needed for the current scope but worth knowing for future expansion.

---

## `dynamicParams` Flag

In `app/projects/[slug]/page.tsx`, set:

```ts
export const dynamicParams = false;
```

This means any slug not returned by `generateStaticParams()` will 404 immediately at the CDN level — no server hit, no render attempt. Clean, fast, and correct.
