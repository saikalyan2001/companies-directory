export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 dark:active:from-blue-700 dark:active:to-blue-800 text-white shadow-sm hover:shadow-md active:shadow focus:ring-blue-500 disabled:from-blue-400 disabled:to-blue-500 disabled:hover:from-blue-400 disabled:hover:to-blue-500',
    
    secondary: 'bg-soft-gray hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 text-gray-700 dark:text-gray-300 focus:ring-gray-400 disabled:bg-gray-100 disabled:hover:bg-gray-100',
    
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 focus:ring-gray-400 disabled:border-gray-200 disabled:hover:bg-white dark:disabled:hover:bg-gray-800',
    
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white shadow-sm hover:shadow-md active:shadow focus:ring-red-500 disabled:from-red-400 disabled:to-red-500',
    
    success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white shadow-sm hover:shadow-md active:shadow focus:ring-green-500 disabled:from-green-400 disabled:to-green-500',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const scaleEffects = !disabled ? 'hover:scale-105 active:scale-95' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${scaleEffects} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
