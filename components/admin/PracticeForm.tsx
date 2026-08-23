"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./Input";
import TagInput from "./TagInput";

type Group = { category: string; items: string[] };

export default function PracticeForm({ initial }: { initial: Group[] }) {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateCategory(i: number, category: string) {
    setGroups((g) => g.map((group, idx) => (idx === i ? { ...group, category } : group)));
    setSaved(false);
  }

  function updateItems(i: number, items: string[]) {
    setGroups((g) => g.map((group, idx) => (idx === i ? { ...group, items } : group)));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { practice: groups.filter((g) => g.category.trim() && g.items.length > 0) };
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError("Couldn't save — every group needs a category and at least one skill.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex flex-col gap-5 mb-6">
        {groups.map((group, i) => (
          <div key={i} className="border border-border rounded-[3px] bg-bg-raised p-4">
            <div className="flex items-center gap-2 mb-3">
              <Input
                value={group.category}
                onChange={(e) => updateCategory(i, e.target.value)}
                placeholder="Category, e.g. iOS / Mobile"
                className="max-w-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setGroups((g) => g.filter((_, idx) => idx !== i));
                  setSaved(false);
                }}
                className="font-mono text-[0.72rem] text-text-dim hover:text-accent px-2 shrink-0"
              >
                Remove group
              </button>
            </div>
            <TagInput
              value={group.items}
              onChange={(items) => updateItems(i, items)}
              placeholder="Add a skill…"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setGroups((g) => [...g, { category: "", items: [] }])}
          className="self-start font-mono text-[0.72rem] uppercase tracking-[0.08em] border border-border rounded-[3px] px-3 py-1.5 text-text-dim hover:text-text"
        >
          + Add category
        </button>
      </div>

      {error && (
        <p className="font-mono text-[0.78rem] text-accent mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="font-mono text-[0.78rem] uppercase tracking-[0.08em] bg-text text-bg rounded-[3px] px-4 py-2.5 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save practice"}
        </button>
        {saved && <span className="font-mono text-[0.72rem] text-accent2">Saved</span>}
      </div>
    </form>
  );
}
