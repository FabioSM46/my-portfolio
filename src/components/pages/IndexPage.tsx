import Hero from '@/components/sections/Hero';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function IndexPage() {
  return (
    <>
      <SEO />
      <div className="relative h-dvh flex flex-col bg-background">
        <main className="flex-1 min-h-0">
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
}
