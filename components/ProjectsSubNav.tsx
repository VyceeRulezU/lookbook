"use client";

import type { Category } from "@/types";

interface ProjectsSubNavProps {
  activeCategory: Category | "all";
  onCategoryChange: (category: Category | "all") => void;
  counts: Record<"all" | Category, number>;
}

const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "print", label: "Print" },
];

export default function ProjectsSubNav({
  activeCategory,
  onCategoryChange,
  counts,
}: ProjectsSubNavProps) {
  return (
    <nav aria-label="Project categories">
      <ul className="flex items-center gap-1">
        {categories.map(({ key, label }) => (
          <li key={key}>
            <button
              onClick={() => onCategoryChange(key)}
              aria-current={activeCategory === key ? "page" : undefined}
              className="rounded-full px-4 py-2 font-body text-sm tracking-wider uppercase transition-colors aria-[current=page]:bg-accent aria-[current=page]:text-canvas text-muted hover:text-ink"
            >
              {label} ({counts[key]})
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
