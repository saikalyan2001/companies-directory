import { VIEW_MODES } from '../../utils/constants';

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedIndustry,
  setSelectedIndustry,
  sortOrder,
  setSortOrder,
  locations,
  industries,
  viewMode,
  setViewMode,
  totalResults,
  onExport,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoritesCount
}) {
  const hasActiveFilters = searchTerm || selectedLocation || selectedIndustry || showFavoritesOnly;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Search and Actions Row */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none cursor-default">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-text"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
              showFavoritesOnly
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
            }`}
            title="Show favorites only"
          >
            <svg className="w-5 h-5" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                showFavoritesOnly ? 'bg-white/20' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              } cursor-default`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Export Button */}
          <button
            onClick={onExport}
            className="px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-600 rounded-lg font-medium transition-colors flex items-center gap-2 border border-gray-300 dark:border-gray-600 cursor-pointer"
            title="Export to CSV"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex bg-soft-gray dark:bg-gray-700 rounded-lg p-1 border border-gray-300 dark:border-gray-600 cursor-default">
            <button
              onClick={() => setViewMode(VIEW_MODES.CARD)}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === VIEW_MODES.CARD
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title="Card view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="hidden md:inline text-sm font-medium">Cards</span>
            </button>
            <button
              onClick={() => setViewMode(VIEW_MODES.TABLE)}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === VIEW_MODES.TABLE
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
              title="Table view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden md:inline text-sm font-medium">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Location Filter */}
        <div>
          <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 cursor-default">
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label htmlFor="industry-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 cursor-default">
            Industry
          </label>
          <select
            id="industry-filter"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 cursor-default">
            Sort By
          </label>
          <select
            id="sort-filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="employees-asc">Employees (Low to High)</option>
            <option value="employees-desc">Employees (High to Low)</option>
            <option value="founded-asc">Founded (Oldest First)</option>
            <option value="founded-desc">Founded (Newest First)</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLocation('');
              setSelectedIndustry('');
              setSortOrder('name-asc');
              setShowFavoritesOnly(false);
            }}
            disabled={!hasActiveFilters}
            className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors border flex items-center justify-center gap-2 ${
              hasActiveFilters
                ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600 cursor-pointer'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count and Active Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 cursor-default">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> {totalResults === 1 ? 'company' : 'companies'}
          {showFavoritesOnly && <span className="text-red-600 dark:text-red-400"> (favorites only)</span>}
        </p>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 dark:text-gray-400 cursor-default">Active:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full cursor-default">
                Search: {searchTerm}
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer"
                  aria-label="Remove search filter"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full cursor-default">
                {selectedLocation}
                <button 
                  onClick={() => setSelectedLocation('')} 
                  className="hover:text-green-900 dark:hover:text-green-100 cursor-pointer"
                  aria-label="Remove location filter"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedIndustry && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full cursor-default">
                {selectedIndustry}
                <button 
                  onClick={() => setSelectedIndustry('')} 
                  className="hover:text-purple-900 dark:hover:text-purple-100 cursor-pointer"
                  aria-label="Remove industry filter"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {showFavoritesOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full cursor-default">
                Favorites
                <button 
                  onClick={() => setShowFavoritesOnly(false)} 
                  className="hover:text-red-900 dark:hover:text-red-100 cursor-pointer"
                  aria-label="Remove favorites filter"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
