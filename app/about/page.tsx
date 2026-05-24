import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "A designer and developer based in Stockholm, crafting digital and print experiences.",
  openGraph: {
    title: "About — The Lookbook",
    description:
      "A designer and developer based in Stockholm, crafting digital and print experiences.",
  },
};

const skills = [
  "Brand Identity",
  "UX Design",
  "Product Design",
  "Art Direction",
  "Frontend Development",
  "Motion Design",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 lg:px-24">
      <h1 className="font-display text-4xl text-ink md:text-5xl">About</h1>
      <div className="mt-10 space-y-6 font-body text-lg leading-relaxed text-muted">
        <p>
          I&apos;m a designer and developer based in Stockholm, working at the
          intersection of visual design and thoughtful engineering. Every project
          starts with a question: <em>what story are we telling?</em>
        </p>
        <p>
          With over eight years of experience across agencies, startups, and
          freelance work, I&apos;ve learned that the best outcomes come from
          close collaboration, clear reasoning, and a willingness to iterate.
        </p>
        <p>
          When I&apos;m not at the desk, you&apos;ll find me hiking in
          Stockholm&apos;s archipelago, experimenting with risograph printing,
          or reading about typography history.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="font-display text-2xl text-ink">Skills &amp; Services</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-warm px-4 py-2 font-body text-sm text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <Link
          href="/projects"
          className="inline-block rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
        >
          View My Work
        </Link>
      </div>
    </div>
  );
}
