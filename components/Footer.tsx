import Link from "next/link";
import { site } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-bg-ink text-white/70 pt-20 pb-8 relative overflow-hidden">
      <div className="wrap">
        <div
          className="font-display font-bold tracking-[-0.05em] leading-[0.85] text-center mb-14 select-none bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(120px, 22vw, 360px)",
            backgroundImage:
              "linear-gradient(180deg, rgba(248,200,74,0.14) 0%, rgba(232,98,26,0.04) 100%)",
          }}
        >
          UNIIX
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10">
          <div>
            <Logo light />
            <p className="text-[15px] leading-relaxed text-white/65 max-w-[38ch] mt-4">
              A creative digital agency designing bold brands and high-performance
              digital products from Colombo, working with clients globally.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50 mb-5">
              Services
            </h5>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services#design" className="text-[15px] text-white/85 hover:text-brand-1">Design</Link></li>
              <li><Link href="/services#growth" className="text-[15px] text-white/85 hover:text-brand-1">Growth</Link></li>
              <li><Link href="/services#technology" className="text-[15px] text-white/85 hover:text-brand-1">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50 mb-5">
              Studio
            </h5>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-[15px] text-white/85 hover:text-brand-1">About</Link></li>
              <li><Link href="/portfolio" className="text-[15px] text-white/85 hover:text-brand-1">Work</Link></li>
              <li><Link href="/contact" className="text-[15px] text-white/85 hover:text-brand-1">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50 mb-5">
              Connect
            </h5>
            <ul className="flex flex-col gap-3">
              <li><a href={`mailto:${site.email}`} className="text-[15px] text-white/85 hover:text-brand-1">{site.email}</a></li>
              <li><a href={site.whatsappLink} className="text-[15px] text-white/85 hover:text-brand-1">WhatsApp</a></li>
              <li><span className="text-[15px] text-white/85">{site.location}</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex justify-between items-center gap-6 flex-wrap font-mono text-[11px] tracking-[0.08em] uppercase text-white/45">
          <div>© 2026 Uniix Studio · All rights reserved</div>
          <div className="flex gap-2.5">
            <a href={site.socials.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/12 grid place-items-center text-white/65 hover:bg-brand-grad hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href={site.socials.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/12 grid place-items-center text-white/65 hover:bg-brand-grad hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>
            </a>
            <a href={site.socials.linkedin} aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/12 grid place-items-center text-white/65 hover:bg-brand-grad hover:text-white hover:border-transparent transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.7A1.7 1.7 0 1 1 8.2 6a1.7 1.7 0 0 1-1.7 1.7ZM19 19h-3v-5.4c0-1.3-.5-2-1.6-2-1.2 0-1.9.8-1.9 2V19h-3V9h2.9v1.3a3.4 3.4 0 0 1 3-1.6c2.1 0 3.6 1.3 3.6 4V19Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
