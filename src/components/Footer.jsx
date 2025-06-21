import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#09252c] text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">
              <span className="text-2xl">⚡</span> Growthfiniti
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-sm">
            <a href="/about-us" className="hover:text-white transition-colors duration-200">About Us</a>
            <a href="/careers" className="hover:text-white transition-colors duration-200">Careers</a>
            <a href="/loan" className="hover:text-white transition-colors duration-200">Loan</a>
            <a href="/fd" className="hover:text-white transition-colors duration-200">FD</a>
            <a href="/blog" className="hover:text-white transition-colors duration-200">Blog</a>
            <a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a>
            <a href="/faqs" className="hover:text-white transition-colors duration-200">FAQs</a>
            <a href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://in.linkedin.com/company/growthfiniti" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors duration-200">
              <i className="fab fa-linkedin text-white text-sm"></i>
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fgrowthfiniti" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors duration-200">
              <i className="fab fa-twitter text-white text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 