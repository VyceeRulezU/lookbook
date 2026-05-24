"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Desktop nav */}
      <ul className="hidden items-center gap-8 md:flex">
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

      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="relative z-50 flex size-10 items-center justify-center md:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <div className="flex w-5 flex-col gap-[5px]">
          <span className="h-[2px] w-full bg-ink transition-all duration-300" />
          <span className="h-[2px] w-full bg-ink transition-all duration-300" />
          <span className="h-[2px] w-full bg-ink transition-all duration-300" />
        </div>
      </button>

      <style>{`dialog::backdrop { background: rgba(0,0,0,0.4); }`}</style>

      {/* Mobile menu dialog */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        style={{
          padding: 0,
          border: "none",
          borderRadius: 0,
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
          maxHeight: "100vh",
          backgroundColor: "#EDE9E0",
          margin: 0,
          top: 0,
          left: 0,
          position: "fixed",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-5 flex size-10 items-center justify-center"
            aria-label="Close menu"
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span className="h-[2px] w-full translate-y-[7px] rotate-45 bg-ink" />
              <span className="h-[2px] w-full opacity-0 bg-ink" />
              <span className="h-[2px] w-full -translate-y-[7px] -rotate-45 bg-ink" />
            </div>
          </button>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col items-center gap-8">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === href ? "page" : undefined}
                    className="font-display text-4xl text-ink transition-colors hover:text-[#C8A96E] aria-[current=page]:text-[#C8A96E]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
