import React from "react";
import { RxLinkedinLogo } from "react-icons/rx";
import { IoLogoWechat } from "react-icons/io5";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import mainData from "../data/mainData.json";

const Footer = ({ selectedLanguage }) => {
  const navbarData = mainData[selectedLanguage]?.navbar?.menuItems;
  const contactData = mainData[selectedLanguage]?.contact;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-20 font-sans relative z-10 overflow-hidden">
      {/* Subtle Background Texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start mb-20">
          {/* Column 1: Identity */}
          <div className="space-y-6">
            <img
              src="images/logo-ssi-no-back.png"
              alt="SSI Logo"
              className="h-28 w-auto"
            />
            <p className="text-sm font-heading font-light leading-relaxed opacity-80 max-w-xs">
              {selectedLanguage === "zh"
                ? "致力于可持续的商业解决方案。"
                : "Empowering sustainable business solutions."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h3 className="text-lg font-heading font-semibold tracking-wide uppercase border-b border-indigo-500/30 table pb-2 text-indigo-400">
              {selectedLanguage === "zh" ? "快速链接" : "Quick Links"}
            </h3>
            <ul className="space-y-4 text-sm font-heading font-light">
              {navbarData?.map((item) => (
                <li key={item.id || item.name}>
                  <a
                    href={item.href}
                    className="hover:text-indigo-400 text-slate-300 transition-colors duration-300 flex items-center group w-fit"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-indigo-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-8">
            <h3 className="text-lg font-heading font-semibold tracking-wide uppercase border-b border-indigo-500/30 table pb-2 text-indigo-400">
              {contactData?.contactUs}
            </h3>
            <div className="space-y-6 text-sm font-heading font-light leading-7 text-slate-300">
              <div className="flex items-start group">
                <MdLocationOn className="text-indigo-500 text-xl mr-4 mt-0.5 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Menara Suara Merdeka, Jl. Pandanaran No.30, Pekunden, Kec.
                  Semarang Tengah, Kota Semarang, Jawa Tengah 50134,{" "}
                  <b>Lantai 12</b>
                </span>
              </div>
              <div className="flex items-center group">
                <MdPhone className="text-indigo-500 text-xl mr-4 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  +62 811-223-731
                </span>
              </div>
              <div className="flex items-center group">
                <MdEmail className="text-indigo-500 text-xl mr-4 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
                <a
                  href="mailto:studio.pt.ssi@gmail.com"
                  className="opacity-90 hover:text-white transition-colors border-b border-transparent hover:border-white"
                >
                  studio.pt.ssi@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-8">
            <h3 className="text-lg font-heading font-semibold tracking-wide uppercase border-b border-indigo-500/30 table pb-2 text-indigo-400">
              {selectedLanguage === "zh" ? "关注我们" : "Connect"}
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/company/pt-surya-solusi-internasional/"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20"
                aria-label="LinkedIn"
              >
                <RxLinkedinLogo size={24} />
              </a>
              {/* <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20"
                aria-label="WeChat"
              >
                <IoLogoWechat size={24} />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-end items-center text-xs font-heading font-light text-slate-500">
          <p>© {currentYear} SSI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <a href="#" className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Terms of Service
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
