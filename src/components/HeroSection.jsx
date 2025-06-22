import React from 'react';


const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 flex items-center justify-center px-4 py-20">
      
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl  text-white mb-6 leading-tight font-sans">
          Empowering <span className="text-emerald-400">Growth</span>
          <br />
          Through Customer Centric
          <br />
          Wealth Solutions
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 leading-relaxed">
          Building wealth, securing futures
        </p>
        
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">
          Your dreams, our strategy
        </p>
      </div>
    </section>
  );
};

export default HeroSection; 