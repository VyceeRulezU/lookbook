"use client";

import { useState } from "react";
import type { Category, Project } from "@/types";
import { getCategoryCounts } from "@/lib/utils";
import ProjectCard from "./ProjectCard";
import ProjectsSubNav from "./ProjectsSubNav";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const counts = getCategoryCounts(projects);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-10">
      <ProjectsSubNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        counts={counts}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
