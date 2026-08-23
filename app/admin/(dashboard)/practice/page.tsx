import { prisma } from "@/lib/prisma";
import PracticeForm from "@/components/admin/PracticeForm";

export const dynamic = "force-dynamic";

export default async function PracticePage() {
  const content = await prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } });

  return (
    <div>
      <h1 className="font-mono text-[1.32rem] font-bold text-text mb-8">Practice</h1>
      <PracticeForm initial={content.practice as { category: string; items: string[] }[]} />
    </div>
  );
}
