import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background animated pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Rotating rings animation */}
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-blue-500 border-r-orange-500 rounded-full animate-spin"></div>
          {/* Inner rotating ring */}
          <div className="absolute inset-2 w-28 h-28 border-2 border-transparent border-b-blue-400 border-l-orange-400 rounded-full animate-spin animate-reverse"></div>
          {/* Center ring */}
          <div className="absolute inset-6 w-20 h-20 border border-transparent border-t-white/30 border-l-white/30 rounded-full animate-spin"></div>
        </div>

        {/* Company name with typewriter effect */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-fade-in">
            Saksham Investments
          </h1>
          <p className="text-gray-300 text-sm md:text-base animate-fade-in-delay">
            Growing wealth, securing futures
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 