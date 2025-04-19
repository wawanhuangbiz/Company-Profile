import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "/images/logo-ssi-no-back.png"; // Put your logo here

const Loader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page load time; replace with real logic if needed
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <motion.div
        initial={{ filter: "grayscale(100%)", opacity: 0 }}
        animate={{
          filter: isLoaded ? "grayscale(0%)" : "grayscale(100%)",
          opacity: 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-48 h-48"
      >
        <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
      </motion.div>
    </div>
  );
};

export default Loader;
