# Refugium Website

Next.js 15, TypeScript, Tailwind CSS 4 und shadcn-Struktur.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

- `/` ist die Refugium-Startseite, dazu `/impressum` und `/datenschutz`.
- Der Hero liegt in `components/ui/scroll-expansion-hero.tsx`. `components/ui` ist der Standardpfad von shadcn:
  `components.json` zeigt dorthin, damit `npx shadcn add ...` neue Komponenten im selben Ordner ablegt
  und der Import `@/components/ui/...` überall gleich bleibt.

Vor Livegang:
- `SITE_INDEXABLE` in `lib/site.ts` auf `true` setzen. Das schaltet Indexierung und Sitemap-Eintrag frei.
- Bei eigener Domain `SITE_URL` in `lib/site.ts` anpassen.
- Impressum und Datenschutz rechtlich prüfen lassen.
