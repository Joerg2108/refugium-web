"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, INTEREST_HREF } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

const inputClass =
  "mt-1 block h-12 w-full border-b border-papier/30 bg-transparent text-lg transition-colors duration-500 outline-none hover:border-papier/60 focus:border-messing";

const labelClass = "text-sm text-gedimmt";

export function InteressenFormular() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="hairline border-t pt-8">
        <p className="display text-5xl">Sie stehen auf der Liste.</p>
        <p className="mt-4 text-gedimmt">Wir melden uns für ein kurzes Telefonat bei Ihnen. Ihr Eintrag bleibt unverbindlich.</p>
      </div>
    );
  }

  return (
    <form name="interessenliste" onSubmit={submit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <input type="hidden" name="form-name" value="interessenliste" />
      <input type="hidden" name="subject" value="Neuer Eintrag Interessenliste Refugium" />
      <div hidden>
        <label>
          Nicht ausfüllen
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input id="name" name="name" required autoComplete="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>E-Mail</label>
        <input id="email" type="email" name="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="wohnort" className={labelClass}>Wohnort</label>
        <input id="wohnort" name="wohnort" required autoComplete="address-level2" className={inputClass} />
      </div>
      <div>
        <label htmlFor="telefon" className={labelClass}>Telefon (optional)</label>
        <input id="telefon" type="tel" name="telefon" autoComplete="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="personen" className={labelClass}>Personen</label>
        <select id="personen" name="personen" required defaultValue="" className={inputClass}>
          <option value="" disabled className="text-kohle">Bitte wählen</option>
          {["1", "2", "3", "4", "Mehr als 4"].map((v) => (
            <option key={v} className="text-kohle">{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="einheit" className={labelClass}>Einheit</label>
        <select id="einheit" name="einheit" defaultValue="Noch offen" className={inputClass}>
          {["Noch offen", "6 m²", "8 m²", "10 m²"].map((v) => (
            <option key={v} className="text-kohle">{v}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="nachricht" className={labelClass}>Ihre Frage (optional)</label>
        <textarea id="nachricht" name="nachricht" rows={2} className={`${inputClass} h-auto py-2`} />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-gedimmt sm:col-span-2">
        <input type="checkbox" name="datenschutz" value="ja" required className="mt-1 accent-messing" />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="underline">Datenschutzhinweise</Link>{" "}
          gelesen. Mein Eintrag ist unverbindlich.
        </span>
      </label>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet" : "Auf die Interessenliste"}
        </Button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm">
            Ihr Eintrag wurde nicht gesendet. Prüfen Sie Ihre Verbindung und senden Sie erneut, oder schreiben Sie an{" "}
            <a href={INTEREST_HREF} className="underline">{CONTACT_EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
