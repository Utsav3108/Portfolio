"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./Input";

type Stat = { value: string; label: string };

export default function StatsForm({ initial }: { initial: Stat[] }) {
  const router = useRouter();
  const [stats, setStats] = useState<Stat[]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateStat(i: number, field: keyof Stat, val: string) {
    setStats((s) => s.map((stat, idx) => (idx === i ? { ...stat, [field]: val } : stat)));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { stats: stats.filter((s) => s.value.trim() || s.label.trim()) };
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
      setError("Couldn't save — every stat needs both a value and a label.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="flex flex-col gap-3 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
              placeholder="2"
              className="max-w-[6rem]"
            />
            <Input
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
              placeholder="Years shipping iOS"
            />
            <button
              type="button"
              onClick={() => {
                setStats((s) => s.filter((_, idx) => idx !== i));
                setSaved(false);
              }}
              className="font-mono text-[0.72rem] text-text-dim hover:text-accent px-2 shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setStats((s) => [...s, { value: "", label: "" }])}
          className="self-start font-mono text-[0.72rem] uppercase tracking-[0.08em] border border-border rounded-[3px] px-3 py-1.5 text-text-dim hover:text-text"
        >
          + Add stat
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
          {saving ? "Saving…" : "Save stats"}
        </button>
        {saved && <span className="font-mono text-[0.72rem] text-accent2">Saved</span>}
      </div>
    </form>
  );
}
