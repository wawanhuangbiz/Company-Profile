import { motion } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start by understanding your business goals, target audience, and project requirements.",
      icon: Search,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      number: "02",
      title: "Planning & Design",
      description:
        "Our team creates wireframes and designs that align with your brand and objectives.",
      icon: Palette,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      number: "03",
      title: "Development",
      description:
        "We build your solution using modern technologies and best practices.",
      icon: Code,
      color: "bg-pink-500",
      lightColor: "bg-pink-50",
    },
    {
      number: "04",
      title: "Testing & Launch",
      description:
        "Thorough testing ensures everything works perfectly before going live.",
      icon: Rocket,
      color: "bg-green-500",
      lightColor: "bg-green-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We follow a proven process to deliver exceptional results for every
            project, ensuring success from start to finish.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`p-8 ${step.lightColor} rounded-2xl hover:shadow-xl transition duration-300`}
              >
                <div className="absolute -top-4 -left-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                  >
                    <step.icon className="w-6 h-6" />
                  </motion.div>
                </div>
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 select-none">
                  {step.number}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
