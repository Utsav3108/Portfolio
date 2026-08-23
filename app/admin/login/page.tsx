"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const dest = searchParams.get("from") || "/admin/projects";
      router.push(dest);
      router.refresh();
      return;
    }

    const body = await res.json().catch(() => ({}));
    setError(body.error || "Login failed");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent mb-3">
        Admin
      </p>
      <h1 className="font-mono text-[1.32rem] font-bold text-text mb-8">Sign in</h1>

      <label className="block mb-4">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-dim">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full font-mono text-[0.9rem] bg-bg-raised border border-border rounded-[3px] px-3 py-2 text-text focus:outline-none focus:border-accent"
        />
      </label>

      <label className="block mb-6">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-dim">
          Password
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full font-mono text-[0.9rem] bg-bg-raised border border-border rounded-[3px] px-3 py-2 text-text focus:outline-none focus:border-accent"
        />
      </label>

      {error && (
        <p className="font-mono text-[0.78rem] text-accent mb-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="font-mono text-[0.78rem] uppercase tracking-[0.08em] bg-text text-bg rounded-[3px] px-4 py-2.5 disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
