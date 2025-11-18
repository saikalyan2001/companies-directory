export function CompanyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700 animate-pulse overflow-hidden relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-soft-gray dark:bg-gray-700/50 rounded-full -mr-16 -mt-16 opacity-30"></div>

      {/* Status Badges Area */}
      <div className="relative flex items-center gap-2 mb-4">
        <div className="w-16 h-5 bg-soft-gray dark:bg-gray-700 rounded-full"></div>
        <div className="w-14 h-5 bg-soft-gray dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4 mt-2">
        <div className="flex-1 pr-3 min-w-0">
          <div className="h-6 sm:h-7 bg-soft-gray dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-soft-gray dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-soft-gray dark:bg-gray-700 rounded-xl flex-shrink-0"></div>
      </div>

      {/* Details with Icons */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-soft-gray dark:bg-gray-700 rounded mr-2 sm:mr-2.5 flex-shrink-0"></div>
          <div className="h-4 bg-soft-gray dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-soft-gray dark:bg-gray-700 rounded mr-2 sm:mr-2.5 flex-shrink-0"></div>
          <div className="h-4 bg-soft-gray dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-soft-gray dark:bg-gray-700 rounded mr-2 sm:mr-2.5 flex-shrink-0"></div>
          <div className="h-4 bg-soft-gray dark:bg-gray-700 rounded w-3/5"></div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="h-3 bg-soft-gray dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-soft-gray dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-soft-gray dark:bg-gray-700 rounded w-4/5"></div>
      </div>

      {/* Button */}
      <div className="h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
    </div>
  );
}
