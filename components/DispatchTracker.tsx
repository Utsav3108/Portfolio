export type MilestoneStatus = "done" | "active" | "planned";

export type Milestone = {
  code: string;
  title: string;
  detail: string;
  status: MilestoneStatus;
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  done: "Shipped",
  active: "In progress",
  planned: "Planned",
};

type PhaseLike = { code: string; title: string; detail: string; completed: boolean };

/** First incomplete phase (in order) is "active"; everything after it is "planned". */
export function deriveMilestones(phases: PhaseLike[]): Milestone[] {
  let foundActive = false;
  return phases.map((p) => {
    let status: MilestoneStatus;
    if (p.completed) {
      status = "done";
    } else if (!foundActive) {
      status = "active";
      foundActive = true;
    } else {
      status = "planned";
    }
    return { code: p.code, title: p.title, detail: p.detail, status };
  });
}

export default function DispatchTracker({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[640px] sm:min-w-0">
        {milestones.map((m, i) => (
          <div key={m.code} className="flex-1">
            <div className="flex items-center">
              <span
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  m.status === "planned"
                    ? "bg-bg-sunken border border-border"
                    : m.status === "active"
                      ? "bg-accent"
                      : "bg-accent2"
                }`}
                aria-hidden
              />
              {i < milestones.length - 1 && (
                <span
                  className={`h-px flex-1 ${
                    m.status === "done" ? "bg-accent2" : "bg-border"
                  }`}
                  aria-hidden
                />
              )}
            </div>
            <div className="mt-3 pr-5">
              <p
                className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${
                  m.status === "planned" ? "text-text-dim" : "text-accent"
                }`}
              >
                {m.code} &middot; {STATUS_LABEL[m.status]}
              </p>
              <p className="font-mono text-[0.92rem] font-bold text-text mt-1">{m.title}</p>
              <p className="font-serif text-[0.87rem] leading-relaxed text-text-dim mt-1.5">
                {m.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
