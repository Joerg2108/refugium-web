import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { CONTACT, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz | Refugium" };

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
        <h2>Kontakt per E-Mail oder Telefon</h2>
        <p>
          Wenn Sie sich auf die Interessenliste eintragen oder uns schreiben, verarbeiten wir Ihre Angaben, um Ihre
          Anfrage zu bearbeiten und Sie über das Projekt zu informieren. Die Eintragung erfolgt per E-Mail, ein
          Formular gibt es nicht.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um einen möglichen Beitritt geht, sonst Art. 6
          Abs. 1 lit. f DSGVO. Wir löschen Ihre Daten, wenn sie dafür nicht mehr nötig sind oder Sie darum bitten,
          soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>
      <section>
        <h2>Kostenrechner und 3D-Modell</h2>
        <p>Beide laufen nur in Ihrem Browser. Ihre Eingaben werden nicht gespeichert und nicht übertragen.</p>
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
