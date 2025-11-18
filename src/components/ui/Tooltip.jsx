import { useState, useRef, useEffect } from 'react';

export function Tooltip({ children, content, position = 'bottom', disabled = false }) {
  const [show, setShow] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (show && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top, left;
      
      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + 8;
          break;
        default:
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      }

      // Keep tooltip within viewport
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (left < 10) {
        left = 10;
      }
      
      // Keep tooltip vertically within viewport
      if (top < 10) {
        top = triggerRect.bottom + 8;
      }
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = triggerRect.top - tooltipRect.height - 8;
      }

      setTooltipPosition({ top, left });
    }
  }, [show, position]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleShow = () => {
    if (disabled) return;
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShow(true);
  };

  const handleHide = () => {
    if (disabled) return;
    // Small delay before hiding to prevent flickering
    hideTimeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 100);
  };

  // Don't show tooltip on touch devices (mobile)
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  if (disabled || !content) return children;

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={!isTouchDevice() ? handleShow : undefined}
      onMouseLeave={!isTouchDevice() ? handleHide : undefined}
      onFocus={handleShow}
      onBlur={handleHide}
    >
      {children}
      
      {show && (
        <div 
          ref={tooltipRef}
          className="fixed z-[10003] px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-xl whitespace-nowrap animate-scale-in pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          role="tooltip"
        >
          {content}
          {/* Arrow indicator based on position */}
          <div 
            className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
              'left-[-4px] top-1/2 -translate-y-1/2'
            }`}
          />
        </div>
      )}
    </div>
  );
}
