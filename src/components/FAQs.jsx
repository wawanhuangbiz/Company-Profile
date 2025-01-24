import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How long does it take to complete a website?",
      answer:
        "The timeline varies depending on the project scope. Typically, a basic website takes 2-4 weeks, while more complex projects may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
      category: "Timeline",
    },
    {
      question: "Do you provide hosting and domain registration?",
      answer:
        "Yes, we can help you with domain registration and provide reliable hosting solutions. We'll handle all technical aspects to ensure your website runs smoothly.",
      category: "Services",
    },
    {
      question: "Will my website be mobile-friendly?",
      answer:
        "Absolutely! All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices, from smartphones to desktop computers.",
      category: "Features",
    },
    {
      question: "Can you help with SEO?",
      answer:
        "Yes, we include basic SEO optimization in all our packages. This includes meta descriptions, alt tags, and proper heading structure. We also offer advanced SEO services for better search engine rankings.",
      category: "Services",
    },
    {
      question: "Do you provide website maintenance?",
      answer:
        "Yes, we offer various maintenance packages to keep your website secure, up-to-date, and running smoothly. This includes regular updates, backups, and technical support.",
      category: "Services",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6 text-sm font-medium">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our web development services.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
            />
          </div>
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
                      ? "bg-blue-50 shadow-md"
                      : "bg-white hover:bg-gray-50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center text-left">
                    <span className="text-lg font-semibold text-gray-900">
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
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex items-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                            {faq.category}
                          </span>
                        </div>
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
