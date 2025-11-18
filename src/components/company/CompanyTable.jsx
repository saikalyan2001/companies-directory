import React from 'react';

function CompanyTable({ companies }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors cursor-default">
      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-ghost-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {['Company', 'Location', 'Industry', 'Employees', 'Founded', 'Description'].map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap cursor-default"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {companies.map((company) => (
              <tr 
                key={company.id} 
                className="hover:bg-soft-gray dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
              >
                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 lg:gap-3 min-w-[180px]">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform cursor-default">
                      <span className="text-white font-bold text-xs lg:text-sm">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-xs lg:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-default">
                      {company.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                  <div className="flex items-center text-xs lg:text-sm text-gray-700 dark:text-gray-300 min-w-[120px] cursor-default">
                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {company.location}
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                  <span className="px-2 lg:px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 cursor-default">
                    {company.industry}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm font-medium text-gray-900 dark:text-gray-300 cursor-default">
                  {company.employees.toLocaleString()}
                </td>
                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-700 dark:text-gray-300 cursor-default">
                  {company.founded}
                </td>
                <td className="px-4 lg:px-6 py-3 lg:py-4">
                  <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 max-w-[250px] truncate cursor-default">
                    {company.description}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="lg:hidden bg-soft-gray dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-center cursor-default">
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Scroll horizontally to view all columns
        </p>
      </div>
    </div>
  );
}

export default CompanyTable;
