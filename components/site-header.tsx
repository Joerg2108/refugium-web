"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#anlage", label: "Anlage" },
  { href: "#kosten", label: "Kosten" },
  { href: "#ablauf", label: "Ablauf" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-papier transition-[background-color,border-color] duration-700 ${
        scrolled ? "border-papier/15 bg-kohle/70 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-[padding] duration-700 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <a href="#top" className="font-serif text-2xl tracking-tight">
          Refugium
        </a>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link text-sm">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild size="sm">
            <a href="#interessenliste">Interessenliste</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
