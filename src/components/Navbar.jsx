import React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import 'react-tooltip/dist/react-tooltip.css';
import mainData from "../data/mainData.json";
import "./Navbar.css";

const Navbar = ({ selectedLanguage, setSelectedLanguage }) => {
  const menuItems = mainData[selectedLanguage]?.navbar?.menuItems || [];
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Handle scroll event
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container mx-auto flex justify-between items-center p-4">

          <img src="images/logo-ssi-no-back.png" className="h-[3.75rem]"/>

        
        {/* Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="text-gray-800 hover:text-blue-600">{item.name}</a>
            </li>
          ))}
          {/* Language Selector */}
          <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 w-full bg-white shadow-lg z-10"
            >
              <ul className="flex flex-col space-y-2 p-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} onClick={() => setIsOpen(false)} className="block text-gray-800 hover:text-blue-600">{item.name}</a>
                  </li>
                ))}
                {/* Language Selector for Mobile */}
                <li>
                  <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div> 
    </nav> 
  );
};

export default Navbar;