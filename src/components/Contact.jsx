import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import mainData from "../data/mainData";
import emailjs from "emailjs-com";
import { IoLogoWechat, IoLogoWhatsapp } from "react-icons/io5";

const Contact = ({ selectedLanguage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    projectType: [], // Changed to array for multi-select
    message: "",
  });

  // --- STATE UNTUK WECHAT MODAL ---
  const [showWeChat, setShowWeChat] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // GANTI DENGAN ID WECHAT ASLI ANDA
  const weChatID = "huangdeming95";

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(weChatID);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const contacts = mainData[selectedLanguage]?.contact || {};

  // Project Types options
  const projectTypes = [
    {
      id: "industrial",
      label: selectedLanguage === "zh" ? "工业设计" : "Design",
    },
    {
      id: "construction",
      label: selectedLanguage === "zh" ? "小环评" : "RKL-RPL",
    },
    { id: "pbg", label: selectedLanguage === "zh" ? "建筑许可证" : "PBG" },
    { id: "slf", label: selectedLanguage === "zh" ? "使用许可证" : "SLF" },
    {
      id: "transformation",
      label: selectedLanguage === "zh" ? "转图" : "Transformation",
    },
    { id: "other", label: selectedLanguage === "zh" ? "其他" : "Other" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: selectedLanguage === "zh" ? "邮箱" : "Email",
      content: "studio.pt.ssi@gmail.com",
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      link: "mailto:studio.pt.ssi@gmail.com",
    },
    {
      icon: MapPin,
      title: selectedLanguage === "zh" ? "地址" : "Address",
      content:
        "Jl. Pandanaran No.30, Pekunden, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50134, Lantai 12",
      color: "bg-rose-50",
      iconColor: "text-rose-600",
      link: "https://maps.google.com/?q=Jl.+Pandanaran+No.30,+Semarang",
    },
    {
      icon: Clock,
      title: selectedLanguage === "zh" ? "营业时间" : "Business Hours",
      content: "Monday - Saturday: 8:00 AM - 5:00 PM",
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProjectTypeSelect = (type) => {
    setFormData((prev) => {
      const isSelected = prev.projectType.includes(type);
      return {
        ...prev,
        projectType: isSelected
          ? prev.projectType.filter((t) => t !== type) // Remove if already selected
          : [...prev.projectType, type], // Add if not selected
      };
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage(
        selectedLanguage === "zh"
          ? "请输入您的姓名"
          : "Please enter your name.",
      );
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage("Please enter your company name.");
      return false;
    }
    if (formData.projectType.length === 0) {
      setErrorMessage("Please select at least one project type.");
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage("");

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    // EmailJS service ID, template ID, and user ID from .env
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      console.error("EmailJS environment variables are missing!");
      setSubmitStatus("error");
      setErrorMessage("Configuration error. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data directly for EmailJS (formatting array to string)
    const emailData = {
      ...formData,
      projectType: formData.projectType.join(", "), // Converts array to "PBG, SLF, Other"
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          companyName: "",
          projectType: [],
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        setSubmitStatus("error");
        // Show the actual error message from EmailJS if available
        setErrorMessage(
          error.text ||
            error.message ||
            "Failed to send message. Please try again later.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Gradient Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 font-semibold font-heading text-sm mb-4 tracking-wide">
              {contacts?.contactUs}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
              {contacts?.contactSub}
            </h2>
            <p className="text-lg text-slate-600 font-heading max-w-2xl mx-auto leading-relaxed">
              {contacts?.contactParagraph}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex items-start space-x-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`p-4 rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 font-heading leading-relaxed hover:text-indigo-600 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-slate-600 font-heading leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">
                  {selectedLanguage === "zh"
                    ? "需要快速响应？"
                    : "Need a faster response?"}
                </h4>
                <p className="text-blue-100 text-sm mb-4">
                  {selectedLanguage === "zh"
                    ? "关于紧急办证事宜，请联系我们的客服团队。"
                    : "Chat with our support team regarding urgent permits."}
                </p>
                {/* <a
                  href="https://wa.me/628123456789"
                  className="w-full py-2 px-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition backdrop-blur-sm"
                >
                  {selectedLanguage === "zh"
                    ? "WhatsApp在线咨询"
                    : "Chat via WhatsApp"}
                </a> */}
                <div className="flex gap-3">
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/628123456789" // GANTI DENGAN NOMOR WA
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <IoLogoWhatsapp size={20} />
                    <span className="text-sm">WhatsApp</span>
                  </a>

                  {/* WeChat Trigger Button */}
                  <button
                    onClick={() => setShowWeChat(!showWeChat)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 ${
                      showWeChat
                        ? "bg-indigo-600 text-white shadow-indigo-200"
                        : "bg-white text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <IoLogoWechat size={20} />
                    <span className="text-sm">
                      {showWeChat ? "Close" : "WeChat"}
                    </span>
                  </button>
                </div>
                {/* QR Code Image Placeholder */}
                <AnimatePresence>
                  {showWeChat && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20 flex justify-center">
                        {/* GANTI SRC INI DENGAN FILE GAMBAR QR ANDA */}
                        <img
                          src="/public/wechat-qr.jpg"
                          alt="WeChat QR"
                          className="w-48 h-48 object-contain rounded-lg"
                        />
                      </div>

                      {/* ID & Copy Button */}
                      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-blue-100 uppercase font-bold tracking-wider">
                            WeChat ID
                          </span>
                          <span className="text-white font-medium font-mono text-sm">
                            {weChatID}
                          </span>
                        </div>
                        <button
                          onClick={handleCopyWeChat}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                            isCopied
                              ? "bg-green-500 text-white"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                        >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          {isCopied
                            ? selectedLanguage === "zh"
                              ? "已复制"
                              : "Copied"
                            : selectedLanguage === "zh"
                              ? "复制"
                              : "Copy"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-10">
                {/* Success/Error Animate Presence */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className={`rounded-lg p-4 flex items-center gap-3 ${submitStatus === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                    >
                      {submitStatus === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="font-heading text-sm font-medium">
                        {submitStatus === "success"
                          ? "Message sent successfully! We'll get back to you soon."
                          : errorMessage ||
                            "Something went wrong. Please try again later."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-heading text-sm font-semibold text-slate-700 mb-2"
                    >
                      {contacts?.form?.fullName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name" // Important for handleChange
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400 font-heading"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-heading text-sm font-semibold text-slate-700 mb-2"
                    >
                      {contacts?.form?.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400 font-heading"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block font-heading text-sm font-semibold text-slate-700 mb-2"
                    >
                      {selectedLanguage === "zh" ? "公司名称" : "Company Name"}
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400 font-heading"
                      placeholder="e.g. PT Surya Solusi Internasional"
                    />
                  </div>

                  {/* Project Type - Chips */}
                  <div>
                    <label className="block font-heading text-sm font-semibold text-slate-700 mb-2">
                      {selectedLanguage === "zh" ? "项目类型" : "Project Type"}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleProjectTypeSelect(type.label)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            formData.projectType.includes(type.label)
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-heading text-sm font-semibold text-slate-700 mb-2"
                    >
                      {contacts?.form?.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 transition-all duration-300 outline-none text-slate-800 placeholder:text-slate-400 font-heading resize-none"
                      placeholder={
                        selectedLanguage === "zh"
                          ? "请简述您的需求"
                          : "How can we help you?"
                      }
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-heading text-lg shadow-lg shadow-indigo-200 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{contacts?.form?.isSending || "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{contacts?.form?.send}</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
