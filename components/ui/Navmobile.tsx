import React from 'react';

type NavmobileProps = {
  onClose: () => void;
};

export default function Navmobile({ onClose }: NavmobileProps) {
  return (
    <div className="md:hidden absolute top-[64px] left-0 w-full bg-black shadow-lg z-40 animate-slideUp">
      <ul className="flex flex-col p-4 space-y-3">
        <li className="animate-slideRight" style={{ animationDelay: '0.1s' }}>
          <a href="#hero" className="block text-white hover:text-blue-400 transition-colors" onClick={onClose}>Home</a>
        </li>
        <li className="animate-slideRight" style={{ animationDelay: '0.2s' }}>
          <a href="#about" className="block text-white hover:text-blue-400 transition-colors" onClick={onClose}>About</a>
        </li>
        <li className="animate-slideRight" style={{ animationDelay: '0.3s' }}>
          <a href="#member" className="block text-white hover:text-blue-400 transition-colors" onClick={onClose}>Member</a>
        </li>
        <li className="animate-slideRight" style={{ animationDelay: '0.3s' }}>
          <a href="#dedication" className="block text-white hover:text-blue-400 transition-colors" onClick={onClose}>Dedication</a>
        </li>
      </ul>
    </div>
  );
}
