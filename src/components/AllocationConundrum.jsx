import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Threads from './ui/Threads';

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

  // Define bank icons and responsive size class
  const bankIcons = ['axis.svg', 'canara.svg', 'hdfc.svg', 'icici.svg', 'kotak.svg', 'mosl.svg', 'quant.svg'];
  const bankIconsSecondRow = [
    'bank3.png', // baja (bajajfin.svg) replaced with bank3.png
    'bank2.png', // msvg (nsvg.svg) replaced with bank2.png
    'sbi.svg',         // sbi.svg remains unchanged
    'bank1.png', // sif.svg replaced with bank1.png
    'bank4.png'  // util.svg replaced with bank4.png
  ];
  const iconSizeClass = 'w-12 h-12 md:w-24 md:h-24';
  const greyFilterClass = 'filter grayscale brightness-75 mix-blend-multiply';

  return (
    <section 
      ref={ref}
      className="h-auto pt-20 bg-[#09252c] relative overflow-hidden flex items-center justify-center"
    >
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
            className="text-4xl md:text-6xl font-bold text-emerald-400 mb-16"
          >
            Conundrum
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
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
                  <AnimatedNumber value="2000" suffix="+" />
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
                
              </motion.div>
            </motion.div>

            {/* PMS */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl md:text-7xl font-bold text-amber-400 mb-4">
                  <AnimatedNumber value="1000" suffix="+" />
                </div>
                <p className="text-xl text-slate-300">PMS</p>
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
                
              </motion.div>
            </motion.div>

            {/* AIF */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl md:text-7xl font-bold text-pink-400 mb-4">
                  <AnimatedNumber value="500" suffix="+" />
                </div>
                <p className="text-xl text-slate-300">AIF</p>
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
                
              </motion.div>
            </motion.div>
          </div>

          {/* Bank Logos */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6 pb-8"
          >
            <div className="flex justify-between max-w-6xl mx-auto">
              {bankIcons.map(icon => (
                <img
                  key={icon}
                  src={`banks/${icon}`} alt="" className={`${iconSizeClass} mb-4 bg-transparent hover:rounded-full hover:bg-gray-900 ${greyFilterClass}`} />
              ))}
            </div>
            <div className="flex justify-center gap-8 max-w-4xl mx-auto">
              {bankIconsSecondRow.map(icon => (
                <img
                  key={icon}
                  src={`banks/${icon}`} alt="" className={`${iconSizeClass} mb-4 hover:rounded-full hover:bg-gray-900 ${greyFilterClass}`} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AllocationConundrum; 