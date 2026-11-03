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
      id="anlage"
      aria-labelledby="rundgang-titel"
      className="bg-kohle"
      style={pinned ? { height: `${stops.length * 100}vh` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "section"}>
        <h2
          id="rundgang-titel"
          className="display px-5 text-[clamp(2.75rem,6vw,5.5rem)] md:px-16"
        >
          Ein Gang durch die Anlage.
        </h2>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={pinned ? "mt-10 flex w-max gap-14 px-16" : "mt-14 space-y-16 px-5"}
        >
          {stops.map((stop, i) => (
            <article key={stop.title} className={pinned ? "w-[min(62vw,56vh+18rem)] shrink-0" : ""}>
              <div className={`zoom relative overflow-hidden ${pinned ? "h-[50vh]" : "aspect-[16/10]"}`}>
                <Image
                  src={stop.src}
                  alt={stop.alt}
                  fill
                  sizes="(min-width: 768px) 62vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 grid gap-1 md:grid-cols-[auto_1fr] md:gap-x-10">
                <p className="label pt-2 text-messing">{i + 1} von {stops.length}</p>
                <div>
                  <h3 className="font-serif text-3xl tracking-tight">{stop.title}</h3>
                  <p className="mt-1 max-w-[52ch] text-gedimmt">{stop.text}</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
        <p className="mt-6 px-5 text-xs text-gedimmt md:px-16">Alle Bilder: Visualisierung (KI-generiert)</p>
      </div>
    </section>
  );
}
