"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

const stops = [
  {
    title: "Schleuse",
    text: "Vier Zugänge, jeder mit Schutztür und Schleuse. Wer zu Ihrer Einheit gehört, tragen Sie vorab ein.",
    src: "/images/zugang.jpg",
    alt: "Visualisierung: Eine Familie geht durch eine Schutztür mit Zugangsterminal.",
    width: 1616,
    height: 892,
  },
  {
    title: "Ihre Einheit",
    text: "6, 8 oder 10 m², fest zugeteilt. Sie haben rund um die Uhr Zugang, nicht nur im Ernstfall.",
    src: "/images/einheit.jpg",
    alt: "Visualisierung: Eine Familie in einer holzverkleideten Einheit mit Etagenbett.",
    width: 1616,
    height: 892,
  },
  {
    title: "Gemeinschaft",
    text: "Die Einheiten liegen auf zwei Ebenen, die Gemeinschaftszone in der Mitte.",
    src: "/images/halle.jpg",
    alt: "Visualisierung: Halle mit Betonpfeilern, Lüftungsrohren und Tischen in der Mitte.",
    width: 2134,
    height: 1100,
  },
  {
    title: "Vorrat und Technik",
    text: "Geplant sind Vorrat für 14 Tage, Trinkwasser, ABC-Lüftung und Notstrom. Dazu kommen zwei Übungen im Jahr und ein Notfallplan für Ihre Familie.",
    src: "/images/vorrat.jpg",
    alt: "Visualisierung: Drei ältere Menschen essen an einem Holztisch vor Regalen mit Vorräten und Wasser.",
    width: 1040,
    height: 728,
  },
];

export function AnlageRundgang() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    [scrollYProgress, distance],
    ([p, d]: number[]) => -p * d,
  );

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      distance.set(Math.max(track.scrollWidth - window.innerWidth, 0));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance, pinned]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="rundgang-titel"
      className="bg-tuer"
      style={pinned ? { height: `${stops.length * 100}vh` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20"}>
        <h2
          id="rundgang-titel"
          className="px-4 font-display text-4xl leading-[1.05] font-semibold md:px-16 md:text-6xl"
        >
          Ein Gang durch die Anlage.
        </h2>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={pinned ? "mt-8 flex w-max gap-10 px-16" : "mt-10 space-y-12 px-4"}
        >
          {stops.map((stop) => (
            <article key={stop.title} className={pinned ? "w-[min(62vw,56vh+18rem)] shrink-0" : ""}>
              <div className={pinned ? "relative h-[52vh]" : "relative aspect-[16/10]"}>
                <Image
                  src={stop.src}
                  alt={stop.alt}
                  fill
                  sizes="(min-width: 768px) 62vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold text-nachleucht">{stop.title}</h3>
              <p className="max-w-[56ch]">{stop.text}</p>
            </article>
          ))}
        </motion.div>
        <p className="mt-4 px-4 font-display text-sm md:px-16">Alle Bilder: Visualisierung (KI-generiert)</p>
      </div>
    </section>
  );
}
