import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import "react-tooltip/dist/react-tooltip.css";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

const Navbar = ({ selectedLanguage, setSelectedLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. State untuk menampung data dari Supabase
  const [navData, setNavData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data setiap kali selectedLanguage berubah
  useEffect(() => {
    const fetchNavData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("mainData") // Pastikan nama tabel di Supabase adalah 'mainData'
          .select("menu_items")
          .eq("lang_code", selectedLanguage) // Filter berdasarkan kode bahasa (en/id/zh)
          .maybeSingle(); // Mengambil satu baris data saja

        if (error) throw error;
        setNavData(data);
      } catch (error) {
        console.error("Error fetching navbar data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNavData();
  }, [selectedLanguage]);

  // 3. Mendefinisikan menuItems (Jawaban pertanyaan Anda)
  // Diambil dari navData.menu_items, jika kosong akan menjadi array []
  const menuItems = navData?.menu_items || [];

  // 4. Handle efek scroll untuk mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Tampilan saat data sedang dimuat
  if (loading && !navData) {
    return (
      <nav className="navbar fixed top-0 w-full z-[1000] bg-white/80 backdrop-blur-md">
        <div className="container mx-auto p-4 text-center text-gray-400 animate-pulse">
          Loading Navigation...
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <img
          src="images/logo-ssi-no-back.png"
          className="h-[3.75rem] py-0"
          alt="Logo SSI"
        />

        {/* Menu Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-gray-800 hover:text-blue-600 font-heading font-semibold transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
          {/* Garis pembatas dan Pemilih Bahasa */}
          <div className="pl-4 border-l border-gray-200">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
        </ul>

        {/* Mobile Menu (Muncul saat diklik di HP) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl z-50 overflow-hidden md:hidden"
            >
              <ul className="flex flex-col p-6 space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg text-gray-800 hover:text-blue-600 font-medium"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <hr className="border-gray-100" />
                <li className="flex justify-start">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
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
