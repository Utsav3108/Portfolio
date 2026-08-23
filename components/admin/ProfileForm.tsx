"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Field from "./Field";
import { Input, Textarea } from "./Input";
import TagInput from "./TagInput";

type ProfileValue = {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  twitter: string;
  photoUrl: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroIntro: string;
  stackChips: string[];
};

export default function ProfileForm({ initial }: { initial: ProfileValue }) {
  const router = useRouter();
  const [value, setValue] = useState<ProfileValue>(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof ProfileValue>(key: K, val: ProfileValue[K]) {
    setValue((v) => ({ ...v, [key]: val }));
    setSaved(false);
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);

    if (!res.ok) {
      setError("Photo upload failed — check the file is a PNG/JPEG/WebP under 5MB.");
      return;
    }
    const body = await res.json();
    update("photoUrl", body.url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError("Couldn't save — check the fields and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <Field label="Photo">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border bg-bg-raised shrink-0">
            {value.photoUrl && (
              <Image
                src={value.photoUrl}
                alt="Profile"
                fill
                sizes="80px"
                priority
                className="object-cover"
              />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="font-mono text-[0.72rem] uppercase tracking-[0.08em] border border-border rounded-[3px] px-3 py-1.5 text-text-dim hover:text-text disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Upload photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        </div>
      </Field>

      <Field label="Name">
        <Input value={value.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} />
      </Field>

      <Field label="Role">
        <Input value={value.role} onChange={(e) => update("role", e.target.value)} required maxLength={120} />
      </Field>

      <Field label="Location">
        <Input value={value.location} onChange={(e) => update("location", e.target.value)} required maxLength={120} />
      </Field>

      <Field label="Email">
        <Input
          type="email"
          value={value.email}
          onChange={(e) => update("email", e.target.value)}
          required
          maxLength={200}
        />
      </Field>

      <Field label="GitHub URL">
        <Input value={value.github} onChange={(e) => update("github", e.target.value)} required maxLength={300} />
      </Field>

      <Field label="X / Twitter URL">
        <Input value={value.twitter} onChange={(e) => update("twitter", e.target.value)} required maxLength={300} />
      </Field>

      <Field label="Hero eyebrow" hint="Small label above the headline">
        <Input
          value={value.heroEyebrow}
          onChange={(e) => update("heroEyebrow", e.target.value)}
          required
          maxLength={200}
        />
      </Field>

      <Field label="Hero headline">
        <Input
          value={value.heroHeadline}
          onChange={(e) => update("heroHeadline", e.target.value)}
          required
          maxLength={200}
        />
      </Field>

      <Field label="Hero intro">
        <Textarea
          value={value.heroIntro}
          onChange={(e) => update("heroIntro", e.target.value)}
          required
          rows={5}
          maxLength={2000}
        />
      </Field>

      <Field label="Stack chips" hint="Press Enter or comma to add a tag">
        <TagInput value={value.stackChips} onChange={(v) => update("stackChips", v)} placeholder="Swift, SwiftUI…" />
      </Field>

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
          {saving ? "Saving…" : "Save profile"}
        </button>
        {saved && <span className="font-mono text-[0.72rem] text-accent2">Saved</span>}
      </div>
    </form>
  );
}
