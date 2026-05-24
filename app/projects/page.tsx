import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "A full archive of web, mobile, and print projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-24">
      <h1 className="font-display text-4xl text-ink md:text-5xl">Projects</h1>
      <p className="mt-2 font-body text-muted">
        A selection of recent work across categories.
      </p>
      <div className="mt-10">
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
