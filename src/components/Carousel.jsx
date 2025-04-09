import React from 'react';
import Masonry from 'react-masonry-css';
import { ArrowLeft, ArrowRight } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import imageData from "../data/imageData.json"; // Ensure this path is correct
import housingData from "../data/housingData.json";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryGridCarouselSlide = ({ images, title }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((image) => (
          <div key={image.id} className="project-item">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

const CarouselWithMasonry = () => {
  const imagesPerPage = 12;
  const totalSlidesImage = Math.ceil(imageData.length / imagesPerPage);
  const totalSlidesHousing = Math.ceil(housingData.length / imagesPerPage);
  const totalSlides = totalSlidesImage + totalSlidesHousing;

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(totalSlides - 1, prevIndex + 1));
  };

  return (
    <div className="relative">
      <Carousel
        className="rounded-xl"
        value={activeIndex}
        onChange={setActiveIndex}
        navigation={false}
      >
        {[...Array(totalSlidesImage)].map((_, index) => {
          const start = index * imagesPerPage;
          const end = start + imagesPerPage;
          const slideImages = imageData.slice(start, end);
          
          return (
            <MasonryGridCarouselSlide
              key={index}
              images={slideImages}
              title="Factory"
            />
          );
        })}
        {[...Array(totalSlidesHousing)].map((_, index) => {
          const start = index * imagesPerPage;
          const end = start + imagesPerPage;
          const housingImages = housingData.slice(start, end);
          return (
            <MasonryGridCarouselSlide
              key={totalSlidesImage + index}
              images={housingImages}
              title="Housings"
            />
          );
        })}
      </Carousel>
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
        <button onClick={handlePrev} className="bg-white text-gray-800 rounded-full p-2">
          <ArrowLeft size="5xl" />
        </button>
        <button onClick={handleNext} className="bg-white text-gray-800 rounded-full p-2">
          <ArrowRight size="5xl" />
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] w-4 bg-white/50 hover:bg-white ${
              activeIndex === i ? "w-8 bg-white" : ""
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselWithMasonry;