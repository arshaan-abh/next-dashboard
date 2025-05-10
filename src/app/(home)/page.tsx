import Features from "@/components/pages/home/features";
import HeroHeader from "@/components/pages/home/hero-header";
import HowWeAre from "@/components/pages/home/how-we-are";
import ReportMap from "@/components/pages/home/report-map";
import Services from "@/components/pages/home/services";
import Steps from "@/components/pages/home/steps";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroHeader />
      {/* 
      <HowWeAre />
      <Features />
      <Services />
      <Steps />
      <ReportMap /> */}
    </main>
  );
}
