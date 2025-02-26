import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProcessSteps from "./components/ProcessSteps";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Technologies from "./components/Technologies";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import CTABanner from "./components/CTABanner";
import FloatingCTA from "./components/FloatingCTA";
import Footer from "./components/Footer";
import OurTeam from "./components/OurTeam.jsx";
import TeamMember from "./components/TeamMember.jsx"; // Import the dynamic team member page
import ScrollToTop from "./components/ScrollProgress.jsx"; // Import the scroll-to-top component
import mainData from "./data/mainData.json";

const App = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const translations = mainData[selectedLanguage];

    useEffect(() => {}, [selectedLanguage]);
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home translations={translations} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>} />

                {/* Team Member Route */}
                <Route path="/team/:id" element={<TeamMember translations={translations} />} />
            </Routes>
        </Router>
    );
};

const Home = ({ selectedLanguage, translations, setSelectedLanguage }) => (
    <>
        <ScrollProgress />
        <Navbar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage } translations={translations} />
        <Hero selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage } translations={translations} />
        <About selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage } translations={translations} />
        <Services />
        <Stats />
        <Portfolio />
        <Technologies />
        <FAQs />
        <OurTeam />
        <CTABanner />
        <Contact />
        <Footer />
        <FloatingCTA />
    </>
);

export default App;
