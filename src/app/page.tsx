import { Navbar } from "@/components/heygen/nav";
import { Hero } from "@/components/heygen/hero";
import { StatsBar, LogoStrip, WhyLeading } from "@/components/heygen/stats";
import { WhyUse } from "@/components/heygen/why-use";
import { AvatarsSection } from "@/components/heygen/avatars";
import { HowTo, CaseStudy, Metrics } from "@/components/heygen/howto";
import { Testimonials } from "@/components/heygen/testimonials";
import { Faq } from "@/components/heygen/faq";
import { FinalCta, Footer } from "@/components/heygen/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <LogoStrip />
        <WhyLeading />
        <WhyUse />
        <AvatarsSection />
        <HowTo />
        <CaseStudy />
        <Metrics />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
