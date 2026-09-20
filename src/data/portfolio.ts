/* ============================================================
   PORTFOLIO DATA — Mst Arju Akter (Arju Akter)
   Single source of truth for services, projects, skills.
   Projects & stats synced with behance.net/mstarjuakter
   ============================================================ */

export const LINKS = {
  upwork: "https://www.upwork.com/freelancers/arjuakter",
  behance: "https://www.behance.net/mstarjuakter",
} as const;

export const profile = {
  name: "Mst Arju Akter",
  shortName: "Arju Akter",
  initials: "AA",
  // ---------------------------------------------------------
  // ★ PHOTO — real portrait pulled from the Behance profile.
  // To swap it later: replace `public/images/arju-portrait.png`
  // with a higher-res photo (keeps the same path & this config).
  // ---------------------------------------------------------
  PHOTO_SRC: "/images/arju-portrait.png" as string,
  role: "UI/UX & Graphic Designer",
  role2: "Web Developer",
  location: "Dhaka, Bangladesh",
  availability: "Available for freelance & full-time",
  heroBio:
    "I help startups and brands stand out with scroll-stopping logos, interfaces, social creatives and websites — designed to convert, built to last.",
  aboutBio:
    "I'm a passionate visual storyteller who bridges aesthetics with functionality. With a strong foundation in graphic design and a human-centered approach to digital experiences, I craft intuitive interfaces, compelling brand identities, and responsive websites that solve real user problems while aligning with business goals. My design philosophy revolves around clarity, consistency, and empathy — ensuring every pixel serves a purpose and every interaction feels intuitive.",
};

/* Stats sourced from the live Behance profile (views & appreciations
   across all published case studies). */
export const heroStats = [
  { value: "12", label: "Case Studies on Behance" },
  { value: "1.2K+", label: "Project Views" },
  { value: "70+", label: "Appreciations" },
  { value: "24h", label: "Avg. Response Time" },
] as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "pen" | "layers" | "share" | "spark" | "globe" | "play" | "megaphone";
  tags: string[];
};

export const services: Service[] = [
  {
    id: "logo",
    title: "Logo Design",
    description:
      "Distinctive marks and wordmarks engineered for recall — scalable from favicon to billboard.",
    icon: "pen",
    tags: ["Marks", "Wordmarks", "Monograms"],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Human-centered web & mobile experiences — research, wireframes, prototypes and design systems.",
    icon: "layers",
    tags: ["Research", "Prototypes", "Systems"],
  },
  {
    id: "social",
    title: "Social Media Design",
    description:
      "Scroll-stopping feeds, carousels and stories with a consistent, on-brand visual voice.",
    icon: "share",
    tags: ["Posts", "Carousels", "Stories"],
  },
  {
    id: "branding",
    title: "Branding",
    description:
      "Complete identity systems — strategy, palette, typography, guidelines and brand assets.",
    icon: "spark",
    tags: ["Identity", "Guidelines", "Assets"],
  },
  {
    id: "web",
    title: "Web Design",
    description:
      "Modern WordPress & Shopify sites — Elementor builds, landing pages and e-commerce.",
    icon: "globe",
    tags: ["WordPress", "Shopify", "Elementor"],
  },
  {
    id: "video",
    title: "Video Editing",
    description:
      "Crisp reels, promos and ads — cuts, captions, motion graphics and sound that hold attention.",
    icon: "play",
    tags: ["Reels", "Promos", "Motion"],
  },
  {
    id: "ads",
    title: "Banner & Ads Design",
    description:
      "High-CTR banners, posters and campaign creatives with sharp hierarchy and irresistible CTAs.",
    icon: "megaphone",
    tags: ["Banners", "Posters", "Campaigns"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  caseStudy: string;
  tools: string[];
  gradient: [string, string];
  mark: string;
  /** Real Behance gallery URL for this case study */
  url?: string;
  /** Real cover image (Behance CDN) shown on cards & modal */
  cover?: string;
};

/* Ordered newest-first, exactly as published on Behance. */
export const projects: Project[] = [
  {
    id: "ozver",
    title: "OZVER Clothing Brand Logo",
    category: "Logo Design",
    year: "2026",
    blurb: "Bold streetwear logo with an edgy custom wordmark.",
    caseStudy:
      "Logo and mini-identity for OZVER, a streetwear label targeting Gen-Z. The custom angular wordmark and badge lockups were built to work on tags, embroidery, oversized tees and social avatars — one mark, endless attitude.",
    tools: ["Illustrator", "Photoshop"],
    gradient: ["#5a5a5a", "#101010"],
    mark: "OZ",
    url: "https://www.behance.net/gallery/255323335/OZVER-Clothing-Brand-Logo-",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/e42942255323335.Y3JvcCw5NzU4LDc2MzMsMTIwLDA.jpg",
  },
  {
    id: "nuvia",
    title: "Nuvia Skin Care Brand Identity Design",
    category: "Brand Identity",
    year: "2026",
    blurb: "Soft, botanical identity for a modern skincare label.",
    caseStudy:
      "Full brand identity for Nuvia — a skincare line built on calm, clean beauty. I designed the wordmark, monogram, earthy palette and packaging system, then extended it across social templates and launch collateral for a cohesive shelf-to-screen presence.",
    tools: ["Illustrator", "Photoshop", "Figma"],
    gradient: ["#3d5a3a", "#101010"],
    mark: "N",
    url: "https://www.behance.net/gallery/255131551/Nuvia-Skin-Care-Brand-Identity-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/4d9d03255131551.Y3JvcCw3ODEyLDYxMTEsMTEwMiww.jpg",
  },
  {
    id: "dovtra",
    title: "Dovtra Tech Brand Logo — Letter D",
    category: "Logo Design",
    year: "2026",
    blurb: "Geometric letter-D mark for a modern tech brand.",
    caseStudy:
      "Logo design for Dovtra, a technology brand — a geometric letter-D mark engineered to stay crisp at every size, from app icons to signage. Delivered as a complete logo suite: primary mark, stacked lockup, monochrome variants and clear-space rules.",
    tools: ["Illustrator", "Photoshop"],
    gradient: ["#1e4d5a", "#101010"],
    mark: "D",
    url: "https://www.behance.net/gallery/254879901/Dovtra-Tech-Brand-Logo-Letter-D",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/8b3e5f254879901.Y3JvcCwxMzg4LDEwODYsMzAsMA.png",
  },
  {
    id: "recruitment-w",
    title: "Recruitment Agency Logo Branding — Letter W",
    category: "Logo & Branding",
    year: "2026",
    blurb: "Letter-W monogram that doubles as an upward arrow.",
    caseStudy:
      "Logo and branding for a recruitment agency, built around a custom letter-W monogram that reads as an upward arrow — growth, momentum and the right hire. Complete with palette, typography direction and social-ready avatar assets.",
    tools: ["Illustrator", "Photoshop"],
    gradient: ["#4d1e3a", "#101010"],
    mark: "W",
    url: "https://www.behance.net/gallery/254728975/Recruitment-Agency-Logo-Branding-Letter-W",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/2aa22b254728975.Y3JvcCwzODExLDI5ODEsMTc5LDE3OQ.jpg",
  },
  {
    id: "realestate",
    title: "Modern Real Estate Website with Smart Listing & Search",
    category: "UI/UX Design",
    year: "2026",
    blurb: "Property platform with smart listing & search.",
    caseStudy:
      "End-to-end website UI for a real-estate platform: smart listing & search, map-first browsing, property detail pages and an agent dashboard. Designed a full component library in Figma with accessible contrast and mobile-first responsive layouts.",
    tools: ["Figma", "Photoshop"],
    gradient: ["#1e4d3b", "#101010"],
    mark: "RE",
    url: "https://www.behance.net/gallery/248842859/Modern-Real-Estate-Website-with-Smart-listing-Search",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/2c670d248842859.Y3JvcCwxMzQyLDEwNTAsMjksMA.jpg",
  },
  {
    id: "rustpay",
    title: "RustPay — A Modern Fintech Ecosystem",
    category: "UI/UX · Fintech",
    year: "2026",
    blurb: "Fintech ecosystem — app, dashboard & brand touch.",
    caseStudy:
      "RustPay is a fintech ecosystem concept spanning a consumer app, merchant dashboard and marketing site. I mapped user flows for transfers and budgeting, then designed dark-mode-first interfaces with data-viz components and a trust-building visual language.",
    tools: ["Figma", "Illustrator"],
    gradient: ["#4d3a1e", "#101010"],
    mark: "R$",
    url: "https://www.behance.net/gallery/248269567/RustPay-A-Modern-Fintech-Ecosystem",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/bb7283248269567.Y3JvcCwzNDA5LDI2NjcsMjk1LDA.jpg",
  },
  {
    id: "jewelry",
    title: "Luxury Jewelry Social Media Post Design",
    category: "Social Media",
    year: "2026",
    blurb: "Gold-on-black content system for a jeweller.",
    caseStudy:
      "A premium social kit for a luxury jewelry brand: 30+ post templates, story frames and carousel layouts. Deep blacks, champagne golds and macro-style product treatments create a feed that feels like a vitrine.",
    tools: ["Photoshop", "Illustrator"],
    gradient: ["#5a4a1e", "#101010"],
    mark: "◆",
    url: "https://www.behance.net/gallery/245362781/Luxury-Jewelry-Social-Media-Post-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/bebebb245362781.Y3JvcCw4MDgsNjMyLDAsMA.png",
  },
  {
    id: "nuts",
    title: "Nuts Social Media Post Design",
    category: "Social Media",
    year: "2026",
    blurb: "Playful, crunchy feed for a snack brand.",
    caseStudy:
      "Playful content design for a nuts & snacks brand — bold typography, punchy colors and product-led layouts for promos, offers and festive campaigns. Built a repeatable template system the client can reuse in-house.",
    tools: ["Photoshop", "Illustrator"],
    gradient: ["#5a3a1e", "#101010"],
    mark: "N●",
    url: "https://www.behance.net/gallery/245362399/Nuts-Social-Media-Post-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/789957245362399.Y3JvcCw4MDgsNjMyLDAsMA.png",
  },
  {
    id: "pizza",
    title: "Social Media Pizza Ad Design",
    category: "Social Ads",
    year: "2026",
    blurb: "Mouth-watering food ads built for cravings.",
    caseStudy:
      "A series of delivery-app and social ads for a pizza brand — sizzling food photography treatments, bold offer badges and irresistible CTAs. Multiple sizes for stories, feeds and web banners from one master system.",
    tools: ["Photoshop", "Illustrator"],
    gradient: ["#5a1e1e", "#101010"],
    mark: "◍",
    url: "https://www.behance.net/gallery/245361893/Social-Media-Pizza-Ad-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/3b56a4245361893.Y3JvcCw4MDgsNjMyLDAsMA.png",
  },
  {
    id: "construction",
    title: "Construction Industry Social Media Ad Design",
    category: "Social Ads",
    year: "2026",
    blurb: "Trust-building B2B creatives for contractors.",
    caseStudy:
      "Ad creatives for a construction firm — service promos, project showcases and lead-gen banners. Industrial yellows, strong grids and proof-driven copy blocks communicate reliability at a glance across print and digital.",
    tools: ["Photoshop", "Illustrator"],
    gradient: ["#5a521e", "#101010"],
    mark: "▲",
    url: "https://www.behance.net/gallery/242853205/Construction-Industry-Social-Media-Ad-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/0028f6242853205.Y3JvcCw4MDgsNjMyLDAsMA.png",
  },
  {
    id: "awareness",
    title: "Awareness Campaign Social Media Creative Design",
    category: "Campaign · Poster",
    year: "2026",
    blurb: "Cause-driven posters with emotional punch.",
    caseStudy:
      "Poster series for a social awareness campaign — striking imagery, minimal copy and a unifying graphic device across formats. Designed for both street display and Instagram amplification.",
    tools: ["Photoshop", "Illustrator", "Figma"],
    gradient: ["#1e3a5a", "#101010"],
    mark: "◉",
    url: "https://www.behance.net/gallery/242853135/Awareness-Campaign-Social-Media-Creative-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/70697d242853135.Y3JvcCw4MDgsNjMyLDAsMA.png",
  },
  {
    id: "holicare",
    title: "Holicare Modern Healthcare Landing Page UI Design",
    category: "Web Design",
    year: "2025",
    blurb: "Warm, trustworthy landing page for a clinic.",
    caseStudy:
      "Landing page UI for Holicare clinic — appointment booking, doctor profiles, services and testimonials. The design balances clinical trust with human warmth through soft greens, generous whitespace and clear conversion paths.",
    tools: ["Figma", "WordPress", "Elementor"],
    gradient: ["#1e4d4a", "#101010"],
    mark: "H+",
    url: "https://www.behance.net/gallery/238209039/Holicare-Modern-Healthcare-Landing-Page-UI-Design",
    cover:
      "https://mir-s3-cdn-cf.behance.net/projects/808/fb1fdb238209039.Y3JvcCwyNDA2LDE4ODEsMCw1.jpg",
  },
];

export const skills = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "After Effects",
  "Premiere Pro",
  "WordPress",
  "Shopify",
  "Elementor",
  "UI/UX",
  "Branding",
  "Prototyping",
  "Design Systems",
] as const;

export const marqueeItems = [
  "Logo Design",
  "UI/UX Design",
  "Social Media",
  "Branding",
  "Web Design",
  "Banner & Ads",
  "Poster Design",
  "Video Editing",
] as const;

export const projectTypes = [
  "Logo Design",
  "UI/UX Design",
  "Social Media Design",
  "Branding",
  "Web Design (WordPress/Shopify)",
  "Banner & Poster Design",
  "Video Editing",
  "Something else",
] as const;
