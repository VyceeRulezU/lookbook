import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.PEXELS_API_KEY;
const PER_PAGE = 5;

const queries = [
  { slug: "vessel-brand-identity", q: "brand identity design studio" },
  { slug: "forma-app", q: "fitness app iPhone mockup" },
  { slug: "northlight-annual-report", q: "annual report editorial design" },
  { slug: "drift-ecommerce", q: "ecommerce sustainable website" },
  { slug: "koto-mobile-banking", q: "mobile banking finance app" },
  { slug: "soil-type-specimen", q: "paper texture typography print" },
  { slug: "halo-saas-dashboard", q: "analytics dashboard data" },
  { slug: "bloom-event-branding", q: "event conference branding" },
];

const coverOrient = { w: 800, h: 600, orient: "landscape" };
const galleryOrients = [
  { w: 1200, h: 800, orient: "landscape" },
  { w: 1200, h: 800, orient: "landscape" },
  { w: 800, h: 1100, orient: "portrait" },
];

async function searchPexels(query, perPage = 5) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pexels ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.photos || [];
}

function pickPhoto(photos, index, targetW, targetH) {
  if (photos.length === 0) return null;
  const photo = photos[index % photos.length];
  const src = photo.src?.large2x || photo.src?.large || photo.src?.original;
  return {
    src: src,
    alt: photo.alt || `Stock photo related to query`,
    width: targetW,
    height: targetH,
  };
}

async function main() {
  const projectsPath = resolve(__dirname, "..", "lib", "projects.ts");

  for (const { slug, q } of queries) {
    console.log(`Searching Pexels for "${q}"...`);
    const photos = await searchPexels(q, PER_PAGE);
    if (photos.length === 0) {
      console.log(`  No results for "${q}"`);
      continue;
    }
    console.log(`  Got ${photos.length} photos`);

    const cover = pickPhoto(photos, 0, 800, 600);
    const galleryImages = galleryOrients.map((g, i) =>
      pickPhoto(photos, i + 1, g.w, g.h)
    ).filter(Boolean);

    console.log(`  Cover: ${cover?.src}`);
    galleryImages.forEach((img, i) => console.log(`  Gallery ${i + 1}: ${img?.src}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
