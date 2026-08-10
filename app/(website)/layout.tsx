import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmberParticles from "@/components/ui/EmberParticles";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Global Floating Ember Particles Overlay */}
      <EmberParticles count={30} fixed={true} />

      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
