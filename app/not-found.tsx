import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Refugium",
  description: "Diese Seite gibt es nicht.",
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center">
      <h1 className="display text-[clamp(3rem,7vw,6rem)]">Diese Seite gibt es nicht.</h1>
      <Link href="/" className="link mt-8">
        Zur Startseite
      </Link>
    </main>
  );
}
