import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: "Utsav Pandya",
      role: "iOS Developer",
      location: "Ahmedabad, Gujarat, India",
      email: "pandyautsav3108@gmail.com",
      github: "https://github.com/Utsav3108",
      twitter: "https://twitter.com/imutsavpandya",
      photoUrl: "/utsav-pandya.png",
      heroEyebrow: "iOS Developer — Full-Stack Product Builds",
      heroHeadline: "iOS by trade. Full-stack when the product needs it.",
      heroIntro:
        "Two years into shipping iOS product — SwiftUI on the front, FastAPI and Postgres underneath, and whatever the surface needs beyond that: Flutter clients, React admin panels, AI orchestration, infrastructure. Three systems below are the evidence.",
      stackChips: ["Swift", "SwiftUI", "FastAPI", "Flutter", "React", "PostgreSQL"],
      stats: [
        { value: "2", label: "Years shipping iOS" },
        { value: "3", label: "Flagship projects" },
        { value: "5", label: "Surfaces in Ripple" },
        { value: "4", label: "Core stacks" },
      ],
      practice: [
        {
          category: "iOS / Mobile",
          items: [
            "SwiftUI",
            "Swift Concurrency",
            "Flutter / Dart",
            "Local device auth",
            "Offline-first architecture",
            "QR-based flows",
          ],
        },
        {
          category: "Backend",
          items: [
            "Python",
            "FastAPI",
            "SQLAlchemy",
            "PostgreSQL",
            "Alembic",
            "Redis",
            "uv",
            "REST API design",
            "Realtime communication",
          ],
        },
        {
          category: "AI / ML",
          items: [
            "Gemini integration",
            "Persona & mood-state modeling",
            "Median-baseline ETA estimation",
          ],
        },
        {
          category: "Web",
          items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS"],
        },
        {
          category: "Infrastructure",
          items: ["AWS", "Vercel"],
        },
      ],
    },
    update: {},
  });

  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    await prisma.project.create({
      data: {
        name: "NexaFlow",
        tagline: "Patient flow & consultation management",
        description:
          "Patients scan a hospital QR to join a doctor's queue and get a live position plus a dynamic wait estimate. Doctors run the consultation lifecycle, and every completed visit feeds back into that doctor's historical stats. ETA is built on the median consultation duration per doctor, not the mean — so one 45-minute outlier in a run of 20-minute visits doesn't distort everyone else's wait.",
        stack: ["SwiftUI", "Swift Concurrency", "FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic"],
        status: "Phase 1 · early development",
        isFlagship: true,
        links: [{ label: "Repo", href: "https://github.com/Utsav3108/NexaFlow" }],
        order: 0,
        whyItMatters:
          "Technology should solve the waiting problem, not just digitize it — the median-over-mean ETA is the small, clearly reasoned decision that comes out of that principle.",
        phases: {
          create: [
            {
              code: "Phase 1",
              title: "Smart-queue MVP",
              detail:
                "Live QR-based queue joining, position tracking, and median-baseline ETA per doctor.",
              completed: false,
              order: 0,
            },
            {
              code: "Phase 2",
              title: "Context-aware ETA",
              detail:
                "Estimate factors in new vs. returning patient, consultation type, and time of day.",
              completed: false,
              order: 1,
            },
            {
              code: "Phase 3",
              title: "Regression evaluation",
              detail:
                "Test ML-based estimators against the Phase 1 median baseline — it only ships if it actually beats it.",
              completed: false,
              order: 2,
            },
          ],
        },
      },
    });

    await prisma.project.create({
      data: {
        name: "Ripple",
        tagline: "AI personas with dynamic mood states",
        description:
          "A platform simulating AI personas of historical and notable figures whose tone and disposition shift over the course of a conversation, instead of holding one static character. Five repositories — Flutter app, web client, admin panel, and a FastAPI backend — make up one system, not one app.",
        stack: ["FastAPI", "Gemini", "Flutter", "React", "Redis", "AWS", "Vercel"],
        isFlagship: false,
        links: [
          { label: "Live", href: "https://ripple-web-utsav-1d89.vercel.app/login" },
          { label: "Backend", href: "https://github.com/Utsav3108/Ripple-Backend" },
          { label: "Flutter app", href: "https://github.com/Utsav3108/Ripple" },
          { label: "Web app", href: "https://github.com/Utsav3108/Ripple-Web" },
          { label: "Admin panel", href: "https://github.com/Utsav3108/Ripple-Admin-Panel" },
        ],
        order: 1,
      },
    });

    await prisma.project.create({
      data: {
        name: "Stickies",
        tagline: "Offline-first notes, fully private",
        description:
          "A privacy-focused note-taking app with no accounts and no server — auth is local to the device, and data never leaves it. Color-coded entries are the only concession to structure. Where Ripple is a distributed AI system, Stickies is a deliberate exercise in constraint.",
        stack: ["Flutter", "Local auth", "Offline-first"],
        isFlagship: false,
        links: [],
        order: 2,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
