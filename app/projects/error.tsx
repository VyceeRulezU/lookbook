"use client";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink">
          Something went wrong
        </h1>
        <p className="mt-4 font-body text-muted">{error.message}</p>
        <button
          onClick={reset}
          className="mt-8 rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
