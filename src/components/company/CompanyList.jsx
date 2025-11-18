import CompanyCard from './CompanyCard';
import CompanyTable from './CompanyTable';
import { VIEW_MODES } from '../../utils/constants';

export default function CompanyList({ companies, viewMode, isEmpty }) {
  if (isEmpty) {
    return (
      <div className="text-center py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors animate-fade-in cursor-default">
        <div className="max-w-md mx-auto px-4">
          {/* Animated Icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-soft-gray dark:bg-gray-700 rounded-full animate-pulse"></div>
            <svg 
              className="relative w-20 h-20 sm:w-24 sm:h-24 text-gray-400 dark:text-gray-500 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 cursor-default">
            No Companies Found
          </h3>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 cursor-default">
            We couldn't find any companies matching your criteria. Try adjusting your filters or search term.
          </p>

          {/* Suggestions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left cursor-default">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
              Suggestions:
            </p>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              {['Clear active filters', 'Try a different search term', 'Select different location or industry'].map((suggestion, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return viewMode === VIEW_MODES.CARD ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 cursor-default">
      {companies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  ) : (
    <CompanyTable companies={companies} />
  );
}
