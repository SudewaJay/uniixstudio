import { ImageResponse } from "next/og";
import { getService, getPillar } from "@/lib/services";

export const runtime = "edge";
export const alt = "Service — Uniix Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ServiceOG({
  params,
}: {
  params: Promise<{ pillar: string; service: string }>;
}) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const service = getService(pillarSlug, serviceSlug);
  const pillar = getPillar(pillarSlug);

  const accent = pillar?.accent ?? "#F07B20";
  const serviceName = service?.name ?? "Service";
  const pillarLabel = pillar?.label ?? "Services";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#1A1410",
          color: "#FBFAF6",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: accent,
            opacity: 0.35,
            filter: "blur(120px)",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FBFAF6",
            }}
          >
            UNIIX
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.22em",
              color: accent,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {pillarLabel}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#FBFAF6",
              fontFamily: "serif",
              fontWeight: 500,
              maxWidth: "900px",
            }}
          >
            {serviceName}
            <br />
            <span
              style={{
                fontStyle: "italic",
                background: `linear-gradient(135deg, ${accent} 0%, #F8C84A 100%)`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              in Sri Lanka.
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            color: "#FBFAF6",
            opacity: 0.7,
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          <span style={{ fontWeight: 500 }}>uniixstudio.com</span>
          <span style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Get a free consultation
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
