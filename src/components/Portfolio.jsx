import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
  ];

  const projects = [
    {
      title: "GFT New Factory",
      category: "Web Development",
      image: "/src/assets/Logo.jpg",
      description: "Modern e-commerce solution with advanced features",
      icon: Code,
      tools: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Fuling New Factory",
      category: "Mobile Development",
      image: "/src/assets/Logo.jpg",
      description: "Secure and user-friendly banking application",
      icon: Smartphone,
      tools: ["React Native", "Firebase", "Redux"],
      link: "#",
    },
    {
      title: "Makuku New Factory",
      category: "Web Development",
      image: "/src/assets/Logo.jpg",
      description: "Professional website with custom CMS",
      icon: Code,
      tools: ["Next.js", "Tailwind CSS", "Strapi"],
      link: "#",
    },
    {
      title: "Citra Sanxing Indonesia New Factory",
      category: "UI/UX Design",
      image: "/src/assets/Logo.jpg",
      description: "Analytics and management platform",
      icon: Palette,
      tools: ["Figma", "Adobe XD", "Sketch"],
      link: "#",
    },
    {
      title: "SMJ-SBRI New Factory",
      category: "Web Development",
      image: "/src/assets/Logo.jpg",
      description: "Real-time tracking and management system",
      icon: Code,
      tools: ["Vue.js", "Express", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Educational Platform",
      category: "Web Development",
      image: "/src/assets/Logo.jpg",
      description: "Online learning management system",
      icon: Code,
      tools: ["Django", "React", "AWS"],
      link: "#",
    },
  ];

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory =
        activeFilter === "All" || project.category === activeFilter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tools.some((tool) =>
          tool.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [activeFilter, searchTerm]);

  // Enhanced FilterButton component
  const FilterButton = ({ category }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveFilter(category)}
      className={`rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${
        activeFilter === category
          ? "bg-blue-600 text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      {category}
    </motion.button>
  );

  return (
    <section id="portfolio" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600"
          >
            Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-600"
          >
            Explore our recent work and see how we've helped businesses achieve
            their digital goals through innovative solutions.
          </motion.p>
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
          <motion.div className="flex flex-wrap gap-3" initial={false}>
            {categories.map((category) => (
              <FilterButton key={category} category={category} />
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex h-60 items-center justify-center text-center"
              >
                <div className="text-gray-500">
                  <p className="mb-2 text-lg font-medium">No projects found</p>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </motion.div>
            ) : (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 transition duration-300 group-hover:opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={project.link}
                        className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition duration-300 hover:scale-105"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <project.icon className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{project.description}</p>
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
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <button className="group inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
