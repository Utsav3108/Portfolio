export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent mb-2">
        {eyebrow}
      </p>
      <h2 className="font-mono text-[1.32rem] font-bold text-text">{title}</h2>
    </div>
  );
}
