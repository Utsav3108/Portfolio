import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Utsav Pandya — iOS Developer",
  description:
    "iOS developer by trade; ships full-stack products — SwiftUI, FastAPI backends, AI orchestration, cross-platform mobile, and web frontends.",
};

const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
