import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/hero-bg/1920/1080"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12 lg:px-24">
        <h1 className="animate-enter font-display text-6xl leading-tight text-canvas md:text-8xl">
          Design that
          <br />
          tells a story.
        </h1>
        <p className="animate-enter mt-6 max-w-xl font-body text-lg text-canvas/80">
          A curated portfolio of web, mobile, and print work —
          <br />
          each project a chapter in a larger narrative.
        </p>
        <Link
          href="/projects"
          className="animate-enter mt-10 inline-block rounded-full bg-accent px-8 py-3 font-body text-sm tracking-widest uppercase text-ink transition-all hover:bg-accent/90"
        >
          View Work
        </Link>
      </div>
    </section>
  );
}
