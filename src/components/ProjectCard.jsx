import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// TERIMA PROP 'language' DI SINI
const ProjectCard = ({ project, language }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const images =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection, e) => {
    e.preventDefault();
    e.stopPropagation();
    setPage([page + newDirection, newDirection]);
  };

  // LOGIC LABEL BILINGUAL
  const areaLabel = language === "zh" ? "面积" : "Area";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
      {/* --- GAMBAR SLIDER (Sama seperti sebelumnya) --- */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
        {images.length > 0 ? (
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={page}
              src={images[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 h-full w-full object-cover"
              alt={`${project.title} - view`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          </AnimatePresence>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => paginate(-1, e)}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => paginate(1, e)}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all shadow-sm ${
                    idx === imageIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- KONTEN --- */}
      <div className="relative z-30 flex flex-1 flex-col bg-white p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.categories?.map((cat, index) => (
            <span
              key={index}
              className="inline-block rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
          {project.title}
        </h3>

        <div className="mb-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span className="line-clamp-2">{project.description}</span>
          </div>
          {project.area && project.area !== "N/A" && (
            <div className="flex items-center gap-2 pl-6">
              {/* GUNAKAN VARIABEL AREA LABEL DI SINI */}
              <span className="text-gray-400">{areaLabel}:</span>
              <span>{project.area}</span>
            </div>
          )}
        </div>

        {/* <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          {language === "zh" ? "查看详情" : "View Details"}{" "}
          <ArrowRight size={16} />
        </div> */}
      </div>
    </div>
  );
};

export default ProjectCard;
