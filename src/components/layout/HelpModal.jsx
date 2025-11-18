import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function HelpModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const features = [
    { icon: '🔍', title: 'Smart Search', description: 'Search companies instantly' },
    { icon: '🎯', title: 'Filters', description: 'Filter by location & industry' },
    { icon: '❤️', title: 'Favorites', description: 'Save favorite companies' },
    { icon: '🌓', title: 'Dark Mode', description: 'Toggle light/dark theme' },
    { icon: '📊', title: 'Export', description: 'Export data to CSV' },
    { icon: '📱', title: 'Responsive', description: 'Works on all devices' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[10001] overflow-y-auto">
      {/* Backdrop: closes modal on click */}
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
          tabIndex={-1}
          className="relative w-full max-w-lg max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 animate-scale-in focus:outline-none z-[10002] flex flex-col cursor-auto"
        >
          {/* Header */}
          <div className="flex-shrink-0 relative p-4 border-b border-gray-200 dark:border-gray-700">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-t-2xl pointer-events-none" />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center shadow-lg cursor-default">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 
                    id="help-modal-title"
                    className="text-lg font-bold text-gray-900 dark:text-white"
                  >
                    Help & Info
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Version 1.0.0</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-soft-gray dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-2.5 bg-ghost-white dark:bg-gray-900/50 rounded-lg hover:bg-soft-gray dark:hover:bg-gray-900/70 transition-colors cursor-default"
                >
                  <span className="text-xl mb-1.5 select-none">{feature.icon}</span>
                  <h4 className="font-medium text-xs text-gray-900 dark:text-white mb-0.5 select-none">{feature.title}</h4>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight select-none">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md text-sm cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
