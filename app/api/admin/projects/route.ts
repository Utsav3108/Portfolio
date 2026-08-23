import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema, normalizePhaseCompletion } from "@/lib/validation";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { phases: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { phases, ...projectData } = parsed.data;
  const normalizedPhases = normalizePhaseCompletion(phases);

  const project = await prisma.project.create({
    data: {
      ...projectData,
      phases: {
        create: normalizedPhases.map((p, i) => ({ ...p, order: i })),
      },
    },
    include: { phases: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(project, { status: 201 });
}
