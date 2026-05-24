"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-canvas font-body text-ink">
        <div className="text-center">
          <h1 className="font-display text-4xl">Something went wrong</h1>
          <p className="mt-4 text-muted">An unexpected error occurred.</p>
          <button
            onClick={reset}
            className="mt-8 rounded-full bg-accent px-8 py-3 text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
