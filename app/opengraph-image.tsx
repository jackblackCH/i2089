import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "i2089 — Marc Illien · Frontend & Agentic Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(180deg, #222 0%, #1a1a1a 18%, #111 45%)",
          color: "#ededed",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* top row — meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "#8a8a8a",
            fontSize: 22,
            letterSpacing: 1,
            textTransform: "uppercase",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>Marc Illien</span>
            <span>Zurich</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <span>i2089.com</span>
            <span>©2026</span>
          </div>
        </div>

        {/* centered triangle + i2089 wordmark.
            Satori doesn't render SVG <text>, so the wordmark is a plain
            <div> overlaid on the polygon. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 420,
              height: 364,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="420"
              height="364"
              viewBox="0 0 100 86.6"
              style={{ position: "absolute", inset: 0 }}
            >
              <polygon
                points="50,0 100,86.6 0,86.6"
                fill="none"
                stroke="#8a8a8a"
                strokeWidth="0.4"
                opacity="0.55"
              />
            </svg>
            <div
              style={{
                position: "relative",
                fontSize: 96,
                fontWeight: 500,
                letterSpacing: -8,
                color: "#ededed",
                marginTop: 40,
              }}
            >
              i2089
            </div>
          </div>
        </div>

        {/* bottom row — tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -3,
              fontWeight: 500,
            }}
          >
            Agentic. Coding.
          </span>
          <span
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -3,
              fontWeight: 500,
            }}
          >
            Engineering.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
