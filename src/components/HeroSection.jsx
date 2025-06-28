import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-800 via-teal-800 to-slate-900 flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-300/10 to-teal-400/10 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 border-2 border-emerald-400/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-teal-400/40 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-emerald-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 border-2 border-cyan-400/40 rotate-45 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
      </div>

      {/* Moving Wave Lines */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0.3)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 Q150,150 300,200 T600,200 T900,200 T1200,200 T1500,200"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,300 Q200,250 400,300 T800,300 T1200,300 T1600,300"
            stroke="url(#waveGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 leading-tight font-sans animate-fade-in-up">
          Empowering <span className="text-emerald-400 animate-pulse">Growth</span>
          <br />
          Through Customer Centric
          <br />
          Wealth Solutions
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 sm:mb-4 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Building wealth, securing futures
        </p>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Your dreams, our strategy
        </p>

        {/* CTA Button with Hover Effects */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <button 
            onClick={() => navigate('/quiz')}
            className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm sm:text-base rounded-full hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HeroSection; 