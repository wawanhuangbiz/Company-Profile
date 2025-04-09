import React from 'react';
import Masonry from 'react-masonry-css';
import imageData from '../data/imageData.json';
import housingData from '../data/housingData.json';
import interiorData from '../data/interiorData.json';
import "./ImageGallery.css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const ImageGallery = () => {
   const images = imageData || [];
   const housing = housingData || [];
   const interior = interiorData || [];

   if (images.length === 0) {
      return <p className="text-center text-gray-600">No images available.</p>;
   }

   return (
     <section className="bg-gray-100 py-12 image-gallery" id="images">
       <div className="container mx-auto px-4">
         <h2 className="text-5xl font-bold text-center mb-8 text-blue-600">Our Projects</h2>
         
         <Masonry 
           breakpointCols={breakpointColumnsObj} 
           className="my-masonry-grid" 
           columnClassName="my-masonry-grid_column"
         >
           {images.map((image) => (
             <div key={image.id} className="mb-4 project-item">
               <img
                 src={image.src}
                 alt={`Project ${image.id}`}
                 className="w-full h-auto object-cover rounded-lg shadow-md"
               />
             </div>
           ))}
         </Masonry>
           <div className="mb-absolute bottom-0 right-0 p-4 text-9xl font-semibold text-gray-800">
             Factory
           </div>

         {/* Housings Section */}
         <Masonry 
           breakpointCols={breakpointColumnsObj} 
           className="my-masonry-grid" 
           columnClassName="my-masonry-grid_column"
         >
           <div className="col-span-full text-7xl font-semibold mb-6 flex items-center justify-center">
             Housings
           </div>
           {housing.map((image) => (
             <div key={image.id} className="mb-4 project-item">
               <img 
                 src={image.src}
                 alt={`Housing ${image.id}`}
                 className="w-full h-auto object-cover rounded-lg shadow-md"
               />
             </div>
           ))}
         </Masonry>

         {/* Interior Section */}
         <Masonry 
           breakpointCols={breakpointColumnsObj} 
           className="my-masonry-grid" 
           columnClassName="my-masonry-grid_column"
         >
           {interior.map((image) => (
             <div key={image.id} className="mb-4 project-item">
               <img
                 src={image.src}
                 alt={`Project ${image.id}`}
                 className="w-full h-auto object-cover rounded-lg shadow-md"
               />
             </div>
           ))}
           <div className="col-span-full text-7xl font-semibold mb-6 flex items-center justify-center rotate-text">
             Interior
           </div>
         </Masonry>
       </div>   
     </section>    
   );   
};   

export default ImageGallery;