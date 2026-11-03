"use client";

import { useEffect, useRef, useState } from "react";
import type { Group, Object3D } from "three";

const sizes = [
  { area: 6, people: 2, label: "6 m²", bunks: 1, single: 0 },
  { area: 8, people: 3, label: "8 m²", bunks: 1, single: 1 },
  { area: 10, people: 4, label: "10 m²", bunks: 2, single: 0 },
];

const WIDTH = 2;
const HEIGHT = 2.4;
const BED_LENGTH = 2;

type Three = typeof import("three");

function box(
  T: Three,
  size: [number, number, number],
  position: [number, number, number],
  color: number,
  parent: Object3D,
) {
  const mesh = new T.Mesh(
    new T.BoxGeometry(...size),
    new T.MeshStandardMaterial({ color, roughness: 0.75 }),
  );
  mesh.position.set(...position);
  parent.add(mesh);
}

function bed(T: Three, z: number, y: number, parent: Object3D) {
  const x = -WIDTH / 2 + 0.47;
  box(T, [0.9, 0.08, BED_LENGTH], [x, y, z], 0xb39a6e, parent);
  box(T, [0.84, 0.14, BED_LENGTH - 0.06], [x, y + 0.11, z], 0x3c4143, parent);
}

function buildRoom(T: Three, group: Group, size: (typeof sizes)[number]) {
  group.clear();
  const depth = size.area / WIDTH;

  // BackSide blendet die Wände aus, die zur Kamera zeigen: ein Puppenhaus-Schnitt.
  const shell = new T.Mesh(
    new T.BoxGeometry(WIDTH, HEIGHT, depth),
    new T.MeshStandardMaterial({ color: 0xdedbd2, side: T.BackSide, roughness: 0.9 }),
  );
  shell.position.y = HEIGHT / 2;
  group.add(shell);

  box(T, [WIDTH, 0.02, depth], [0, 0.01, 0], 0x7b7d76, group);

  const start = -depth / 2 + BED_LENGTH / 2;
  for (let i = 0; i < size.bunks; i++) {
    const z = start + i * BED_LENGTH;
    bed(T, z, 0.4, group);
    bed(T, z, 1.5, group);
    for (const end of [-1, 1]) {
      box(T, [0.06, 1.8, 0.06], [-WIDTH / 2 + 0.92, 0.9, z + end * 0.97], 0xb39a6e, group);
    }
  }
  if (size.single) bed(T, start + BED_LENGTH, 0.4, group);

  // Regal in der freien Tiefe der 6- und 10-m²-Einheit.
  if (depth % BED_LENGTH !== 0) {
    const z = depth / 2 - 0.5;
    for (const y of [0.5, 1.1, 1.7]) {
      box(T, [0.4, 0.04, 0.9], [-WIDTH / 2 + 0.22, y, z], 0xb39a6e, group);
    }
  }

  // Tür auf der Längsseite gegenüber den Betten.
  box(T, [0.04, 2, 0.9], [WIDTH / 2 - 0.03, 1, depth / 2 - 0.6], 0x8f7a52, group);

  // Maßstabsfigur, 1,75 m.
  const figure = new T.Mesh(
    new T.CapsuleGeometry(0.2, 1.35, 6, 16),
    new T.MeshStandardMaterial({ color: 0x1d1f20, roughness: 0.6 }),
  );
  figure.position.set(0.5, 0.875, 0);
  group.add(figure);
}

export function Einheit3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const applySize = useRef<((index: number) => void) | null>(null);
  const [selected, setSelected] = useState(1);
  const [failed, setFailed] = useState(false);
  const selectedRef = useRef(selected);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let cleanup = () => {};
    let cancelled = false;

    const start = async () => {
      const T = await import("three");
      if (cancelled) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 6, 8);
      camera.lookAt(0, 0.9, 0);

      scene.add(new T.HemisphereLight(0xffffff, 0x8a8a80, 1.9));
      const sun = new T.DirectionalLight(0xfff2dc, 1.6);
      sun.position.set(3, 7, 4);
      scene.add(sun);

      const room = new T.Group();
      scene.add(room);
      let yaw = 0.75;
      room.rotation.y = yaw;

      const render = () => {
        renderer.render(scene, camera);
        canvas.dataset.yaw = yaw.toFixed(2);
      };

      applySize.current = (index) => {
        buildRoom(T, room, sizes[index]);
        render();
      };
      applySize.current(selectedRef.current);

      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(wrap);
      resize();

      let lastX: number | null = null;
      const down = (e: PointerEvent) => {
        lastX = e.clientX;
        canvas.setPointerCapture(e.pointerId);
      };
      const move = (e: PointerEvent) => {
        if (lastX === null) return;
        yaw += (e.clientX - lastX) * 0.01;
        lastX = e.clientX;
        room.rotation.y = yaw;
        render();
      };
      const up = () => {
        lastX = null;
      };
      const key = (e: KeyboardEvent) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        yaw += e.key === "ArrowRight" ? 0.3 : -0.3;
        room.rotation.y = yaw;
        render();
      };

      canvas.addEventListener("pointerdown", down);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", up);
      canvas.addEventListener("pointercancel", up);
      canvas.addEventListener("keydown", key);

      cleanup = () => {
        observer.disconnect();
        canvas.removeEventListener("pointerdown", down);
        canvas.removeEventListener("pointermove", move);
        canvas.removeEventListener("pointerup", up);
        canvas.removeEventListener("pointercancel", up);
        canvas.removeEventListener("keydown", key);
        applySize.current = null;
        renderer.dispose();
      };
    };

    // three.js erst laden, wenn der Abschnitt in die Nähe kommt.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(wrap);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, []);

  const choose = (index: number) => {
    setSelected(index);
    selectedRef.current = index;
    applySize.current?.(index);
  };

  const current = sizes[selected];

  return (
    <div>
      <div role="group" aria-label="Größe der Einheit" className="flex gap-2">
        {sizes.map((size, i) => (
          <button
            key={size.area}
            type="button"
            aria-pressed={selected === i}
            onClick={() => choose(i)}
            className={`h-10 rounded-full border px-5 text-sm font-medium transition-colors duration-500 ${
              selected === i ? "border-kohle bg-kohle text-papier" : "border-kohle/30 hover:border-kohle"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
      <div ref={wrapRef} className="mt-6 h-[58vh] min-h-80 w-full">
        {failed ? (
          <p className="pt-8">Das 3D-Modell lässt sich auf diesem Gerät nicht anzeigen. Die Größen stehen unten.</p>
        ) : (
          <canvas
            ref={canvasRef}
            tabIndex={0}
            role="img"
            aria-label={`Drehbares Schema einer Einheit mit ${current.label} für ${current.people} Personen. Mit den Pfeiltasten drehen.`}
            className="block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
          />
        )}
      </div>
      <p className="mt-4 max-w-[60ch] text-sm text-grau">
        {current.label} für {current.people} Personen. Ziehen zum Drehen. Schema mit 2 m Breite, alle Größen im selben
        Maßstab, die Figur ist 1,75 m groß. Die Grundrisse sind noch nicht geplant.
      </p>
    </div>
  );
}
