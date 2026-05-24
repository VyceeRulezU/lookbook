export type Category = "web" | "mobile" | "print";

export interface ImageItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  featured: boolean;
  year: number;
  client: string;
  role: string;
  tags: string[];
  coverImage: ImageItem;
  images: ImageItem[];
  description: string;
  challenge: string;
  outcome: string;
  liveUrl?: string;
}
