import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Star, Clock, ArrowRight } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "Based on client feedback",
      icon: Star,
      color: "from-yellow-400 to-yellow-600",
      textColor: "yellow",
    },
    {
      value: "500+",
      label: "Projects Completed",
      description: "Across various industries",
      icon: Target,
      color: "from-blue-400 to-blue-600",
      textColor: "blue",
    },
    {
      value: "50+",
      label: "Awards Won",
      description: "Industry recognition",
      icon: Trophy,
      color: "from-purple-400 to-purple-600",
      textColor: "purple",
    },
    {
      value: "24/7",
      label: "Support Available",
      description: "Ready to help anytime",
      icon: Clock,
      color: "from-green-400 to-green-600",
      textColor: "green",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 hover:bg-gray-800/70 transition duration-300">
                <div
                  className={`w-16 h-16 rounded-2xlbg-gradient-to-br ${stat.color} p-4 mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative"
                >
                  <div className="text-4xl font-bold text-white mb-2 flex items-baseline">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-lg font-medium text-white/90 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/60">
                    {stat.description}
                  </div>
                </motion.div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r group-hover:w-full ${stat.color} transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their
            digital presence with us.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Animated Counter Component
const CountUp = ({ value }) => {
  const isPercentage = value.includes("%");
  const number = parseInt(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const frames = 60;
    const increment = number / frames;
    let currentCount = 0;

    const counter = setInterval(() => {
      currentCount += increment;
      if (currentCount >= number) {
        setCount(number);
        clearInterval(counter);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, duration / frames);

    return () => clearInterval(counter);
  }, [number]);

  return (
    <span>
      {count}
      {isPercentage && "%"}
    </span>
  );
};

export default Stats;
