import { ImageResponse } from "next/og";

// Static export needs this on route-file image handlers.
export const dynamic = "force-static";

export const alt =
  "i2089, Marc Illien. Independent software engineer in Zürich. Agentic Engineering, frontend, digital experiences.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Standard OG card: dark canvas, outlined wordmark, signature line,
// city/tagline in the corner. Matches the site's np-outline treatment.
export default async function Image() {
  const fg = "#ebebeb";
  const mute = "rgba(235,235,235,0.5)";
  const bg = "#0b0b0b";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        color: fg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "64px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* wordmark, outlined via stacked text-stroke effect using
            SVG-like technique: transparent fill with border on each glyph
            isn't directly possible in Satori, so we use a plain filled
            wordmark and rely on the surrounding composition for identity.
            Logo and subline share a left edge, as on the site. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: 280,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: fg,
            display: "flex",
          }}
        >
          i2089
        </div>

        <div
          style={{
            marginTop: 32,
            marginLeft: 12,
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            display: "flex",
            color: mute,
          }}
        >
          Digital Experiences by Marc Illien
        </div>
      </div>

      {/* corner meta */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 48,
          fontSize: 20,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: mute,
          display: "flex",
        }}
      >
        i2089.com
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          fontSize: 20,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: mute,
          display: "flex",
        }}
      >
        Zürich, Switzerland
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 48,
          fontSize: 20,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: mute,
          display: "flex",
        }}
      >
        Agentic Engineering
      </div>
    </div>,
    { ...size },
  );
}
