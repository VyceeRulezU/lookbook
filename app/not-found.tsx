import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="text-center">
        <h1 className="font-display text-6xl text-ink">404</h1>
        <p className="mt-4 font-body text-lg text-muted">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
