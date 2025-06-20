import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TimelineObserver from 'react-timeline-animation';
import './DistinctiveApproach.css';

const TimelineStep = ({ setObserver, index, approach, isLast }) => {
  const timelineRef = useRef(null);
  const circleRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20%" });
  
  useEffect(() => {
    setObserver(timelineRef.current);
    setObserver(circleRef.current);
  }, [setObserver]);

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="timeline-step-container relative mb-12 lg:mb-20">
      {/* Timeline line - continuous through all cards */}
      <div 
        id={`timeline${index}`} 
        ref={timelineRef} 
        className="timeline-line absolute left-0 top-0 w-0.5"
        style={{ 
          height: isLast ? '50%' : '100%',
          minHeight: isLast ? '100px' : '300px'
        }}
      />
      
      {/* Static Circle/Dot for each step */}
      <motion.div 
        className="circle-wrapper absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div 
          id={`circle${index}`} 
          ref={circleRef} 
          className="timeline-circle w-4 h-4 rounded-full border-2 border-white shadow-md"
        />
        {/* Pulse animation for active circle */}
        {isInView && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-green-400 opacity-30"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Horizontal connecting line */}
      <motion.div 
        className="absolute left-2 top-1/2 w-16 md:w-20 lg:w-28 h-0.5 bg-green-400 transform -translate-y-1/2 z-10" 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ originX: 0 }}
      />
      
      {/* Card Content */}
      <div className="ml-20 md:ml-24 lg:ml-32">
        <motion.div 
          ref={cardRef}
          className="bg-white rounded-3xl shadow-2xl relative overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-500"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ 
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Enhanced gradient header with animated background */}
          <div className="relative h-20 lg:h-24 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600"
              animate={{
                background: [
                  "linear-gradient(90deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
                  "linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                  "linear-gradient(90deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Animated pattern overlay */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                 radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="p-6 lg:p-8 -mt-6 lg:-mt-8 relative z-10">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-9 gap-4 lg:gap-6 items-stretch"
              variants={contentVariants}
            >
              {/* Growthfiniti Section */}
              <motion.div 
                className="lg:col-span-4"
                variants={contentVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-100 h-full relative overflow-hidden">
                  {/* Subtle animated background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Enhanced SVG placeholder with animation */}
                      <motion.div 
                        className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-md"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white rounded-sm" />
                      </motion.div>
                      <span className="font-bold text-gray-800 text-lg lg:text-xl">Growthfiniti</span>
                    </motion.div>
                    <motion.p 
                      className="text-gray-700 text-sm lg:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {approach.title}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* VS Divider */}
              <motion.div 
                className="lg:col-span-1 flex justify-center items-center order-first lg:order-none"
                variants={contentVariants}
                initial={{ scale: 0, rotate: 180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full px-4 py-2 lg:px-5 lg:py-3 shadow-lg border border-gray-200 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-green-100 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-gray-600 font-semibold text-base lg:text-lg relative z-10">VS</span>
                </div>
              </motion.div>

              {/* Traditional Wealth Firms Section */}
              <motion.div 
                className="lg:col-span-4"
                variants={contentVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gray-50 rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200 h-full relative overflow-hidden">
                  {/* Subtle cross pattern overlay */}
                  <motion.div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 15px),
                                       repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 15px)`
                    }}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="font-bold text-red-600 text-lg lg:text-xl">Traditional Wealth Firms</span>
                    </motion.div>
                    <motion.p 
                      className="text-gray-700 text-sm lg:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {approach.traditional}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Timeline = ({ setObserver }) => {
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

  return (
    <div className="timeline-wrapper relative">
      {approaches.map((approach, index) => (
        <TimelineStep 
          key={approach.id}
          setObserver={setObserver} 
          approach={approach} 
          index={index}
          isLast={index === approaches.length - 1}
        />
      ))}
    </div>
  );
};

const DistinctiveApproach = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const scrollTop = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, scrollTop / (sectionHeight - windowHeight)));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #4ade80 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, #22c55e 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #4ade80 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 pl-6 md:pl-8 lg:pl-16 relative z-10">
        {/* Enhanced Header with animations */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12 lg:mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 lg:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              The Distinctive Approach
            </span>
          </motion.h2>
          <motion.h3 
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-600 font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Of{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Growthfiniti
            </span>
          </motion.h3>
          
          {/* Animated underline */}
          <motion.div 
            className="w-24 lg:w-32 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-6 lg:mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Timeline with enhanced animations */}
        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Moving Dot */}
          <motion.div 
            className="absolute left-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-xl z-30 transform -translate-x-1/2"
            style={{
              top: `${160 + (scrollProgress * (sectionRef.current?.querySelector('.timeline-wrapper')?.offsetHeight || 800))}px`,
            }}
            animate={{
              opacity: scrollProgress > 0 ? 1 : 0,
              scale: scrollProgress > 0 ? [1, 1.2, 1] : 0
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            {/* Enhanced pulsing effect */}
            <motion.div 
              className="absolute inset-0 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 2, 1], 
                opacity: [0.7, 0, 0.7] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          {/* Enhanced Traveled Path Overlay */}
          <motion.div 
            className="absolute left-0 w-0.5 bg-gradient-to-b from-green-400 to-green-600 z-25 transform -translate-x-1/2 shadow-sm"
            style={{
              top: '160px',
              height: `${scrollProgress * (sectionRef.current?.querySelector('.timeline-wrapper')?.offsetHeight || 800)}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <TimelineObserver
            initialColor="#e5e5e5"
            fillColor="#10b981"
            hasReverse={false}
            handleObserve={(setObserver) => (
              <Timeline setObserver={setObserver} />
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default DistinctiveApproach; 