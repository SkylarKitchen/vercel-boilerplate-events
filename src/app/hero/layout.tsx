import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeAnimations from "@/components/HomeAnimations";

export default function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <HomeAnimations />
      {children}
      <Footer />
    </>
  );
}
