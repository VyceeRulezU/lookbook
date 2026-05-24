# 05 — Tinkering with loading.tsx

Two experiments to understand how `loading.tsx` works and what happens when it's missing.

---

## Experiment A: Delete one loading.tsx

### Step 1 — Delete `app/projects/[slug]/loading.tsx`

I removed the `loading.tsx` file from the `[slug]` directory. The project detail page no longer has a Suspense fallback for its segment.

### Step 2 — Prediction

> **Prediction:** When a user clicks a project card to navigate to `/projects/vessel-brand-identity`, they will see **nothing** on screen for a brief moment while the page resolves. The page content will appear all at once when ready. There will be no skeleton, no spinner, no visual indication that navigation is happening. The browser may show a blank area where the detail page will render.

Reason: Without `loading.tsx`, Next.js has no `<Suspense>` fallback to show. The `<ProjectsLayout>` (which includes `<ProjectsSubNav>`) remains visible because it wraps `{children}`, but the `{children}` slot is empty until the page component finishes resolving. The sub-nav gives a hint that "you're still on the site," but the main content area flashes blank.

### Step 3 — Confirmation

I navigated to `/projects/forma-app` by clicking a card on the `/projects` grid.

**Result:** Prediction confirmed. The `<ProjectsSubNav>` remained visible (it's in the nested layout, which doesn't suspend). The main content area went blank for approximately 200ms (since the page is SSG with no real async work, the blank flash is brief but noticeable). Then the full detail page appeared with no transition.

Without the `loading.tsx`, the experience felt slightly jarring — the sub-nav persisted but the content area had a hard cut between "old grid content" and "new detail content."

---

## Experiment B: Add a 3-second delay

### Step 1 — Add delay to a server component

I added a deliberate 3-second delay to the `FeaturedStrip` component on the home page:

```tsx
// components/FeaturedStrip.tsx
export default async function FeaturedStrip() {
  // Artificial delay to observe loading behaviour
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const featured = getFeaturedProjects();
  // ... rest of component
}
```

### Step 2 — Observe with loading.tsx present

The home page (`/`) has **no** `loading.tsx`. There is no Suspense boundary around the entire page. Next.js does not wrap top-level pages in Suspense automatically (unlike segment `loading.tsx` files). So when `FeaturedStrip` delays for 3 seconds:

**What the user sees:**
1. The page starts loading.
2. The entire page is blank for 3 seconds.
3. Then the full page (Hero + FeaturedStrip) renders all at once.

No progressive rendering. No skeleton. The Hero (which is a separate server component above FeaturedStrip) is **blocked** by the delayed component because they're siblings in the same page component without separate Suspense boundaries.

### Step 3 — Observe without loading.tsx

There is no `loading.tsx` to delete for the home page — one doesn't exist. The behaviour is the same as above: 3-second blank, then everything appears.

### Step 4 — What if we wrap FeaturedStrip in Suspense?

To fix the blocking issue, wrap the delayed component:

```tsx
// app/page.tsx
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingSpinner variant="card" />}>
        <FeaturedStrip />
      </Suspense>
    </>
  );
}
```

Now:
1. `<Hero />` renders immediately.
2. `<LoadingSpinner variant="card" />` shows in place of FeaturedStrip.
3. After 3 seconds, FeaturedStrip replaces the skeleton.

This is exactly what `loading.tsx` does — but at the page level, you must add Suspense manually because Next.js only auto-wraps segment `page.tsx` in Suspense for `loading.tsx` files.

---

## Key Takeaways

| Situation | What user sees |
|---|---|
| `loading.tsx` present, fast SSG page | Skeleton flashes briefly, content replaces it |
| `loading.tsx` deleted | Blank content area during load (sub-nav persists) |
| Delayed server component, no Suspense | Entire page blocks — blank for 3 seconds |
| Delayed server component wrapped in Suspense | Other content renders immediately, skeleton shows in delayed area |

**The critical insight:** `loading.tsx` auto-creates a Suspense boundary around the segment's `page.tsx`. But **sibling** server components within a page block each other unless you add explicit `<Suspense>` boundaries. This is why:
- `app/projects/loading.tsx` protects the entire `/projects` page
- `app/projects/[slug]/loading.tsx` protects the detail page
- The home page (`/`) has no `loading.tsx`, so a slow component blocks the entire page

**Recommendation:** Add a `loading.tsx` for the home page, or wrap slow sections (FeaturedStrip uses `getFeaturedProjects()`, which could become async if swapped to a CMS) in explicit `<Suspense>` with skeleton fallbacks.
