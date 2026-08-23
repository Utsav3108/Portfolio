import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200),
});

export const linkSchema = z.object({
  label: z.string().trim().min(1).max(60),
  href: z.string().trim().url().max(500),
});

export const phaseSchema = z.object({
  code: z.string().trim().min(1).max(40),
  title: z.string().trim().min(1).max(120),
  detail: z.string().trim().min(1).max(2000),
  completed: z.boolean(),
});

export const projectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  tagline: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(4000),
  stack: z.array(z.string().trim().min(1).max(60)).max(30),
  status: z.string().trim().max(120).optional().nullable(),
  isFlagship: z.boolean(),
  links: z.array(linkSchema).max(15),
  order: z.number().int().min(0).max(100000),
  whyItMatters: z.string().trim().max(2000).optional().nullable(),
  phases: z.array(phaseSchema).max(20),
});

/**
 * Completed phases must form a prefix over order (0..N) — you can't be
 * "done" with phase 3 without 1 and 2. Rather than trust client state,
 * derive it from the furthest-along phase marked complete on every write.
 */
export function normalizePhaseCompletion<T extends { completed: boolean }>(phases: T[]): T[] {
  let lastCompleted = -1;
  phases.forEach((p, i) => {
    if (p.completed) lastCompleted = i;
  });
  return phases.map((p, i) => ({ ...p, completed: i <= lastCompleted }));
}

export const statSchema = z.object({
  value: z.string().trim().min(1).max(20),
  label: z.string().trim().min(1).max(60),
});

export const practiceGroupSchema = z.object({
  category: z.string().trim().min(1).max(60),
  items: z.array(z.string().trim().min(1).max(60)).max(40),
});

export const siteContentSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  location: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  github: z.string().trim().url().max(300),
  twitter: z.string().trim().url().max(300),
  photoUrl: z.string().trim().max(500).optional().nullable(),
  heroEyebrow: z.string().trim().min(1).max(200),
  heroHeadline: z.string().trim().min(1).max(200),
  heroIntro: z.string().trim().min(1).max(2000),
  stackChips: z.array(z.string().trim().min(1).max(60)).max(30),
  stats: z.array(statSchema).max(12),
  practice: z.array(practiceGroupSchema).max(20),
});
