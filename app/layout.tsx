import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "i2089 - High quality design and web and 3D experiences made in Zurich",
  description:
    "i2089 - High quality design and web and 3D experiences made in Zurich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
