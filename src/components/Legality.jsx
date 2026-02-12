import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearchPlus } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { supabase } from "../supabaseClient";

const Legality = ({ selectedLanguage, setNavbarVisible }) => {
  // --- STATE ---
  const [legalityDocs, setLegalityDocs] = useState([]);

  // Default state agar tidak error saat render pertama sebelum fetch selesai
  const [pageContent, setPageContent] = useState({
    title: "",
    subTitle: "",
    tag: "", // Tambahan untuk label "Our Portfolio"
  });

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Ambil Judul Halaman & Dokumen secara paralel (Promise.all) agar lebih cepat
        const [mainResult, docsResult] = await Promise.all([
          // Query 1: Judul Halaman
          supabase
            .from("mainData")
            .select("other_content")
            .eq("lang_code", selectedLanguage)
            .maybeSingle(),

          // Query 2: Daftar Dokumen
          supabase
            .from("legality")
            .select("*")
            .eq("language", selectedLanguage)
            .order("id", { ascending: true }),
        ]);

        // --- PROSES DATA JUDUL (Main Data) ---
        if (mainResult.data?.other_content) {
          try {
            const parsedContent =
              typeof mainResult.data.other_content === "string"
                ? JSON.parse(mainResult.data.other_content)
                : mainResult.data.other_content;

            // Ambil bagian legality, atau gunakan fallback jika tidak ada
            const content = parsedContent.legality || {};

            setPageContent({
              title:
                content.title ||
                (selectedLanguage === "zh" ? "法律文件" : "Legality"),
              subTitle:
                content.subTitle ||
                (selectedLanguage === "zh"
                  ? "探索我们验证运营和合规性的基本法律文件。"
                  : "Explore the basic legal documents that validate our operations and compliance."),
              tag:
                content.tag ||
                (selectedLanguage === "zh" ? "甄选案例" : "Our Portfolio"),
            });
          } catch (e) {
            console.error("JSON Parse Error:", e);
          }
        } else {
          // Fallback jika database kosong/gagal
          setPageContent({
            title: selectedLanguage === "zh" ? "法律文件" : "Legality",
            subTitle:
              selectedLanguage === "zh"
                ? "探索我们验证运营和合规性的基本法律文件。"
                : "Explore the basic legal documents that validate our operations and compliance.",
            tag: selectedLanguage === "zh" ? "甄选案例" : "Our Portfolio",
          });
        }

        // --- PROSES DATA DOKUMEN ---
        if (docsResult.error) throw docsResult.error;
        setLegalityDocs(docsResult.data || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  // --- HANDLERS ---
  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (setNavbarVisible) setNavbarVisible(false); // Cek apakah prop function ada
  };

  const handleClose = () => {
    setSelectedImage(null);
    if (setNavbarVisible) setNavbarVisible(true);
  };

  // Close on Escape Key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  // --- ANIMASI VARIAN ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        <div className="flex flex-col items-center gap-2">
          <span className="loading loading-spinner loading-md"></span>{" "}
          {/* Jika pakai DaisyUI */}
          <p>Loading Documents...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="legality" className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <span className="flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 ring-1 ring-blue-100">
              <Sparkles size={12} className="mr-1" />
              {/* GUNAKAN DATA DARI SUPABASE DI SINI */}
              {pageContent.tag}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            {/* GUNAKAN DATA DARI SUPABASE DI SINI */}
            {pageContent.title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto h-1 w-24 bg-blue-600"
          />

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {/* GUNAKAN DATA DARI SUPABASE DI SINI */}
            {pageContent.subTitle}
          </p>
        </div>

        {/* Grid Documents */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {legalityDocs.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
              onClick={() => handleImageClick(item.image)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm">
                    <FaSearchPlus size={24} />
                  </div>
                </div>
              </div>

              {/* Title Content */}
              <div className="border-t border-gray-100 p-4 text-center bg-white">
                <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {!loading && legalityDocs.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">
              No documents found for this language.
            </p>
          </div>
        )}

        {/* Modal Portal */}
        {createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 z-[10000] rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah klik tembus ke overlay
                    handleClose();
                  }}
                >
                  <FaTimes size={28} />
                </button>

                {/* Image */}
                <motion.img
                  src={selectedImage}
                  alt="Document Fullscreen"
                  className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </div>
    </section>
  );
};

export default Legality;
