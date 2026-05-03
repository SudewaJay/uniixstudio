import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const runtime = "edge";
export const alt = "Uniix Studio — Creative Design & Digital Agency in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default site OG image. Used as a fallback for any page that doesn't
 * export its own opengraph-image.tsx.
 */
export default async function OG() {
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
          background:
            "linear-gradient(135deg, #FBFAF6 0%, #FDF2DD 50%, #F5D9A8 100%)",
          position: "relative",
        }}
      >
        {/* Top row — wordmark + locale */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1A1410",
            }}
          >
            UNIIX
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.18em",
              color: "#3A2F26",
              textTransform: "uppercase",
            }}
          >
            Colombo · Working globally
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.18em",
              color: "#3A2F26",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Sri Lanka&apos;s Creative Digital Agency
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#1A1410",
              fontFamily: "serif",
              fontWeight: 500,
            }}
          >
            Design.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#F8C84A 0%,#F5A623 35%,#F07B20 70%,#E8621A 100%)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              Technology. Growth.
            </span>
          </div>
        </div>

        {/* Bottom row — domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#3A2F26",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ fontWeight: 500 }}>{site.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Selected since 2022
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
