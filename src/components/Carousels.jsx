import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import imageData from "../data/imageData.json";
import housingData from "../data/housingData.json";
import interiorData from "../data/interiorData.json";
import "./Carousels.css";
import { motion } from "framer-motion"; // Import Framer Motion
import mainData from "../data/mainData.json";

const factories = imageData || [];
const housings = housingData || [];
const interiors = interiorData || [];

const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Define animation variants
const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const slideImageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Carousels = ({ selectedLanguage }) => {
  const data = mainData[selectedLanguage]?.portfolio || {};
  return (
    <section className="bg-gray-100 py-12 image-gallery" id="our-projects">
      <div className="container mx-auto px-4 h-auto">
        {/* Animated Section Heading */}
        <motion.h2
          className="text-5xl font-bold text-center mb-8 text-blue-600"
          variants={sectionHeadingVariants}
          initial="hidden"
          whileInView="visible"
        >
          {data?.ourWork}
        </motion.h2>
        <>
          {/* Swiper for Factory */}
<motion.h3
            className="text-3xl text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 mt-10"
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
          >
            Factories
          </motion.h3>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper ease-in"
          >
            {factories.map((image) => (
              <SwiperSlide key={image.id}>
                {/* Animated Slide Image */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-2xl shadow-md border border-gray-200"
                  variants={slideImageVariants}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper for Housings */}
          <motion.h3
            className="text-3xl text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 mt-10"
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
          >
            Housings
          </motion.h3>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper ease-in"
          >
            {housings.map((image) => (
              <SwiperSlide key={image.id}>
                {/* Animated Slide Image */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-2xl shadow-md border border-gray-200"
                  variants={slideImageVariants}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper for Interior */}
          <motion.h3
            className="text-3xl text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 mt-10"
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
          >
            Interior
          </motion.h3>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper ease-in"
          >
            {interiors.map((image) => (
              <SwiperSlide key={image.id}>
                {/* Animated Slide Image */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-2xl shadow-md border border-gray-200"
                  variants={slideImageVariants}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </section>
  );
};

export default Carousels;
