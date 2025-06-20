import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const AllocationConundrum = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const AnimatedNumber = ({ value, suffix = '', prefix = '', duration = 2 }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (isInView) {
        const targetValue = parseInt(value.replace(/[^\d]/g, ''));
        let start = 0;
        const increment = targetValue / (duration * 60);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= targetValue) {
            setCount(targetValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 1000 / 60);

        return () => clearInterval(timer);
      }
    }, [isInView, value, duration]);

    return (
      <span>
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    );
  };

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

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Icons */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 opacity-10"
        >
          <img src="/fund1.svg" alt="" className="w-16 h-16" />
        </motion.div>

        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-40 right-32 opacity-10"
        >
          <img src="/fund3.svg" alt="" className="w-20 h-20" />
        </motion.div>

        <motion.div
          animate={{ 
            rotate: 360,
            x: [0, 30, 0]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-32 opacity-10"
        >
          <img src="/fund4.svg" alt="" className="w-14 h-14" />
        </motion.div>

        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-32 right-20 opacity-10"
        >
          <img src="/fund7.svg" alt="" className="w-18 h-18" />
        </motion.div>

        {/* Dash patterns */}
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-60 left-1/4"
        >
          <img src="/dash.svg" alt="" className="w-12 h-12" />
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [360, 180, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-40 right-1/3"
        >
          <img src="/dash.svg" alt="" className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            The Allocation
          </motion.h2>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-slate-400 mb-16"
          >
            Conundrum
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Mutual Funds */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl md:text-7xl font-bold text-emerald-400 mb-4">
                  <AnimatedNumber value="1730" suffix="+" />
                </div>
                <p className="text-xl text-slate-300">Mutual Funds</p>
              </motion.div>
              
              {/* Background Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-20"
              >
                <img src="/fund1.svg" alt="" className="w-24 h-24" />
              </motion.div>
            </motion.div>

            {/* Global Funds */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl md:text-7xl font-bold text-amber-400 mb-4">
                  <AnimatedNumber value="100000" suffix="+" />
                </div>
                <p className="text-xl text-slate-300">Global Funds</p>
              </motion.div>
              
              {/* Background Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-20"
              >
                <img src="/core-2.svg" alt="" className="w-24 h-24" />
              </motion.div>
            </motion.div>

            {/* PMS, AIF's */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl md:text-7xl font-bold text-pink-400 mb-4">
                  Over <AnimatedNumber value="1000" />
                </div>
                <p className="text-xl text-slate-300">PMS, AIF's</p>
              </motion.div>
              
              {/* Background Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 0.9, 1.1, 1]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-20"
              >
                <img src="/fund7.svg" alt="" className="w-24 h-24" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllocationConundrum; 