import Image from "next/image";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { Button } from "@/components/ui/button";
import { AnlageRundgang } from "@/components/anlage-rundgang";
import { ScrollLitText } from "@/components/scroll-lit-text";
import { UnitPlan } from "@/components/unit-plan";
import { INTEREST_HREF } from "@/lib/site";

const units = [
  { name: "Kompakt", area: 6, people: 2, count: 20, share: "41.000 €", fee: "185 €", total: "290 €", twenty: "104.300 €" },
  { name: "Familie", area: 8, people: 3, count: 35, share: "52.000 €", fee: "215 €", total: "320 €", twenty: "122.500 €" },
  { name: "Familie plus", area: 10, people: 4, count: 15, share: "64.000 €", fee: "250 €", total: "355 €", twenty: "142.900 €" },
];

const steps = [
  { title: "Auf die Interessenliste", text: "Sie schreiben uns kurz, wo Sie wohnen und wie viele Personen Sie sind." },
  { title: "Telefonat", text: "Wir klären Anfahrt, Budget und Ihre Fragen. Der Wohnsitz sollte unter 60 Minuten entfernt liegen." },
  { title: "Infoabend mit Besichtigung", text: "Kommen Sie zu zweit, wenn Sie zu zweit entscheiden. Den Standort nennen wir erst nach der Prüfung." },
  { title: "Unterlagen und Bedenkzeit", text: "Sie erhalten Satzung, Pläne und Kosten und haben 14 Tage Zeit." },
  { title: "Absichtserklärung und Beitritt", text: "Erst danach werden Sie Mitglied und leisten eine Anzahlung auf ein Treuhandkonto." },
];

const notPromised = [
  "Absolute Sicherheit gibt es nicht. Wir bieten einen vorbereiteten Ort für den Fall, dass zu Hause nichts mehr geht.",
  "Vor einem Überraschungsangriff schützt der nächste Keller, nicht Refugium. Sie müssen die Anlage rechtzeitig erreichen.",
  "Die Genehmigung steht noch aus. Mehr als 100 Personen in einem Raum machen das Objekt zum Sonderbau.",
  "Die Schutzwirkung ist noch nicht begutachtet, und der Keller ist noch nicht vermessen.",
  "Ein Treuhandkonto schützt nur Geld, das noch nicht freigegeben ist. Frühe Einlagen sind Risikokapital.",
  "Das Fachteam hat eigene Familien. Seinen Einsatz im Ernstfall kann niemand erzwingen, deshalb sollen diese Familien mit eingeplant werden.",
];

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="max-w-[20ch] font-display text-4xl leading-[1.05] font-semibold text-balance md:text-6xl">
    {children}
  </h2>
);

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-tuer-tief/90 px-4 py-2 backdrop-blur-sm md:px-8">
        <span className="font-display text-2xl font-semibold text-nachleucht">Refugium</span>
        <Button asChild size="sm">
          <a href="#interessenliste">Auf die Interessenliste</a>
        </Button>
      </header>

      <main>
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/images/halle.jpg"
          mediaAlt="Visualisierung der ausgebauten Halle: Betonpfeiler, Holzeinheiten auf zwei Ebenen und Familien an Tischen in der Mitte."
          bgImageSrc="/images/beton.jpg"
          title="Gemeinsam vorgesorgt."
          date="Schutzraum-Genossenschaft bei Leipzig"
          scrollToExpand="Scrollen, um die Anlage zu sehen"
          accentClassName="text-nachleucht font-display"
        >
          <div className="max-w-3xl">
            <p className="mb-8 font-display text-sm">
              Visualisierung (KI-generiert). Der Keller wird noch vermessen, die Planung kann sich ändern.
            </p>
            <h1 className="font-display text-4xl leading-[1.05] font-semibold text-balance md:text-6xl">
              Ein vorbereiteter Ort für Ihre Familie, der Ihnen selbst gehört.
            </h1>
            <p className="mt-6 text-xl">
              70 Familien, ein Schutzraum, eine Genossenschaft. Interessenliste für Mitteldeutschland offen.
            </p>
            <Button asChild className="mt-8">
              <a href="#interessenliste">Auf die Interessenliste</a>
            </Button>
          </div>
        </ScrollExpandMedia>

        <section className="px-4 py-20 md:px-16 md:py-32">
          <div className="mx-auto max-w-6xl">
            <ScrollLitText
              className="max-w-[30ch] font-display text-3xl leading-[1.15] font-medium text-nachleucht md:text-6xl"
              text="2008 gab es 1.967 öffentliche Schutzräume. Heute sind 579 gewidmet, und keiner davon ist laut Bundesregierung funktions- oder einsatzbereit. In Ostdeutschland gibt es gar keinen."
            />
            <p className="mt-10 max-w-[62ch]">
              Der Bund baut keine neuen Bunker, sondern setzt auf dezentrale Zufluchtsorte. Für einen Angriff
              ohne Vorwarnung ist der nächste Keller die richtige Antwort. Refugium ist für das, was länger
              dauert: einen langen Blackout, einen Chemie- oder Kernkraftunfall oder eine Lage, die sich
              zuspitzt. Dann beziehen Sie Ihre Einheit vorsorglich.
            </p>
          </div>
        </section>

        <section className="bg-beton px-4 py-20 text-tinte md:px-16 md:py-32">
          <div className="mx-auto max-w-6xl">
            <Heading>Die Anlage gehört denen, die sie nutzen.</Heading>
            <dl className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
              <div>
                <dt className="font-display text-2xl font-semibold">Eigentümer statt Kunde</dt>
                <dd>Sie werden Mitglied und haben eine Stimme, unabhängig von der Größe Ihrer Einheit.</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold">Selbstkosten statt Marge</dt>
                <dd>Kein Investor verdient mit. Jeder Euro steht im Jahresabschluss, ein Prüfungsverband kontrolliert.</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold">Vorhandene Substanz</dt>
                <dd>Ein Industriekeller aus Stahlbeton mit rund 1 m Wandstärke. So baut heute kaum noch jemand.</dd>
              </div>
            </dl>
          </div>
        </section>

        <AnlageRundgang />

        <section className="bg-beton px-4 py-20 text-tinte md:px-16 md:py-32">
          <div className="mx-auto max-w-6xl">
            <Heading>Drei Größen, alle Kosten offen.</Heading>
            <p className="mt-6 max-w-[62ch]">
              Der Anteil zahlt die Einheit, der Monatsbetrag den Betrieb und 15 Jahre lang den Kredit. Die
              20-Jahres-Summe nennen wir, weil sie die ehrliche Zahl ist.
            </p>
            <div className="mt-12 divide-y divide-tinte/40 border-y border-tinte/40">
              {units.map((u) => (
                <article key={u.name} className="grid gap-6 py-8 md:grid-cols-[220px_1fr] md:gap-12">
                  <UnitPlan area={u.area} people={u.people} />
                  <div>
                    <h3 className="font-display text-3xl font-semibold">{u.name}</h3>
                    <p>
                      {u.area} m² für {u.people} Personen, {u.count} Einheiten geplant
                    </p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
                      {[
                        ["Geschäftsanteil", u.share],
                        ["Beitrag im Monat", u.fee],
                        ["Mit Kreditaufschlag", u.total],
                        ["Summe über 20 Jahre", u.twenty],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-display text-base">{label}</dt>
                          <dd className="font-display text-2xl font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-[62ch]">
              Der Kreditaufschlag beträgt 105 € im Monat für 15 Jahre. Wer rund 11.000 € mehr Anteil zahlt,
              vermeidet ihn. Alle Beträge sind Schätzungen vor der Fachplanung und können sich ändern.
            </p>
          </div>
        </section>

        <section className="bg-tuer-tief px-4 py-20 md:px-16 md:py-32">
          <div className="mx-auto max-w-6xl">
            <Heading>Was wir nicht versprechen.</Heading>
            <ul className="mt-12 grid max-w-5xl gap-x-16 gap-y-8 md:grid-cols-2">
              {notPromised.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-beton px-4 py-20 text-tinte md:px-16 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_300px] md:gap-20">
            <div>
              <Heading>In fünf Schritten zur Entscheidung.</Heading>
              <ol className="mt-12 space-y-8">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[3rem_1fr]">
                    <span aria-hidden className="font-display text-4xl leading-none font-semibold">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                      <p className="max-w-[56ch]">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="max-w-[300px]">
              <Image src="/images/paar.jpg" alt="Ein Paar sitzt am Abend auf dem Sofa und hält sich an den Händen." width={360} height={640} sizes="300px" className="h-auto w-full" />
              <figcaption className="mt-2 font-display text-sm">Symbolbild (KI-generiert)</figcaption>
            </figure>
          </div>
        </section>

        <section id="interessenliste" className="bg-tuer px-4 py-20 md:px-16 md:py-32">
          <div className="mx-auto max-w-6xl">
            <Heading>Tragen Sie sich unverbindlich ein.</Heading>
            <p className="mt-6 max-w-[62ch]">
              Unter 70 belastbaren Absichtserklärungen zu diesen Preisen gibt es kein Projekt. Mit Ihrem Eintrag
              helfen Sie uns, das herauszufinden. Sie gehen damit keine Verpflichtung ein.
            </p>
            <Button asChild className="mt-8">
              <a href={INTEREST_HREF}>Auf die Interessenliste</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-tuer-tief px-4 py-10 font-display md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-lg">Kein Angebot zur Kapitalanlage. Der Beitritt dient der Nutzung, nicht der Rendite.</p>
          <p className="mt-2 text-base">Refugium eG ist ein Arbeitstitel. Die Genossenschaft ist noch nicht gegründet.</p>
        </div>
      </footer>
    </>
  );
}
