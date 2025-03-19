import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowUp,
  Facebook
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
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
    <footer>
      <div className="absolute bottom-0 filter blur-m opacity-30 inset-0 bg-cover bg-center bg-no-repeat bg-fixed bg-custom-image z-0"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">
          {/* Company Info */}
          <div>
            <img
              src="/images/logo-ssi-no-back.png"
              alt="Logo"
              className="h-50 w-auto mb-6"
            />
            <p className="text-[#FFD700] mb-6 leading-relaxed font-bold">
              Creating innovative solutions for businesses worldwide. We transform ideas into amazing experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
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

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Info</h3>
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

        {/* Scroll to Top Button */}
        <div className="flex justify-center">
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
    </footer>
  );
};

export default Footer;
