import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import Chip from "@/components/Chip";
import Callout from "@/components/Callout";
import ProjectCard from "@/components/ProjectCard";
import DispatchTracker, { deriveMilestones } from "@/components/DispatchTracker";
import { prisma } from "@/lib/prisma";
import type { Stat } from "@/components/StatStrip";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, dbProjects] = await Promise.all([
    prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } }),
    prisma.project.findMany({
      orderBy: { order: "asc" },
      include: { phases: { orderBy: { order: "asc" } } },
    }),
  ]);

  const stackChips = content.stackChips as string[];
  const stats = content.stats as Stat[];
  const practice = content.practice as { category: string; items: string[] }[];
  const projects = dbProjects.map((p) => ({
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    stack: p.stack as string[],
    status: p.status ?? undefined,
    emphasis: p.isFlagship,
    links: p.links as { label: string; href: string }[],
    whyItMatters: p.whyItMatters,
    milestones: deriveMilestones(p.phases),
  }));

  return (
    <div className="flex-1 flex flex-col">
      <div className="mx-auto w-full max-w-[46rem] px-5 sm:px-6">
        {/* Masthead */}
        <header className="flex items-center justify-between py-6">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-dim">
            {content.name}
          </span>
          <ThemeToggle />
        </header>

        {/* Hero */}
        <section className="relative pt-8 pb-14">
          <div
            aria-hidden
            className="beacon-glow pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "var(--accent-soft)" }}
          />
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              {content.photoUrl && (
                <div className="mx-auto sm:mx-0 shrink-0">
                  <div
                    className="relative w-[152px] sm:w-[176px] aspect-square overflow-hidden rounded-full border border-border"
                    style={{ boxShadow: "0 6px 20px var(--shadow)" }}
                  >
                    <Image
                      src={content.photoUrl}
                      alt={content.name}
                      fill
                      sizes="176px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="min-w-0 text-center sm:text-left">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent mb-4">
                  {content.heroEyebrow}
                </p>
                <h1
                  className="font-mono font-bold text-text max-w-[30ch] mx-auto sm:mx-0"
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.35rem)",
                    textWrap: "balance",
                    lineHeight: 1.25,
                  }}
                >
                  {content.heroHeadline}
                </h1>
              </div>
            </div>

            <p className="font-serif text-[1.0625rem] leading-[1.65] text-text mt-8 max-w-[60ch]">
              {content.heroIntro}
            </p>

            <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mt-6">
              <span className="font-mono text-[0.78rem] text-text-dim">
                {content.name} &middot; {content.role}
              </span>
              <span className="flex flex-wrap gap-1.5">
                {stackChips.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </span>
            </div>

            {stats.length > 0 && (
              <div className="mt-8">
                <StatStrip stats={stats} />
              </div>
            )}
          </div>
        </section>

        {/* Practice */}
        {practice.length > 0 && (
          <section className="border-t border-border py-14">
            <SectionHeading eyebrow="Practice" title="What I actually work with" />
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {practice.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-dim mb-2.5">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Work */}
        <section className="border-t border-border py-14">
          <SectionHeading eyebrow="Selected Work" title="Three systems, not three apps" />
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <div key={project.name}>
                <ProjectCard project={project} />
                {project.whyItMatters && <Callout>{project.whyItMatters}</Callout>}
                {project.milestones.length > 0 && (
                  <div className="mt-5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent mb-3">
                      In Transit &middot; {project.name} roadmap
                    </p>
                    <DispatchTracker milestones={project.milestones} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-border py-14">
          <SectionHeading eyebrow="Get In Touch" title="Open channels" />
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${content.email}`}
              className="font-mono text-[0.87rem] text-text hover:text-accent transition-colors"
            >
              <span className="text-text-dim">Email &rarr;</span> {content.email}
            </a>
            <a
              href={content.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.87rem] text-text hover:text-accent transition-colors"
            >
              <span className="text-text-dim">GitHub &rarr;</span>{" "}
              {content.github.replace("https://", "")}
            </a>
            <a
              href={content.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.87rem] text-text hover:text-accent transition-colors"
            >
              <span className="text-text-dim">X &rarr;</span>{" "}
              {content.twitter.replace("https://", "")}
            </a>
            <p className="font-mono text-[0.78rem] text-text-dim mt-1">{content.location}</p>
          </div>
        </section>
      </div>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto w-full max-w-[46rem] px-5 sm:px-6 py-6 flex items-center justify-between">
          <p className="font-mono text-[0.68rem] text-text-dim">
            &copy; {new Date().getFullYear()} {content.name}
          </p>
          <p className="font-mono text-[0.68rem] text-text-dim">Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
