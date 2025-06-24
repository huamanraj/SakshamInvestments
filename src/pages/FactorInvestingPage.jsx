import React from 'react';
import Layout from '../layouts/Layout';

const FactorInvestingPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#1e3e46] to-[#0c1c20]">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Factor Investing
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Factor Cards */}
            {[
              {
                title: "Value Factor",
                description: "Investing in stocks that appear cheap relative to fundamentals",
                icon: "📊"
              },
              {
                title: "Momentum Factor",
                description: "Capturing stocks with strong recent performance trends",
                icon: "📈"
              },
              {
                title: "Quality Factor",
                description: "Focusing on companies with strong balance sheets and stable earnings",
                icon: "⭐"
              },
              {
                title: "Size Factor",
                description: "Investing in smaller companies with growth potential",
                icon: "📏"
              },
              {
                title: "Low Volatility",
                description: "Targeting stocks with lower price fluctuations",
                icon: "🎯"
              },
              {
                title: "Dividend Yield",
                description: "Focusing on stocks with consistent dividend payments",
                icon: "💰"
              }
            ].map((factor, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="text-4xl mb-4">{factor.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{factor.title}</h3>
                <p className="text-gray-300">{factor.description}</p>
              </div>
            ))}
          </div>

          {/* Educational Section */}
          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Why Factor Investing?</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300">
                Factor investing is an investment approach that targets specific drivers of return across asset classes.
                This evidence-based approach combines the best of both active and passive investing, aiming to achieve
                specific risk and return objectives while maintaining transparency and systematic implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FactorInvestingPage; 