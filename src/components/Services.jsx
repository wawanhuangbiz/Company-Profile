import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Making Concept Design",
      description:
        "Yaa...membuat desain sesuai keinginan.",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Amazing Design",
        "Keren abis lah",
        "Murah pol",
        "Enaakk",
      ],
    },
    {
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      icon: Smartphone,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Native Apps",
        "Cross-Platform",
        "User Experience",
        "App Store Ready",
      ],
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design solutions that enhance user experience.",
      icon: Palette,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: [
        "User Research",
        "Wireframing",
        "Visual Design",
        "Prototyping",
      ],
    },
    {
      title: "Digital Marketing",
      description:
        "Strategic marketing solutions to grow your online presence.",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
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
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solutions We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive digital services to help your business
            thrive in today's competitive landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 h-full">
                <div
                  className={`${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <ChevronRight className="w-5 h-5 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-6 inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
