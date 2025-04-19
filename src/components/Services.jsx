import { motion } from "framer-motion";
import {
  Building,
  Cog,
  FileInput,
  Building2,
  Search,
  ChartBar
} from "lucide-react";
import mainData from "../data/mainData.json";

const iconMap = {
  Building,
  Cog,
  FileInput,
  Building2,
  Search,
  ChartBar
};

const Services = ({ selectedLanguage, IconComponent }) => {
  const servicesData = mainData[selectedLanguage]?.services || {};
  const servicesItems = mainData[selectedLanguage]?.services?.servicesItems || [];

  return (
    <section className="py-20 bg-gradient-to-b bg-[#EEEEEE] from-white to-gray-50 relative overflow-hidden" id="services">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full filter blur-3xl opacity-30"></div>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{servicesData.ourServices}</h2>
        <p className="text-center mb-12">{servicesData.servicesParagraph}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesItems.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 h-full">
                  <div
                    className={`${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {IconComponent && <IconComponent className="w-20 h-20 text-gray-300 group-hover:scale-110 group-hover:text-blue-600 transition-transform duration-300" />}
                  </div>
                  <h3 className="text-xl font-custom font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 font-custom mb-6">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Services;
