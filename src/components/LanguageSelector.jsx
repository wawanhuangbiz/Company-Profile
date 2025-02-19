import React from 'react';
import { Tooltip } from 'react-tooltip';

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="hidden md:block space-x-2">
      <button
        onClick={() => handleSelectLanguage('en')}
        className={`inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300 ${
          selectedLanguage === 'en' ? 'bg-blue-50' : ''
        }`}
        data-tooltip-id="language-tooltip"
        data-tooltip-content="English"
      >
        <img src="/public/flags/en.png" alt="English flag" className='h-5 w-auto' />
      </button>
      <button
        onClick={() => handleSelectLanguage('zh')}
        className={`inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300 ${
          selectedLanguage === 'zh' ? 'bg-blue-50' : ''
        }`}
        data-tooltip-id="language-tooltip"
        data-tooltip-content="Chinese"
      >
        <img src="/public/flags/zn.png" alt="Chinese flag" className='h-5 w-auto' />
      </button>
      <Tooltip id="language-tooltip" place="bottom" effect="solid" />
    </div>
  );
};

export default LanguageSelector;
