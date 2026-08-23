export type Stat = { value: string; label: string };

export default function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="grid gap-px bg-border border border-border rounded-[3px] overflow-hidden"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))" }}
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-bg-raised px-4 py-4">
          <p className="font-mono text-2xl font-bold tabular-nums text-text">{s.value}</p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-text-dim mt-1">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
