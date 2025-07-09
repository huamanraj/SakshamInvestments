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
      className="min-h-screen bg-[#09252c]  flex items-center justify-center px-8 py-20 relative overflow-hidden"
    >
      <div className="mx-auto w-full">
        <div className=" grid-cols-1 flex  justify-center gap-16 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className="text space-y-4"
          >
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              At Saksham Investments,
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              with over 25 years of
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              experience in the securities
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              market we have built a solid
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              foundation of expertise and
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              integrity, serving a diverse
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              clientele that includes High
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              Net Worth Individuals (HNI)
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              and Ultra High Net Worth
            </p>
            <p className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
              Individuals (UHNI).
            </p>

            {/* CEO Info */}
            <div className="flex items-center gap-4 pt-12 mt-16">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400">
                <img 
                  src="/team/chirag.jpg" 
                  alt="Chirag Jain CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Chirag Jain</h3>
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