import React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import 'react-tooltip/dist/react-tooltip.css';
import mainData from "../data/mainData.json";

const Navbar = ({ selectedLanguage, setSelectedLanguage }) => {
  const menuItems = mainData[selectedLanguage]?.navbar?.menuItems || [];


  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // console.log("Selected Language:", selectedLanguage);
  // console.log("Menu Items:", menuItems);

 
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 text-[#1D1616] ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0"
            >
              <img
                className="h-12 w-auto"
                src="/public/logo-ssi-no-back.png"
                alt="Logo"
              />
            </motion.div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-800 hover:text-[#8E1630] px-3 py-2 text-md font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 pt-2 pb-4 space-y-1 rounded-m">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="flex justify-center mt-4">
              </div>
                <LanguageSelector selectedLanguage={selectedLanguage} />
              {/* <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Get Started
              </motion.button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
