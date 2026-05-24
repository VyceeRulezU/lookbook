"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { ImageItem } from "@/types";

interface ImageGalleryProps {
  images: ImageItem[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <figure
            key={index}
            className={`overflow-hidden rounded-lg bg-warm ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <button
              onClick={() => openLightbox(index)}
              className="relative block w-full cursor-pointer"
              style={{ aspectRatio: `${image.width}/${image.height}` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity hover:opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </button>
            {image.alt && (
              <figcaption className="px-4 py-2 font-body text-sm text-muted">
                {image.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 font-body text-2xl text-canvas transition-colors hover:text-accent"
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 font-body text-4xl text-canvas transition-colors hover:text-accent"
            aria-label="Previous image"
          >
            &lsaquo;
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={images[lightboxIndex].width}
              height={images[lightboxIndex].height}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 font-body text-4xl text-canvas transition-colors hover:text-accent"
            aria-label="Next image"
          >
            &rsaquo;
          </button>
          <p className="absolute bottom-6 font-body text-sm text-canvas/60">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
