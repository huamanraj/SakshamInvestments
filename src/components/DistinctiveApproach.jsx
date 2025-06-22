import React from 'react';
import growthfinitiGraph from '../assets/growthfiniti_graph.svg';
import logo from '/logo.png';

const TimelineCard = ({ approach, index }) => {
  // Different gradient backgrounds for each card
  const gradientBgs = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple-blue
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink-red
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue-cyan
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green-teal
  ];

  return (
    <div
      className="relative flex flex-col md:flex-row rounded-[32px] p-6 mb-10 overflow-visible"
      style={{ background: gradientBgs[index % gradientBgs.length] }}
    >
      {/* LEFT PANEL */}
      <div className="relative flex flex-col w-full md:flex-[0_0_45%] bg-white rounded-2xl p-8 shadow-none">
        {/* Logo */}
        <img src={logo} alt="Growthfiniti" className="w-32 mb-6" />

        {/* Growthfiniti text */}
        <p className="text-gray-900 text-xl md:text-2xl font-semibold leading-snug mb-10">
          {approach.growthfinitiText}
        </p>

        {/* Divider with VS bubble */}
        <div className="relative my-8">
          <hr className="border-gray-200" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-700 rounded-full w-12 h-12 flex items-center justify-center font-semibold text-sm">
            VS
          </div>
        </div>

        {/* Traditional section */}
        <h4 className="text-green-600 font-semibold text-lg mb-2">Traditional Wealth Firms</h4>
        <p className="text-gray-500 text-base leading-relaxed">
          {approach.traditionalText}
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center w-full md:flex-1 bg-[#f6f4ff] rounded-2xl mt-8 md:mt-0 md:ml-6 p-6 min-h-[260px]">
        <img src={growthfinitiGraph} alt="Graph" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

const DistinctiveApproach = () => {
  const approaches = [
    {
      growthfinitiText: "Creating risk budgets.",
      traditionalText: "Your RM is busy selling you products.",
      graph: "risk_budgeting_graph.png", // Placeholder, will use SVG
    },
    {
      growthfinitiText: "Implement an investment strategy based on the GrowthFiniti Efficient Frontier",
      traditionalText: "Whose portfolios may not cater to your specific needs.",
      graph: "efficient_frontier_graph.png", // Placeholder, will use SVG
    },
    {
      growthfinitiText: "Distinctive tax efficient portfolios curated and matched with prolific and consistent fund managers",
      traditionalText: "Which have a stronger incentive to sell high-commission products",
      graph: "tax_efficient_graph.png", // Placeholder, will use SVG
    },
    {
      growthfinitiText: "Deliver a consistent top down strategy which is alligned to customers",
      traditionalText: "Bottom up strategy where RM's decide what to sell",
      graph: "top_down_strategy_graph.png", // Placeholder, will use SVG
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-10 md:mb-12">
          The Distinctive Approach <br className="hidden sm:inline" />
          <span className="text-green-600">Of Growthfiniti</span>
        </h2>
        <div className="space-y-12">
          {approaches.map((approach, index) => (
            <TimelineCard key={index} approach={approach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DistinctiveApproach; 