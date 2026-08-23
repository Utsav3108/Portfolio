export default function Callout({
  label = "Why it matters",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-accent bg-accent-soft rounded-tr-[4px] rounded-br-[4px] px-4 py-3 my-5">
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-accent mb-1.5">
        {label}
      </p>
      <p className="font-serif text-[0.95rem] leading-relaxed text-text">{children}</p>
    </div>
  );
}
