export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  date: string; // ISO format YYYY-MM-DD
  readTime: string;
  author: {
    name: string;
    role: string;
    initial: string;
  };
  body: BlogSection[];
  featured?: boolean;
};

export const posts: BlogPost[] = [
  {
    slug: "design-systems-that-actually-scale",
    title: "Design systems that actually scale",
    excerpt:
      "Most design systems get abandoned within 18 months. Here's what we've learned shipping six of them — and the patterns that survive a year of real product work.",
    category: "Design",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80&auto=format&fit=crop",
    date: "2025-03-12",
    readTime: "8 min read",
    author: {
      name: "Sudewa Jayanath",
      role: "Founder · Uniix Studio",
      initial: "S",
    },
    featured: true,
    body: [
      {
        paragraphs: [
          "Every agency proposal we read in 2024 listed a 'design system' as a deliverable. By Q1 2025, half of those systems were already broken — components forked into one-off variants, tokens drifting from code, documentation 6 months stale.",
          "The pattern is consistent: teams build the system, then forget to operate it. A design system isn't a deliverable — it's an operating model.",
        ],
      },
      {
        heading: "1. Treat tokens as the source of truth, not components",
        paragraphs: [
          "When tokens are the source of truth, components can be re-skinned, swapped or rebuilt without breaking the visual identity. When components are the source of truth, every redesign is a migration.",
          "We export tokens from Figma to a single JSON file, transform them into platform-specific variables (CSS custom properties, Swift, Kotlin) at build time, and ban hardcoded colors in PRs via a lint rule.",
        ],
      },
      {
        heading: "2. Keep the API surface tiny",
        paragraphs: [
          "A Button with 14 props is not a design system — it's a configuration nightmare. Pick the 3-4 variants that cover 90% of cases and force the rest into a deliberate exception.",
          "The discipline isn't 'make components flexible' — it's 'make the right thing easy and the wrong thing hard'.",
        ],
      },
      {
        heading: "3. Ship docs in the same PR as the component",
        paragraphs: [
          "If documentation is a separate workstream, it never ships. Storybook + MDX in the same repo is a hard requirement.",
        ],
      },
    ],
  },
  {
    slug: "what-actually-ships-conversions",
    title: "What actually ships conversions on a SaaS landing page",
    excerpt:
      "We A/B-tested 23 pages last year. Most of the 'best practices' didn't move the needle. Here are the four that consistently did.",
    category: "Growth",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
    date: "2025-02-28",
    readTime: "6 min read",
    author: {
      name: "Nadeesha Perera",
      role: "Growth Lead",
      initial: "N",
    },
    body: [
      {
        paragraphs: [
          "Most SaaS landing page advice is folklore. We ran 23 controlled A/B tests across client launches in 2024 and found that the gap between 'common wisdom' and 'what moves CVR' is wide.",
        ],
      },
      {
        heading: "Specificity in the headline beats cleverness",
        paragraphs: [
          "Across 9 tests, headlines that named a specific outcome ('Cut your onboarding time by 60%') outperformed clever wordplay headlines by an average of 28%. Vague benefit promises always lost.",
        ],
      },
      {
        heading: "Social proof above the fold, not at the bottom",
        paragraphs: [
          "Logos and a single quote in the hero outperformed any below-the-fold testimonials section. Trust signals work when they're seen with the offer, not after.",
        ],
      },
    ],
  },
  {
    slug: "the-honest-cost-of-a-website-rebuild",
    title: "The honest cost of a website rebuild",
    excerpt:
      "Why the 'cheap quote' from a freelancer almost always ends up costing 3x what an agency rebuild would. The full breakdown.",
    category: "Strategy",
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80&auto=format&fit=crop",
    date: "2025-02-14",
    readTime: "5 min read",
    author: {
      name: "Sudewa Jayanath",
      role: "Founder · Uniix Studio",
      initial: "S",
    },
    body: [
      {
        paragraphs: [
          "Every quarter we get the same call: 'We hired a freelancer 6 months ago and now we need to rebuild it.' The quote was $2,000. The total cost of the redo, including the lost SEO and conversion lift, usually clears $30,000.",
        ],
      },
      {
        heading: "Where the hidden costs sit",
        paragraphs: [
          "It's not the redesign itself. It's the migration of broken URLs, the SEO recovery, the brand inconsistencies that need to be unlearned by the audience, and the team time spent managing a vendor who can't articulate trade-offs.",
          "A serious rebuild prices in the operating cost — not just the build cost.",
        ],
      },
    ],
  },
  {
    slug: "branding-mistakes-startups-make",
    title: "Five branding mistakes early-stage startups keep making",
    excerpt:
      "Logos before strategy, generic typography, naming the company after the founder. The patterns repeat — and they're all expensive to fix later.",
    category: "Branding",
    coverImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1600&q=80&auto=format&fit=crop",
    date: "2025-01-30",
    readTime: "7 min read",
    author: {
      name: "Sudewa Jayanath",
      role: "Founder · Uniix Studio",
      initial: "S",
    },
    body: [
      {
        paragraphs: [
          "We've worked with 40+ early-stage startups in the last three years. The same five branding mistakes show up in nearly every initial audit.",
        ],
      },
    ],
  },
  {
    slug: "performance-marketing-budgets",
    title: "How to think about performance marketing budgets in 2025",
    excerpt:
      "iOS privacy changes, AI-driven bidding, and saturated channels mean the old playbook is dead. Here's the framework we use with clients now.",
    category: "Marketing",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80&auto=format&fit=crop",
    date: "2025-01-15",
    readTime: "9 min read",
    author: {
      name: "Nadeesha Perera",
      role: "Growth Lead",
      initial: "N",
    },
    body: [
      {
        paragraphs: [
          "The 70/20/10 budget allocation rule is one of the few frameworks that survived the iOS privacy era — but only if you redefine what each bucket means in 2025.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return posts.slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
