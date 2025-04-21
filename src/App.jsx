import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Legality from "./components/Legality"; // Import your Legality component
import OurTeam from "./components/OurTeam";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import FAQs from "./components/FAQs";
import Carousels from "./components/Carousels";

const App = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
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
      <Carousels
        selectedLanguage={selectedLanguage}
        setNavbarVisible={setNavbarVisible}
      />
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
      <FloatingCTA
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Footer
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </Router>
  );
};

export default App;
