import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import HelpModal from './HelpModal';


export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { theme, toggleTheme } = useTheme();


  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-all cursor-pointer active:scale-95 relative z-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>


      {/* Mobile Menu Overlay - Portal style rendering */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop - Solid with blur */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] animate-fade-in cursor-default"
            onClick={() => setIsOpen(false)}
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          ></div>


          {/* Menu Panel - Slide from right */}
          <div 
            className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-800 shadow-2xl z-[9999] animate-slide-in border-l border-gray-200 dark:border-gray-700 flex flex-col cursor-auto"
            style={{ height: '100vh', maxHeight: '100vh' }}
          >
            {/* Menu Header */}
            <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center shadow-lg cursor-default">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="cursor-default">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Quick actions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>


            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {/* Scroll to Top */}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 bg-ghost-white dark:bg-gray-900/50 hover:bg-soft-gray dark:hover:bg-gray-700 active:scale-95 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <div className="text-left flex-1 cursor-pointer">
                    <p className="font-medium text-sm">Scroll to Top</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Back to the beginning</p>
                  </div>
                </button>


                {/* Help & Info */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setShowHelpModal(true), 300);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 bg-ghost-white dark:bg-gray-900/50 hover:bg-soft-gray dark:hover:bg-gray-700 active:scale-95 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1 cursor-pointer">
                    <p className="font-medium text-sm">Help & Info</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Features & shortcuts</p>
                  </div>
                </button>
              </div>


              {/* Divider */}
              <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>


              {/* Theme Toggle - Enhanced Card */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Theme</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Customize appearance</p>
                  </div>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-default ${
                    theme === 'light' 
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                      : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {theme === 'light' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={toggleTheme}
                  className={`relative w-full h-10 rounded-lg transition-all duration-300 cursor-pointer ${
                    theme === 'light' 
                      ? 'bg-gray-300 dark:bg-gray-600' 
                      : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                  aria-label="Toggle theme"
                >
                  <div className={`absolute top-1 bottom-1 w-20 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                    theme === 'light' ? 'left-1' : 'right-1'
                  }`}>
                    {theme === 'light' ? (
                      <>
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900">Light</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">Dark</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>


            {/* Menu Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-soft-gray dark:bg-gray-900 cursor-default">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Version 1.0.0</span>
                <span>© 2025</span>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
}
