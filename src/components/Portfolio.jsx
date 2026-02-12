import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { supabase } from "../supabaseClient";
import ProjectCard from "./ProjectCard";
import { select } from "@material-tailwind/react";

// --- HELPER FUNCTION: PARSING DATA ---
const parseSupabaseArray = (dbString) => {
  if (Array.isArray(dbString)) return dbString;
  if (!dbString || typeof dbString !== "string") return [];

  let cleaned = dbString.replace(/^[\{\[]/, "").replace(/[\}\]]$/, "");
  if (!cleaned || cleaned.trim() === "") return [];

  const matches = cleaned.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (!matches) return [];

  return matches.map((item) => {
    return item.trim().replace(/^"|"$/g, "").replace(/""/g, '"');
  });
};

// --- COMPONENT SKELETON (LOADING STATE) ---
const PortfolioSkeleton = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        <div className="mb-4 h-48 w-full animate-pulse rounded-lg bg-gray-200"></div>
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
      </div>
    ))}
  </div>
);

// --- MAIN COMPONENT ---
const Portfolio = ({ selectedLanguage }) => {
  const [projects, setProjects] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["All"]);

  // --- NEW STATE: VISIBLE COUNT ---
  const [visibleCount, setVisibleCount] = useState(3);
  const PROJECTS_INCREMENT = 3;

  useEffect(() => {
    fetchData();
  }, [selectedLanguage]);

  // Reset filtered count when filter or search changes
  useEffect(() => {
    setVisibleCount(PROJECTS_INCREMENT);
  }, [activeFilter, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: contentData, error: contentError } = await supabase
        .from("mainData")
        .select("portoFeaturedProjects, ourWork")
        .eq("lang_code", selectedLanguage)
        .maybeSingle();

      if (!contentError) setPageContent(contentData || {});

      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolio")
        .select("*")
        .order("id", { ascending: true });

      if (portfolioError) {
        console.error("Error fetching portfolio:", portfolioError);
        setProjects([]);
      } else {
        setProjects(portfolioData || []);

        if (portfolioData && portfolioData.length > 0) {
          const targetField =
            selectedLanguage === "zh" ? "categories_zh" : "categories_en";

          const allCats = portfolioData.flatMap((p) =>
            parseSupabaseArray(p[targetField]),
          );

          const uniqueCats = ["All", ...new Set(allCats)];
          setCategories(uniqueCats);
        }
      }
    } catch (error) {
      console.error("Critical Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const targetField =
      selectedLanguage === "zh" ? "categories_zh" : "categories_en";
    const projectCats = parseSupabaseArray(project[targetField]);

    const matchesCategory =
      activeFilter === "All" || projectCats.includes(activeFilter);

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (project.title && project.title.toLowerCase().includes(query)) ||
      (project.description &&
        project.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // --- SLICING FOR DISPLAY ---
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_INCREMENT);
  };

  const handleShowLess = () => {
    setVisibleCount(PROJECTS_INCREMENT);
    // Optional: scroll back to top of grid
    const gridElement = document.getElementById("portfolio-grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-slate-50 py-24 selection:bg-blue-100 selection:text-blue-900"
    >
      <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-100/50 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 ring-1 ring-blue-100">
              <Sparkles size={12} className="mr-1" />
              {selectedLanguage === "zh" ? "甄选案例" : "Our Portfolio"}
            </span>
          </div>

          <h2 className="mb-6 pb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-5xl">
            {pageContent?.portoFeaturedProjects || "Featured Projects"}
          </h2>

          <div className="mx-auto max-w-2xl text-lg text-gray-600">
            {pageContent?.paragraph ? (
              <p>{pageContent.paragraph}</p>
            ) : (
              <p className="text-gray-500">
                {selectedLanguage === "zh"
                  ? "融合独特视野与可持续理念。探索我们在砖石与玻璃间讲述的空间故事。"
                  : "Where unique vision meets sustainable reality. Explore narratives crafted in brick, glass, and steel."}
              </p>
            )}
          </div>
        </motion.div>

        <div className="sticky top-4 z-40 mb-12 flex flex-col items-center gap-6 rounded-2xl border border-white/40 bg-white/70 px-6 py-6 shadow-xl shadow-blue-900/5 backdrop-blur-md md:top-6">
          <div className="relative w-full max-w-lg transition-all focus-within:max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder={
                selectedLanguage === "zh" ? "搜索..." : "Search projects..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-none bg-gray-100/50 py-3.5 pl-11 pr-4 text-gray-700 shadow-inner ring-1 ring-transparent transition-all placeholder:text-gray-400 focus:bg-white focus:shadow-lg focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-none md:flex-wrap md:justify-center md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none ${
                  activeFilter === category
                    ? "text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-blue-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <PortfolioSkeleton />
        ) : (
          <>
            <motion.div
              layout
              id="portfolio-grid"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.length > 0 ? (
                  visibleProjects.map((project, index) => {
                    const displayCategories =
                      selectedLanguage === "zh"
                        ? parseSupabaseArray(project.categories_zh)
                        : parseSupabaseArray(project.categories_en);

                    let displayImages = parseSupabaseArray(project.image);

                    if (displayImages.length === 0 && project.image) {
                      displayImages = [project.image];
                    }

                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ProjectCard
                          project={{
                            ...project,
                            categories: displayCategories,
                            images: displayImages,
                          }}
                          language={selectedLanguage}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                  >
                    <Search className="mb-4 h-16 w-16 text-gray-200" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedLanguage === "zh"
                        ? "未找到项目"
                        : "No projects found"}
                    </h3>
                    <p className="text-gray-500">
                      {selectedLanguage === "zh"
                        ? "请尝试调整您的搜索或筛选条件。"
                        : "Try adjusting your search or filter."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* --- LOAD MORE BUTTON --- */}

            <div className="mt-12 flex justify-center">
              <AnimatePresence>
                {hasMoreProjects && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-bold tracking-wide text-gray-900 shadow-lg shadow-blue-900/5 ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-xl hover:ring-blue-200"
                  >
                    <span className="relative z-10">
                      {selectedLanguage === "zh"
                        ? "加载更多"
                        : "Show More Projects"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.button>
                )}

                {!hasMoreProjects &&
                  filteredProjects.length > PROJECTS_INCREMENT && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShowLess}
                      className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-bold tracking-wide text-gray-500 shadow-md ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:text-gray-900"
                    >
                      <span className="relative z-10">
                        {selectedLanguage === "zh" ? "收起" : "Show Less"}
                      </span>
                    </motion.button>
                  )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
