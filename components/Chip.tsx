export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-mono text-[0.72rem] leading-none border border-border rounded-[3px] bg-bg-raised px-2 py-1.5 text-text-dim">
      {children}
    </span>
  );
}
