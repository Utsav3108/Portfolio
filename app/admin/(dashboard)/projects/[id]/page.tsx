import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { phases: { orderBy: { order: "asc" } } },
  });
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-mono text-[1.32rem] font-bold text-text mb-8">Edit project</h1>
      <ProjectForm
        projectId={project.id}
        initial={{
          name: project.name,
          tagline: project.tagline,
          description: project.description,
          whyItMatters: project.whyItMatters ?? "",
          stack: project.stack as string[],
          status: project.status ?? "",
          isFlagship: project.isFlagship,
          links: project.links as { label: string; href: string }[],
          order: project.order,
          phases: project.phases.map((p) => ({
            code: p.code,
            title: p.title,
            detail: p.detail,
            completed: p.completed,
          })),
        }}
      />
    </div>
  );
}
