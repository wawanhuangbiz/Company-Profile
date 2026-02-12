import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // ArrowDown & Play dihapus karena di-comment di code asli
import { supabase } from "../supabaseClient"; // Pastikan path ini benar

const Hero = ({ selectedLanguage }) => {
  // 1. State untuk menampung data dari DB
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data setiap kali selectedLanguage berubah
  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("mainData")
          .select("*")
          .eq("lang_code", selectedLanguage) // Filter berdasarkan bahasa
          .maybeSingle(); // Ambil 1 baris saja

        if (error) throw error;
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
        // Fallback jika error (opsional)
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [selectedLanguage]); // Dependency array penting!

  // 3. Tampilkan Loading State agar tidak error saat data belum sampai
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#EEEEEE]">
        <p className="text-gray-500 animate-pulse">Loading content...</p>
      </div>
    );
  }

  // Jika data kosong (misal DB belum diisi)
  if (!heroData) return null;

  return (
    <section
      id="home"
      className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#EEEEEE] to-white"
    >
      {/* Bottom blur effect overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 relative">
        {/* Extra decorative blur elements */}
        <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-blue-100/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-purple-100/30 rounded-full filter blur-3xl"></div>

        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mb-12 lg:mb-0"
            >
              {/* TRUSTED BY BADGE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-blue-300 bg-opacity-50 text-blue-600 rounded-full mb-6 text-sm font-medium"
              >
                <Star className="w-4 h-4 mr-2" />
                {heroData.trusted_by}
              </motion.div>

              {/* HEADING */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-spartan font-semibold text-blue-600 leading-tight mb-6"
              >
                {heroData.heading}{" "}
                <span className="relative inline-block">
                  <div className="">
                    <span className="relative text-blue-600">
                      {heroData.subheading}
                    </span>
                  </div>
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute bottom-2 left-0 h-3 bg-blue-100 -z-10"
                  ></motion.span>
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-0 right-0 h-1 bg-blue-400 -z-10"
                  ></motion.span>
                </span>
              </motion.h1>

              {/* PARAGRAPH */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 font-heading leading-relaxed"
              >
                {heroData.paragraph}
              </motion.p>

              {/* BUTTONS (Jika ingin diaktifkan, buat kolom button_text di DB) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                {/* Logic button disini */}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hidden lg:block w-full lg:w-1/2 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-70"></div>

              {/* Image Source dari Database */}
              <img
                src={heroData.hero_image_url || "/images/image_hero.png"}
                alt="Hero"
                className="relative rounded-2xl shadow-2xl"
              />

              {/* Floating Element 1 (Green) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium font-heading">
                    {heroData.badge_text_1}
                  </span>
                </div>
              </motion.div>

              {/* Floating Element 2 (Blue) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium font-heading">
                    {heroData.badge_text_2}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
