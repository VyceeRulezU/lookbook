# DATA-MODEL.md

## TypeScript Types (`types/index.ts`)

```ts
export type Category = 'web' | 'mobile' | 'print';

export interface ImageItem {
  src: string;        // Unsplash URL or local /public path
  alt: string;        // Descriptive alt text — required for a11y
  width: number;      // Explicit dimensions — prevents CLS
  height: number;
  blurDataURL?: string; // Base64 for placeholder="blur"
}

export interface Project {
  id: string;             // Unique, stable identifier
  slug: string;           // URL-safe, e.g. "brand-identity-acme"
  title: string;          // Display title
  tagline: string;        // One-line description (used in cards)
  category: Category;     // Drives sub-nav filter
  featured: boolean;      // Whether to show on home strip (max 3)
  year: number;           // e.g. 2024
  client: string;         // Client or "Personal"
  role: string;           // e.g. "Art Direction + Web Design"
  tags: string[];         // e.g. ["Branding", "Figma", "Motion"]
  coverImage: ImageItem;  // Used in cards and OG image
  images: ImageItem[];    // Full gallery on detail page (3–6)
  description: string;    // Long-form markdown-ish paragraph
  challenge: string;      // What problem was being solved
  outcome: string;        // Result / impact
  liveUrl?: string;       // Optional external link
}
```

---

## Mock Data Spec (`lib/projects.ts`)

The file exports three things:

```ts
export const projects: Project[] = [ /* 6–9 items */ ];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}
```

---

## Mock Projects (8 entries)

Spread across categories and years to show variety.

| # | Title | Slug | Category | Featured | Client |
|---|---|---|---|---|---|
| 1 | Vessel — Brand Identity | `vessel-brand-identity` | web | ✓ | Vessel Studio |
| 2 | Forma App | `forma-app` | mobile | ✓ | Forma Labs |
| 3 | Northlight Annual Report | `northlight-annual-report` | print | ✓ | Northlight Co. |
| 4 | Drift E-commerce | `drift-ecommerce` | web | — | Drift Supply |
| 5 | Koto Mobile Banking | `koto-mobile-banking` | mobile | — | Koto Finance |
| 6 | Soil Type Specimen | `soil-type-specimen` | print | — | Personal |
| 7 | Halo SaaS Dashboard | `halo-saas-dashboard` | web | — | Halo Inc. |
| 8 | Bloom Event Branding | `bloom-event-branding` | print | — | Bloom Events |

**Rule of thumb for mock images:** Use Unsplash source URLs with consistent dimensions:
- Cover images: `https://images.unsplash.com/photo-{id}?w=800&h=600&fit=crop`
- Gallery images: mix landscape (`w=1200&h=800`) and portrait (`w=800&h=1100`)

Pick thematically appropriate photos — a brand identity project gets studio/typography shots, a mobile app gets device mockup photos, print gets editorial/paper texture shots.

---

## Data Constraints

- `featured: true` on **exactly 3** projects — the `FeaturedStrip` expects three.
- `slug` must be URL-safe: lowercase, hyphens only, no spaces or special chars.
- `tags` array: 3–6 items per project. Used as filter chips on the detail page.
- `coverImage.alt` must be genuinely descriptive, not "project image".
- `description` should be 2–4 sentences. `challenge` and `outcome` 1–2 sentences each.

---

## Adding a Real Backend Later

1. Replace `lib/projects.ts` with `lib/projects.server.ts` that fetches from your CMS API.
2. Mark it `'server only'` at the top.
3. `generateStaticParams` and `generateMetadata` in `[slug]/page.tsx` already await async functions — no structural change needed.
4. Add `export const revalidate = 60;` to enable ISR.
