import React, { useState } from 'react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="w-full bg-[#030712] border-b border-gray-800 px-6 py-4 flex items-center justify-between text-white font-sans">
      
      {/* Left: Logo & Subtitle */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {/* Crown Icon */}
            <svg 
              className="w-6 h-6 text-amber-400" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L16 9L22 7L19 15H5L2 7L8 9L12 3Z" />
            </svg>
            <span className="text-xl font-bold tracking-wide">
              Resume <span className="text-amber-400">PRO</span>
            </span>
          </div>
          <span className="text-[11px] text-gray-400 flex items-center mt-0.5">
            <span className="text-amber-400 mr-1">⚡</span> Futuristic SaaS resume builder
          </span>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a href="#home" className="text-white border-b-2 border-amber-400 pb-1 px-1 transition-all">
          Home
        </a>
        <a href="#plans" className="hover:text-white transition-colors">
          Plans
        </a>
        <a href="#builder" className="hover:text-white transition-colors">
          Builder
        </a>
        <a href="#premium" className="hover:text-white transition-colors">
          Premium
        </a>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full border border-gray-800 hover:bg-gray-900 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            // Moon Icon
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun Icon
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 17.95a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414-14.14a1 1 0 11-1.414 1.414L4.34 4.34a1 1 0 011.414-1.414l.707.707zM4 10a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* User Profile Button */}
        <button className="p-2 rounded-full border border-gray-800 hover:bg-gray-900 transition-colors" aria-label="Profile">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {/* Get Started CTA Button */}
        <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-semibold px-4 py-2 rounded-lg flex items-center space-x-1 transition-all shadow-md shadow-amber-400/10">
          <span>Get Started</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </header>
  );
};

export default Header;