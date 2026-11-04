import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
import { CONTACT, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz | Refugium",
  description: "Welche Daten Refugium verarbeitet: Hosting, Interessenliste, E-Mail-Kontakt und Ihre Rechte nach der DSGVO.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <section>
        <h2>Verantwortlicher</h2>
        <p>
          {CONTACT.name}, {CONTACT.company}, {CONTACT.street}, {CONTACT.city}
          <br />
          Telefon: {CONTACT.phone}, E-Mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
      <section>
        <h2>Hosting und Server-Logdaten</h2>
        <p>
          Diese Website liegt bei Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA. Beim Aufruf verarbeitet
          der Anbieter technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und
          Betriebssystem.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einem sicheren und
          stabilen Betrieb. Netlify, Inc. ist nach eigenen Angaben nach dem EU-U.S. Data Privacy Framework zertifiziert.
          Daten können dabei in die USA übermittelt werden. Mehr steht in der{" "}
          <a href="https://www.netlify.com/privacy/">Datenschutzerklärung von Netlify</a>.
        </p>
      </section>
      <section>
        <h2>Cookies, Analyse und externe Inhalte</h2>
        <p>
          Wir setzen keine Cookies, keine Analyse-Werkzeuge und keine Werbe-Tracker ein. Schriften und Skripte liegen
          auf dem eigenen Hosting. Es werden keine Inhalte von Dritten nachgeladen.
        </p>
      </section>
      <section>
        <h2>Interessenliste</h2>
        <p>
          Wenn Sie sich eintragen, verarbeiten wir Name, E-Mail-Adresse, Wohnort, Personenzahl und, falls angegeben,
          Telefonnummer, gewünschte Einheit und Ihre Frage. Damit prüfen wir die Nachfrage, nehmen Kontakt zu Ihnen auf
          und informieren Sie über das Projekt.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, weil es um einen möglichen Beitritt geht. Das Formular läuft
          über Netlify Forms. Ihre Angaben werden bei Netlify gespeichert, und Netlify prüft Einträge zur Spam-Abwehr
          automatisch mit dem Dienst Akismet. Wir erhalten eine Benachrichtigung per E-Mail.
        </p>
        <p>
          Wir löschen Ihre Angaben, wenn sie nicht mehr nötig sind, spätestens wenn das Projekt endet oder Sie darum
          bitten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>
      <section>
        <h2>Kontakt per E-Mail oder Telefon</h2>
        <p>
          Wenn Sie uns direkt schreiben oder anrufen, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu bearbeiten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, bei Fragen zu einem möglichen Beitritt Art. 6 Abs. 1 lit. b
          DSGVO.
        </p>
      </section>
      <section>
        <h2>Kostenrechner und 3D-Modell</h2>
        <p>Beide laufen nur in Ihrem Browser. Diese Eingaben werden nicht gespeichert und nicht übertragen.</p>
      </section>
      <section>
        <h2>Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und
          Datenübertragbarkeit (Art. 15 bis 20 DSGVO). Sie können einer Verarbeitung nach Art. 6 Abs. 1 lit. f DSGVO
          widersprechen (Art. 21 DSGVO). Schreiben Sie dazu an die oben genannte Adresse.
        </p>
        <p>
          Sie können sich außerdem bei einer Aufsichtsbehörde beschweren. Für uns zuständig ist die{" "}
          <a href="https://www.datenschutz.sachsen.de">Sächsische Datenschutz- und Transparenzbeauftragte</a>.
        </p>
      </section>
      <p className="text-sm text-grau">Stand: November 2026</p>
    </LegalPage>
  );
}
