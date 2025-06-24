import React, { useRef } from 'react';
import Layout from '../layouts/Layout';

const FactorInvestingPage = () => {
  const factorSelectionRef = useRef(null);
  const riskBudgetRef = useRef(null);
  const assetAllocationRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-10 bg-[#0c1c20] text-white">
        {/* Hero Section with Navigation Buttons */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-12">
            Factor <span className="text-[#40B8A6]">Investing</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection(factorSelectionRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Factor Selection
            </button>
            <button
              onClick={() => scrollToSection(riskBudgetRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Risk Budgets
            </button>
            <button
              onClick={() => scrollToSection(assetAllocationRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Asset Allocation
            </button>
          </div>
        </div>

        {/* Factor Selection Section */}
        <div ref={factorSelectionRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Factor <span className="text-[#40B8A6]">Selection</span>
            </h2>
           
            
            {/* Bento Grid Layout */}
            <div className="w-full max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                {/* Size Card */}
                <div className="bg-gradient-to-br from-sky-300 to-sky-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Size</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Mid and Small Cap Companies
                  </p>
                </div>

                {/* Low Volatility Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Low Volatility</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Companies exhibiting low standard deviation / risk
                  </p>
                </div>

                {/* Quality Card */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] sm:col-span-2 lg:col-span-1">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Quality</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Companies with low debt, high ROIC, consistent earnings
                  </p>
                </div>

                {/* Momentum Card */}
                <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Momentum</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Companies trading above 6 months & 1 year price adjusted for volatility
                  </p>
                </div>

                {/* Value Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] sm:col-span-1 lg:col-span-2">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Value</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Companies with low P/E, low P/B, low P/S and high dividend yield
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Budget Section */}
        <div ref={riskBudgetRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Risk <span className="text-[#40B8A6]">Budget</span>
            </h2>
            <p className="text-xl mb-8">Optimize allocations for a given "risks budget"</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square w-full">
                <img
                  src="https://growthfiniti.com/wp-content/uploads/2024/10/Group-1000002779.png"
                  alt="Risk Budget Matrix"
                  className="w-full h-full object-contain bg-white rounded-xl"
                />
              </div>
              <div className="aspect-square w-full">
                <img
                  src="https://growthfiniti.com/wp-content/uploads/2024/10/Group-1000002780.png"
                  alt="Risk Budget Sliders"
                  className="w-full h-full bg-white object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Asset Allocation Section */}
        <div ref={assetAllocationRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Asset <span className="text-[#40B8A6]">Allocation</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Utilize long-term historical data, projected forecasts, & specified constraints</h3>
                <p className="text-xl mb-4">Optimize the weights to each factor accordingly</p>
              </div>
              <img 
                src="https://growthfiniti.com/wp-content/uploads/2024/08/asset-graph.png"
                alt="Asset Allocation Graph"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FactorInvestingPage; 