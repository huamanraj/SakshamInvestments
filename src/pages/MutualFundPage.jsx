import React from 'react';
import Layout from '../layouts/Layout';

const MutualFundPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#1e3e46] to-[#0c1c20]">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Mutual Fund Investments
          </h1>

          {/* Fund Categories Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Equity Funds",
                description: "Investment primarily in stocks for potential high returns",
                risk: "High",
                icon: "📈"
              },
              {
                title: "Debt Funds",
                description: "Fixed income securities for stable returns",
                risk: "Low to Medium",
                icon: "💵"
              },
              {
                title: "Hybrid Funds",
                description: "Mix of equity and debt for balanced returns",
                risk: "Medium",
                icon: "⚖️"
              },
              {
                title: "Index Funds",
                description: "Track market indices for consistent returns",
                risk: "Medium",
                icon: "📊"
              },
              {
                title: "Sectoral Funds",
                description: "Focus on specific industry sectors",
                risk: "High",
                icon: "🏭"
              },
              {
                title: "International Funds",
                description: "Invest in foreign markets for diversification",
                risk: "High",
                icon: "🌍"
              }
            ].map((fund, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="text-4xl mb-4">{fund.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{fund.title}</h3>
                <p className="text-gray-300 mb-4">{fund.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Risk Level:</span>
                  <span className="text-sm font-medium text-emerald-400">{fund.risk}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Investment Process */}
          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Investment Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Research</h3>
                <p className="text-gray-300">Thorough analysis of fund performance, risks, and objectives</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Selection</h3>
                <p className="text-gray-300">Choose funds that align with your investment goals</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Monitor</h3>
                <p className="text-gray-300">Regular tracking and portfolio rebalancing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MutualFundPage; 