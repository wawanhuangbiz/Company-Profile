import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  Cloud,
  Palette,
  Boxes,
  Layers2,
  Container,
  Brain,
  FileText,
  Grid2x2Check,
  Images
} from "lucide-react";

const Technologies = () => {
  const techs = [
    {
      name: "AutoCAD",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-blue-50",
      description: "Modern frontend development",
    },
    {
      name: "Sketchup",
      icon: Boxes, // Changed to FileJson to better represent Node.js
      color: "text-blue-600",
      bgColor: "bg-green-50",
      description: "Backend development",
    },
    {
      name: "Revit",
      icon: Layers2, // Changed to Cpu to represent TypeScript's type processing
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Type-safe development",
    },
    {
      name: "SAP2000",
      icon: Grid2x2Check, // Kept Database as it's perfect for MongoDB
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Database solutions",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 animate-blob rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-xl filter"></div>
      <div className="absolute right-0 top-0 h-72 w-72 animate-blob rounded-full bg-purple-100 opacity-70 mix-blend-multiply blur-xl filter animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-pink-100 opacity-70 mix-blend-multiply blur-xl filter animation-delay-4000"></div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Our Stack
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Technologies We Master
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We leverage cutting-edge technologies to build scalable, robust, and
            modern solutions for our clients.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {techs.map((tech, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="h-full rounded-2xl bg-white p-6 text-center shadow-lg transition duration-300 hover:shadow-xl">
                <div
                  className={`${tech.bgColor} mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <tech.icon className={`h-8 w-8 ${tech.color}`} />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
