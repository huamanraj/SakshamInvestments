import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const LeadershipPortfolios = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  const portfolioData = [
    {
      title: "What Are Leadership Portfolios?",
      content: "Financial market history has taught us that great leaders create consistent compounding. Leaders create moats, consistency & deliver shareholder value. That's what we seek from our competent fund managers. We curate portfolios that compound over time. This requires a systematic and a disciplined approach over long periods of time.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Reflects Thought Leadership",
      content: "Our asset is a sound management that reflects thought leadership. Our goal is to use these assets to build yours. Over the years, we have built a relationship with our clients that purely reflects trust and credibility. This has helped us seal a strong position as a trusted service provider of wealth solutions amongst all stakeholders and clients.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Our Knowledge",
      content: "When it comes to investing, knowledge & experience is a necessity. At every step, we aim to empower our customers with the required knowledge to help them make better decisions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      title: "Strategic Vision",
      content: "Our strategic vision encompasses long-term wealth creation through disciplined investment strategies. We believe in creating value that transcends market cycles and delivers sustainable growth for our clients.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    },
    {
      title: "Client Excellence",
      content: "Excellence in client service is at the heart of everything we do. We provide personalized investment solutions that align with our clients' goals and risk tolerance, ensuring optimal outcomes.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    }
  ];

  useEffect(() => {
    const sections = sectionsRef.current;
    const container = containerRef.current;

    if (sections.length > 0 && container) {
      // GSAP horizontal scroll animation
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + container.offsetWidth * (sections.length - 1)
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-16 text-center overflow-hidden" style={{ backgroundColor: '#09252c' }}>
      <div className="container  px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Leadership <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Portfolios</span>
        </h2>
      </div>
      
      <div ref={containerRef} className="container mx-auto h-screen flex items-center">
        <div className="flex w-[500vw] h-full">
          {portfolioData.map((portfolio, index) => (
            <div
              key={index}
              ref={el => sectionsRef.current[index] = el}
              className="panel w-screen h-full flex items-center justify-center px-4"
            >
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
                {/* Card Container */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-[2rem] p-4 overflow-hidden">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={portfolio.image}
                        alt={portfolio.title}
                        className="w-full h-[300px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="w-full text-left lg:w-1/2 space-y-4">
                  <h3 className="text-4xl font-bold text-white">
                    {portfolio.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {portfolio.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-center space-x-2">
          {portfolioData.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-gray-500 rounded-full transition-all duration-300 hover:bg-emerald-400"
            ></div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          Scroll to explore our leadership portfolios
        </p>
      </div>
    </section>
  );
};

export default LeadershipPortfolios; 