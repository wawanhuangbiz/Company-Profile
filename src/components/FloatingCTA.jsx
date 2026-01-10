import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { supabase } from "../supabaseClient"; // Import Supabase Client

const FloatingCTA = ({ selectedLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // State untuk data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data dari tabel 'ctaData'
  useEffect(() => {
    const fetchCtaData = async () => {
      setLoading(true);
      try {
        const { data: result, error } = await supabase
          .from('ctaData') // Nama tabel baru
          .select('*')     // Ambil semua kolom
          .eq('lang_code', selectedLanguage)
          .maybeSingle();  // Ambil 1 baris aman

        if (error) throw error;
        
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching CTA data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCtaData();
  }, [selectedLanguage]);

  // 2. Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Jangan render jika loading atau data kosong
  if (loading || !data) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Quick Actions Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
                scale: isOpen ? 1 : 0.8,
              }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl p-4 w-72"
            >
              <div className="space-y-4">
                <div className="text-gray-900 font-medium mb-2">
                  {/* Langsung panggil nama kolom */}
                  {data.help}
                </div>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-gray-900 font-medium">
                      {data.sendMessage}
                    </div>
                    <div className="text-sm text-gray-500">
                      {data.respond}
                    </div>
                  </div>
                </a>
                <a
                  href="https://wa.me/62811223731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition duration-300"
                >
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="text-gray-900 font-medium">{data.callUs}</div>
                    <div className="text-sm text-gray-500">
                      {data.monSat}
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Main Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={toggleOpen}
              className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition duration-300 ${
                isOpen
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MessageCircle className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCTA;