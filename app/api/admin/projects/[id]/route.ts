import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema, normalizePhaseCompletion } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { phases, ...projectData } = parsed.data;
  const normalizedPhases = normalizePhaseCompletion(phases);

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        phases: {
          deleteMany: {},
          create: normalizedPhases.map((p, i) => ({ ...p, order: i })),
        },
      },
      include: { phases: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}
