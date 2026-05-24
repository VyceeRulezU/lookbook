import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  priority?: boolean;
}

export default function ProjectCard({
  project,
  variant = "default",
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg bg-warm transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative overflow-hidden ${
          variant === "featured" ? "aspect-featured" : "aspect-card"
        }`}
      >
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          sizes={
            variant === "featured"
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-full bg-ghost/50 px-3 py-1 font-body text-xs tracking-wider uppercase text-muted">
            {project.category}
          </span>
          <span className="font-body text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="font-display text-xl text-ink">{project.title}</h3>
        <p className="mt-1 font-body text-sm text-muted">{project.tagline}</p>
      </div>
    </Link>
  );
}
