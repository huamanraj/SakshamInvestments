import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-8 leading-tight font-sans">
          Empowering <span className="text-emerald-400">Growth</span>
          <br />
          Through Customer Centric
          <br />
          Wealth Solutions
        </h1>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
            Get Started
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 