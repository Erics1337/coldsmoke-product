import type { Metadata } from "next";
import "./globals.css";
import { sf_pro } from "./ui/fonts";

export const metadata: Metadata = {
  title: {
    default: "ColdSmoke Splitboards - Voodoo Product Showcase",
    template: "%s — ColdSmoke Splitboards",
  },
  description:
    "High quality snowboard products for people who love snow and movement.",
  openGraph: {
    images: "https://coldsmoke-splitboards.vercel.app/opengraph-image.png",
  },
  metadataBase: new URL("https://coldsmoke-splitboards.vercel.app/"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sf_pro.className} antialiased`}>{children}</body>
    </html>
  );
}
