import React from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <motion.img
        src="images/logo-ssi-no-back.png"
        alt="Loading..."
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "150px", // Adjust size as needed
          height: "auto",
        }}
      />
    </motion.div>
  );
};

export default Preloader;
