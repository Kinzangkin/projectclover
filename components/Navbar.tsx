'use client';
import React, { useState } from 'react';
import Navmobile from './ui/Navmobile';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(prev => !prev);

  return (
    <nav className="w-full bg-black shadow-md fixed top-0 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto flex items-center justify-center p-4">
        <div className="flex items-center space-x-1 md:hidden">
          <div className="text-xl font-bold">Clover</div>
          <div className="flex items-center justify-center">
            <button onClick={toggleMobile} className="focus:outline-none">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ease-in-out ${isMobileOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden md:flex space-x-6 gap-9 font-bold">
          <a href="#hero" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 inline-block">Home</a>
          <a href="#about" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 inline-block">About</a>
          <a href="#member" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 inline-block">Member</a>
          <a href="#dedication" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 inline-block">dedication</a>
        </div>
      </div>

      {/* Mobile Nav Popup */}
      {isMobileOpen && (
        <Navmobile onClose={() => setIsMobileOpen(false)} />
      )}
    </nav>
  );
}
