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
      content: "Jl. Pandanaran No.30, Pekunden, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50134, Lantai 12",
    },
  ];

  return (
    <footer className="pt-20 pb-8 relative bg-image opacity-90 bg-footer-image bg-cover bg-center bg-no-repeat bg-fixed">

      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img
              src="/images/logo-ssi-no-back.png"
              alt="Logo"
              className="h-50 w-auto mb-6"
            />
            <p className="text-[#FFD700] mb-6 leading-relaxed font-bold">
              Creating innovative solutions for businesses worldwide. We
              transform ideas into amazing experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition duration-300"
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

        

        {/* Copyright */}
        <div className="pt-8">
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
