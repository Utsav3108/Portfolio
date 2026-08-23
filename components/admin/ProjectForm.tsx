"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "./Field";
import { Input, Textarea } from "./Input";
import TagInput from "./TagInput";

type LinkValue = { label: string; href: string };
type PhaseValue = { code: string; title: string; detail: string; completed: boolean };

type ProjectFormValue = {
  name: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  stack: string[];
  status: string;
  isFlagship: boolean;
  links: LinkValue[];
  order: number;
  phases: PhaseValue[];
};

const EMPTY: ProjectFormValue = {
  name: "",
  tagline: "",
  description: "",
  whyItMatters: "",
  stack: [],
  status: "",
  isFlagship: false,
  links: [],
  order: 0,
  phases: [],
};

/**
 * Completed phases must form a prefix — marking phase 3 done implies 1
 * and 2 are done too; un-marking phase 1 implies 2 and 3 aren't done
 * either. Mirrors the server-side normalization in lib/validation.ts.
 */
function togglePhaseCompletion(phases: PhaseValue[], index: number, checked: boolean): PhaseValue[] {
  return phases.map((p, i) => {
    if (checked && i <= index) return { ...p, completed: true };
    if (!checked && i >= index) return { ...p, completed: false };
    return p;
  });
}

export default function ProjectForm({
  projectId,
  initial,
}: {
  projectId?: string;
  initial?: Partial<ProjectFormValue>;
}) {
  const router = useRouter();
  const [value, setValue] = useState<ProjectFormValue>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProjectFormValue>(key: K, val: ProjectFormValue[K]) {
    setValue((v) => ({ ...v, [key]: val }));
  }

  function updateLink(i: number, field: keyof LinkValue, val: string) {
    setValue((v) => ({
      ...v,
      links: v.links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l)),
    }));
  }

  function updatePhase(i: number, field: "code" | "title" | "detail", val: string) {
    setValue((v) => ({
      ...v,
      phases: v.phases.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)),
    }));
  }

  function togglePhase(i: number, checked: boolean) {
    setValue((v) => ({ ...v, phases: togglePhaseCompletion(v.phases, i, checked) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...value,
      status: value.status.trim() === "" ? null : value.status.trim(),
      whyItMatters: value.whyItMatters.trim() === "" ? null : value.whyItMatters.trim(),
      links: value.links.filter((l) => l.label.trim() || l.href.trim()),
      phases: value.phases.filter((p) => p.code.trim() || p.title.trim() || p.detail.trim()),
    };

    const res = await fetch(
      projectId ? `/api/admin/projects/${projectId}` : "/api/admin/projects",
      {
        method: projectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
      return;
    }

    setError("Couldn't save — check the fields (links need full https:// URLs) and try again.");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <Field label="Name">
        <Input
          value={value.name}
          onChange={(e) => update("name", e.target.value)}
          required
          maxLength={120}
        />
      </Field>

      <Field label="Tagline">
        <Input
          value={value.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          required
          maxLength={200}
        />
      </Field>

      <Field label="Description">
        <Textarea
          value={value.description}
          onChange={(e) => update("description", e.target.value)}
          required
          rows={6}
          maxLength={4000}
        />
      </Field>

      <Field
        label="Why it matters"
        hint="Optional callout shown under the project card. Empty by default — leave blank to hide it."
      >
        <Textarea
          value={value.whyItMatters}
          onChange={(e) => update("whyItMatters", e.target.value)}
          rows={3}
          maxLength={2000}
        />
      </Field>

      <Field label="Stack" hint="Press Enter or comma to add a tag">
        <TagInput value={value.stack} onChange={(v) => update("stack", v)} placeholder="Swift, FastAPI…" />
      </Field>

      <Field label="Status" hint={'Optional, e.g. "Phase 1 · early development"'}>
        <Input value={value.status} onChange={(e) => update("status", e.target.value)} maxLength={120} />
      </Field>

      <Field label="Flagship">
        <label className="inline-flex items-center gap-2 font-mono text-[0.87rem] text-text">
          <input
            type="checkbox"
            checked={value.isFlagship}
            onChange={(e) => update("isFlagship", e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          Mark as flagship project
        </label>
      </Field>

      <Field label="Order" hint="Lower numbers show first on the homepage">
        <Input
          type="number"
          value={value.order}
          onChange={(e) => update("order", Number(e.target.value))}
          min={0}
          className="max-w-[10ch]"
        />
      </Field>

      <Field label="Links">
        <div className="flex flex-col gap-2">
          {value.links.map((link, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="Label"
                className="max-w-[10rem]"
              />
              <Input
                value={link.href}
                onChange={(e) => updateLink(i, "href", e.target.value)}
                placeholder="https://…"
              />
              <button
                type="button"
                onClick={() => update("links", value.links.filter((_, idx) => idx !== i))}
                className="font-mono text-[0.72rem] text-text-dim hover:text-accent px-2 shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("links", [...value.links, { label: "", href: "" }])}
            className="self-start font-mono text-[0.72rem] uppercase tracking-[0.08em] border border-border rounded-[3px] px-3 py-1.5 text-text-dim hover:text-text"
          >
            + Add link
          </button>
        </div>
      </Field>

      <Field
        label="Phases"
        hint="Shown as an “In Transit” tracker on the homepage. Marking a later phase complete auto-completes the ones before it."
      >
        <div className="flex flex-col gap-3">
          {value.phases.map((phase, i) => (
            <div key={i} className="border border-border rounded-[3px] bg-bg-raised p-3">
              <div className="flex gap-2 mb-2">
                <Input
                  value={phase.code}
                  onChange={(e) => updatePhase(i, "code", e.target.value)}
                  placeholder="Phase 1"
                  className="max-w-[8rem]"
                />
                <Input
                  value={phase.title}
                  onChange={(e) => updatePhase(i, "title", e.target.value)}
                  placeholder="Smart-queue MVP"
                />
                <button
                  type="button"
                  onClick={() => update("phases", value.phases.filter((_, idx) => idx !== i))}
                  className="font-mono text-[0.72rem] text-text-dim hover:text-accent px-2 shrink-0"
                >
                  Remove
                </button>
              </div>
              <Textarea
                value={phase.detail}
                onChange={(e) => updatePhase(i, "detail", e.target.value)}
                placeholder="What this phase covers…"
                rows={2}
                className="mb-2"
              />
              <label className="inline-flex items-center gap-2 font-mono text-[0.78rem] text-text">
                <input
                  type="checkbox"
                  checked={phase.completed}
                  onChange={(e) => togglePhase(i, e.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                Complete
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              update("phases", [...value.phases, { code: "", title: "", detail: "", completed: false }])
            }
            className="self-start font-mono text-[0.72rem] uppercase tracking-[0.08em] border border-border rounded-[3px] px-3 py-1.5 text-text-dim hover:text-text"
          >
            + Add phase
          </button>
        </div>
      </Field>

      {error && (
        <p className="font-mono text-[0.78rem] text-accent mb-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="font-mono text-[0.78rem] uppercase tracking-[0.08em] bg-text text-bg rounded-[3px] px-4 py-2.5 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save project"}
      </button>
    </form>
  );
}
