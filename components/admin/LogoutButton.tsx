"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="font-mono text-[0.68rem] uppercase tracking-[0.1em] border border-border rounded-[3px] px-2.5 py-1.5 text-text-dim hover:text-text hover:border-text-dim transition-colors"
    >
      Sign out
    </button>
  );
}
