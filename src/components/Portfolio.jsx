import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink, Search } from "lucide-react";
import { useState, useEffect } from "react";
import mainData from "../data/mainData.json";
import portfolioData from "../data/portfolioData";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules"; // Opsional: Tambah Autoplay jika ingin geser otomatis

const Portfolio = ({ selectedLanguage }) => {
  const portfolio = mainData[selectedLanguage]?.portfolio || {};
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const projects = portfolioData[selectedLanguage] || [];

  const categories = [
    "All",
    ...Array.from(new Set(projects.flatMap((project) => project.categories))),
  ];

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesTool =
        activeFilter === "All" || project.categories.includes(activeFilter);
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTool && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [activeFilter, searchTerm, projects]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="portfolio" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {portfolio?.featuredProjects}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {portfolio?.exploreOur}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-80"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeFilter === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {displayedProjects.length === 0 ? (
              <div className="col-span-full flex h-60 items-center justify-center text-center">
                <div className="text-gray-500">
                  <p className="mb-2 text-lg font-medium">
                    {portfolio?.noProjects}
                  </p>
                  <p className="text-sm">{portfolio?.tryAdjusting}</p>
                </div>
              </div>
            ) : (
              displayedProjects.map((project, index) => {
                // Logic untuk menangani data lama (string) dan baru (array)
                // const projectImages =
                //   project.images || (project.image ? [project.image] : []);

                let rawData = project.images || project.image || [];
                const projectImages = Array.isArray(rawData)
                  ? rawData
                  : [rawData];

                return (
                  <motion.div
                    key={project.title + index} // Tambah index agar key unik jika ada judul sama
                    layout
                    className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="relative overflow-hidden h-48">
                      {/* SWIPER IMPLEMENTATION */}
                      <Swiper
                        modules={[Pagination]}
                        pagination={{
                          clickable: true,
                          dynamicBullets: true, // Agar dot tidak terlalu panjang jika gambar banyak
                        }}
                        loop={projectImages.length > 1} // Loop hanya aktif jika gambar > 1
                        className="h-full w-full"
                      >
                        {projectImages.map((imgSrc, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <img
                              src={imgSrc}
                              alt={`${project.title} - ${imgIndex + 1}`}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-gray-600 line-clamp-3">
                        {" "}
                        {/* Tambah line-clamp agar text rapi */}
                        {project.description}
                      </p>
                      <p className="mb-4 text-gray-400 text-sm">
                        {project.area}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <a
                          href={project.link}
                          className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition duration-300 hover:bg-gray-300"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
          >
            {showAll ? "Show Less" : "View All Projects"}
            {showAll ? (
              <ArrowLeft className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            ) : (
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
