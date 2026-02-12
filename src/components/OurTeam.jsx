import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import mainData from "../data/mainData.json";

const OurTeam = ({ selectedLanguage }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});

  // Fetch data dari Supabase
  const fetchTeams = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("teamData")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      if (data) setTeams(data);
    } catch (error) {
      console.log("Error fetching teams:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Ambil data heading dari JSON lokal
  const data = mainData[selectedLanguage]?.ourteam || {};

  // Logika Search dan Filter
  useEffect(() => {
    const filtered = teams.filter((team) => {
      const matchesCategory =
        activeFilter === "All" || team.role === activeFilter;
      const matchesSearch = (team.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredTeams(filtered);
  }, [activeFilter, searchTerm, teams]);

  return (
    <section
      id="our-team"
      className="bg-slate-50 py-24 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 tracking-tight"
          >
            {data?.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl font-heading text-slate-600 leading-relaxed"
          >
            {data?.subheading}
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="mb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-md"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={
                selectedLanguage === "zh" ? "搜索会员..." : "Search member..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border-0 bg-white py-4 pl-12 pr-6 text-slate-700 shadow-lg ring-1 ring-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredTeams.map((team) => {
                const isChinese = selectedLanguage === "zh";
                const isFlipped = flippedCards[team.id];

                return (
                  <motion.div
                    layout
                    key={team.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-[420px] w-full perspective-1000 group cursor-pointer"
                    onClick={() => handleCardClick(team.id)}
                  >
                    <motion.div
                      className="relative w-full h-full duration-500 preserve-3d"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* FRONT FACE */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-2xl bg-white shadow-xl overflow-hidden border border-slate-100"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="h-full flex flex-col">
                          <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <img
                              src={team.image}
                              alt={isChinese ? team.name_zh : team.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 right-4 z-20">
                              <h3 className="text-2xl font-heading font-bold text-white mb-1">
                                {isChinese
                                  ? team.name_zh || team.name
                                  : team.name}
                              </h3>
                              <div className="h-1 w-12 bg-indigo-500 rounded-full mb-2" />
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-center bg-white">
                            <p className="text-indigo-600 font-bold font-heading uppercase tracking-wider text-sm mb-2">
                              {isChinese
                                ? team.role_zh || team.role
                                : team.role}
                            </p>
                            <p className="text-slate-500 text-sm font-heading line-clamp-3">
                              "
                              {isChinese
                                ? team.quote_zh || team.quote
                                : team.quote}
                              "
                            </p>
                            <div className="mt-4 flex items-center text-indigo-500 text-sm font-medium">
                              <span>
                                {selectedLanguage === "zh"
                                  ? "点击查看更多"
                                  : "Click to view more"}
                              </span>
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BACK FACE */}
                      {/* BACK FACE */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-2xl bg-slate-900 text-white shadow-xl overflow-hidden p-8 flex flex-col justify-center items-center text-center group"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        {/* Dynamic Background Watermark - Lighter */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
                          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                          {/* Logo - Monochrome White */}
                          <div className="absolute flex items-center justify-center pointer-events-none overflow-hidden">
                            <img
                              src="/images/logo-ssi-no-back.png"
                              alt="watermark"
                              className="w-[120%] h-[120%] object-contain opacity-[0.15]"
                              style={{
                                filter: "grayscale(100%) brightness(1000%)",
                              }}
                            />
                            {/* Subtle glow behind logo */}
                            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                          </div>
                          {/* --- DEKORASI TAMBAHAN (Opsional, agar lebih manis) --- */}
                          {/* Gradient overlay agar watermark makin halus menyatu dengan background */}
                          <div className="absolute inset-0 bg-slate-900/40 z-0" />

                          <div className="relative w-full z-10">
                            <span className="absolute -top-6 -left-2 text-5xl text-indigo-500/20 font-serif leading-none">
                              "
                            </span>
                            <p className="text-lg md:text-xl font-heading font-light leading-relaxed italic text-indigo-50/90 mb-4 px-3">
                              {(isChinese
                                ? team.intro_zh || team.intro
                                : team.intro) || ""}
                            </p>
                            <span className="absolute -bottom-8 -right-2 text-5xl text-indigo-500/20 font-serif leading-none">
                              "
                            </span>
                          </div>

                          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-8 opacity-50" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurTeam;
