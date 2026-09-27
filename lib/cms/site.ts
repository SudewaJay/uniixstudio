import 'server-only'
import type { About, Footer, Homepage, Nav, Setting } from '@/payload-types'
import { site } from '@/lib/content'
import { cmsQuery } from './cache'
import { imageSrc, resolveImage, str, type ResolvedImage } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag, globalTag } from './tags'

async function readGlobal<T>(slug: 'settings' | 'nav' | 'footer' | 'promo-bar' | 'stats' | 'homepage' | 'about', draft: boolean): Promise<T> {
  try {
    const payload = await getPayloadClient()
    return (await payload.findGlobal({ slug, depth: 2, draft, overrideAccess: draft })) as T
  } catch (err) {
    console.warn(`readGlobal(${slug}) failed:`, err)
    return {} as T
  }
}

/* -------------------------------- settings -------------------------------- */

export type SocialLink = { label: string; href: string }

export type SiteSettings = {
  name: string
  tagline: string
  description: string
  email: string
  phone?: string
  whatsapp?: string
  whatsappLink?: string
  location: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
    geo: { lat: number; lng: number }
  }
  businessHours: Array<{ days: string; hours: string }>
  socials: SocialLink[]
  analytics: {
    gaId?: string
    clarityId?: string
    metaPixelId?: string
    googleSiteVerification?: string
    bingSiteVerification?: string
  }
  logo?: ResolvedImage
  favicon?: string
  defaultOgImage?: string
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  behance: 'Behance',
  dribbble: 'Dribbble',
  twitter: 'X',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

/**
 * Site Settings. Blank CMS fields fall back to the defaults in lib/content.ts
 * so a fresh database can never render an empty email or phone.
 */
export function getSiteSettings(): Promise<SiteSettings> {
  return cmsQuery(['global', 'settings'], [globalTag('settings')], async (draft) => {
    const s = await readGlobal<Setting>('settings', draft)
    const a = s.address ?? {}
    const socials = Object.entries(SOCIAL_LABELS)
      .map(([key, label]) => ({ label, href: (s.socials as Record<string, string | null> | undefined)?.[key] ?? '' }))
      .filter((l) => l.href)
    return {
      name: s.siteName || site.name,
      tagline: s.tagline || site.tagline,
      description: s.metaDescription || site.description,
      email: s.email || site.email,
      phone: str(s.phone) ?? site.phone,
      whatsapp: str(s.whatsapp) ?? site.whatsapp,
      whatsappLink: str(s.whatsappLink) ?? site.whatsappLink,
      location: s.location || site.location,
      address: {
        streetAddress: a.streetAddress || site.businessAddress.streetAddress,
        addressLocality: a.addressLocality || site.businessAddress.addressLocality,
        addressRegion: a.addressRegion || site.businessAddress.addressRegion,
        postalCode: a.postalCode || site.businessAddress.postalCode,
        addressCountry: a.addressCountry || site.businessAddress.addressCountry,
        geo: {
          lat: a.lat ?? site.businessAddress.geo.lat,
          lng: a.lng ?? site.businessAddress.geo.lng,
        },
      },
      businessHours: (s.businessHours ?? []).map((h) => ({ days: h.days, hours: h.hours })),
      socials: socials.length
        ? socials
        : Object.entries(site.socials).map(([k, href]) => ({ label: SOCIAL_LABELS[k] ?? k, href })),
      analytics: {
        gaId: str(s.analytics?.gaId),
        clarityId: str(s.analytics?.clarityId),
        metaPixelId: str(s.analytics?.metaPixelId),
        googleSiteVerification: str(s.analytics?.googleSiteVerification),
        bingSiteVerification: str(s.analytics?.bingSiteVerification),
      },
      logo: resolveImage(s.logo),
      favicon: imageSrc(s.favicon),
      defaultOgImage: imageSrc(s.defaultOgImage, 'og'),
    }
  })
}

/* ------------------------------- navigation ------------------------------- */

export type NavItem = {
  label: string
  href: string
  newTab?: boolean
  children?: Array<{ label: string; href: string; description?: string }>
}
export type NavData = { items: NavItem[]; cta: { label: string; href: string } }

export function getNav(): Promise<NavData> {
  return cmsQuery(['global', 'nav'], [globalTag('nav')], async (draft) => {
    const n = await readGlobal<Nav>('nav', draft)
    return {
      items: (n.items ?? []).map((i) => ({
        label: i.label,
        href: i.href,
        newTab: Boolean(i.openInNewTab),
        children: (i.children ?? []).map((c) => ({ label: c.label, href: c.href, description: str(c.description) })),
      })),
      cta: { label: n.ctaLabel || 'Start a project', href: n.ctaHref || '/contact' },
    }
  })
}

/* --------------------------------- footer --------------------------------- */

export type FooterData = {
  locationsLabel: string
  ctaHeading?: string
  ctaHeadingAccent?: string
  ctaLabel?: string
  ctaHref?: string
  description?: string
  links: Array<{ label: string; href: string; newTab?: boolean }>
  showLocations: boolean
  legalLinks: Array<{ label: string; href: string; newTab?: boolean }>
  copyright?: string
}

const toLinks = (list: Footer['links']) =>
  (list ?? []).map((l) => ({ label: l.label ?? '', href: l.href ?? '/', newTab: Boolean(l.newTab) })).filter((l) => l.label)

export function getFooter(): Promise<FooterData> {
  return cmsQuery(['global', 'footer'], [globalTag('footer')], async (draft) => {
    const f = await readGlobal<Footer>('footer', draft)
    return {
      locationsLabel: f.locationsLabel || 'Areas we serve',
      ctaHeading: str(f.ctaHeading),
      ctaHeadingAccent: str(f.ctaHeadingAccent),
      ctaLabel: str(f.ctaLabel),
      ctaHref: str(f.ctaHref),
      description: str(f.description),
      links: toLinks(f.links),
      showLocations: f.showLocations !== false,
      legalLinks: toLinks(f.legalLinks),
      copyright: str(f.copyright),
    }
  })
}

/* ----------------------------- promo bar / stats ----------------------------- */

export type PromoBarData = { enabled: boolean; taglines: string[]; interval: number }

export function getPromoBar(): Promise<PromoBarData> {
  return cmsQuery(['global', 'promo-bar'], [globalTag('promo-bar')], async (draft) => {
    const p = await readGlobal<{ enabled?: boolean | null; taglines?: { text: string }[] | null; rotateInterval?: number | null }>(
      'promo-bar',
      draft,
    )
    return {
      enabled: p.enabled !== false,
      taglines: (p.taglines ?? []).map((t) => t.text).filter(Boolean),
      interval: p.rotateInterval ?? 3800,
    }
  })
}

export type StatEntry = { value: string; label: string; detail: string }

export function getStats(): Promise<StatEntry[]> {
  return cmsQuery(['global', 'stats'], [globalTag('stats')], async (draft) => {
    const s = await readGlobal<{ entries?: { value: string; label: string; description?: string | null }[] | null }>('stats', draft)
    return (s.entries ?? []).map((e) => ({ value: e.value, label: e.label, detail: e.description ?? '' }))
  })
}

/* ---------------------------- homepage / about ---------------------------- */

export type SectionCopy = { eyebrow?: string; heading?: string; headingAccent?: string; support?: string }

export const toCopy = (g: { eyebrow?: string | null; heading?: string | null; headingAccent?: string | null; support?: string | null } | null | undefined): SectionCopy => ({
  eyebrow: str(g?.eyebrow),
  heading: str(g?.heading),
  headingAccent: str(g?.headingAccent),
  support: str(g?.support),
})

/** Raw homepage global — the page resolves relationships into section props. */
export function getHomepage(): Promise<Homepage> {
  return cmsQuery(
    ['global', 'homepage'],
    [globalTag('homepage'), collectionTag('projects'), collectionTag('pillars'), collectionTag('industries')],
    (draft) => readGlobal<Homepage>('homepage', draft),
  )
}

export function getAbout(): Promise<About> {
  return cmsQuery(['global', 'about'], [globalTag('about')], (draft) => readGlobal<About>('about', draft))
}
