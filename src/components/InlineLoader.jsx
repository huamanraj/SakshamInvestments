import React from 'react';

const InlineLoader = ({ 
  size = 'md', 
  text = 'Loading...', 
  showLogo = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {showLogo ? (
        <div className="relative">
          {/* Rotating ring */}
          <div className={`${sizeClasses[size]} border-2 border-transparent border-t-blue-500 border-r-orange-500 rounded-full animate-spin`}></div>
          
          
        </div>
      ) : (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      )}
      
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default InlineLoader; 