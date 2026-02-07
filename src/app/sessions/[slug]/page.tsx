import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { sessions, getSessionBySlug, getSessionsByTrack, levelColors, levelColorsSolid } from "@/data/sessions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export function generateStaticParams() {
  return sessions.map((session) => ({
    slug: session.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = getSessionBySlug(slug);
  if (!session) return {};

  return {
    title: `${session.title} | Code with Claude 2026`,
    description: session.description,
    openGraph: {
      title: `${session.title} | Code with Claude 2026`,
      description: session.description,
    },
  };
}

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = getSessionBySlug(slug);

  if (!session) {
    notFound();
  }

  const relatedSessions = getSessionsByTrack(session.track).filter(
    (s) => s.id !== session.id
  );

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />

      <main id="main" className="pt-page-top pb-section-sm px-site">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationEvent",
              name: session.title,
              description: session.description,
              performer: {
                "@type": "Person",
                name: session.speaker.name,
                jobTitle: session.speaker.role,
              },
              about: session.track,
              educationalLevel: session.level,
            }),
          }}
        />
        {/* Back link */}
        <div className="max-w-6xl mx-auto">
          <Link
            href="/sessions"
            className="text-body-3 text-fg-tertiary hover:text-fg-primary transition-colors inline-flex items-center gap-1"
          >
            &larr; All Sessions
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto mt-8 md:grid md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left column */}
          <div>
            {/* Track pill */}
            <span className="inline-block bg-bg-tertiary text-caption text-fg-tertiary rounded-full px-2.5 py-1">
              {session.track}
            </span>

            {/* Title */}
            <h1 className="text-h1 font-serif text-fg-primary mt-4">
              {session.title}
            </h1>

            {/* Description */}
            <p className="text-body-large-2 text-fg-tertiary mt-6">
              {session.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {session.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-bg-tertiary text-caption text-fg-quaternary rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column (sidebar) */}
          <div className="mt-10 md:mt-0">
            <div className="sticky top-24 bg-bg-primary rounded-card border border-border-tertiary p-8">
              {/* Speaker */}
              <div>
                <p className="text-label text-fg-quaternary">Speaker</p>
                <p className="text-h5 font-serif mt-2">{session.speaker.name}</p>
                <p className="text-body-3 text-fg-tertiary mt-1">
                  {session.speaker.role}
                </p>
              </div>

              <hr className="border-t border-border-tertiary my-6" />

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-label text-fg-quaternary">Time</p>
                  <p className="text-body-3 text-fg-primary mt-1">
                    {session.time}
                  </p>
                </div>
                <div>
                  <p className="text-label text-fg-quaternary">Duration</p>
                  <p className="text-body-3 text-fg-primary mt-1">
                    {session.duration}
                  </p>
                </div>
                <div>
                  <p className="text-label text-fg-quaternary">Level</p>
                  <span
                    className={`inline-block mt-1 rounded-full px-2 py-0.5 text-caption ${levelColorsSolid[session.level]}`}
                  >
                    {session.level}
                  </span>
                </div>
                <div>
                  <p className="text-label text-fg-quaternary">Track</p>
                  <p className="text-body-3 text-fg-primary mt-1">
                    {session.track}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" size="lg" iconFormat="none" className="w-full">
                  Add to Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related sessions */}
      {relatedSessions.length > 0 && (
        <section className="py-section-md px-site">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h3 font-serif text-fg-primary">
              More from {session.track}
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSessions.map((related) => (
                <Link
                  key={related.id}
                  href={`/sessions/${related.id}`}
                  className="bg-bg-secondary rounded-card border border-border-tertiary p-7 hover:bg-bg-primary hover:border-border-secondary transition-colors"
                >
                  <h3 className="text-h5 font-serif text-fg-primary">
                    {related.title}
                  </h3>
                  <p className="text-body-3 text-fg-tertiary mt-2">
                    {related.speaker.name}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-caption text-fg-quaternary">
                      {related.time}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-caption ${levelColors[related.level]}`}
                    >
                      {related.level}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
