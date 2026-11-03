/** Grundriss-Schema: 2 m breit, Tiefe aus der Fläche. Alle Einheiten im selben Maßstab. */
export function UnitPlan({ area, people }: { area: number; people: number }) {
  const scale = 36;
  const width = 2 * scale;
  const depth = (area / 2) * scale;

  return (
    <svg
      viewBox={`0 0 ${10 * scale / 2 + 8} ${width + 8}`}
      className="h-auto w-full max-w-[220px]"
      role="img"
      aria-label={`Grundriss-Schema: ${area} m² für ${people} Personen`}
    >
      <rect x="4" y="4" width={depth} height={width} fill="none" stroke="currentColor" strokeWidth="3" />
      {Array.from({ length: people }, (_, i) => (
        <circle key={i} cx={4 + (depth / (people + 1)) * (i + 1)} cy={4 + width / 2} r="7" fill="currentColor" />
      ))}
    </svg>
  );
}
