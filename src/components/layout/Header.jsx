import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import MobileMenu from './MobileMenu';
import HelpModal from './HelpModal';


export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;


      // Add shadow when scrolled
      setScrolled(currentScrollY > 10);


      // Show/hide header based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show header
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setVisible(false);
      }


      setLastScrollY(currentScrollY);
    };


    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (
    <>
      <header 
        className={`bg-white/95 dark:bg-gray-800/95 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
          <div className="flex justify-between items-center">
            {/* Logo and Title Section - Optimized for Mobile */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none flex-1 min-w-0" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              {/* Animated Logo Icon - Smaller on Mobile with touch support */}
              <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-active:shadow-xl group-hover:scale-110 group-active:scale-105 transition-all duration-300 cursor-pointer">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white group-hover:rotate-12 group-active:rotate-12 transition-transform duration-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                {/* Pulse effect on hover/touch */}
                <div className="absolute inset-0 bg-blue-400 dark:bg-blue-300 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 group-active:opacity-20 group-hover:animate-ping cursor-pointer"></div>
              </div>
              
              {/* Title - Responsive Typography */}
              <div className="flex flex-col min-w-0 cursor-pointer">
                <h1 className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-500 group-active:from-blue-600 group-active:to-blue-500 dark:group-hover:from-blue-400 dark:group-hover:to-blue-300 dark:group-active:from-blue-400 dark:group-active:to-blue-300 transition-all duration-300 truncate select-none cursor-pointer">
                  Companies Directory
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5 cursor-pointer">
                  <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 group-active:text-gray-700 dark:group-hover:text-gray-300 dark:group-active:text-gray-300 transition-colors truncate select-none cursor-pointer">
                    Discover companies
                  </p>
                  <div className="flex items-center gap-1 flex-shrink-0 cursor-default">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse cursor-default"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium select-none cursor-default">Live</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Actions Section - Compact on Mobile */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 ml-2">
              {/* Mobile Menu */}
              <MobileMenu />


              {/* Help Button - Desktop Only with touch support */}
              <Tooltip content="Help & Info" position="bottom">
                <button
                  onClick={() => setShowHelpModal(true)}
                  className="hidden md:block p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Help and information"
                >
                  <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </Tooltip>


              {/* Theme Toggle - Desktop Only with enhanced animations */}
              <div className="hidden md:flex items-center">
              <Tooltip content={theme === 'light' ? 'Dark mode' : 'Light mode'} position="bottom" >
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="hidden md:flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
                  aria-label="Toggle theme"
                >
                  {/* Background gradient on hover/active */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover/btn:opacity-100 group-active/btn:opacity-100 transition-opacity duration-300 cursor-pointer"></div>
                  
                  {/* Icon and Text */}
                  <div className="relative z-10 flex items-center gap-2 cursor-pointer">
                    {theme === 'light' ? (
                      <>
                        <svg className="w-5 h-5 transition-transform group-hover/btn:rotate-12 group-active/btn:rotate-12 duration-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span className="font-medium text-sm select-none cursor-pointer">Dark</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 transition-transform group-hover/btn:rotate-180 group-active/btn:rotate-180 duration-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="font-medium text-sm select-none cursor-pointer">Light</span>
                      </>
                    )}
                  </div>
                </Button>
              </Tooltip>
</div>
            </div>
          </div>
        </div>


        {/* Enhanced bottom gradient with shimmer animation */}
        <div className="relative h-0.5 sm:h-1 overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-default"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer cursor-default"></div>
        </div>
      </header>


      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
}
