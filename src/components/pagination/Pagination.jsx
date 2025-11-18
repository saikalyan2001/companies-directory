import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2 flex-wrap animate-fade-in">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? 'bg-soft-gray dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 border border-gray-300 dark:border-gray-600 hover:scale-105 active:scale-95'
        }`}
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`min-w-[40px] sm:min-w-[44px] px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
            page === currentPage
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white shadow-md hover:shadow-lg scale-105'
              : page === '...'
              ? 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-default border border-gray-300 dark:border-gray-600'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 border border-gray-300 dark:border-gray-600 hover:scale-105 active:scale-95'
          }`}
          aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? 'bg-soft-gray dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 border border-gray-300 dark:border-gray-600 hover:scale-105 active:scale-95'
        }`}
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
