import { motion } from "framer-motion";
import { ArrowRight, Star, Play } from "lucide-react";
import mainData from "../data/mainData.json";

const Hero = ({ selectedLanguage }) => {
  // Ensure mainData is defined
  const languageData = mainData[selectedLanguage] || {};
  const heroData = languageData.hero || {};
  const heroItems = heroData.heroItems || [];

  console.log("Language data: ", languageData);
  console.log("heroData: ", heroData);
  console.log("Hero items: ", heroItems);
  
  
  

  return (
    <section
      id="home"
      className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#EEEEEE] to-white"
    >
      {/* Bottom blur effect overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white backdrop-blur-sm bg-custom-image"></div>

      <div className="container mx-auto px-4 relative">
        {/* Background Decorations */}
        {/* <div className="absolute top-40 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-72 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-[#D84040] bg-opacity-50 text-[#8E1616] rounded-full mb-6 text-sm font-medium"
              >
                <Star className="w-4 h-4 mr-2" />
                {heroData.trustedBy} 
                {/* || "Trusted by 500+ companies worldwide"} */}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8E1616] leading-tight mb-6"
              >
                {heroData.heading}
                <span className="relative inline-block">
                  <div className="">
                    <span className="relative text-[#8E1616]">
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {heroData.paragraph}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full transition-all duration-300 font-medium inline-flex items-center shadow-lg hover:shadow-blue-500/50"
                >
                  {heroItems?.[0]?.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full transition-all duration-300 font-medium border-2 border-gray-200 inline-flex items-center shadow-lg hover:shadow-gray-200/50"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {heroItems?.[1]?.text}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <div className="hidden lg:block w-full lg:w-1/2 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-70"></div>
              <img
                src="/src/assets/image_hero.png"
                alt="Hero"
                className="relative rounded-2xl shadow-2xl"
              />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">{heroItems?.[0].text}</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">{heroItems?.[1]?.text}</span>
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
  