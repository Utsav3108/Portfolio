import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-[56rem] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/admin/projects" className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-dim">
              Admin
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-dim hover:text-text transition-colors"
            >
              View site &rarr;
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[56rem] px-5 sm:px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
