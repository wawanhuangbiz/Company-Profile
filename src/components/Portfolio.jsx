import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Expand, Search } from "lucide-react";
import { useState, useEffect } from "react";
import mainData from "../data/mainData.json";
import portfolioData from "../data/portfolioData";

const Portfolio = ({ selectedLanguage }) => {
  const portfolio = mainData[selectedLanguage]?.portfolio || {};
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showAll, setShowAll] = useState(false); // New state for showing all projects

  const tools = [
    "All",
    "Building Maintenance",
    "Design",
    "Building Permit Approval",
    "Transformation",
  ];

  const projects = portfolioData;

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesTool =
        activeFilter === "All" || project.tools.includes(activeFilter);
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tools.some((tool) =>
          tool.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesTool && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [activeFilter, searchTerm, projects]);

  // Determine the projects to display based on the showAll state
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6); // Show only the first 6 projects

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
          {/* Search Input */}
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

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveFilter(tool)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeFilter === tool
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tool}
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
              displayedProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-gray-600">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
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
