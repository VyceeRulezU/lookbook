import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ghost bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link
          href="/"
          aria-label="The Lookbook — home"
          className="font-display text-xl text-ink"
        >
          The Lookbook
        </Link>
        <nav aria-label="Main navigation">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
