import Features from "@/components/pages/home/features";
import HeroHeader from "@/components/pages/home/hero-header";
import HowWeAre from "@/components/pages/home/how-we-are";
import Services from "@/components/pages/home/services";
import Steps from "@/components/pages/home/steps";

export default function HomePage() {
  return (
    <>
      <HeroHeader />
      <HowWeAre />
      <Features />
      <Services />
      <Steps />
    </>
  );
}
