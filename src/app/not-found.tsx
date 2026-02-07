import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found — Code with Claude 2026",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header />
      <main id="main" className="pt-page-top pb-section-md px-site">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-label text-fg-quaternary mb-3">404</p>
          <h1 className="text-display-2 font-serif text-fg-primary mb-6">
            Page not found
          </h1>
          <p className="text-body-large-2 text-fg-tertiary mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Button variant="primary" size="lg" iconFormat="trailing" href="/">
            Back to home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
