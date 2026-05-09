import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "La Revista — Noticias y análisis",
    template: "%s | La Revista",
  },
  description:
    "Mini revista digital con noticias de tecnología, deportes, cultura, economía y más. Honduras y Centroamérica.",
  openGraph: {
    title: "La Revista — Noticias y análisis",
    description:
      "Noticias y reportajes con diseño responsive y lectura clara en cualquier dispositivo.",
    locale: "es_HN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
        <Navbar></Navbar>
        {children}</body>
    </html>
  );
}
