import { motion } from "framer-motion";
import { Check, X, ArrowRight, Shield, Clock, Award, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "999",
      description: "Perfect for small businesses",
      icon: Shield,
      color: "blue",
      features: [
        { text: "5-page responsive website", included: true },
        { text: "Basic SEO optimization", included: true },
        { text: "Contact form", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "2 rounds of revisions", included: true },
        { text: "1 month of support", included: true },
        { text: "Custom functionality", included: false },
        { text: "E-commerce integration", included: false },
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "1,999",
      description: "Ideal for growing businesses",
      icon: Award,
      color: "purple",
      features: [
        { text: "10-page responsive website", included: true },
        { text: "Advanced SEO optimization", included: true },
        { text: "Custom contact forms", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Social media integration", included: true },
        { text: "Blog setup", included: true },
        { text: "5 rounds of revisions", included: true },
        { text: "3 months of support", included: true },
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "3,999",
      description: "For large organizations",
      icon: Zap,
      color: "pink",
      features: [
        { text: "Unlimited pages", included: true },
        { text: "Premium SEO optimization", included: true },
        { text: "Custom functionality", included: true },
        { text: "E-commerce integration", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom animations", included: true },
        { text: "Unlimited revisions", included: true },
        { text: "12 months of support", included: true },
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
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
            <Clock className="w-4 h-4 mr-2" />
            Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the best package for your needs. Transparent pricing with no
            hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={`h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ${
                  plan.popular ? "border-2 border-blue-600" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-${plan.color}-100 flex items-center justify-center mb-6`}
                  >
                    <plan.icon className={`w-6 h-6 text-${plan.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-end mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">/project</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      One-time payment
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
                        )}
                        <span
                          className={`text-${
                            feature.included ? "gray-600" : "gray-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                      plan.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need Something More Specific?
            </h3>
            <p className="text-gray-600 mb-6">
              We understand that every project is unique. Contact us for a
              custom quote tailored to your specific requirements.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300"
            >
              Contact for Custom Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
