"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-8">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className="font-body text-sm tracking-widest uppercase text-muted transition-colors hover:text-accent aria-[current=page]:text-accent"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
