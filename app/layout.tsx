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
    images: "https://erics1337.github.io/coldsmoke-product/opengraph-image.png",
  },
  metadataBase: new URL("https://erics1337.github.io/coldsmoke-product/"),
  icons: {
    icon: "favicon.ico",
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
