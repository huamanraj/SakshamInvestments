import React, { useState, useEffect } from 'react';
import logo from '/logodark.png';
import Icon1 from './DistinctiveApproachSVGS/Icon1';
import Icon3 from './DistinctiveApproachSVGS/Icon2';
import Icon4 from './DistinctiveApproachSVGS/Icon3';
import Icon2 from '/graph.png';

const TimelineCard = ({ approach, index }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const icons = [Icon1, () => <img src={Icon2} alt="Graph" className="w-full h-full object-contain" />, Icon3, Icon4]; 

  const IconComponent = icons[index];
  
  const backgroundImages = [
    'https://growthfiniti.com/wp-content/uploads/2024/08/approach-bg1.png',
    'https://growthfiniti.com/wp-content/uploads/2024/08/approach-bg2.png',
    'https://growthfiniti.com/wp-content/uploads/2024/08/approach-bg3.png',
    'https://growthfiniti.com/wp-content/uploads/2024/08/approach-bg4.png'
  ];

  return (
    <div className="relative h-full min-h-[400px]">
      <div 
        className="relative rounded-[24px] h-full p-4 bg-no-repeat bg-left-top"
        style={{
          backgroundImage: `url('${backgroundImages[index]}')`,
          backgroundSize: isDesktop ? 'calc(100% - 32px) auto' : 'auto 100%'
        }}
      >
        {/* Content Container with margin to show background only on left and top */}
        <div className="relative bg-white rounded-[20px] h-full border border-gray-100 flex flex-col lg:flex-row ml-8 mt-8 mr-0 mb-0">
          {/* Left Side - Text Content (50% width on desktop, full width on mobile) */}
          <div className="flex-1 lg:w-1/2 p-6 lg:p-8">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logo} 
                alt="Saksham Investments" 
                className="h-8 lg:h-10"
              />
              <div className="h-6 lg:h-8 w-[2px] bg-gray-200"></div>
              <p className="text-xs lg:text-sm text-gray-500 font-medium">
                Case {index + 1}
              </p>
            </div>

            {/* Saksham Investments Approach */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 lg:mb-3">
                Our Approach
              </h3>
              <p className="text-sm lg:text-base font-semibold text-gray-800 leading-relaxed">
                {approach.growthfinitiText}
              </p>
            </div>

            {/* Divider with VS bubble */}
            <div className="relative my-6 lg:my-8">
              <hr className="border-gray-200" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-700 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center font-semibold text-xs lg:text-sm shadow-lg border border-gray-100">
                VS
              </div>
            </div>

            {/* Traditional Approach */}
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-green-600 mb-2 lg:mb-3">
                Traditional wealth firms
              </h3>
              <p className="text-sm lg:text-base font-semibold text-gray-600 leading-relaxed">
                {approach.traditionalText}
              </p>
            </div>
          </div>

          {/* Right Side - Icon (50% width on desktop, full width on mobile) */}
          <div className="flex-1 lg:w-1/2 bg-white rounded-r-[20px]">
            <IconComponent className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DistinctiveApproach = () => {
  const approaches = [
    {
      growthfinitiText: "Creating risk budgets.",
      traditionalText: "Your RM is busy selling you products.",
    },
    {
      growthfinitiText: "Implement an investment strategy based on the GrowthFiniti Efficient Frontier",
      traditionalText: "Whose portfolios may not cater to your specific needs.",
    },
    {
      growthfinitiText: "Distinctive tax efficient portfolios curated and matched with prolific and consistent fund managers",
      traditionalText: "Which have a stronger incentive to sell high-commission products",
    },
    {
      growthfinitiText: "Deliver a consistent top down strategy which is alligned to customers",
      traditionalText: "Bottom up strategy where RM's decide what to sell",
    },
  ];

  return (
    <section 
      className="py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-gray-50 to-white relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            The Distinctive Approach
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            See how our modern approach differs from traditional wealth management
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {approaches.map((approach, index) => (
            <TimelineCard key={index} approach={approach} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DistinctiveApproach; 