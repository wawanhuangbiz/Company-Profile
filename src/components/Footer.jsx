import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
  ];

  const services = [
    { name: "Web Development", href: "#" },
    { name: "Mobile Apps", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "Digital Marketing", href: "#" },
    { name: "Cloud Services", href: "#" },
    { name: "IT Consulting", href: "#" },
  ];

  const contactInfo = [
    { icon: Phone, content: "+1 (555) 123-4567" },
    { icon: Mail, content: "info@yourcompany.com" },
    {
      icon: MapPin,
      content: "123 Business Street, Suite 100, New York, NY 10001",
    },
  ];

  return (
    <footer className="bg-blue-950 pt-20 pb-8 relative">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img
              src="/api/placeholder/120/40"
              alt="Logo"
              className="h-10 w-auto mb-6"
            />
            <p className="text-blue-200 mb-6 leading-relaxed">
              Creating innovative digital solutions for businesses worldwide. We
              transform ideas into powerful digital experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <a
                    href={link.href}
                    className="text-blue-200 hover:text-white transition duration-300 flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <a
                    href={service.href}
                    className="text-blue-200 hover:text-white transition duration-300 flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start text-blue-200">
                  <info.icon className="w-5 h-5 mr-3 mt-1" />
                  <span className="flex-1">{info.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-blue-900 pt-8 pb-12">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-white text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-blue-200 mb-6">
              Stay updated with our latest news and special offers.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-blue-900 text-white border border-blue-800 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-blue-200 hover:text-white transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-blue-200 hover:text-white transition duration-300"
              >
                Terms of Service
              </a>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
