import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { supabase } from "../supabaseClient";

const FAQs = ({ selectedLanguage }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // State untuk data dari Supabase
  const [faqs, setFaqs] = useState([]);
  const [faqTexts, setFaqTexts] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data dari tabel 'faqsData'
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('faqsData')
          .select('*')
          .eq('lang_code', selectedLanguage)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setFaqs(data.questions || []);
          setFaqTexts({
            title: data.title || "Why Choose SSI?",
            description: data.description || ""
          });
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [selectedLanguage]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse font-custom">
        Loading Information...
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" id="faq">
      <div className="container mx-auto px-4 relative">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Judul Utama */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-custom">
            {faqTexts.title}
          </h2>
          
          {/* Deskripsi Pengganti Search Bar */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-600 text-lg font-custom leading-relaxed"
          >
            {faqTexts.description}
          </motion.p>
        </motion.div>

        {/* Daftar FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900 font-custom leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed font-custom text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQs;