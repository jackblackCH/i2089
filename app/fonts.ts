import localFont from "next/font/local";

/* Helvetica Neue LT Pro — Extended widths only (33/43/53/73/93).
   One family, five weights, so `font-weight` picks the cut and the
   browser never fakes a bold/light. Self-hosted and preloaded by
   next/font; files live in app/fonts/. */
export const helveticaNeue = localFont({
  variable: "--font-helvetica-neue",
  display: "swap",
  src: [
    { path: "./fonts/HelveticaNeueLTPro-ThEx.woff2", weight: "100", style: "normal" },
    { path: "./fonts/HelveticaNeueLTPro-LtEx.woff2", weight: "300", style: "normal" },
    { path: "./fonts/HelveticaNeueLTPro-Ex.woff2", weight: "400", style: "normal" },
    { path: "./fonts/HelveticaNeueLTPro-BdEx.woff2", weight: "700", style: "normal" },
    { path: "./fonts/HelveticaNeueLTPro-BlkEx.woff2", weight: "900", style: "normal" },
  ],
});
