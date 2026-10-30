// lib/seo-metadata.ts — hand-tuned titles + descriptions for the 10 highest-impact pages.
// Usage in each page.tsx:
//   export const metadata = pageMeta('/contact/')
//   return pageMeta(`/services/${pillar}/${slug}/`, { seo: service.seo })   // inside generateMetadata
// For these paths this file is the source of truth: it wins over the CMS meta title/description
// (the CMS SEO group still supplies OG image, noindex and canonical overrides).
import type { Metadata } from 'next'
import { buildMetadata, type MetaInput } from '@/lib/cms/seo'

export const SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Logo, Branding & Web Design Agency Sri Lanka | Uniix Studio',
    description:
      'Colombo creative studio for logo design, brand identity, UI/UX and websites. 5.0-rated on Fiverr. Free quote on WhatsApp within 24 hours.',
  },
  '/services/technology/mobile-apps/': {
    title: 'Mobile App Development Company in Sri Lanka | Uniix Studio',
    description:
      'iOS and Android app development in Sri Lanka with Flutter and React Native. Design, build and launch from one team. See app work and get a quote.',
  },
  '/services/design/ui-ux-design/': {
    title: 'UI/UX Design Agency in Sri Lanka | Web & App | Uniix Studio',
    description:
      'UI/UX design in Sri Lanka for websites and mobile apps: research, wireframes, Figma prototypes and design systems that convert. Get a free quote.',
  },
  '/services/': {
    title: 'Branding, Web Design & Digital Marketing Services | Uniix',
    description:
      'Logo and brand identity, UI/UX, websites, mobile apps, SEO and social media for Sri Lankan businesses. One studio, one team. Compare services and prices.',
  },
  '/services/design/packaging-design/': {
    title: 'Packaging & Label Design in Sri Lanka | Uniix Studio',
    description:
      'Packaging and label design in Sri Lanka: boxes, pouches and labels that are print-ready and shelf-ready. See the Bilesma case study and get a quote.',
  },
  '/locations/wattala/': {
    title: 'Web Design & Branding in Wattala | Uniix Studio',
    description:
      'Websites, logos and branding for Wattala businesses, with local SEO built in. See projects for nearby clients and get a free quote in 24 hours.',
  },
  '/contact/': {
    title: 'Contact Uniix Studio | Free Quote in 24 Hours',
    description:
      'Tell us about your logo, website or app project. WhatsApp +94 74 055 5898 or send the form and get a free quote within 24 hours. Based in Colombo.',
  },
  '/services/design/logo-design/': {
    title: 'Logo Design in Sri Lanka | Custom Logo Designers | Uniix',
    description:
      'Custom logo design in Sri Lanka: wordmarks, symbols and full brand lockups with usage rules. See real client logos and get a free quote in 24 hours.',
  },
  '/services/design/brand-identity/': {
    title: 'Brand Identity Design Sri Lanka | Logo to Guidelines | Uniix',
    description:
      'Complete brand identity for Sri Lankan businesses: logo system, colours, type, voice and templates in one brand guide. See case studies and packages.',
  },
  '/about/': {
    title: 'About Uniix Studio | Colombo Branding & Design Team',
    description:
      'Meet the Colombo team behind Uniix Studio: brand designers, UI/UX designers and developers working with clients in Sri Lanka, Australia and the UK.',
  },
}

export const hasPageMeta = (path: string) => path in SEO

export function pageMeta(path: string, extra: Partial<MetaInput> = {}): Metadata {
  const m = SEO[path]
  if (!m) throw new Error(`No SEO entry for ${path}`)
  const seo = extra.seo ? { ...extra.seo, metaTitle: null, metaDescription: null } : extra.seo
  return buildMetadata({ ...extra, path, title: m.title, description: m.description, seo })
}

// Site-wide pattern for every other page (49 titles are currently > 65 chars):
//   "[Service] in [Place] | Uniix Studio"  — max 60 chars, no year, buyer's search phrase first.
