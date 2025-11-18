export default function QuickActionsMenu({ 
  show, 
  isFavorite, 
  onToggleFavorite, 
  onShare, 
  copiedId, 
  companyId 
}) {
  return (
    <div 
      className={`absolute top-3 right-3 z-10 flex gap-2 transition-all duration-300 ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
    >
      {/* Favorite Button */}
      <button
        onClick={onToggleFavorite}
        className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
          isFavorite 
            ? 'bg-red-500 text-white shadow-lg scale-110' 
            : 'bg-white/90 dark:bg-gray-700/90 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400'
        } border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Share Button */}
      <button
        onClick={onShare}
        className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
          copiedId === companyId
            ? 'bg-green-500 text-white'
            : 'bg-white/90 dark:bg-gray-700/90 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400'
        } border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-label="Share company"
        title={copiedId === companyId ? 'Link copied!' : 'Share company'}
      >
        {copiedId === companyId ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
      </button>
    </div>
  );
}
