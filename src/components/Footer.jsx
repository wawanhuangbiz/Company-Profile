// Footer.jsx
import React from 'react';
import {RxLinkedinLogo} from "react-icons/rx";
import {IoLogoWechat} from "react-icons/io5";
import mainData from '../data/mainData.json';


const Footer = ({ selectedLanguage }) => {
const data = mainData[selectedLanguage]?.footer?.footParagraph ;
    return (
      <footer className="bg-[#102E50] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <img src="/images/logo-ssi-no-back.png" alt="Company Logo" className="h-40" />
        </div>

        {/* Description Section */}
        <p className="text-center mb-6">
          {data}
        </p>

        {/*/!* Quick Links Section *!/*/}
        {/*<div className="flex flex-wrap justify-center mb-6">*/}
        {/*  <a href="#markets" className="mx-4 hover:underline">Markets We Serve</a>*/}
        {/*  <a href="#subcontractors" className="mx-4 hover:underline">Subcontractors</a>*/}
        {/*  <a href="#warranty" className="mx-4 hover:underline">Warranty</a>*/}
        {/*  <a href="#testimonials" className="mx-4 hover:underline">Testimonials</a>*/}
        {/*  <a href="#contact" className="mx-4 hover:underline">Contact Us</a>*/}
        {/*</div>*/}

        {/* Stay Connected Section */}
        {/*<div className="flex flex-col items-center mb-6">*/}
        {/*  <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>*/}
        {/*  <input*/}
        {/*    type="email"*/}
        {/*    placeholder="Email Address"*/}
        {/*    className="p-2 rounded-md text-black"*/}
        {/*  />*/}
        {/*  <button className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400">*/}
        {/*    Join*/}
        {/*  </button>*/}
        {/*</div>*/}

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
