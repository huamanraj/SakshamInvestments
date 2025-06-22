import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CEOWordSection.css';

gsap.registerPlugin(ScrollTrigger);

const CEOWordSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.to(".reveal-text", {
        backgroundPositionX: "0%",
        stagger: 0.3,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 flex items-center justify-center px-8 py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className="text space-y-4"
          >
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              At Growthfiniti
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              Wealth, we envision a
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              future where financial
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              empowerment
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              transcends boundaries,
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              where your journey
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              towards prosperity is
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              guided by a team of
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              very experienced
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              professionals.
            </p>

            {/* CEO Info */}
            <div className="flex items-center gap-4 pt-12 mt-16">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80" 
                  alt="Bhavesh Sanghvi CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Bhavesh Sanghvi</h3>
                <p className="text-emerald-400 font-medium">CEO</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default CEOWordSection; 