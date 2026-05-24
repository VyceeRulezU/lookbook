import type { Metadata } from "next";
import type { Project } from "@/types";

export function buildProjectMetadata(project: Project): Metadata {
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — The Lookbook`,
      description: project.tagline,
      images: [
        {
          url: project.coverImage.src,
          width: project.coverImage.width,
          height: project.coverImage.height,
          alt: project.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: [project.coverImage.src],
    },
  };
}
