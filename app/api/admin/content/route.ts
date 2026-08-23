import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteContentSchema } from "@/lib/validation";

export async function GET() {
  const content = await prisma.siteContent.findUnique({ where: { id: 1 } });
  return NextResponse.json(content);
}

// Partial: each admin page (profile/stats/practice) only submits the slice
// of SiteContent it owns, so the update must not require the whole shape.
export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = siteContentSchema.partial().safeParse(body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: parsed.success ? "Empty update" : parsed.error.flatten() }, { status: 400 });
  }

  const content = await prisma.siteContent.update({
    where: { id: 1 },
    data: parsed.data,
  });
  return NextResponse.json(content);
}
