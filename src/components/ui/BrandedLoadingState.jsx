import React from 'react';

export default function BrandedLoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ghost-white dark:bg-gray-900 transition-colors">
      {/* Animated Circle Logo Substitute */}
      <div className="rounded-full w-32 h-32 bg-gradient-to-tr from-blue-600 to-blue-400 animate-pulse mb-8 shadow-lg flex items-center justify-center">
        <svg
          className="w-16 h-16 text-white opacity-80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>

      {/* Spinner */}
      <div className="border-4 border-blue-500 border-t-transparent border-solid rounded-full w-12 h-12 animate-spin mb-6"></div>

      <p className="text-blue-700 dark:text-blue-400 text-lg font-semibold">
        Loading companies, please wait...
      </p>
    </div>
  );
}
