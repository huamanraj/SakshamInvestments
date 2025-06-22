import React, { useEffect, useRef, useState } from 'react';

const TimelineCard = ({ approach, index }) => {
  // Different gradient backgrounds for each card
  const gradientBgs = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple-blue
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink-red
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue-cyan
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green-teal
  ];

  return (
    <div className="timeline-card mb-8 relative">
      <div 
        className="bg-white rounded-3xl overflow-hidden border border-gray-200"
        style={{ minHeight: '400px' }}
      >
        {/* Gradient Header */}
        <div 
          className="relative h-16"
          style={{ background: gradientBgs[index % gradientBgs.length] }}
        />
        
        <div className="p-8 -mt-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Comparison content */}
            <div className="space-y-6">
              {/* Growthfiniti Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Growthfiniti" 
                    className="w-10 h-10 object-contain"
                  />
                  <span className="font-bold text-gray-800 text-lg">Growthfiniti</span>
                </div>
                <p className="text-gray-700 text-base leading-relaxed font-medium">
                  {approach.title}
                </p>
              </div>

              {/* VS Divider */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-full px-6 py-3 border border-gray-200">
                  <span className="text-gray-600 font-bold text-lg">VS</span>
                </div>
              </div>

              {/* Traditional Wealth Firms Section */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="mb-4">
                  <span className="font-bold text-green-600 text-lg">Traditional Wealth Firms</span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  {approach.traditional}
                </p>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex justify-center items-center">
              <div className="bg-gray-50 rounded-2xl p-6 w-full h-80 flex items-center justify-center border border-gray-200">
                <img 
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/blog_thumbnails/files/image1212/view?project=68574292002de14cb7f4&mode=admin"
                  alt={`${approach.title} visualization`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm">Chart Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DistinctiveApproach = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  const approaches = [
    {
      id: 1,
      title: 'Creating risk budgets.',
      traditional: 'Your RM is busy selling you products.'
    },
    {
      id: 2,
      title: 'Implement an investment strategy based on the GrowthFiniti Efficient Frontier',
      traditional: 'Whose portfolios may not cater to your specific needs.'
    },
    {
      id: 3,
      title: 'Distinctive tax efficient portfolios curated and matched with prolific and consistent fund managers',
      traditional: 'Which have a stronger incentive to sell high-commission products'
    },
    {
      id: 4,
      title: 'Deliver a consistent top down strategy which is aligned to customers',
      traditional: 'Bottom up strategy where RM\'s decide what to sell'
    },
  ];

  // Get path length and calculate circle position
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const scrollTop = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, scrollTop / (sectionHeight - windowHeight + 200)));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate circle position along the path
  const getCirclePosition = () => {
    if (!pathRef.current || pathLength === 0) return { x: 0, y: 0 };
    
    const point = pathRef.current.getPointAtLength(scrollProgress * pathLength);
    return { x: point.x, y: point.y };
  };

  const circlePosition = getCirclePosition();

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              The Distinctive Approach
            </span>
          </h2>
          <h3 className="text-3xl lg:text-4xl text-gray-600 font-light">
            Of{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Growthfiniti
            </span>
          </h3>
          
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-8 rounded-full" />
        </div>

        {/* Main Content with SVG Path */}
        <div className="max-w-7xl mx-auto relative">
          {/* SVG Path - Hidden on mobile */}
          <div className="absolute left-12 top-0 z-10 hidden lg:block"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="589" 
              height="3404" 
              fill="none"
              className="w-full h-auto"
              style={{ minHeight: '2000px' }}
            >
              {/* Background path */}
              <path 
                stroke="#E8EFF0" 
                strokeWidth="2" 
                d="M587.5 0c0 45.6-12.5 59-45.5 59H46C16 59 1 76.3 1 111.5V3295c0 48.5 6.3 67.5 45.5 67.5H541c15.167-.5 45.5 7 45.5 41" 
                className="line1"
              />
              
              {/* Animated progress path */}
              <path 
                ref={pathRef}
                stroke="#6FD2A6" 
                strokeWidth="3" 
                d="M587.5 0c0 45.6-12.5 59-45.5 59H46C16 59 1 76.3 1 111.5V3295c0 48.5 6.3 67.5 45.5 67.5H541c15.167-.5 45.5 7 45.5 41" 
                className="line2"
                style={{ 
                  strokeDasharray: `${pathLength},${pathLength}`,
                  strokeDashoffset: pathLength - (scrollProgress * pathLength),
                  filter: 'drop-shadow(0 0 6px rgba(111, 210, 166, 0.6))',
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
            </svg>

            {/* Moving Circle - positioned along the actual path */}
            <div 
              className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white z-30"
              style={{
                left: `${circlePosition.x}px`,
                top: `${circlePosition.y}px`,
                transform: 'translate(-50%, -50%)',
                opacity: scrollProgress > 0 ? 1 : 0,
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)'
              }}
            />
          </div>

          {/* Cards positioned along the path */}
          <div className="relative z-20 lg:ml-32 space-y-12">
            {approaches.map((approach, index) => (
              <div 
                key={approach.id}
                className="lg:ml-0"
                style={{ 
                  marginTop: index === 0 ? '100px' : '200px',
                  marginLeft: window.innerWidth >= 1024 ? (index % 2 === 0 ? '0' : '200px') : '0'
                }}
              >
                <TimelineCard 
                  approach={approach} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistinctiveApproach; 