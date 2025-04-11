import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import imageData from "../data/imageData.json";
import housingData from "../data/housingData.json";
import interiorData from "../data/interiorData.json";
import "./Carousels.css";

const factories = imageData || [];
const housings = housingData || [];
const interiors = interiorData || [];

const Carousels = () => {
  return (
    <section className="bg-gray-100 py-12 image-gallery" id="our-projects">
      <div className="container mx-auto px-4 h-auto">
        <h2 className="text-5xl font-bold text-center mb-8 text-blue-600">
          Our Projects
        </h2>
        <>
          {/* Swiper for Factory */}
          <h3>Factory</h3>
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
            navigation={true} // Enable navigation arrows
            modules={[EffectCoverflow, Pagination, Navigation]} // Include Navigation module
            className="mySwiper"
          >
            {factories.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="content-center">
                  <img src={image.src} alt={image.alt} className="rounded-2xl justify-center item-center" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper for Housings */}
          <h3>Housings</h3>
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
            navigation={true} // Enable navigation arrows
            modules={[EffectCoverflow, Pagination, Navigation]} // Include Navigation module
            className="mySwiper mt-10"
          >
            {housings.map((image) => (
              <SwiperSlide key={image.id}>
                <img src={image.src} alt={image.alt} className="rounded-2xl justify-center item-center" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper for Interior */}
          <h3>Interior</h3>
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
            navigation={true} // Enable navigation arrows
            modules={[EffectCoverflow, Pagination, Navigation]} // Include Navigation module
            className="mySwiper mt-10"
          >
            {interiors.map((image) => (
              <SwiperSlide key={image.id}>
                <img src={image.src} alt={image.alt} className="rounded-2xl justify-center item-center" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </section>
  );
};

export default Carousels;