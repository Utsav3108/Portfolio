import { prisma } from "@/lib/prisma";
import StatsForm from "@/components/admin/StatsForm";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const content = await prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } });

  return (
    <div>
      <h1 className="font-mono text-[1.32rem] font-bold text-text mb-8">Stats</h1>
      <StatsForm initial={content.stats as { value: string; label: string }[]} />
    </div>
  );
}
