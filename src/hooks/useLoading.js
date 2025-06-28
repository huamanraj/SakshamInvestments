import { useState } from 'react';

/**
 * Custom hook for managing loading states
 * @param {number} initialDelay - Initial delay in milliseconds (optional)
 * @returns {object} - { isLoading, setIsLoading, startLoading, stopLoading }
 */
export const useLoading = (initialDelay = 0) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = (delay = initialDelay) => {
    setIsLoading(true);
    if (delay > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, delay);
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading
  };
};

export default useLoading; 