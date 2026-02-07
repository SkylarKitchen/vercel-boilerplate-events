import type { Metadata } from "next";
import localFont from "next/font/local";
import DevTools from "@/components/DevTools";
import "./globals.css";

const anthropicSans = localFont({
  src: [
    {
      path: "../../public/fonts/AnthropicSans-Roman-Web.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/AnthropicSans-Italic-Web.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-anthropic-sans",
  display: "swap",
});

const anthropicSerif = localFont({
  src: [
    {
      path: "../../public/fonts/AnthropicSerif-Roman-Web.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/AnthropicSerif-Italic-Web.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-anthropic-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code with Claude 2026 — Anthropic",
  description:
    "Anthropic's annual developer conference. Join us in San Francisco, London, and Tokyo for hands-on workshops, technical sessions, and direct access to our product and research teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anthropicSans.variable} ${anthropicSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <DevTools />
      </body>
    </html>
  );
}
