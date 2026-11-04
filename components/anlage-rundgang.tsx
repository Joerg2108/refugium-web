"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const stops = [
  {
    title: "Schleuse",
    text: "Vier Zugänge, jeder mit Schutztür und Schleuse. Wer zu Ihrer Einheit gehört, tragen Sie vorab ein.",
    src: "/images/zugang.jpg",
    alt: "Visualisierung: Eine Familie geht durch eine Schutztür mit Zugangsterminal.",
  },
  {
    title: "Ihre Einheit",
    text: "6, 8 oder 10 m², fest zugeteilt. Sie haben rund um die Uhr Zugang, nicht nur im Ernstfall.",
    src: "/images/einheit.jpg",
    alt: "Visualisierung: Eine Familie in einer holzverkleideten Einheit mit Etagenbett.",
  },
  {
    title: "Gemeinschaft",
    text: "Die Einheiten liegen auf zwei Ebenen, die Gemeinschaftszone in der Mitte.",
    src: "/images/halle.jpg",
    alt: "Visualisierung: Halle mit Betonpfeilern, Lüftungsrohren und Tischen in der Mitte.",
  },
  {
    title: "Vorrat und Technik",
    text: "Geplant sind Vorrat für 14 Tage, Trinkwasser, ABC-Lüftung und Notstrom. Dazu kommen zwei Übungen im Jahr und ein Notfallplan für Ihre Familie.",
    src: "/images/vorrat.jpg",
    alt: "Visualisierung: Drei ältere Menschen essen an einem Holztisch vor Regalen mit Vorräten und Wasser.",
  },
];

const FADE = 0.05;

function Scene({
  stop,
  index,
  progress,
}: {
  stop: (typeof stops)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const count = stops.length;
  const start = index / count;
  const end = (index + 1) / count;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, end - FADE, end + FADE]
      : index === count - 1
        ? [start - FADE, start + FADE, 1]
        : [start - FADE, start + FADE, end - FADE, end + FADE],
    index === 0 ? [1, 1, 0] : index === count - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start - FADE, end + FADE], [1.14, 1.02]);
  const y = useTransform(progress, [start, end], [28, -28]);

  return (
    <motion.article style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={stop.src} alt={stop.alt} fill sizes="100vw" loading="eager" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35" />
      <motion.div style={{ y }} className="shell absolute inset-x-0 bottom-[14vh]">
        <p className="label text-messing">
          {index + 1} von {count}
        </p>
        <h3 className="display mt-3 text-[clamp(3rem,8vw,7.5rem)] text-papier">{stop.title}</h3>
        <p className="mt-4 max-w-[46ch] text-lg text-papier/85">{stop.text}</p>
      </motion.div>
    </motion.article>
  );
}

export function AnlageRundgang() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [pinned, setPinned] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!pinned) {
    return (
      <section ref={sectionRef} id="anlage" aria-labelledby="rundgang-titel" className="section bg-kohle">
        <div className="shell">
          <h2 id="rundgang-titel" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
            Ein Gang durch die Anlage.
          </h2>
          <div className="mt-14 space-y-16">
            {stops.map((stop) => (
              <article key={stop.title}>
                <div className="relative aspect-[16/9]">
                  <Image src={stop.src} alt={stop.alt} fill sizes="(min-width: 1320px) 1320px, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-5 font-serif text-3xl tracking-tight">{stop.title}</h3>
                <p className="mt-1 max-w-[52ch] text-gedimmt">{stop.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-gedimmt">Alle Bilder: Visualisierung (KI-generiert)</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="anlage"
      aria-labelledby="rundgang-titel"
      className="bg-black"
      style={{ height: `${stops.length * 130}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {stops.map((stop, i) => (
          <Scene key={stop.title} stop={stop} index={i} progress={scrollYProgress} />
        ))}
        <div className="shell absolute inset-x-0 top-24">
          <h2 id="rundgang-titel" className="label text-papier">
            Ein Gang durch die Anlage
          </h2>
        </div>
        <div className="shell absolute inset-x-0 bottom-6 flex items-center gap-6">
          <div className="h-px flex-1 bg-papier/20">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-messing"
            />
          </div>
          <p className="text-xs text-papier/70">Visualisierung (KI-generiert)</p>
        </div>
      </div>
    </section>
  );
}
