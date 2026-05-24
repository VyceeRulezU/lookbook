import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import FeaturedStrip from "@/components/FeaturedStrip";

export const metadata: Metadata = {
  title: "The Lookbook",
  description:
    "Selected work in web, mobile, and print by a designer and developer.",
};

const approaches = [
  {
    title: "Strategy",
    description:
      "Every project starts with questions. Understanding the problem, the audience, and the context before opening a single tool.",
  },
  {
    title: "Craft",
    description:
      "Details are not details — they are the design. Typography, spacing, motion, and color are chosen with intention.",
  },
  {
    title: "Impact",
    description:
      "Good design is measurable. Better engagement, clearer communication, stronger brands — the work has to work.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedStrip />

      <section className="bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Approach
            </h2>
            <p className="mt-4 font-body text-lg text-muted">
              Design is not decoration. It is a process of discovery, distillation,
              and delivery. Every project follows the same philosophy.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {approaches.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12 lg:px-24">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 font-body text-lg text-muted">
            Available for freelance commissions, collaborations, and
            full-time roles.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-block rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
