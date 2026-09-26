import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Uniix Studio — digital design, technology and growth for Finnish businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function FinlandOG() {
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
        <div
          style={{
            position: "absolute",
            top: "-220px",
            right: "-120px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "#A9C3D9",
            opacity: 0.22,
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-260px",
            right: "80px",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background: "#E8621A",
            opacity: 0.3,
            filter: "blur(140px)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>UNIIX STUDIO</div>
          <div style={{ display: "flex", gap: 18, fontSize: 16, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            <span style={{ color: "#A9C3D9" }}>Finland</span>
            <span style={{ opacity: 0.4 }}>×</span>
            <span style={{ color: "#F5A623" }}>Sri Lanka</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.04em", fontWeight: 500 }}>
          <span>Digital experiences built</span>
          <span>
            for ambitious{" "}
            <span style={{ color: "#F5A623", marginLeft: 18 }}>Finnish businesses.</span>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>Strategy · Design · Technology · Growth</span>
          <span>uniixstudio.com/finland</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
