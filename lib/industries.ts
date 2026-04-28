export type Industry = {
  slug: string;
  name: string;
  description: string;
  image: string;
  accent: string; // hex used for the eyebrow label tint inside the card
  bg: string; // tailwind-compatible gradient classes — used as fallback if the image is slow
};

export const industries: Industry[] = [
  {
    slug: "education",
    name: "Education",
    description:
      "Empowering institutions with scalable digital platforms and seamless learning experiences.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80&auto=format&fit=crop",
    accent: "#60A5FA",
    bg: "from-[#0f172a] to-[#1e3a8a]",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Trusted digital systems that keep care personal and providers connected to outcomes.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&auto=format&fit=crop",
    accent: "#5EEAD4",
    bg: "from-[#042f2e] to-[#0f766e]",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    description:
      "Conversion-focused storefronts engineered to scale across markets and devices.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop",
    accent: "#F8C84A",
    bg: "from-[#451a03] to-[#9a3412]",
  },
  {
    slug: "corporate",
    name: "Corporate",
    description:
      "Polished, performance-led digital presence for enterprise and B2B brands.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    accent: "#A5B4FC",
    bg: "from-[#1e1b4b] to-[#3730a3]",
  },
  {
    slug: "travel",
    name: "Travel & Tourism",
    description:
      "Inspiring booking journeys that turn wanderlust into confirmed reservations.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop",
    accent: "#67E8F9",
    bg: "from-[#083344] to-[#0e7490]",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Property platforms that elevate listings and accelerate qualified inquiries.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
    accent: "#C4B5FD",
    bg: "from-[#2e1065] to-[#6d28d9]",
  },
  {
    slug: "finance",
    name: "Finance",
    description:
      "Trustworthy, secure-feeling experiences for fintech, banking and wealth.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
    accent: "#6EE7B7",
    bg: "from-[#022c22] to-[#065f46]",
  },
  {
    slug: "startups",
    name: "Startups & SaaS",
    description:
      "Launch-ready brands and product experiences engineered for breakneck growth.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop",
    accent: "#F8C84A",
    bg: "from-[#1c1917] to-[#7c2d12]",
  },
];
