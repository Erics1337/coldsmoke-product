import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
});

export const sf_pro = localFont({
  src: [
    {
      path: "./SF-Pro.ttf",
      style: "normal",
    },
  ],
  display: 'swap', // Add this to prevent FOUC
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // Add fallback fonts
});
