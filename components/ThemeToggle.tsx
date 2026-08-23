"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reads the theme the blocking inline script (layout.tsx) already applied
    // to <html> — OS preference or a stored override. Server and client can
    // legitimately disagree here, so this can only be resolved post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="font-mono text-[0.68rem] uppercase tracking-[0.1em] border border-border rounded-[3px] px-2.5 py-1.5 text-text-dim hover:text-text hover:border-text-dim transition-colors"
    >
      {mounted ? (theme === "light" ? "Dark" : "Light") : "Theme"}
    </button>
  );
}
