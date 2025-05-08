import Features from "./components/Features";
import HeroHeader from "./components/HeroHeader";
import HowWeAre from "./components/HowWeAre";
import Services from "./components/Services";
import Steps from "./components/Steps";

const Home = () => {
  return (
    <>
      <HeroHeader />
      <HowWeAre />
      <Features />
      <Services />
      <Steps />
    </>
  );
};

export default Home;
