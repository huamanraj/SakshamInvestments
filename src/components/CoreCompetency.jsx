import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const CoreCompetency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const circleVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 relative overflow-hidden flex items-center"
    >
      {/* Background Chart Animation */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 right-10"
        >
          <img src="/graph-img.svg" alt="" className="w-full h-auto" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center justify-between h-full"
        >
          {/* Left side - Title */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Our Core
            </motion.h2>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-400 mb-8 leading-tight"
            >
              Competency
            </motion.h2>
          </div>

          {/* Right side - Overlapping Circles */}
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
              
              {/* Capital Allocation - Top Circle */}
              <motion.div
                variants={circleVariants}
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
              >
                <div className="relative">
                  {/* Circle with subtle glow */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald-400/50 bg-teal-900/20 backdrop-blur-sm"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(52, 211, 153, 0.1), 0 0 30px rgba(52, 211, 153, 0.1)'
                    }}
                  ></motion.div>
                  
                  {/* Icon - Upper part */}
                  <motion.div
                    animate={{ 
                      y: [0, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-8 md:top-10 lg:top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white rounded-full"></div>
                    </div>
                  </motion.div>
                  
                  {/* Text - Lower part */}
                  <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2">
                    <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center leading-tight">
                      Capital<br />Allocation
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Risk Management - Left Circle */}
              <motion.div
                variants={circleVariants}
                className="absolute top-1/3 left-0"
              >
                <div className="relative">
                  {/* Circle with subtle glow */}
                  <motion.div
                    animate={{ 
                      rotate: [360, 0]
                    }}
                    transition={{ 
                      duration: 25, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald-400/50 bg-teal-900/20 backdrop-blur-sm"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(52, 211, 153, 0.1), 0 0 30px rgba(52, 211, 153, 0.1)'
                    }}
                  ></motion.div>
                  
                  {/* Icon - Upper part */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.08, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-8 md:top-10 lg:top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white rounded-full relative">
                        <div className="absolute inset-1.5 md:inset-2 bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Text - Lower part */}
                  <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2">
                    <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center leading-tight">
                      Risk<br />Management
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Manager Selection - Right Circle */}
              <motion.div
                variants={circleVariants}
                className="absolute top-1/3 right-0"
              >
                <div className="relative">
                  {/* Circle with subtle glow */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 35, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald-400/50 bg-teal-900/20 backdrop-blur-sm"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(52, 211, 153, 0.1), 0 0 30px rgba(52, 211, 153, 0.1)'
                    }}
                  ></motion.div>
                  
                  {/* Icon - Upper part */}
                  <motion.div
                    animate={{ 
                      x: [0, 3, -3, 0],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-8 md:top-10 lg:top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-yellow-400 rounded-full"></div>
                    </div>
                  </motion.div>
                  
                  {/* Text - Lower part */}
                  <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2">
                    <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center leading-tight">
                      Manager<br />Selection
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* Factor Investing - Bottom Circle */}
              <motion.div
                variants={circleVariants}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              >
                <div className="relative">
                  {/* Circle with subtle glow */}
                  <motion.div
                    animate={{ 
                      rotate: [360, 0]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald-400/50 bg-teal-900/20 backdrop-blur-sm"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(52, 211, 153, 0.1), 0 0 30px rgba(52, 211, 153, 0.1)'
                    }}
                  ></motion.div>
                  
                  {/* Icon - Upper part */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-8 md:top-10 lg:top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-emerald-300 rounded-full"></div>
                    </div>
                  </motion.div>
                  
                  {/* Text - Lower part */}
                  <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 left-1/2 transform -translate-x-1/2">
                    <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg text-center leading-tight">
                      Factor<br />Investing
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreCompetency; 