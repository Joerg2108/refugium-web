"use client";

import { useEffect, useRef, useState } from "react";

const stops = [
  {
    from: 0,
    title: "Schleuse",
    text: "Vier Zugänge, jeder mit Schutztür und Schleuse. Wer zu Ihrer Einheit gehört, tragen Sie vorab ein.",
  },
  {
    from: 6,
    title: "Gemeinschaft",
    text: "Die Einheiten liegen auf zwei Ebenen, die Gemeinschaftszone in der Mitte.",
  },
  {
    from: 16,
    title: "Ihre Einheit",
    text: "6, 8 oder 10 m², fest zugeteilt. Sie haben rund um die Uhr Zugang, nicht nur im Ernstfall.",
  },
  {
    from: 23,
    title: "Vorrat und Technik",
    text: "Geplant sind Vorrat für 14 Tage, Trinkwasser, ABC-Lüftung und Notstrom. Dazu kommen zwei Übungen im Jahr und ein Notfallplan für Ihre Familie.",
  },
];

const VIDEO = "/video/rundgang.mp4";
const POSTER = "/video/rundgang-poster.jpg";
const controlClass =
  "h-10 rounded-full border border-papier/40 px-5 text-sm font-medium text-papier backdrop-blur-sm transition-colors duration-500 hover:border-papier";

export function AnlageRundgang() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const pausedByUser = useRef(false);
  const inView = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [stop, setStop] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Video erst laden, wenn der Abschnitt näher kommt, und nur im Bild abspielen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSource(VIDEO);
          loader.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    const player = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting && !pausedByUser.current) {
          video.play().catch(() => setPlaying(false));
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    loader.observe(section);
    player.observe(section);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [reduced]);

  // Beim Sprung per Anker ist das Video noch nicht geladen, wenn es ins Bild kommt.
  const onCanPlay = () => {
    const video = videoRef.current;
    if (video?.paused && inView.current && !pausedByUser.current) {
      video.play().catch(() => setPlaying(false));
    }
  };

  const onTime = () => {
    const video = videoRef.current;
    if (!video) return;
    let next = 0;
    stops.forEach((s, i) => {
      if (video.currentTime >= s.from) next = i;
    });
    setStop(next);
    if (barRef.current && video.duration) {
      barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      setSource(VIDEO);
      video.play().catch(() => setPlaying(false));
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  if (reduced) {
    return (
      <section ref={sectionRef} id="anlage" aria-labelledby="rundgang-titel" className="section bg-black">
        <div className="shell">
          <h2 id="rundgang-titel" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
            Ein Gang durch die Anlage.
          </h2>
          <video src={VIDEO} poster={POSTER} controls preload="none" playsInline className="mt-12 w-full" />
          <p className="mt-3 text-xs text-gedimmt">Visualisierung (KI-generiert)</p>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {stops.map((s) => (
              <li key={s.title}>
                <h3 className="font-serif text-3xl tracking-tight">{s.title}</h3>
                <p className="mt-1 text-gedimmt">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="anlage"
      aria-labelledby="rundgang-titel"
      className="relative h-[100dvh] overflow-hidden bg-black [scroll-margin-top:-6rem]"
    >
      <video
        ref={videoRef}
        src={source}
        poster={POSTER}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Visualisierter Rundgang: Schleuse, Gemeinschaftszone, Einheit und Vorrat"
        onCanPlay={onCanPlay}
        onTimeUpdate={onTime}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

      <div className="shell absolute inset-x-0 top-24">
        <h2 id="rundgang-titel" className="label text-papier">
          Ein Gang durch die Anlage
        </h2>
      </div>

      <div className="shell absolute inset-x-0 bottom-[17vh] md:bottom-[14vh]">
        <div key={stop} className="film-caption">
          <p className="label text-messing">
            {stop + 1} von {stops.length}
          </p>
          <h3 className="display mt-3 text-[clamp(3rem,8vw,7.5rem)] text-papier">{stops[stop].title}</h3>
          <p className="mt-4 max-w-[46ch] text-lg text-papier/85">{stops[stop].text}</p>
        </div>
      </div>

      <div className="shell absolute inset-x-0 bottom-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={togglePlay} className={controlClass}>
            {playing ? "Pause" : "Abspielen"}
          </button>
          <button type="button" onClick={toggleSound} className={controlClass}>
            {muted ? "Ton an" : "Ton aus"}
          </button>
          <div className="h-px flex-1 bg-papier/20">
            <div ref={barRef} className="h-px origin-left scale-x-0 bg-messing" />
          </div>
          <p className="hidden text-xs text-papier/70 md:block">Visualisierung (KI-generiert)</p>
        </div>
        <p className="mt-2 text-xs text-papier/70 md:hidden">Visualisierung (KI-generiert)</p>
      </div>
    </section>
  );
}
