export default function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-dim">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {hint && <p className="font-mono text-[0.66rem] text-text-dim mt-1.5">{hint}</p>}
    </div>
  );
}
