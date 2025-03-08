import React, { useState } from "react";
import legalityData from "../data/legalityData.json"; // Adjust the path as necessary
import mainData from "../data/mainData.json";
import { motion } from "framer-motion";

const Legality = ( {selectedLanguage} ) => {

  const legality = legalityData[selectedLanguage] || {};

  const legalData = mainData[selectedLanguage]?.legality || {};

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 relative overflow-hidden" id="legality">
      {/* Background Decorations */}
      <div className="absolute inset-0 filter blur-md opacity-30 bg-cover bg-center bg-no-repeat bg-fixed bg-custom-image z-0"></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{legalData.legalDocuments}</h2>
          <p className="text-gray-600 mt-4">
            {legalData.legalParagraph}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legality.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-110"
            >
              <img
                src={doc.image}
                alt={doc.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleImageClick(doc.image)}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{doc.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Document"
              className="max-w-full max-h-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Legality;
