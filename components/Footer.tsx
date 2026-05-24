import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ghost bg-warm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-12 md:flex-row md:px-12 lg:px-24">
        <p className="font-body text-sm text-muted">
          &copy; {year} The Lookbook. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/projects"
                className="font-body text-sm text-muted transition-colors hover:text-accent"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="font-body text-sm text-muted transition-colors hover:text-accent"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
