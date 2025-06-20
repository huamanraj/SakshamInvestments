import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const FunnelSection = () => {
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
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
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

  const funnelVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Candlestick Chart Background */}
      <div className="absolute inset-0">
        {/* Main Chart */}
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-0 left-0 right-0 h-64"
        >
          <img src="/graph-img.svg" alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Floating Candlesticks */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3 + index * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2
            }}
            className={`absolute ${
              index % 4 === 0 ? 'top-20' : 
              index % 4 === 1 ? 'top-40' : 
              index % 4 === 2 ? 'top-60' : 'top-80'
            } ${
              index % 3 === 0 ? 'left-10' : 
              index % 3 === 1 ? 'left-1/2 transform -translate-x-1/2' : 'right-10'
            }`}
          >
            <div className={`w-4 h-${12 + index * 2} bg-emerald-400 opacity-20 rounded-sm`}></div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Funnel Visualization */}
          <div className="relative max-w-3xl mx-auto h-96 md:h-[500px]">
            {/* SVG Funnel */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 400 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Funnel Shape */}
              <motion.path
                d="M50 100 L350 100 L280 200 L120 200 Z"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="2"
                fill="rgba(52, 211, 153, 0.1)"
                variants={funnelVariants}
              />
              <motion.path
                d="M120 200 L280 200 L240 300 L160 300 Z"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="2"
                fill="rgba(52, 211, 153, 0.15)"
                variants={funnelVariants}
                transition={{ delay: 0.3 }}
              />
              <motion.path
                d="M160 300 L240 300 L210 400 L190 400 Z"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="2"
                fill="rgba(52, 211, 153, 0.2)"
                variants={funnelVariants}
                transition={{ delay: 0.6 }}
              />

              {/* Connecting Lines */}
              <motion.line
                x1="200"
                y1="100"
                x2="200"
                y2="400"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="2"
                strokeDasharray="5,5"
                variants={funnelVariants}
                transition={{ delay: 0.9 }}
              />

              {/* Horizontal Division Lines */}
              <motion.line
                x1="120"
                y1="200"
                x2="280"
                y2="200"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="1"
                variants={funnelVariants}
                transition={{ delay: 0.4 }}
              />
              <motion.line
                x1="160"
                y1="300"
                x2="240"
                y2="300"
                stroke="rgba(52, 211, 153, 0.4)"
                strokeWidth="1"
                variants={funnelVariants}
                transition={{ delay: 0.7 }}
              />
            </svg>

            {/* Level Labels */}
            <motion.div
              variants={itemVariants}
              className="absolute top-16 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-slate-700/80 backdrop-blur-md rounded-lg px-6 py-3 border border-emerald-500/30">
                <h3 className="text-white font-semibold text-lg">Universe of Options</h3>
                <p className="text-emerald-400 text-sm">Broad Market Access</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="absolute top-48 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-slate-700/80 backdrop-blur-md rounded-lg px-6 py-3 border border-emerald-500/30">
                <h3 className="text-white font-semibold text-lg">Filtered Selection</h3>
                <p className="text-emerald-400 text-sm">Research & Analysis</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-slate-700/80 backdrop-blur-md rounded-lg px-6 py-3 border border-emerald-500/30">
                <h3 className="text-white font-semibold text-lg">Final Portfolio</h3>
                <p className="text-emerald-400 text-sm">Optimized Allocation</p>
              </div>
            </motion.div>
          </div>

          {/* Animated Particles */}
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -500],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 0.5
              }}
              className={`absolute w-2 h-2 bg-emerald-400 rounded-full ${
                index % 2 === 0 ? 'left-1/3' : 'right-1/3'
              } top-full`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FunnelSection; 