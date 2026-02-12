import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Legality from "./components/Legality"; // Import your Legality component
import OurTeam from "./components/OurTeam";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Contact_2 from "./components/Contact_2";
import FloatingCTA from "./components/FloatingCTA";
import FAQs from "./components/FAQs";
import Portfolio from "./components/Portfolio";
import Preloader from "./components/Preloader"; // Import Preloader component

const App = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, [isLoading]);

  return (
    <Router>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          {navbarVisible && (
            <Navbar
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              setNavbarVisible={setNavbarVisible} // Pass the function to control visibility
            />
          )}
          <Hero
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <About
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <Services
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <FAQs
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible}
          />
          {/* <Carousels
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible}
          /> */}
          {/* <Porto
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible}
          /> */}
          <Portfolio
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible}
          />
          {/* <ProjectCollage
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible}
          /> */}

          <Legality
            selectedLanguage={selectedLanguage}
            setNavbarVisible={setNavbarVisible} // Pass the function to Legality
          />
          <OurTeam
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <Contact
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          {/* <FloatingCTA
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          /> */}
          {/* <Contact_2
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          /> */}
          <Footer
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </>
      )}
    </Router>
  );
};

export default App;
