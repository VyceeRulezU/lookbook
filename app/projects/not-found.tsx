import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink">Project not found</h1>
        <p className="mt-4 font-body text-muted">
          The project you&apos;re looking for doesn&apos;t seem to exist.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
        >
          &larr; Back to all projects
        </Link>
      </div>
    </div>
  );
}
