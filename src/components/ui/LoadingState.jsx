import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { CompanyCardSkeleton } from './Skeleton';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-ghost-white dark:bg-gray-900 transition-colors pt-[72px] sm:pt-[88px]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div className="h-8 sm:h-10 bg-soft-gray dark:bg-gray-700 rounded w-16 sm:w-20 mb-2"></div>
              <div className="h-3 sm:h-4 bg-soft-gray dark:bg-gray-700 rounded w-24 sm:w-32"></div>
            </div>
          ))}
        </div>

        {/* Filter Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700 animate-pulse">
          {/* Search and Actions Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
            <div className="flex gap-2 flex-wrap">
              <div className="w-20 sm:w-24 h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
              <div className="w-20 sm:w-24 h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
              <div className="w-24 sm:w-32 h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
          
          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 sm:h-11 bg-soft-gray dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
        
        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <CompanyCardSkeleton key={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
