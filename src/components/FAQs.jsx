import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import faqsData from "../data/faqsData.json";
import mainData from "../data/mainData.json"

const FAQs = ( {selectedLanguage} ) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = faqsData[selectedLanguage] || [];

  const faqData = mainData[selectedLanguage]?.faq || {};

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
     id="faq"
    >
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6 text-sm font-medium">
            <HelpCircle className="w-4 h-4 mr-2" />
            {faqData?.faqTitle}
          </div>
          <h2 className="text-3xl font-custom md:text-4xl font-bold text-gray-900 mb-4">
            {faqData?.faqSub}
          </h2>
          <p className="text-lg font-custom text-gray-600 max-w-4xl mx-auto mb-8">
            {faqData?.faqParagraph}
          </p>

        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <motion.button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className={`w-full flex items-center justify-between p-6 rounded-xl transition duration-300 ${
                    activeIndex === index
                      ? "bg-blue-200 shadow-md"
                      : "bg-white hover:bg-gray-50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center text-left">
                    <span className="text-lg font-custom font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${
                        activeIndex === index
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border-t border-gray-100">
                        <p className="text-gray-600 font-custom leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-600">
                No questions found matching your search. Try different keywords
                or{" "}
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  view all questions
                </button>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
