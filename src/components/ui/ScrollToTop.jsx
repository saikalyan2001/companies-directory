import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;

      setIsVisible(scrolled > 300);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group animate-fade-in cursor-pointer"
      aria-label="Scroll to top"
    >
      {/* Progress Ring */}
      <svg className="w-12 h-12 sm:w-14 sm:h-14 -rotate-90" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
          className="text-blue-600 dark:text-blue-400 transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>

      {/* Inner Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full shadow-lg group-hover:shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-0.5 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Back to top
        <svg className="absolute top-full right-4 w-2 h-2 text-gray-900 dark:text-gray-700" viewBox="0 0 8 8">
          <path fill="currentColor" d="M0 0 L4 4 L8 0 Z" />
        </svg>
      </span>
    </button>
  );
}
