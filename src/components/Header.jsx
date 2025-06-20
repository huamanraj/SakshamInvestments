import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#1e3f4f] p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-3xl font-extrabold text-white">Growthfiniti</a>
        <div className="bg-[#2b4e5f] rounded-full px-8 py-3 flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><a href="/about-us" className="text-white hover:text-gray-200">About Us</a></li>
            <li><a href="/pms" className="text-white hover:text-gray-200">PMS</a></li>
            <li><a href="/careers" className="text-white hover:text-gray-200">Careers</a></li>
            <li><a href="/blog" className="text-white hover:text-gray-200">Blog</a></li>
            <li><a href="/contact" className="text-white hover:text-gray-200">Contact</a></li>
          </ul>
        </div>
        <a href="https://growthfiniti.investwell.app/app/#/login" className="bg-[#3cb17c] text-white px-6 py-3 rounded-full hover:bg-emerald-600">Login</a>
      </nav>
    </header>
  );
};

export default Header; 