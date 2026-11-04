import Image from "next/image";
import Link from "next/link";

import { AnlageRundgang } from "@/components/anlage-rundgang";
import { Einheit3D } from "@/components/einheit-3d";
import { InteressenFormular } from "@/components/interessen-formular";
import { Kostenrechner } from "@/components/kostenrechner";
import { Reveal } from "@/components/reveal";
import { ScrollLitText } from "@/components/scroll-lit-text";
import { SiteHeader } from "@/components/site-header";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "1.967", label: "öffentliche Schutzräume gab es 2008." },
  { value: "579", label: "sind heute gewidmet. Laut Bundesregierung weder funktions- noch einsatzbereit." },
  { value: "0", label: "davon stehen in Ostdeutschland." },
];

const principles = [
  { title: "Eigentümer statt Kunde", text: "Ein Mitglied, eine Stimme. Unabhängig von der Größe der Einheit." },
  { title: "Selbstkosten statt Marge", text: "Kein Investor verdient mit. Jeder Euro steht im Jahresabschluss, ein Prüfungsverband kontrolliert." },
  { title: "Substanz statt Versprechen", text: "Ein Industriekeller aus Stahlbeton, rund 1 m Wandstärke. So baut heute kaum noch jemand." },
];

const units = [
  { name: "Kompakt", area: 6, people: 2, count: 20, share: "41.000 €", fee: "185 €", total: "290 €", twenty: "104.300 €" },
  { name: "Familie", area: 8, people: 3, count: 35, share: "52.000 €", fee: "215 €", total: "320 €", twenty: "122.500 €" },
  { name: "Familie plus", area: 10, people: 4, count: 15, share: "64.000 €", fee: "250 €", total: "355 €", twenty: "142.900 €" },
];

const notPromised = [
  "Absolute Sicherheit gibt es nicht. Wir bieten einen vorbereiteten Ort für den Fall, dass zu Hause nichts mehr geht.",
  "Vor einem Überraschungsangriff schützt der nächste Keller, nicht Refugium. Sie müssen die Anlage rechtzeitig erreichen.",
  "Die Genehmigung steht noch aus. Mehr als 100 Personen in einem Raum machen das Objekt zum Sonderbau.",
  "Die Schutzwirkung ist noch nicht begutachtet, und der Keller ist noch nicht vermessen.",
  "Ein Treuhandkonto schützt nur Geld, das noch nicht freigegeben ist. Frühe Einlagen sind Risikokapital.",
  "Das Fachteam hat eigene Familien. Seinen Einsatz im Ernstfall kann niemand erzwingen, deshalb sollen diese Familien mit eingeplant werden.",
  "Was geschieht, wenn Nichtmitglieder vor der Tür stehen, ist noch nicht geklärt. Wir klären das vor dem Betrieb, bewaffnete Einlasskontrollen wird es nicht geben.",
];

const steps = [
  { title: "Auf die Interessenliste", text: "Sie tragen ein, wo Sie wohnen und wie viele Personen Sie sind." },
  { title: "Telefonat", text: "Wir klären Anfahrt, Budget und Ihre Fragen. Der Wohnsitz sollte unter 60 Minuten entfernt liegen." },
  { title: "Infoabend mit Besichtigung", text: "Kommen Sie zu zweit, wenn Sie zu zweit entscheiden. Den Standort nennen wir erst nach der Prüfung." },
  { title: "Unterlagen und Bedenkzeit", text: "Sie erhalten Satzung, Pläne und Kosten und haben 14 Tage Zeit." },
  { title: "Absichtserklärung und Beitritt", text: "Erst danach werden Sie Mitglied und leisten eine Anzahlung auf ein Treuhandkonto." },
];

const Headline = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="display text-[clamp(3rem,7.5vw,6.5rem)]">
    {children}
  </h2>
);

export default function Home() {
  return (
    <>
      <div aria-hidden className="film-black" />
      <div aria-hidden className="film-grain" />
      <SiteHeader />

      <main id="top">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/images/halle.jpg"
          mediaAlt="Visualisierung der ausgebauten Halle: Betonpfeiler, Holzeinheiten auf zwei Ebenen und Familien an Tischen in der Mitte."
          bgImageSrc="/images/hero-licht.jpg"
          title="Gemeinsam vorgesorgt."
          date="Genossenschaft bei Leipzig"
          scrollToExpand="Scrollen, um die Anlage zu sehen"
          accentClassName="label text-papier"
          titleClassName="display film-title text-papier text-[clamp(3.75rem,10vw,7.5rem)]"
          letterbox
        >
          <div className="grid gap-10 pt-10 md:grid-cols-12 md:pt-24">
            <h1 className="display text-[clamp(2.75rem,6.5vw,6rem)] md:col-span-9">
              Ein vorbereiteter Ort für Ihre Familie, der Ihnen selbst gehört.
            </h1>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-xl text-gedimmt">
                70 Familien, ein Schutzraum, eine Genossenschaft. Interessenliste für Mitteldeutschland offen.
              </p>
              <Button asChild className="mt-8">
                <a href="#interessenliste">Auf die Interessenliste</a>
              </Button>
              <p className="mt-10 text-xs text-gedimmt">
                Bild: Visualisierung (KI-generiert). Der Keller wird noch vermessen.
              </p>
            </div>
          </div>
        </ScrollExpandMedia>

        <section aria-labelledby="lage-titel" className="section">
          <div className="shell">
            <Reveal>
              <Headline id="lage-titel">Im Osten: null.</Headline>
            </Reveal>
            <dl className="mt-20 grid md:mt-32 md:grid-cols-12 md:gap-x-10">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.value}
                  delay={i * 120}
                  className={`hairline border-t py-8 ${["md:col-span-5", "md:col-span-4", "md:col-span-3"][i]}`}
                >
                  <dd className={`display text-[clamp(5rem,11vw,10rem)] ${i === 2 ? "text-messing" : ""}`}>
                    {stat.value}
                  </dd>
                  <dt className="mt-4 max-w-[30ch] text-gedimmt">{stat.label}</dt>
                </Reveal>
              ))}
            </dl>
            <p className="mt-6 text-xs text-gedimmt">Quellen: Bundesregierung, BImA und BBK laut ZDFheute (01/2026).</p>
            <div className="mt-32 grid md:mt-56 md:grid-cols-12">
              <ScrollLitText
                className="display text-[clamp(2.25rem,5vw,4.5rem)] md:col-span-9 md:col-start-4"
                text="Bei einem Überraschungsangriff schützt der nächste Keller. Refugium ist für das, was länger dauert: Blackout, Chemie- oder Kernkraftunfall, eine Lage, die sich zuspitzt."
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="eg-titel" className="section bg-papier text-kohle">
          <div className="shell grid gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Headline id="eg-titel">Kein Betreiber. Keine Rendite. Ihre Anlage.</Headline>
            </Reveal>
            <dl className="md:col-span-4 md:col-start-9 md:pt-40">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 100} className="hairline border-t py-7">
                  <dt className="font-serif text-2xl tracking-tight">{p.title}</dt>
                  <dd className="mt-2 text-grau">{p.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <AnlageRundgang />

        <section id="kosten" aria-labelledby="kosten-titel" className="section bg-papier text-kohle">
          <div className="shell">
            <div className="grid gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-8">
                <Headline id="kosten-titel">Drei Größen. Alle Kosten offen.</Headline>
              </Reveal>
              <Reveal delay={120} className="md:col-span-3 md:col-start-10 md:self-end">
                <p className="text-grau">
                  Der Anteil zahlt die Einheit, der Monatsbetrag den Betrieb und 15 Jahre lang den Kredit.
                </p>
              </Reveal>
            </div>

            <div className="mt-20 md:mt-32">
              <Einheit3D />
            </div>

            <div className="mt-20 md:mt-32">
              {units.map((u) => (
                <Reveal key={u.name} className="hairline grid gap-6 border-t py-10 md:grid-cols-12 md:gap-x-10">
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-4xl tracking-tight">{u.name}</h3>
                    <p className="mt-1 text-grau">
                      {u.area} m² für {u.people} Personen, {u.count} Einheiten geplant
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-[1fr_1fr_1fr_1.4fr]">
                    {[
                      ["Anteil", u.share],
                      ["Beitrag im Monat", u.fee],
                      ["Mit Kredit im Monat", u.total],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-sm text-grau">{label}</dt>
                        <dd className="mt-1 font-serif text-3xl tracking-tight">{value}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="text-sm text-grau">Summe über 20 Jahre</dt>
                      <dd className="display mt-1 text-5xl">{u.twenty}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
              <p className="hairline max-w-[64ch] border-t pt-8 text-sm text-grau">
                Der Kreditaufschlag beträgt 105 € im Monat für 15 Jahre. Wer rund 11.000 € mehr Anteil zahlt, vermeidet
                ihn. Alle Beträge sind Schätzungen vor der Fachplanung und können sich ändern.
              </p>
            </div>

            <div className="mt-24 md:mt-40">
              <Kostenrechner />
            </div>
          </div>
        </section>

        <section aria-labelledby="nicht-titel" className="section bg-schiefer">
          <div className="shell grid gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:sticky md:top-32 md:self-start">
              <Headline id="nicht-titel">Was wir nicht versprechen.</Headline>
            </Reveal>
            <ul className="md:col-span-6 md:col-start-7">
              {notPromised.map((item) => (
                <Reveal key={item} className="hairline border-t py-7">
                  <li className="text-lg">{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="ablauf" aria-labelledby="ablauf-titel" className="section bg-papier text-kohle">
          <div className="shell grid gap-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <Headline id="ablauf-titel">Fünf Schritte. Keine Eile.</Headline>
              </Reveal>
              <ol className="mt-20">
                {steps.map((s, i) => (
                  <Reveal key={s.title} className="hairline grid grid-cols-[4rem_1fr] border-t py-7">
                    <li className="contents">
                      <span aria-hidden className="font-serif text-3xl">{i + 1}</span>
                      <div>
                        <h3 className="font-serif text-2xl tracking-tight">{s.title}</h3>
                        <p className="mt-1 max-w-[52ch] text-grau">{s.text}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
            <figure className="max-w-[320px] md:col-span-3 md:col-start-10 md:mt-56">
              <div className="zoom overflow-hidden">
                <Image src="/images/paar.jpg" alt="Ein Paar sitzt am Abend auf dem Sofa und hält sich an den Händen." width={360} height={640} sizes="320px" className="h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-xs text-grau">Symbolbild (KI-generiert)</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer id="interessenliste" className="overflow-hidden pt-32 md:pt-56">
        <div className="shell">
          <div className="grid gap-16 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="display text-[clamp(3rem,7.5vw,6.5rem)]">Tragen Sie sich ein.</h2>
              <p className="mt-8 text-xl text-gedimmt">
                Unter 70 belastbaren Absichtserklärungen zu diesen Preisen gibt es kein Projekt. Ihr Eintrag ist
                unverbindlich und hilft uns, das herauszufinden.
              </p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-6 md:col-start-7">
              <InteressenFormular />
            </Reveal>
          </div>
        </div>
        <p aria-hidden className="display mt-24 text-center text-[17.5vw] leading-[0.8] whitespace-nowrap text-papier md:mt-40">
          Refugium
        </p>
        <div className="shell hairline mt-10 border-t py-8 md:mt-16">
          <p className="font-serif text-2xl tracking-tight">Kein Angebot zur Kapitalanlage. Der Beitritt dient der Nutzung, nicht der Rendite.</p>
          <p className="mt-3 text-sm text-gedimmt">Refugium eG ist ein Arbeitstitel. Die Genossenschaft ist noch nicht gegründet.</p>
          <p className="mt-6 flex gap-6 text-sm">
            <Link href="/impressum" className="link">Impressum</Link>
            <Link href="/datenschutz" className="link">Datenschutz</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
