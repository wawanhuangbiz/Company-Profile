import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProcessSteps from "./components/ProcessSteps";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Legality from "./components/Legality"; // Import your Legality component
import OurTeam  from "./components/OurTeam";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import FAQs from "./components/FAQs";
import ImageGallery from "./components/ImageGallery";
// import Carousel from "./components/Carousel";

const App = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language

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
      <Hero selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage}/>
      {/* <Carousel /> */}
      <About selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage}/>
      <Services selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage}/>
      <ImageGallery />
      {/* <Portfolio selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage}/> */}
      <Legality 
        selectedLanguage={selectedLanguage} 
        setNavbarVisible={setNavbarVisible} // Pass the function to Legality
      />
      <FAQs 
        selectedLanguage={selectedLanguage} 
        setNavbarVisible={setNavbarVisible}
      />
      <OurTeam 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
      />
      <Contact 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
      />
      {/* <Footer 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
      /> */}
      <FloatingCTA 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage}
      />
      <Footer />
    </Router>
  );
};

export default App;
