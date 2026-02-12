import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import mainData from "../data/mainData";
import emailjs from "emailjs-com";

const Contact = ({ selectedLanguage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPDATE 1: projectType diubah default-nya menjadi array kosong []
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: [],
    message: "",
  });

  const projectTypes = [
    "Industrial Design",
    "RKL-RPL",
    "PBG",
    "SLF",
    "Transformation",
    "Other",
  ];

  const contacts = mainData[selectedLanguage]?.contact || {};

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "studio.pt.ssi@gmail.com",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      link: "mailto:studio.pt.ssi@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content:
        "Jl. Pandanaran No.30, Pekunden, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50134, Lantai 12",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      link: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Saturday: 8:00 AM - 5:00 PM",
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      link: null,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPDATE 2: Logic Multi-Select (Toggle Add/Remove)
  const handleProjectSelect = (type) => {
    setFormData((prev) => {
      const isSelected = prev.projectType.includes(type);
      if (isSelected) {
        // Jika sudah ada, hapus dari array (unselect)
        return {
          ...prev,
          projectType: prev.projectType.filter((t) => t !== type),
        };
      } else {
        // Jika belum ada, tambahkan ke array (select)
        return {
          ...prev,
          projectType: [...prev.projectType, type],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi: Cek apakah array projectType kosong
    if (!formData.company || formData.projectType.length === 0) {
      alert("Please fill in Company Name and select at least one Project Type");
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = "service_dotu0j7";
    const TEMPLATE_ID = "template_st80m88";
    const USER_ID = "pToujn9LJV7ugZaaO";

    // UPDATE 3: Format data sebelum kirim (Array -> String dipisah koma)
    // Supaya di email terbaca: "RKL-RPL, PBG, Other"
    const dataToSend = {
      ...formData,
      projectType: formData.projectType.join(", "),
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, dataToSend, USER_ID)
      .then((response) => {
        alert("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: [], // Reset kembali ke array kosong
          message: "",
        });
        setIsSubmitting(false);
      })
      .catch((error) => {
        alert("Failed to send email. Please try again later.");
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4"
          >
            {contacts?.contactUs || "Contact Us"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {contacts?.contactSub || "Let's Start a Conversation"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {contacts?.contactParagraph ||
              "Ready to transform your space? Fill out the form below and our team will get back to you within 24 hours."}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* LEFT COLUMN: Contact Info (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 space-y-8"
          >
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.link || "#"}
                      className={`flex items-start space-x-4 group ${!item.link ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div
                        className={`p-3 rounded-xl transition-colors duration-300 ${item.color} group-hover:scale-110`}
                      >
                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          {item.title}
                        </span>
                        <p className="text-gray-700 font-medium leading-relaxed group-hover:text-blue-600 transition-colors">
                          {item.content}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">
                  Need a faster response?
                </h4>
                <p className="text-blue-100 text-sm mb-4">
                  Chat with our support team regarding urgent permits.
                </p>
                <a
                  href="https://wa.me/628123456789"
                  className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition backdrop-blur-sm"
                >
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      {contacts?.form?.fullName || "Full Name"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">
                      {contacts?.form?.email || "Email Address"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. PT. Surya Solusi Internasional"
                  />
                </div>

                {/* PROJECT TYPE - MULTI SELECT */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    I'm interested in... <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => {
                      // Cek apakah item ini ada di dalam array pilihan
                      const isSelected = formData.projectType.includes(type);

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleProjectSelect(type)}
                          className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border text-left flex items-center justify-between group
                            ${
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                                : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                        >
                          <span>{type}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    {contacts?.form?.message || "Tell us more"}
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Please describe your project requirements..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Request</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
