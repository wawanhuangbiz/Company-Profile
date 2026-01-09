import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import imageData from "../data/imageData.json"; // Array of projects with image + meta
import "./Carousels.css";
import { motion } from "framer-motion";

const slideImageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Porto = ({ selectedLanguage }) => {
  const projects = imageData || [];

  // State to control synchronization between image Swiper and text Swiper
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-100 py-12" id="our-projects">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        
        {/* Left pane: Large images with coverflow parallax */}
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Controller]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          controller={{ control: controlledSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full lg:w-1/2 h-[400px] md:h-[500px] rounded-3xl shadow-lg"
        >
          {projects.map(({ id, src, alt }) => (
            <SwiperSlide key={id} className="rounded-3xl overflow-hidden">
              <motion.img
                src={src}
                alt={alt}
                className="object-cover w-full h-full rounded-3xl"
                variants={slideImageVariants}
                initial="hidden"
                animate="visible"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right pane: Textual project info synced with images */}
        <Swiper
          modules={[Controller]}
          slidesPerView={1}
          allowTouchMove={false} // Disable manual swipe here; sync from left swiper only
          controller={{ control: controlledSwiper }}
          onSwiper={setControlledSwiper}
          className="w-full lg:w-1/2 h-[400px] md:h-[500px] p-6 bg-white rounded-3xl shadow-lg flex flex-col justify-center"
        >
          {projects.map(({ id, name, location, architect, description }) => (
            <SwiperSlide key={id}>
              <motion.div
                key={id}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-800"
              >
                <h3 className="text-3xl font-semibold mb-2">{name}</h3>
                <p className="mb-1 italic text-gray-600">Location: {location}</p>
                <p className="mb-4 font-medium">Architect: {architect}</p>
                <p className="text-lg leading-relaxed">{description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Porto;