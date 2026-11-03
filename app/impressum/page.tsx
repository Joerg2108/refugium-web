import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { CONTACT, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum | Refugium" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {CONTACT.name}
          <br />
          {CONTACT.company}
          <br />
          {CONTACT.street}
          <br />
          {CONTACT.city}
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          {CONTACT.name}, {CONTACT.street}, {CONTACT.city}
        </p>
      </section>
      <section>
        <h2>Hinweis zum Projekt</h2>
        <p>
          Refugium eG ist ein Arbeitstitel. Die Genossenschaft ist noch nicht gegründet. Kein Angebot zur Kapitalanlage.
          Der Beitritt dient der Nutzung, nicht der Rendite. Alle Zahlen sind vorläufige Schätzungen.
        </p>
      </section>
      <section>
        <h2>Bilder</h2>
        <p>Die Darstellungen der Anlage und der Personen sind KI-generierte Visualisierungen.</p>
      </section>
    </LegalPage>
  );
}
