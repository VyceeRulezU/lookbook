import type { Category } from "@/types";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryCounts(
  projects: { category: Category }[]
): Record<"all" | Category, number> {
  const counts: Record<"all" | Category, number> = {
    all: projects.length,
    web: 0,
    mobile: 0,
    print: 0,
  };
  for (const p of projects) {
    counts[p.category]++;
  }
  return counts;
}
