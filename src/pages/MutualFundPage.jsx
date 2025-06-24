import React, { useRef } from 'react';
import Layout from '../layouts/Layout';

const MutualFundPage = () => {
  const rebalancingRef = useRef(null);
  const exitStrategyRef = useRef(null);
  const valueAddedRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-10 bg-[#0c1c20] text-white">
        {/* Hero Section with Navigation Buttons */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-12">
            Mutual <span className="text-[#40B8A6]">Funds</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection(rebalancingRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Portfolio Rebalancing
            </button>
            <button
              onClick={() => scrollToSection(exitStrategyRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Exit Strategy
            </button>
            <button
              onClick={() => scrollToSection(valueAddedRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Value Added Services
            </button>
          </div>
        </div>

        {/* Fund Categories Section */}
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Fund <span className="text-[#40B8A6]">Categories</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Equity Funds",
                  description: "Investment primarily in stocks for potential high returns",
                  risk: "High",
                  icon: "📈",
                  color: "from-sky-300 to-sky-500"
                },
                {
                  title: "Debt Funds",
                  description: "Fixed income securities for stable returns",
                  risk: "Low to Medium",
                  icon: "💵",
                  color: "from-blue-600 to-indigo-700"
                },
                {
                  title: "Hybrid Funds",
                  description: "Mix of equity and debt for balanced returns",
                  risk: "Medium",
                  icon: "⚖️",
                  color: "from-amber-400 to-orange-500"
                },
                {
                  title: "Index Funds",
                  description: "Track market indices for consistent returns",
                  risk: "Medium",
                  icon: "📊",
                  color: "from-pink-400 to-rose-500"
                },
                {
                  title: "Sectoral Funds",
                  description: "Focus on specific industry sectors",
                  risk: "High",
                  icon: "🏭",
                  color: "from-emerald-500 to-teal-600"
                },
                {
                  title: "International Funds",
                  description: "Invest in foreign markets for diversification",
                  risk: "High",
                  icon: "🌍",
                  color: "from-violet-400 to-purple-600"
                }
              ].map((fund, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${fund.color} rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xl">{fund.icon}</div>
                    <h3 className="text-white font-bold text-lg">{fund.title}</h3>
                  </div>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {fund.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-white/80">Risk: <span className="font-bold">{fund.risk}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Rebalancing Section */}
        <div ref={rebalancingRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Portfolio <span className="text-[#40B8A6]">Rebalancing</span>
            </h2>
            
            {/* Bento Grid Layout */}
            <div className="w-full max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {/* Strategic Asset Allocation */}
                <div className="bg-gradient-to-br from-sky-300 to-sky-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Strategic Asset Allocation</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    We begin by aligning your portfolio with your goals, risk appetite, and time horizon. This strategic mix of equity, debt, and other assets is your personalized roadmap to long-term wealth creation.
                  </p>
                </div>

                {/* Staying Aligned */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Staying Aligned Through Market Movements</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    As markets shift, your portfolio can drift from its ideal allocation. We monitor this closely to ensure your investments remain balanced, reducing unnecessary risk and keeping you on track.
                  </p>
                </div>

                {/* Smart Rebalancing */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Smart Rebalancing at the Right Time</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    We rebalance your portfolio either periodically or when it moves beyond set limits — ensuring discipline, avoiding emotional decisions, and keeping your risk-return profile intact.
                  </p>
                </div>

                {/* Tax-Efficient Rebalancing */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Tax-Efficient Rebalancing & Risk Control</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    We rebalance with care — minimizing tax impact, avoiding exit loads, and protecting your capital. The result: a more stable, efficient, and goal-driven investment experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exit Strategy Section */}
        <div ref={exitStrategyRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Exit <span className="text-[#40B8A6]">Strategy</span>
            </h2>

            <div className="w-full max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {/* Goal-Based Withdrawals */}
                <div className="bg-gradient-to-br from-sky-300 to-sky-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Goal-Based Withdrawals</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Aligning exits with specific life goals like education, retirement, or property purchase — ensuring funds are available when needed without disrupting long-term growth.
                  </p>
                </div>

                {/* Profit Booking */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Profit Booking in Market Highs</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    Systematic partial exits during market rallies to lock in gains while retaining core investments — balancing growth with safety.
                  </p>
                </div>

                {/* Asset Reallocation */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Asset Reallocation for Changing Life Stages</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    As you approach key milestones (retirement, inheritance planning, etc.), we gradually shift from high-risk to stable assets to preserve capital.
                  </p>
                </div>

                {/* Emergency Exit Support */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px]">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Emergency Exit Support & Liquidity Planning</h3>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    In unforeseen situations, we provide swift, informed exit support — ensuring liquidity without compromising your overall financial structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Added Services Section */}
        <div ref={valueAddedRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Value Added <span className="text-[#40B8A6]">Services</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square w-full bg-white/5 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-6 text-[#40B8A6]">💼</div>
                  <h3 className="text-2xl font-semibold mb-4">Comprehensive Financial Planning</h3>
                  <p className="text-gray-300">We go beyond investments — offering full-spectrum planning for retirement, child education, taxation, estate transfer, and goal tracking.</p>
                </div>
              </div>
              
              <div className="aspect-square w-full bg-white/5 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-6 text-[#40B8A6]">👨‍💼</div>
                  <h3 className="text-2xl font-semibold mb-4">Dedicated Relationship Manager Access</h3>
                  <p className="text-gray-300">You get a single point of contact who understands your profile deeply — offering personalized attention and proactive advice throughout the year.</p>
                </div>
              </div>
              
              <div className="aspect-square w-full bg-white/5 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-6 text-[#40B8A6]">🌏</div>
                  <h3 className="text-2xl font-semibold mb-4">NRI & Multi-Family Portfolio Solutions</h3>
                  <p className="text-gray-300">Specialized services for NRI investors and HNI families — including multi-account tracking, currency management, and repatriation support.</p>
                </div>
              </div>
              
              <div className="aspect-square w-full bg-white/5 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-6 text-[#40B8A6]">⭐</div>
                  <h3 className="text-2xl font-semibold mb-4">Priority Access to PMS, AIF & Structured Products</h3>
                  <p className="text-gray-300">As part of our elite clientele, you receive early access to exclusive wealth-building products like PMS, AIFs, and customized structured offerings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MutualFundPage; 