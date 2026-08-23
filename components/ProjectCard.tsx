import Chip from "./Chip";

export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  status?: string;
  emphasis?: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`border rounded-[3px] p-5 sm:p-6 bg-bg-raised ${
        project.emphasis ? "border-accent" : "border-border"
      }`}
      style={project.emphasis ? { boxShadow: "0 0 0 1px var(--accent-soft)" } : undefined}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-mono text-[1.05rem] font-bold text-text">{project.name}</h3>
          <p className="font-mono text-[0.78rem] text-text-dim mt-1">{project.tagline}</p>
        </div>
        {project.emphasis && (
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-accent border border-accent rounded-[3px] px-2 py-1 shrink-0">
            Flagship
          </span>
        )}
      </div>

      <p className="font-serif text-[0.95rem] leading-relaxed text-text mt-4">
        {project.description}
      </p>

      {project.status && (
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-text-dim mt-3">
          {project.status}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.78rem] text-accent2 hover:text-accent underline underline-offset-4 decoration-border"
            >
              {l.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
