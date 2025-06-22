import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#09252c] text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 mb-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">
              <img src="/logo.png" alt="Saksham Investments" className="h-16 w-auto" />
              
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-sm">
            <a href="/about-us" className="hover:text-white transition-colors duration-200">About Us</a>
            <a href="/blog" className="hover:text-white transition-colors duration-200">Blog</a>
            <a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a>
            <a href="/admin" className="hover:text-white transition-colors duration-200">Admin</a>

            <a href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors duration-200">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-sm space-y-4">
            {/* Investment Disclaimer */}
            <p className="text-gray-400">
              Disclaimer: Mutual fund investments are subject to market risks. Please read the scheme information and other related documents carefully before investing. Past performance is not indicative of future returns. Please consider your specific investment requirements before choosing a fund, or designing a portfolio that suits your needs.
            </p>

            {/* Company Info */}
            <p className="text-gray-400">
              Saksham Investments makes no warranties or representations, express or implied, on products offered through the platform of Saksham Investments. It accepts no liability for any damages or losses, however caused, in connection with the use of, or on the reliance of its product or related services.
            </p>

            {/* AMFI Registration Details */}
            <div className="bg-gray-800 p-4 rounded-lg mt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <img src="https://tradebrains.in/wp-content/uploads/2021/03/amfi-logo.jpg" alt="AMFI Registered Mutual Fund Distributor" className="h-16 w-auto" />
                  <div className="ml-4">
                    <div className="text-white font-semibold">AMFI Registered</div>
                    <div className="text-gray-400">Mutual Fund Distributor</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                  <div>ARN - 34833 & EUIN - E-048264 (CHIRAG JAIN)</div>
                  <div>ARN - 119040 & EUIN - E-182468 (MAHESH KUMAR JAIN)</div>
                  <div>ARN - 172369 & EUIN - E-345866 (MONIKA JAIN)</div>
                  <div>ARN - 172320 & EUIN - E-345800 (KAMLA JAIN)</div>
                </div>
              </div>
            </div>

            {/* Design Credit - Left Aligned */}
            <div className="text-left mt-6">
              <a 
                href="https://amanraj.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                DESIGN & DEVELOPED BY AMAN RAJ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 