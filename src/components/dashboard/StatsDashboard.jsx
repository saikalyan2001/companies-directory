export default function StatsDashboard({ companies, locations, industries, filteredItems }) {
  const stats = [
    {
      label: 'Total Companies',
      value: companies.length,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      trend: null
    },
    {
      label: 'Locations',
      value: locations.length,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      trend: null
    },
    {
      label: 'Industries',
      value: industries.length,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      trend: null
    },
    {
      label: 'Filtered Results',
      value: filteredItems.length,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      trend: filteredItems.length === companies.length ? 'all' : 'filtered'
    }
  ];

  const colorClasses = {
    blue: {
      text: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500'
    },
    green: {
      text: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500'
    },
    purple: {
      text: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500'
    },
    orange: {
      text: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500'
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="relative bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:shadow-lg active:-translate-y-1 cursor-pointer group overflow-hidden"
        >
          {/* Background gradient on hover/active */}
          <div className={`absolute inset-0 ${colorClasses[stat.color].bg} opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Top section - Icon and Value */}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              {/* Icon with mobile touch animation */}
              <div className={`${colorClasses[stat.color].iconBg} p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 group-active:scale-110 group-active:rotate-6 transition-all duration-300`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>

              {/* Trend Badge (if applicable) */}
              {stat.trend && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  stat.trend === 'all' 
                    ? 'bg-soft-gray dark:bg-gray-700 text-gray-600 dark:text-gray-400' 
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {stat.trend === 'all' ? 'All' : 'Active'}
                </span>
              )}
            </div>

            {/* Value with mobile touch animation */}
            <div className="mb-1 sm:mb-2">
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${colorClasses[stat.color].text} group-hover:scale-105 group-active:scale-105 transition-transform origin-left`}>
                {stat.value}
              </p>
            </div>

            {/* Label */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate pb-1">
              {stat.label}
            </p>

            {/* Bottom accent line - Visible on desktop hover, mobile tap */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[stat.color].iconBg} transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-300 origin-left`}></div>
            
            {/* Mobile accent line - Always visible, thinner */}
            <div className={`lg:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorClasses[stat.color].iconBg} opacity-30`}></div>
          </div>

          {/* Decorative corner element with mobile support */}
          <div className={`absolute -top-8 -right-8 w-24 h-24 ${colorClasses[stat.color].bg} rounded-full opacity-20 group-hover:opacity-30 group-active:opacity-30 transition-opacity`}></div>
        </div>
      ))}
    </div>
  );
}
