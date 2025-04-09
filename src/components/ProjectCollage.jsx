import React from 'react';
import Masonry from 'react-masonry-css';

const ProjectCollage = () => {
  // List of static image paths
  const images = [
    '/images/projects/1.jpg',
    '/images/projects/7.jpg',
    '/images/projects/BtIndah8_50.jpg',
    '/images/projects/BtnunggalElok1_36.JPG',
    '/images/projects/DSCN0154.JPG',
    '/images/projects/DSCN0155.JPG',
    '/images/projects/DSCN0157.JPG',
    '/images/projects/DSCN0158.JPG',
    '/images/projects/DSCN0884.JPG',
    '/images/projects/LSukaresmi1_8.JPG',
    '/images/projects/image10.jpg',
    // Add more images as needed, up to 50
  ];

  return (
    <section className="py-48 bg-white flex flex-col justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <img src="/images/projects/1.jpg" alt="" className="w-full rounded-xl shadow" />
        </div>
        <div>
          <img src="/images/projects/7.jpg" alt="" className="w-full rounded-xl shadow" />
        </div>
        <div>
          <img src="/images/projects/BtIndah8_50.jpgg" alt="" className="w-full rounded-xl shadow" />
        </div>
        <div>
          <img src="/images/projects/BtnunggalElok1_36.JPG" alt="" className="w-full rounded-xl shadow" />
        </div>
        <div>
          <img src="/images/projects/DSCN0154.JPG" alt="" className="w-full rounded-xl shadow" />
        </div>
        <div>
          <img src="/images/projects/DSCN0155.JPG" alt="" className="w-full rounded-xl shadow" />
        </div>
      </div>
    </section>
  );
};


export default ProjectCollage;
