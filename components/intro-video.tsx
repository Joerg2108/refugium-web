"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STALL_LIMIT_MS = 3000;

/** Spielt das Intro einmal je Sitzung. Das Skript im Layout entscheidet vor dem ersten Bild. */
export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(true);

  const finish = useCallback(() => {
    videoRef.current?.pause();
    document.documentElement.classList.remove("intro");
    setActive(false);
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro")) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    try {
      sessionStorage.setItem("refugium-intro", "1");
    } catch {
      // Ohne Speicher läuft das Intro beim nächsten Aufruf erneut.
    }

    video.load();
    video.play().catch(finish);
    skipRef.current?.focus({ preventScroll: true });

    // Stockt das Laden, soll niemand vor einem schwarzen Bild warten.
    const stall = window.setTimeout(() => {
      if (video.currentTime === 0) finish();
    }, STALL_LIMIT_MS);

    // Scrollen beendet das Intro und erreicht den Hero nicht.
    const onScrollIntent = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      finish();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("wheel", onScrollIntent, { capture: true, passive: false });
    window.addEventListener("touchmove", onScrollIntent, { capture: true, passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(stall);
      window.removeEventListener("wheel", onScrollIntent, { capture: true });
      window.removeEventListener("touchmove", onScrollIntent, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [active, finish]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="intro-layer fixed inset-0 z-[80] bg-black" role="region" aria-label="Intro-Film">
      {active && (
        <>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/video/intro-poster.jpg"
            aria-label="Visualisierung: Eine schwere Tür öffnet sich in einen warm beleuchteten Raum."
            onEnded={finish}
            className="h-full w-full object-contain md:object-cover"
          >
            <source src="/video/intro-720.mp4" media="(max-width: 900px)" />
            <source src="/video/intro-1080.mp4" onError={finish} />
          </video>
          <div className="absolute right-5 bottom-5 flex gap-3 md:right-10 md:bottom-8">
            <button
              type="button"
              onClick={toggleSound}
              className="h-10 rounded-full border border-papier/40 px-5 text-sm font-medium text-papier backdrop-blur-sm transition-colors duration-500 hover:border-papier"
            >
              {muted ? "Ton an" : "Ton aus"}
            </button>
            <button
              ref={skipRef}
              type="button"
              onClick={finish}
              className="h-10 rounded-full bg-papier px-5 text-sm font-medium text-kohle transition-colors duration-500 hover:bg-messing"
            >
              Überspringen
            </button>
          </div>
        </>
      )}
    </div>
  );
}
