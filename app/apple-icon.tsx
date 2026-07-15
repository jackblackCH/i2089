import { ImageResponse } from "next/og";

// Apple touch icon — 180x180. White circle on transparent bg with
// 'i2089' centered inside. iOS applies its own corner radius but
// leaves transparency alone, so the circle sits cleanly on any
// homescreen wallpaper.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function AppleIcon() {
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
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "#ffffff",
            color: "#0b0b0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 52,
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
