import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#09252c' }}>
      {/* About Us Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              About <span className="text-emerald-400">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Saksham Investments is established with a vision to create authentic and 
              measurable impact on client portfolios and secure your family's financial 
              future.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6 mb-20 max-w-7xl mx-auto">
            {/* Framework Card - Wide (Top Left) */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden min-h-[280px]">
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">Framework</h3>
                <p className="text-cyan-50 leading-relaxed mb-auto">
                  We prioritize consistency, steady performance, low volatility, 
                  market barriers, and margin of safety.
                </p>
                <div className="flex justify-end mt-6">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img 
                      src="https://growthfiniti.com/wp-content/uploads/2024/08/s1.svg" 
                      alt="Framework"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            {/* Automated Process Card - Tall (Top Right, spans 2 rows) */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden min-h-[400px]">
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">Automated Process</h3>
                <p className="text-blue-100 leading-relaxed mb-auto">
                  The Saksham Investments Fund Ranking Model generates qualitative and 
                  quantitative scores for consistently performing funds across 
                  Mutual Funds, PMS & Alternates. We further conduct fund manager 
                  interviews to pick winners suitable for you.
                </p>
                <div className="flex justify-center mt-6">
                  <div className="w-32 h-32 flex items-center justify-center">
                    <img 
                      src="https://growthfiniti.com/wp-content/uploads/2024/08/s3-1.svg" 
                      alt="Automated Process"
                      className="w-28 h-28"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12"></div>
            </div>

            {/* On-Demand Scalability Card - Wide (Bottom Left) */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden min-h-[280px]">
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">On-Demand Scalability</h3>
                <p className="text-pink-100 leading-relaxed mb-auto">
                  Our evidence-based strategy helps clients respond to market 
                  changes and adjust portfolios based on their goals and self-awareness.
                </p>
                <div className="flex justify-end mt-6">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img 
                      src="https://growthfiniti.com/wp-content/uploads/2024/08/s2.svg" 
                      alt="On-Demand Scalability"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 -translate-x-14"></div>
            </div>

            {/* Trust Card - Square (Bottom Right) */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden min-h-[280px]">
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">Trust</h3>
                <p className="text-emerald-100 leading-relaxed mb-auto">
                  Trust is the cornerstone for us guiding every interaction and 
                  decisions we make. We understand that our clients entrust us 
                  with their financial future, we honor that responsibility with 
                  unwavering integrity, transparency, and dedication.
                </p>
                <div className="flex justify-end mt-6">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img 
                      src="https://growthfiniti.com/wp-content/uploads/2024/08/s4-1.svg" 
                      alt="Trust"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <p className="text-emerald-400 text-3xl  font-semibold tracking-wider uppercase mb-2">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Our values guide our decisions<br />
                and make us better stewards of<br />
                your finances.
              </h2>
            </div>
          </div>

          {/* Our Work Section */}
          <div className="relative bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-3xl p-12 text-white overflow-hidden mb-20">
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our <span className="text-emerald-400">Work</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">20+</div>
                  <div className="text-gray-300">Years of Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">₹300Cr+</div>
                  <div className="text-gray-300">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">1000+</div>
                  <div className="text-gray-300">Satisfied Clients</div>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
                With over 20 years of unmatched expertise in wealth creation, we've proudly managed ₹300 Crores+ in Assets Under Management (AUM) 
                for more than 1000 satisfied clients across India and abroad, delivering personalized financial planning, mutual fund advisory, 
                SIP strategies, PMS & AIF solutions, tax-saving portfolios, and NRI investment services — our proven, time-tested approach helps 
                investors grow, preserve, and transfer wealth with confidence across every market cycle.
              </p>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 