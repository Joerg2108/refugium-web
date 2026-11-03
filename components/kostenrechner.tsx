"use client";

import { useState } from "react";

const units = [
  { name: "Kompakt", area: 6, share: 41000, fee: 185 },
  { name: "Familie", area: 8, share: 52000, fee: 215 },
  { name: "Familie plus", area: 10, share: 64000, fee: 250 },
];

const SURCHARGE = 105;
const SURCHARGE_YEARS = 15;
const EXTRA_SHARE = 11000;

const euro = (value: number) => `${value.toLocaleString("de-DE")} €`;

export function Kostenrechner() {
  const [unitIndex, setUnitIndex] = useState(1);
  const [years, setYears] = useState(20);
  const [noSurcharge, setNoSurcharge] = useState(false);

  const unit = units[unitIndex];
  const share = unit.share + (noSurcharge ? EXTRA_SHARE : 0);
  const fees = unit.fee * 12 * years;
  const surcharge = noSurcharge ? 0 : SURCHARGE * 12 * Math.min(years, SURCHARGE_YEARS);
  const total = share + fees + surcharge;

  return (
    <section aria-labelledby="rechner-titel" className="grid gap-12 md:grid-cols-12 md:gap-x-10">
      <div className="md:col-span-5">
        <h3 id="rechner-titel" className="display text-[clamp(2.5rem,5vw,4rem)]">
          Rechnen Sie selbst.
        </h3>

        <fieldset className="mt-10">
          <legend className="text-sm text-grau">Einheit</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {units.map((u, i) => (
              <label
                key={u.name}
                className={`flex h-10 cursor-pointer items-center rounded-full border px-5 text-sm font-medium transition-colors duration-500 has-focus-visible:outline-2 has-focus-visible:outline-offset-3 ${
                  unitIndex === i ? "border-kohle bg-kohle text-papier" : "border-kohle/30 hover:border-kohle"
                }`}
              >
                <input
                  type="radio"
                  name="einheit"
                  checked={unitIndex === i}
                  onChange={() => setUnitIndex(i)}
                  className="sr-only"
                />
                {u.area} m²
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label htmlFor="jahre" className="text-sm text-grau">
            Nutzungsdauer: <span className="font-medium text-kohle">{years} Jahre</span>
          </label>
          <input
            id="jahre"
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-3 block w-full accent-kohle"
          />
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={noSurcharge}
            onChange={(e) => setNoSurcharge(e.target.checked)}
            className="mt-1.5 accent-kohle"
          />
          <span>Kreditaufschlag vermeiden, dafür rund {euro(EXTRA_SHARE)} mehr Anteil zahlen</span>
        </label>
      </div>

      <div className="md:col-span-6 md:col-start-7" aria-live="polite">
        <p className="text-sm text-grau">
          {unit.name}, {unit.area} m², über {years} Jahre
        </p>
        <p data-testid="summe" className="display mt-2 text-[clamp(4rem,9vw,8rem)]">
          {euro(total)}
        </p>
        <dl className="mt-8">
          {[
            ["Geschäftsanteil", euro(share)],
            [`Beiträge, ${unit.fee} € im Monat`, euro(fees)],
            [`Kreditaufschlag, ${SURCHARGE} € im Monat, maximal ${SURCHARGE_YEARS} Jahre`, euro(surcharge)],
            ["Im Schnitt pro Monat", euro(Math.round(total / (years * 12)))],
          ].map(([label, value]) => (
            <div key={label} className="hairline flex items-baseline justify-between gap-6 border-t py-3">
              <dt className="text-grau">{label}</dt>
              <dd className="font-serif text-2xl tracking-tight whitespace-nowrap">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="hairline border-t pt-6 text-sm text-grau">
          Zum Vergleich: Eine eigene nachgerüstete Anlage kostet laut Marktbericht 100.000 bis 150.000 €. Die Rechnung
          enthält keine Preissteigerung und beruht auf Schätzungen. Der Anteil ist ein Nutzungsrecht und keine
          Geldanlage: Beim Austritt kann deutlich weniger zurückfließen, als Sie eingezahlt haben. Geplant ist eine
          Kündigungsfrist von fünf Jahren.
        </p>
      </div>
    </section>
  );
}
