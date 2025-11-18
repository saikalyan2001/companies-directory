import { Button } from './Button';

export default function ErrorState({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ghost-white dark:bg-gray-900 px-4">
      <div className="text-center p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700 animate-scale-in">
        {/* Error Icon with Animation */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-pulse"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something Went Wrong
        </h2>
        
        {/* Error Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
          {error || 'We encountered an error while loading the data. Please try again.'}
        </p>

        {/* Error Details Box */}
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-xs text-red-800 dark:text-red-400 font-mono break-all">
            {error}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          If the problem persists, please contact support or try again later.
        </p>
      </div>
    </div>
  );
}
