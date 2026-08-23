import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="font-mono text-[1.32rem] font-bold text-text">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="font-mono text-[0.78rem] uppercase tracking-[0.08em] bg-text text-bg rounded-[3px] px-4 py-2.5"
        >
          New project
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="border border-border rounded-[3px] bg-bg-raised p-4 flex items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.95rem] font-bold text-text">{p.name}</span>
                {p.isFlagship && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent border border-accent rounded-[3px] px-1.5 py-0.5">
                    Flagship
                  </span>
                )}
                <span className="font-mono text-[0.68rem] text-text-dim">#{p.order}</span>
              </div>
              <p className="font-mono text-[0.76rem] text-text-dim mt-1">{p.tagline}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/projects/${p.id}`}
                className="font-mono text-[0.72rem] text-accent2 hover:text-accent"
              >
                Edit
              </Link>
              <DeleteProjectButton id={p.id} name={p.name} />
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="font-serif text-text-dim">No projects yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
