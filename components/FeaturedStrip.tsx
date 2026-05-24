import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedStrip() {
  const featured = getFeaturedProjects();

  return (
    <section className="bg-canvas py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          Selected Work
        </h2>
        <p className="mt-2 font-body text-muted">
          A glimpse into recent projects.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured"
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
