import React from 'react';
import { Grid3X3, Target, Users, Shield, TrendingUp, BarChart3, Scale, Heart } from 'lucide-react';

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
              Growthfiniti Wealth is established with a vision to create authentic and 
              measurable impact on client portfolios and secure your family's financial 
              future.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {/* Framework Card */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Framework</h3>
                <p className="text-cyan-50 leading-relaxed mb-8">
                  We prioritize consistency, steady performance, low volatility, 
                  market barriers, and margin of safety.
                </p>
                <div className="flex justify-end">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Grid3X3 className="w-16 h-16 text-cyan-200" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            {/* Automated Process Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Automated Process</h3>
                <p className="text-blue-100 leading-relaxed mb-8">
                  The Growthfiniti Fund Ranking Model generates qualitative and 
                  quantitative scores for consistently performing funds across 
                  Mutual Funds, PMS & Alternates. We further conduct fund manager 
                  interviews to pick winners suitable for you.
                </p>
                <div className="flex justify-end">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Target className="w-16 h-16 text-blue-300" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12"></div>
            </div>

            {/* On-Demand Scalability Card */}
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">On-Demand Scalability</h3>
                <p className="text-pink-100 leading-relaxed mb-8">
                  Our evidence-based strategy helps clients respond to market 
                  changes and adjust portfolios based on their goals and self-awareness.
                </p>
                <div className="flex justify-end">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-pink-200" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 -translate-x-14"></div>
            </div>

            {/* Trust Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Trust</h3>
                <p className="text-emerald-100 leading-relaxed mb-8">
                  Trust is the cornerstone for us guiding every interaction and 
                  decisions we make. We understand that our clients entrust us 
                  with their financial future, we honor that responsibility with 
                  unwavering integrity, transparency, and dedication.
                </p>
                <div className="flex justify-end">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-emerald-200" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-2">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Our values guide our decisions<br />
                and make us better stewards of<br />
                your finances.
              </h2>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-emerald-400">Team</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the Growthfiniti team that is here to help you make the best 
              decisions for your investments and create a strong portfolio that reflects 
              leadership & consistency.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Bhavesh Sanghvi', role: 'CEO & Founder' },
              { name: 'Ankush Shah', role: 'Chief Investment Officer' },
              { name: 'Aditya Padman', role: 'Senior Portfolio Manager' },
              { name: 'Grishma Shah', role: 'Head of Operations' },
              { name: 'Raj Gala', role: 'Investment Analyst' },
              { name: 'Nitesh Mirgh', role: 'Financial Advisor' },
              { name: 'Komalchand Kumri', role: 'Client Relations Manager' },
              { name: 'Bhavan Shah', role: 'Research Associate' }
            ].map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Additional team member */}
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 w-64">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">Priya Sharma</h3>
              <p className="text-gray-400 text-sm">Marketing Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 