import { motion } from "framer-motion";
import {
  Building,
  Cog,
  FileInput,
  Building2,
  Search,
  ChartBar,
} from "lucide-react";
import mainData from "../data/mainData.json";

const iconMap = {
  Building,
  Cog,
  FileInput,
  Building2,
  Search,
  ChartBar,
};

const Services = ({ selectedLanguage }) => {
  const servicesData = mainData[selectedLanguage]?.services || {};
  const servicesItems =
    mainData[selectedLanguage]?.services?.servicesItems || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
      id="services"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6"
          >
            {servicesData.ourServices}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {servicesData.servicesParagraph}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {servicesItems.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="h-full p-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col">
                  {/* Icon Container */}
                  <div
                    className={`
                    w-16 h-16 rounded-2xl mb-6 flex items-center justify-center
                    bg-gradient-to-br ${service.bgColor || "from-blue-50 to-blue-100"}
                    group-hover:scale-110 transition-transform duration-500 ease-out
                    shadow-inner
                  `}
                  >
                    {IconComponent && (
                      <IconComponent
                        className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gray-200 mt-6 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default Services;
