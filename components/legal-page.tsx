import Link from "next/link";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-papier text-kohle">
      <header className="shell flex items-center justify-between py-6">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          Refugium
        </Link>
        <Link href="/" className="link text-sm">
          Zur Startseite
        </Link>
      </header>
      <main className="shell pt-16 pb-32 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <h1 className="display text-[clamp(3rem,7vw,6rem)] md:col-span-5">{title}</h1>
          <div className="max-w-[64ch] space-y-10 md:col-span-6 md:col-start-7 [&_a]:underline [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:tracking-tight [&_p+p]:mt-3">
            {children}
          </div>
        </div>
      </main>
      <footer className="shell hairline flex gap-6 border-t py-8 text-sm">
        <Link href="/impressum" className="link">Impressum</Link>
        <Link href="/datenschutz" className="link">Datenschutz</Link>
      </footer>
    </div>
  );
}
