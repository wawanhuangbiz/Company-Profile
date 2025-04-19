import React, { useState, useEffect } from 'react';
import { RxLinkedinLogo } from "react-icons/rx";
import { IoLogoWechat } from "react-icons/io5";
import mainData from '../data/mainData.json';

const Footer = ({ selectedLanguage }) => {
  const [footerVisibility, setFooterVisibility] = useState(0);
  const data = mainData[selectedLanguage]?.footer?.footParagraph;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const footerHeight = document.querySelector('footer').offsetHeight;
  
      if (scrollTop + windowHeight >= documentHeight - footerHeight) {
        document.documentElement.style.setProperty('--footer-visibility', '1');
      } else if (scrollTop < documentHeight - footerHeight - windowHeight * 0.1) {
        document.documentElement.style.setProperty('--footer-visibility', '0');
      } else {
        document.documentElement.style.setProperty('--footer-visibility', (scrollTop + windowHeight) / (documentHeight - footerHeight));
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`py-20 relative overflow-hidden ${footerVisibility !== 0 ? 'lifted' : ''}`}>
      <div className='absolute bottom-0 filter blur-m opacity-40 inset-0 bg-cover bg-center bg-no-repeat bg-fixed bg-custom-image z-0'></div>
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex flex-wrap items-center top-0 justify-center mb-6">
          <img src="/images/logo-ssi-no-back.png" alt="Company Logo" className="h-40" />
        </div>

        {/* Description Section */}
        <p className="text-center mb-6 font-custom">
          {data}
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center mb-6">
          <a href="#" className="mx-2"><IoLogoWechat /></a>
          <a href="#" className="mx-2"><RxLinkedinLogo /></a>
        </div>

        {/* Copyright Section */}
        <div className="text-center">
          <p>© 2025 SSI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;