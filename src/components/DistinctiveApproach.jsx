import React from 'react';
import { motion } from 'framer-motion';
import logo from '/logodark.png';

const TimelineCard = ({ approach, index }) => {
  // Enhanced gradient backgrounds with more modern colors
  const gradientBgs = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo to Purple
    'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)', // Teal to Sky
    'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', // Rose to Pink
    'linear-gradient(135deg, #84cc16 0%, #10b981 100%)', // Lime to Emerald
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative h-full group"
    >
      <div className="relative rounded-[24px] h-full transition-all duration-300 group-hover:shadow-2xl">
        {/* Gradient Border with enhanced styling */}
        <div 
          className="absolute inset-0 rounded-[24px] transition-all duration-300 group-hover:opacity-90" 
          style={{ 
            background: `${gradientBgs[index % gradientBgs.length]}`,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            opacity: 0.8
          }}
        />
        
        {/* Subtle gradient overlay for depth */}
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 70%)'
          }}
        />
        
        {/* Content Container with glass effect */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-[20px] p-6 h-full border border-gray-100 transition-all duration-300 group-hover:bg-white/98">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 mb-6">
            <motion.img 
              src={logo} 
              alt="Saksham Investments" 
              className="h-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="h-8 w-[2px] bg-gray-200"></div>
            <motion.p 
              className="text-sm text-gray-500 font-medium"
              whileHover={{ color: "#4f46e5" }}
            >
              Case {index + 1}
            </motion.p>
          </div>

          {/* Saksham Investments Approach */}
          <div className="mb-8 group-hover:translate-x-1 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
              Our Approach
            </h3>
            <p className="text-gray-800 leading-relaxed">
              {approach.growthfinitiText}
            </p>
          </div>

          {/* Divider with VS bubble - Enhanced with animation */}
          <div className="relative my-8">
            <hr className="border-gray-200 group-hover:border-indigo-100 transition-colors duration-300" />
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-700 rounded-full w-12 h-12 flex items-center justify-center font-semibold text-sm shadow-lg border border-gray-100 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              VS
            </motion.div>
          </div>

          {/* Traditional Approach */}
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-green-600 mb-2 group-hover:text-emerald-500 transition-colors duration-300">
              Traditional Approach
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {approach.traditionalText}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DistinctiveApproach = () => {
  const approaches = [
    {
      growthfinitiText: "Creating risk budgets with a data-driven approach to optimize your investment portfolio based on your unique risk tolerance and financial goals.",
      traditionalText: "Your RM is busy selling you products without considering your individual risk profile or long-term investment objectives.",
    },
    {
      growthfinitiText: "Implement an investment strategy based on the GrowthFiniti Efficient Frontier, ensuring optimal risk-adjusted returns for your portfolio.",
      traditionalText: "Whose portfolios may not cater to your specific needs, often following a one-size-fits-all approach to investment management.",
    },
    {
      growthfinitiText: "Distinctive tax efficient portfolios curated and matched with prolific and consistent fund managers to maximize your after-tax returns.",
      traditionalText: "Which have a stronger incentive to sell high-commission products that may not align with your tax efficiency goals or investment strategy.",
    },
    {
      growthfinitiText: "Deliver a consistent top-down strategy which is aligned to customers' long-term wealth creation objectives and market conditions.",
      traditionalText: "Bottom-up strategy where RM's decide what to sell, often prioritizing short-term gains over sustainable wealth creation.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            The Distinctive Approach
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            See how our modern approach differs from traditional wealth management
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approaches.map((approach, index) => (
            <TimelineCard key={index} approach={approach} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DistinctiveApproach; 