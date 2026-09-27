import { ImageResponse } from "next/og";
import type { FiLang } from "@/lib/finland-i18n";

export const finlandOgSize = { width: 1200, height: 630 };

const COPY: Record<FiLang, { tags: [string, string, string]; h1: [string, string]; foot: string; url: string }> = {
  en: {
    tags: ["Design", "Technology", "Growth"],
    h1: ["Digital experiences built to move", "businesses forward."],
    foot: "Websites · Digital products · Brands · Growth",
    url: "uniixstudio.com/finland",
  },
  fi: {
    tags: ["Design", "Teknologia", "Kasvu"],
    h1: ["Digitaalisia kokemuksia, jotka vievät", "liiketoimintaa eteenpäin."],
    foot: "Verkkosivustot · Digitaaliset tuotteet · Brändit · Kasvu",
    url: "uniixstudio.com/finland/fi",
  },
};

/** Social preview for /finland in either language. */
export function renderFinlandOG(lang: FiLang) {
  const c = COPY[lang];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#12100E",
          color: "#FBFAF6",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: "-220px", right: "-120px", width: "560px", height: "560px", borderRadius: "50%", background: "#A9C3D9", opacity: 0.22, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "-260px", right: "80px", width: "620px", height: "620px", borderRadius: "50%", background: "#E8621A", opacity: 0.3, filter: "blur(140px)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>UNIIX STUDIO</div>
          <div style={{ display: "flex", gap: 18, fontSize: 16, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            <span>{c.tags[0]}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{c.tags[1]}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: "#F5A623" }}>{c.tags[2]}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: lang === "fi" ? 66 : 76, lineHeight: 1.04, letterSpacing: "-0.04em", fontWeight: 500 }}>
          <span>{c.h1[0]}</span>
          <span style={{ color: "#F5A623" }}>{c.h1[1]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>{c.foot}</span>
          <span>{c.url}</span>
        </div>
      </div>
    ),
    { ...finlandOgSize },
  );
}
