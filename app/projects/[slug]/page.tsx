import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { buildProjectMetadata } from "@/lib/metadata";
import ImageGallery from "@/components/ImageGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return buildProjectMetadata(project);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24 lg:px-24">
      <Link
        href="/projects"
        className="mb-8 inline-block font-body text-sm tracking-wider uppercase text-muted transition-colors hover:text-accent"
      >
        &larr; Back to projects
      </Link>

      <div className="relative aspect-featured overflow-hidden rounded-lg bg-warm">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-ghost/50 px-3 py-1 font-body text-xs tracking-wider uppercase text-muted">
            {project.category}
          </span>
          <span className="font-body text-sm text-muted">{project.year}</span>
          <span className="font-body text-sm text-muted">
            {project.client}
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 font-body text-lg text-muted">
          {project.tagline}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="font-display text-2xl text-ink">Overview</h2>
            <p className="mt-4 font-body leading-relaxed text-muted">
              {project.description}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Challenge</h2>
            <p className="mt-4 font-body leading-relaxed text-muted">
              {project.challenge}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Outcome</h2>
            <p className="mt-4 font-body leading-relaxed text-muted">
              {project.outcome}
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <div>
            <h3 className="font-body text-sm tracking-widest uppercase text-muted">
              Role
            </h3>
            <p className="mt-1 font-body text-ink">{project.role}</p>
          </div>
          <div>
            <h3 className="font-body text-sm tracking-widest uppercase text-muted">
              Client
            </h3>
            <p className="mt-1 font-body text-ink">{project.client}</p>
          </div>
          <div>
            <h3 className="font-body text-sm tracking-widest uppercase text-muted">
              Tags
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-warm px-3 py-1 font-body text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {project.liveUrl && (
            <div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-accent px-6 py-2 font-body text-sm tracking-wider uppercase text-ink transition-all hover:bg-accent/90"
              >
                Live Site &rarr;
              </a>
            </div>
          )}
        </aside>
      </div>

      {project.images.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink">Gallery</h2>
          <div className="mt-6">
            <ImageGallery images={project.images} />
          </div>
        </section>
      )}
    </article>
  );
}
