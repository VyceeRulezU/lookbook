import type { Project, Category } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "vessel-brand-identity",
    title: "Vessel — Brand Identity",
    tagline: "A comprehensive brand system for a modern creative studio.",
    category: "web",
    featured: true,
    year: 2024,
    client: "Vessel Studio",
    role: "Art Direction + Web Design",
    tags: ["Branding", "Figma", "Motion"],
    coverImage: {
      src: "https://images.pexels.com/photos/5691679/pexels-photo-5691679.jpeg?auto=compress",
      alt: "Vessel brand identity — abstract geometric shapes in warm tones on a desk",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/5426402/pexels-photo-5426402.jpeg?auto=compress",
        alt: "Vessel brand stationery spread — business cards and letterhead",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/3747295/pexels-photo-3747295.jpeg?auto=compress",
        alt: "Vessel color palette and typography exploration on a mood board",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/4126705/pexels-photo-4126705.jpeg?auto=compress",
        alt: "Vessel brand guidelines booklet mockup",
        width: 800,
        height: 1100,
      },
    ],
    description:
      "Vessel Studio needed a brand identity that reflected their philosophy of 'holding creative space' for clients. The result is a warm, organic system built around vessel-like shapes and a restrained earth-toned palette.",
    challenge:
      "The studio wanted to feel established and premium despite being relatively new. They needed a system that could flex across digital and print without losing coherence.",
    outcome:
      "A complete brand system including logo, color palette, typography, stationery, and a website. The studio reported a 40% increase in inbound inquiries within three months.",
    liveUrl: "https://vessel-studio.example.com",
  },
  {
    id: "2",
    slug: "forma-app",
    title: "Forma App",
    tagline: "A fitness app that adapts to your body, not the other way around.",
    category: "mobile",
    featured: true,
    year: 2024,
    client: "Forma Labs",
    role: "Product Design + Prototyping",
    tags: ["UX Research", "Figma", "Prototype", "iOS"],
    coverImage: {
      src: "https://images.pexels.com/photos/7675095/pexels-photo-7675095.jpeg?auto=compress",
      alt: "Forma fitness app displayed on an iPhone held in hand",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/4944001/pexels-photo-4944001.jpeg?auto=compress",
        alt: "Forma app onboarding screens showing adaptive workout selection",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/20240039/pexels-photo-20240039.jpeg?auto=compress",
        alt: "Forma app workout tracking dashboard with metrics",
        width: 800,
        height: 1100,
      },
      {
        src: "https://images.pexels.com/photos/3763872/pexels-photo-3763872.jpeg?auto=compress",
        alt: "Forma app user profile and progress visualization",
        width: 1200,
        height: 800,
      },
    ],
    description:
      "Forma is an AI-powered fitness companion that learns your movement patterns, recovery rate, and preferences to build workouts that evolve with you. No two users see the same routine.",
    challenge:
      "Most fitness apps use static program templates. Forma needed an interface that could communicate dynamic, personalized recommendations without overwhelming the user.",
    outcome:
      "Launched with a 4.7 App Store rating. 92% of users reported sticking with their plan longer than with previous apps. Featured in the App Store's 'New Apps We Love' list.",
  },
  {
    id: "3",
    slug: "northlight-annual-report",
    title: "Northlight Annual Report",
    tagline: "An annual report that tells a story of light and impact.",
    category: "print",
    featured: true,
    year: 2023,
    client: "Northlight Co.",
    role: "Editorial Design + Art Direction",
    tags: ["Editorial", "Print", "Data Viz", "Illustration"],
    coverImage: {
      src: "https://images.pexels.com/photos/5691685/pexels-photo-5691685.jpeg?auto=compress",
      alt: "Northlight annual report spread with typography and data visualization",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/6801643/pexels-photo-6801643.jpeg?auto=compress",
        alt: "Northlight annual report cover with minimalist light-themed design",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress",
        alt: "Northlight report interior spread with financial data charts",
        width: 1200,
        height: 800,
      },
    ],
    description:
      "Northlight's annual report moves beyond dry financials into a narrative about how the company's work creates ripple effects. Each section opens with a custom illustration that visualizes the theme.",
    challenge:
      "Annual reports are often dense and unreadable. Northlight wanted theirs to be something stakeholders would actually keep on their coffee tables.",
    outcome:
      "Won an GDUSA Award for Editorial Design. Reduced print pages by 30% while increasing readability scores by 25% in reader surveys.",
  },
  {
    id: "4",
    slug: "drift-ecommerce",
    title: "Drift E-commerce",
    tagline: "A minimalist shopping experience for sustainable goods.",
    category: "web",
    featured: false,
    year: 2024,
    client: "Drift Supply",
    role: "UX Design + Frontend Development",
    tags: ["E-commerce", "UX Design", "Shopify", "Next.js"],
    coverImage: {
      src: "https://images.pexels.com/photos/6609229/pexels-photo-6609229.jpeg?auto=compress",
      alt: "Drift e-commerce website on a laptop showing product grid",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/6347709/pexels-photo-6347709.jpeg?auto=compress",
        alt: "Drift online store homepage with hero and featured categories",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/12911688/pexels-photo-12911688.jpeg?auto=compress",
        alt: "Drift product detail page with sustainability metrics",
        width: 1200,
        height: 800,
      },
    ],
    description:
      "Drift Supply sells everyday essentials with a sustainability-first ethos. Their e-commerce experience strips away e-commerce clutter — no pop-ups, no countdown timers, just clear product storytelling.",
    challenge:
      "Balancing the rich storytelling that sustainable brands need with the fast-loading, conversion-optimized experience shoppers expect.",
    outcome:
      "Average session duration increased by 2x. Cart abandonment rate dropped by 18% compared to their previous site.",
  },
  {
    id: "5",
    slug: "koto-mobile-banking",
    title: "Koto Mobile Banking",
    tagline: "Banking that feels human — a mobile-first experience for a digital bank.",
    category: "mobile",
    featured: false,
    year: 2023,
    client: "Koto Finance",
    role: "Lead Product Designer",
    tags: ["FinTech", "UX Research", "iOS", "Android"],
    coverImage: {
      src: "https://images.pexels.com/photos/4960650/pexels-photo-4960650.jpeg?auto=compress",
      alt: "Koto banking app interface on two smartphones side by side",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/23496937/pexels-photo-23496937.jpeg?auto=compress",
        alt: "Koto app home screen with balance and recent transactions",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/29502355/pexels-photo-29502355.jpeg?auto=compress",
        alt: "Koto app savings goals feature visualization",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/6331258/pexels-photo-6331258.jpeg?auto=compress",
        alt: "Koto app spending analytics dashboard",
        width: 800,
        height: 1100,
      },
    ],
    description:
      "Koto reimagines mobile banking by replacing complex menus with a conversational interface. Rather than hunting through settings, users can type or tap what they want to do.",
    challenge:
      "Building trust with users who are skeptical of digital-only banks, while keeping the interface simple enough for less tech-savvy customers.",
    outcome:
      "NPS score of 72 (industry average is 31). Customer acquisition cost 40% lower than competitors due to word-of-mouth.",
  },
  {
    id: "6",
    slug: "soil-type-specimen",
    title: "Soil Type Specimen",
    tagline: "A typographic and tactile exploration of soil as a design material.",
    category: "print",
    featured: false,
    year: 2023,
    client: "Personal",
    role: "Art Direction + Design",
    tags: ["Experimental", "Print", "Typography", "Risograph"],
    coverImage: {
      src: "https://images.pexels.com/photos/9017615/pexels-photo-9017615.jpeg?auto=compress",
      alt: "Soil type specimen book showing textured paper samples",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/4106621/pexels-photo-4106621.jpeg?auto=compress",
        alt: "Open specimen book with letterpress soil type classifications",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/7953297/pexels-photo-7953297.jpeg?auto=compress",
        alt: "Close-up of risograph printed soil particle patterns",
        width: 1200,
        height: 800,
      },
    ],
    description:
      "A self-initiated project that catalogs soil types through letterpress, risograph, and hand-made paper. Each soil type gets a typographic treatment inspired by its geological character.",
    challenge:
      "Translating non-visual qualities — texture, moisture, density — into purely visual and tactile print treatments.",
    outcome:
      "Published in a limited run of 200 copies. Selected for the 'Experimental Print' exhibition at the Type Directors Club.",
  },
  {
    id: "7",
    slug: "halo-saas-dashboard",
    title: "Halo SaaS Dashboard",
    tagline: "Analytics and reporting dashboards for a climate tech startup.",
    category: "web",
    featured: false,
    year: 2024,
    client: "Halo Inc.",
    role: "UX Design + Frontend",
    tags: ["SaaS", "Data Viz", "Dashboard", "React"],
    coverImage: {
      src: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress",
      alt: "Halo analytics dashboard on a large monitor with data charts",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/32396586/pexels-photo-32396586.jpeg?auto=compress",
        alt: "Halo dashboard main overview with carbon offset metrics",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress",
        alt: "Halo reporting module with exportable sustainability reports",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress",
        alt: "Halo team settings and permission management interface",
        width: 800,
        height: 1100,
      },
    ],
    description:
      "Halo helps companies track and reduce their carbon footprint. The dashboard transforms complex environmental data into clear, actionable insights for sustainability teams.",
    challenge:
      "Environmental data is notoriously messy and multi-dimensional. The dashboard needed to surface the most important signals without oversimplifying the science.",
    outcome:
      "Reduced time-to-insight for sustainability reports from 2 weeks to 4 hours. Adopted by 12 enterprise clients in the first quarter.",
  },
  {
    id: "8",
    slug: "bloom-event-branding",
    title: "Bloom Event Branding",
    tagline: "Visual identity for a design conference celebrating growth.",
    category: "print",
    featured: false,
    year: 2024,
    client: "Bloom Events",
    role: "Brand Design + Signage",
    tags: ["Branding", "Print", "Environmental", "Illustration"],
    coverImage: {
      src: "https://images.pexels.com/photos/18824346/pexels-photo-18824346.jpeg?auto=compress",
      alt: "Bloom conference branding on banners and signage at an event venue",
      width: 800,
      height: 600,
    },
    images: [
      {
        src: "https://images.pexels.com/photos/14303316/pexels-photo-14303316.jpeg?auto=compress",
        alt: "Bloom conference main stage with branded backdrop",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress",
        alt: "Bloom printed program and attendee badges",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress",
        alt: "Bloom wayfinding signage at the conference venue",
        width: 800,
        height: 1100,
      },
    ],
    description:
      "Bloom is an annual design conference focused on growth — personal, professional, and environmental. The visual identity uses botanical motifs and a vibrant palette to create a sense of emergence and energy.",
    challenge:
      "Creating a cohesive brand system that works across digital promotion, printed programs, environmental signage, and stage design.",
    outcome:
      "Sold out 1,200 tickets in 48 hours. Attendee survey rated the visual experience 9.2/10. Invited back for the next two editions.",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}
