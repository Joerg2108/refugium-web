"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 2) / total],
    [0.2, 1],
  );
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Text leuchtet Wort für Wort auf, während er durch den Bildschirm scrollt. */
export function ScrollLitText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  // Nach dem Laden gesetzt, damit Server und Client zunächst dasselbe rendern.
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
    </p>
  );
}
