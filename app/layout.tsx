import type { Metadata, Viewport } from "next";
import "./globals.css";

import { pageMetadata } from "@/lib/seo";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Privater Schutzraum bei Leipzig | Refugium Genossenschaft",
    description:
      "Geplante Schutzraum-Genossenschaft bei Leipzig: 70 Familien teilen sich einen massiven Keller zu Selbstkosten. Interessenliste für Mitteldeutschland offen.",
    path: "/",
  }),
  robots: SITE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

// Läuft vor dem ersten Bild, damit die Startseite nicht kurz aufblitzt.
const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('refugium-intro')){d.classList.add('intro')}}catch(e){}})()`;

export const viewport: Viewport = { themeColor: "#1d1f20" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Reveals nur mit JavaScript: ohne bleibt alles sichtbar. */}
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
