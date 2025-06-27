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
                  bgIcon: "💎",
                  color: "from-sky-300/30 to-sky-500/30"
                },
                {
                  title: "Debt Funds",
                  description: "Fixed income securities for stable returns",
                  risk: "Low to Medium",
                  icon: "💵",
                  bgIcon: "🛡️",
                  color: "from-blue-600/30 to-indigo-700/30"
                },
                {
                  title: "Hybrid Funds",
                  description: "Mix of equity and debt for balanced returns",
                  risk: "Medium",
                  icon: "⚖️",
                  bgIcon: "🔄",
                  color: "from-amber-400/30 to-orange-500/30"
                },
                {
                  title: "Index Funds",
                  description: "Track market indices for consistent returns",
                  risk: "Medium",
                  icon: "📊",
                  bgIcon: "📋",
                  color: "from-pink-400/30 to-rose-500/30"
                },
                {
                  title: "Sectoral Funds",
                  description: "Focus on specific industry sectors",
                  risk: "High",
                  icon: "🏭",
                  bgIcon: "🎯",
                  color: "from-emerald-500/30 to-teal-600/30"
                },
                {
                  title: "International Funds",
                  description: "Invest in foreign markets for diversification",
                  risk: "High",
                  icon: "🌍",
                  bgIcon: "✈️",
                  color: "from-violet-400/30 to-purple-600/30"
                }
              ].map((fund, index) => (
                <div 
                  key={index}
                  className={`relative overflow-hidden bg-gradient-to-br ${fund.color} backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:border-white/30 hover:scale-105 transition-all duration-300 group`}
                >
                  {/* Background Icon */}
                  <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    {fund.bgIcon}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 z-10">
                    <div className="text-2xl bg-white/20 rounded-full p-2 backdrop-blur-sm">{fund.icon}</div>
                    <h3 className="text-white font-bold text-lg">{fund.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm font-medium leading-relaxed mb-3 z-10">
                    {fund.description}
                  </p>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs text-white/80">Risk: <span className="font-bold text-white">{fund.risk}</span></span>
                    <div className="flex gap-1">
                      {Array.from({length: fund.risk === 'High' ? 3 : fund.risk === 'Medium' ? 2 : 1}).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white/60 rounded-full"></div>
                      ))}
                    </div>
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
                <div className="relative bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 backdrop-blur-lg border-l-4 border-l-cyan-400 border border-cyan-300/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 group">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">🎯</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl bg-cyan-400/20 rounded-lg p-2">📋</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Strategic Asset Allocation</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    We begin by aligning your portfolio with your goals, risk appetite, and time horizon. This strategic mix of equity, debt, and other assets is your personalized roadmap to long-term wealth creation.
                  </p>
                </div>

                {/* Staying Aligned */}
                <div className="relative bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-lg border-l-4 border-l-blue-400 border border-blue-300/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300 group">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">📊</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl bg-blue-400/20 rounded-lg p-2">⚖️</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Staying Aligned Through Market Movements</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    As markets shift, your portfolio can drift from its ideal allocation. We monitor this closely to ensure your investments remain balanced, reducing unnecessary risk and keeping you on track.
                  </p>
                </div>

                {/* Smart Rebalancing */}
                <div className="relative bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 backdrop-blur-lg border-l-4 border-l-indigo-400 border border-indigo-300/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:border-indigo-300/50 hover:shadow-lg hover:shadow-indigo-400/20 transition-all duration-300 group">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">🧠</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl bg-indigo-400/20 rounded-lg p-2">⏰</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Smart Rebalancing at the Right Time</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    We rebalance your portfolio either periodically or when it moves beyond set limits — ensuring discipline, avoiding emotional decisions, and keeping your risk-return profile intact.
                  </p>
                </div>

                {/* Tax-Efficient Rebalancing */}
                <div className="relative bg-gradient-to-br from-purple-400/20 to-purple-600/20 backdrop-blur-lg border-l-4 border-l-purple-400 border border-purple-300/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 group">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">💰</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl bg-purple-400/20 rounded-lg p-2">🛡️</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Tax-Efficient Rebalancing & Risk Control</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
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
                <div className="relative bg-gradient-to-br from-green-400/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:scale-105 transition-all duration-300 group border-2 border-green-300/30 hover:border-green-300/60">
                  <div className="absolute -top-2 -right-2 bg-green-400 text-white rounded-full p-2 text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">🎯</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">🎓</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Goal-Based Withdrawals</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    Aligning exits with specific life goals like education, retirement, or property purchase — ensuring funds are available when needed without disrupting long-term growth.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-green-400/20 px-2 py-1 rounded-full">🏠 Property</span>
                    <span className="text-xs bg-green-400/20 px-2 py-1 rounded-full">🎓 Education</span>
                  </div>
                </div>

                {/* Profit Booking */}
                <div className="relative bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:scale-105 transition-all duration-300 group border-2 border-emerald-300/30 hover:border-emerald-300/60">
                  <div className="absolute -top-2 -right-2 bg-emerald-400 text-white rounded-full p-2 text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">📈</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">💎</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Profit Booking in Market Highs</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    Systematic partial exits during market rallies to lock in gains while retaining core investments — balancing growth with safety.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-emerald-400/20 px-2 py-1 rounded-full">📊 Systematic</span>
                    <span className="text-xs bg-emerald-400/20 px-2 py-1 rounded-full">🔒 Lock Gains</span>
                  </div>
                </div>

                {/* Asset Reallocation */}
                <div className="relative bg-gradient-to-br from-teal-400/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:scale-105 transition-all duration-300 group border-2 border-teal-300/30 hover:border-teal-300/60">
                  <div className="absolute -top-2 -right-2 bg-teal-400 text-white rounded-full p-2 text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">🔄</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">👴</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Asset Reallocation for Changing Life Stages</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    As you approach key milestones (retirement, inheritance planning, etc.), we gradually shift from high-risk to stable assets to preserve capital.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-teal-400/20 px-2 py-1 rounded-full">👴 Retirement</span>
                    <span className="text-xs bg-teal-400/20 px-2 py-1 rounded-full">🏛️ Inheritance</span>
                  </div>
                </div>

                {/* Emergency Exit Support */}
                <div className="relative bg-gradient-to-br from-[#40B8A6]/20 to-[#40B8A6]/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[140px] hover:scale-105 transition-all duration-300 group border-2 border-[#40B8A6]/30 hover:border-[#40B8A6]/60">
                  <div className="absolute -top-2 -right-2 bg-[#40B8A6] text-white rounded-full p-2 text-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">🚨</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">⚡</div>
                    <h3 className="text-white font-bold text-base sm:text-lg">Emergency Exit Support & Liquidity Planning</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    In unforeseen situations, we provide swift, informed exit support — ensuring liquidity without compromising your overall financial structure.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-[#40B8A6]/20 px-2 py-1 rounded-full">⚡ Swift</span>
                    <span className="text-xs bg-[#40B8A6]/20 px-2 py-1 rounded-full">💧 Liquidity</span>
                  </div>
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