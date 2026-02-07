import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sessions, tracks, levelColors } from "@/data/sessions";
import SessionFilter from "./SessionFilter";

export const metadata: Metadata = {
  title: "Sessions — Code with Claude 2026",
  description:
    "Browse 25+ technical sessions and workshops across Agentic Development, Advanced Coding, and Platform & Infrastructure tracks at Code with Claude 2026.",
};

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />

      {/* Hero */}
      <section className="pt-page-top pb-section-sm px-site">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-label text-fg-quaternary mb-3">Full Program</p>
          <h1 className="text-display-2 font-serif text-fg-primary mb-6 text-balance">
            Sessions &amp; Workshops
          </h1>
          <p className="text-body-large-2 text-fg-tertiary max-w-2xl mx-auto text-pretty">
            Browse 25+ technical sessions across three tracks. From getting
            started with Claude Code to scaling enterprise agent deployments,
            there&apos;s a session for every skill level.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-section-md px-site">
        <div className="max-w-7xl mx-auto">
          <SessionFilter
            tracks={tracks}
            sessions={sessions}
            levelColors={levelColors}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
