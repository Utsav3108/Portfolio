import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const content = await prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } });

  return (
    <div>
      <h1 className="font-mono text-[1.32rem] font-bold text-text mb-8">Profile</h1>
      <ProfileForm
        initial={{
          name: content.name,
          role: content.role,
          location: content.location,
          email: content.email,
          github: content.github,
          twitter: content.twitter,
          photoUrl: content.photoUrl ?? "",
          heroEyebrow: content.heroEyebrow,
          heroHeadline: content.heroHeadline,
          heroIntro: content.heroIntro,
          stackChips: content.stackChips as string[],
        }}
      />
    </div>
  );
}
