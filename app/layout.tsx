import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refugium: Schutzraum-Genossenschaft bei Leipzig",
  description:
    "70 Familien, ein Schutzraum, eine Genossenschaft. Interessenliste für Mitteldeutschland offen.",
  // Erst entfernen, wenn Gutachten, Impressum und Datenschutz vorliegen.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Reveals nur mit JavaScript: ohne bleibt alles sichtbar. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
