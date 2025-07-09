import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: 'I am grateful for the exceptional services provided by Saksham Investments Wealth as a retired individual seeking professional guidance for managing my wealth. They consistently exhibit a disciplined and meticulous approach, crafting a personalised investment strategy that preserves capital and delivers impressive risk-adjusted returns.',
    name: 'Yogesh kapoor',
    avatar: '/clients/1.jpg'
  },
  {
    quote: 'The team has ensured to build a plan that is most suited to a retired professional like me. As an avid mountaineer I love trekking across the globe. I am able to achieve my dream while my investments are at work with the best guys in the profession',
    name: 'Madhu Sudan Rao',
    avatar: '/clients/2.jpg'
  },
  {
    quote: 'As an entrepreneur I understand the risks of my business, I have left it to the team at Saksham Investments to manage my investments well & the market risks that come with it. Appreciate, how the team patiently explained the investment process and made it sound so simple!',
    name: 'Dinesh Chaturvedi',
    avatar: '/clients/3.jpg'
  },
  {
    quote: 'From the onboarding to understanding the entire in-depth analytical process of choosing the appropriate funds as per my requirements, it seemed like a very smooth journey and left me with a feeling of absolute comfort. They value their customers and respect their aspirations, which is the most important feature, especially of a wealth outfit.',
    name: 'Sahdev Gupta',
    avatar: '/clients/4.jpg'
  },
  {
    quote: 'With my two decades of experience in the financial world, predominantly focusing on P&L management, budgeting, planning & accounting, thanks to our busy corporate lives we are unable to focus on our investments which need an equal attention. I had the good fortune of meeting the Saksham Investments team, who really helped me plan my investments in the best possible manner.',
    name: 'Devendra Kumar Jain',
    avatar: '/clients/5.jpg'
  },
  {
    quote: 'I sincerely thank the Saksham Investments team for introducing me to the world of wealth management, and showing me how seamless, instant, and secure it actually is. The experience has been amazing due to the promptness of the team and the willingness to assist especially in the need of the hour.',
    name: 'H s Issar',
    avatar: '/clients/6.jpg'
  },
];

const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    const step = isMobile ? 1 : 2;
    setCurrentIndex((prevIndex) => (prevIndex + step) % testimonials.length);
  };

  const prevTestimonial = () => {
    const step = isMobile ? 1 : 2;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - step : prevIndex - step
    );
  };

  const toggleExpanded = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const testimonialsToShow = isMobile 
    ? [testimonials[currentIndex]]
    : [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length]
      ];

  return (
    <section className="relative py-10 overflow-hidden" style={{ height: '80vh', backgroundColor: '#09252c' }}>
      <div className="container mx-auto sm:px-44 px-4 h-full flex flex-col justify-center ">
        {/* Header with Navigation */}
        <div className="flex justify-between  items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Client <span className="text-emerald-400">Testimonials</span>
          </h2>
          
          {/* Navigation Arrows - Top Right */}
          <div className="flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="bg-slate-700 hover:bg-slate-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-600 hover:border-emerald-400"
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="bg-slate-700 hover:bg-slate-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-600 hover:border-emerald-400"
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative flex-1 flex items-center">
          {/* Testimonials Grid */}
          <div className="w-full">
            <div className="max-w-6xl mx-auto">
              <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                {testimonialsToShow.map((testimonial, index) => {
                  const globalIndex = isMobile ? currentIndex : (currentIndex + index) % testimonials.length;
                  const isExpanded = expandedCards[globalIndex];
                  const shouldTruncate = testimonial.quote.length > 150;
                  
                  return (
                    <div
                      key={globalIndex}
                      className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-600/50 transition-all duration-300 hover:border-emerald-400/50"
                    >
                      <div className="mb-6">
                        <svg className="w-8 h-8 text-emerald-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          "{isExpanded || !shouldTruncate ? testimonial.quote : truncateText(testimonial.quote)}"
                        </p>
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="text-emerald-400 text-sm mt-2 hover:text-emerald-300 transition-colors"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                      {/* Client Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-emerald-400/50 flex-shrink-0">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-sm md:text-lg">{testimonial.name}</h4>
                          {testimonial.title && (
                            <p className="text-gray-400 text-xs md:text-sm leading-tight">{testimonial.title}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: isMobile ? testimonials.length : Math.ceil(testimonials.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(isMobile ? index : index * 2)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                isMobile 
                  ? (currentIndex === index ? 'bg-emerald-400 scale-125' : 'bg-slate-600 hover:bg-slate-500')
                  : (Math.floor(currentIndex / 2) === index ? 'bg-emerald-400 scale-125' : 'bg-slate-600 hover:bg-slate-500')
              }`}
              aria-label={isMobile ? `Go to testimonial ${index + 1}` : `Go to testimonials ${index * 2 + 1} and ${index * 2 + 2}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials; 