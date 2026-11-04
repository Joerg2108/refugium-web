"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { PLAN } from "@/components/plan-data";

const facts = [
  { title: "Rund 14 × 33 m", text: "Innenmaß der Halle laut vorliegendem Plan. Die Vermessung folgt." },
  { title: "Rund 1 m", text: "Außenwand. Dazu massive Stützen und Fundamente, die die Aufteilung prägen." },
  { title: "Offene Stellen", text: "Die Öffnungen in den Längswänden werden verschlossen. Das steht im Kostenplan." },
];

function Fact({ fact, index, progress }: { fact: (typeof facts)[number]; index: number; progress: MotionValue<number> }) {
  const start = 0.4 + index * 0.15;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const y = useTransform(progress, [start, start + 0.12], [20, 0]);
  return (
    <motion.div style={{ opacity, y }} className="hairline border-t pt-4">
      <p className="font-serif text-3xl tracking-tight">{fact.title}</p>
      <p className="mt-1 text-sm text-gedimmt">{fact.text}</p>
    </motion.div>
  );
}

function Drawing({ line, fill }: { line?: MotionValue<number>; fill?: MotionValue<number> }) {
  return (
    <svg viewBox={PLAN.viewBox} role="img" aria-label="Schematischer Grundriss der Halle mit Außenwänden und Stützen" className="w-full">
      <motion.path d={PLAN.fills} className="fill-papier/25" style={fill ? { opacity: fill } : undefined} />
      <motion.path
        d={PLAN.lines}
        fill="none"
        className="stroke-messing"
        strokeWidth={0.05}
        style={line ? { pathLength: line } : undefined}
      />
    </svg>
  );
}

export function BestandPlan() {
  const ref = useRef<HTMLElement | null>(null);
  const [animated, setAnimated] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line = useTransform(scrollYProgress, [0.02, 0.45], [0, 1]);
  const fill = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setAnimated(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const heading = (
    <h2 id="bestand-titel" className="display text-[clamp(2.75rem,6.5vw,5.5rem)]">
      Der Keller steht schon.
    </h2>
  );

  if (!animated) {
    return (
      <section ref={ref} aria-labelledby="bestand-titel" className="section bg-black">
        <div className="shell">
          {heading}
          <div className="mt-12"><Drawing /></div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {facts.map((f) => (
              <div key={f.title} className="hairline border-t pt-4">
                <p className="font-serif text-3xl tracking-tight">{f.title}</p>
                <p className="mt-1 text-sm text-gedimmt">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gedimmt">Schema nach vorliegendem Plan, vereinfacht. Standort auf Anfrage nach Prüfung.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="bestand-titel" className="bg-black" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pt-16">
        <div className="shell w-full">
          {heading}
          <div className="mt-6 md:mx-auto md:mt-8 md:max-w-[min(100%,calc((100dvh-22rem)*2.25))]">
            <Drawing line={line} fill={fill} />
          </div>
          <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-8">
            {facts.map((f, i) => (
              <Fact key={f.title} fact={f} index={i} progress={scrollYProgress} />
            ))}
          </div>
          <p className="mt-4 text-xs text-gedimmt">Schema nach vorliegendem Plan, vereinfacht.</p>
        </div>
      </div>
    </section>
  );
}
