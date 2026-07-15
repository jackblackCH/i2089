import { ImageResponse } from "next/og";

// Favicon — 32x32. White circle on transparent bg with 'i2089'
// centered inside. At favicon size the wordmark is deliberately tiny;
// the circle carries the identity, the text confirms it on zoom.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#0b0b0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          i2089
        </div>
      </div>
    ),
    { ...size },
  );
}
