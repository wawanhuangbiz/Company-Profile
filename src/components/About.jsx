import { motion } from "framer-motion";
import { ArrowRight, Code, Users, Zap, Shield, Trophy, Factory } from "lucide-react";
import mainData from "../data/mainData.json";

const About = ({ selectedLanguage }) => {

  const aboutData = mainData[selectedLanguage].about || {};
  const aboutItems = mainData[selectedLanguage].about.statsItems || {};

  const stats = [
    {
      icon: Factory,
      value: "50+",
      label: "Buildings Completed",
      description: "Successfully delivered projects",
    },
    {
      icon: Users,
      value: "180+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide",
    },
    {
      icon: Trophy,
      value: "15+",
      label: "Awards Won",
      description: "Industry recognition",
    },
    {
      icon: Shield,
      value: "99%",
      label: "Client Satisfaction",
      description: "Based on client feedback",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-[#EEEEEE] to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Image with single blue background */}
              <div className="absolute inset-0 bg-blue-600 transform rotate-3 rounded-2xl"></div>
              <img
                src="/src/assets/About.png"
                alt="About Us"
                className="relative rounded-2xl shadow-xl"
              />

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">2024</div>
                <div className="text-gray-600">{aboutData?.established}</div>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:pl-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                {aboutData?.whyChooseUs}
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {aboutData?.transformingConcepts}{" "}
                <span className="text-blue-600 relative">
                  {aboutData?.industrialExcellence}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      d="M1 5.5C20 3.5 40 3.5 60 5.5C80 7.5 100 9.5 120 9.5C140 9.5 160 7.5 180 5.5C200 3.5 220 3.5 240 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {aboutData?.aboutParagraph}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-2 gap-6 mb-8"
              >
                {aboutItems.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition duration-300 group"
                  >
                    <div className="mb-4">
                      <stat.icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#our-team"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 font-medium group"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
