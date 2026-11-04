export const faqItems = [
  {
    q: "Was passiert mit meinem Geld, wenn das Projekt scheitert?",
    a: "Das Projekt läuft in Stufen. Anzahlungen liegen auf einem Treuhandkonto, das schützt aber nur Geld, das noch nicht freigegeben ist. Frühe Einlagen sind Risikokapital, ein Totalverlust ist dort möglich. Gebaut wird erst, wenn genug Mitglieder verbindlich gezeichnet haben. Kommt das Projekt nicht zustande, soll die Genossenschaft aufgelöst und das Restguthaben zurückgezahlt werden.",
  },
  {
    q: "Ist das eine Geldanlage?",
    a: "Nein. Der Anteil ist ein Nutzungsrecht. Es gibt keine Rendite, und die Anlage wird über Jahrzehnte abgeschrieben.",
  },
  {
    q: "Kann ich wieder aussteigen?",
    a: "Geplant ist eine Kündigungsfrist von fünf Jahren. Beim Austritt kann deutlich weniger zurückfließen, als Sie eingezahlt haben. Die genaue Regel legt die Satzung fest.",
  },
  {
    q: "Kann ich die Einheit vererben?",
    a: "Geplant ist eine Übertragung an Angehörige und an zugelassene Nachrücker von der Warteliste. Einen freien Marktpreis gibt es nicht.",
  },
  {
    q: "Schützt Refugium vor einem Atomangriff?",
    a: "Das versprechen wir nicht. Bei einem Überraschungsangriff schützt der nächste Keller. Refugium ist für längere Lagen gedacht, etwa einen Blackout, einen Chemie- oder Kernkraftunfall oder eine Lage, die sich zuspitzt. Die Schutzwirkung muss ein Gutachter noch bewerten.",
  },
  {
    q: "Wo liegt die Anlage?",
    a: "Im Raum Leipzig. Die genaue Lage nennen wir erst nach der Prüfung, beim Infoabend mit Besichtigung. Ihr Wohnsitz sollte unter 60 Minuten entfernt liegen.",
  },
  {
    q: "Wie läuft es im Ernstfall ab?",
    a: "Der Vorstand ruft Stufen aus: erst Technik prüfen und Fachteam informieren, dann bereiten Mitglieder den Einzug vor, dann öffnet die Anlage. Über die Rückkehr entscheidet der Krisenstab. Die genauen Regeln stehen in einer Hausordnung, die Teil der Satzung werden soll.",
  },
  {
    q: "Was deckt der monatliche Beitrag?",
    a: "Den Betrieb: Wartung von Technik und Filtern, Vorrat für 14 Tage, zwei Übungen im Jahr, Notfallplan für Ihre Familie, Versicherung und Verwaltung. Die eG macht damit keinen Gewinn.",
  },
  {
    q: "Wer entscheidet, und wer haftet?",
    a: "Jedes Mitglied hat eine Stimme in der Generalversammlung. Geplant sind zwei Vorstände und ein Aufsichtsrat mit drei bis fünf Personen, ein Prüfungsverband kontrolliert. Eine Nachschusspflicht ist ausgeschlossen.",
  },
  {
    q: "Gibt es barrierefreie Einheiten?",
    a: "Das ist geplant, die Einzelheiten hängen von der Fachplanung ab. Sprechen Sie es beim Telefonat an.",
  },
  {
    q: "Wann ist die Anlage fertig?",
    a: "Nach heutiger Planung beginnt der Bau etwa im Monat 16 nach Projektstart, der Betrieb etwa im Monat 30. Beides hängt von Genehmigung und Zeichnungen ab.",
  },
];

export function Faq() {
  return (
    <section id="fragen" aria-labelledby="fragen-titel" className="section bg-schiefer">
      <div className="shell grid gap-16 md:grid-cols-12">
        <h2 id="fragen-titel" className="display text-[clamp(3rem,7.5vw,6.5rem)] md:sticky md:top-32 md:col-span-5 md:self-start">
          Ihre Fragen.
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          {faqItems.map((item) => (
            <details key={item.q} name="faq" className="group hairline border-t">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-serif text-2xl tracking-tight [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="text-messing transition-transform duration-500 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[58ch] pb-8 text-gedimmt">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
