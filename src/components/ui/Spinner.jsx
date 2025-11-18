export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-20 w-20 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div 
          className={`${sizes[size]} animate-spin rounded-full border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent`}
          style={{ animationDuration: '0.8s' }}
        />
        
        {/* Inner pulsing circle for better visual */}
        <div 
          className={`absolute inset-0 m-auto ${
            size === 'xs' ? 'h-2 w-2' :
            size === 'sm' ? 'h-4 w-4' :
            size === 'md' ? 'h-6 w-6' :
            size === 'lg' ? 'h-8 w-8' :
            'h-10 w-10'
          } bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse opacity-50`}
        />
      </div>
    </div>
  );
}

// Alternative: Full page spinner with overlay
export function FullPageSpinner({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-[10004] bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        {message && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// Alternative: Inline spinner for buttons
export function InlineSpinner({ className = '' }) {
  return (
    <svg 
      className={`animate-spin h-5 w-5 ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
