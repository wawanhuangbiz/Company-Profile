import React from "react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProcessSteps from "./components/ProcessSteps";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Stats from "./components/Stats";
import Technologies from "./components/Technologies";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import CTABanner from "./components/CTABanner";
import FloatingCTA from "./components/FloatingCTA";
import Footer from "./components/Footer";
import OurTeam from "./components/OurTeam.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ProcessSteps />
      <Stats />
      <Portfolio />
      <Technologies />
      <Testimonials />
      <OurTeam />
      <CTABanner />
      <FAQs />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default App;
