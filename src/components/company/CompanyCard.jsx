import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CompanyDetailsModal from './CompanyDetailsModal';
import QuickActionsMenu from './QuickActionsMenu';
import StatusBadges from './StatusBadges';

function CompanyCard({ company }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoriteCompanies', []);
  const [copiedId, setCopiedId] = useState(null);

  const isFavorite = favorites.includes(company.id);

  // Toggle favorite
  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== company.id));
    } else {
      setFavorites([...favorites, company.id]);
    }
  };

  // Share company URL
  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}?company=${company.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(company.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Calculate growth trend (mock logic)
  const getGrowthTrend = () => {
    if (company.employees > 800) return 'growing';
    if (company.employees > 400) return 'stable';
    return 'declining';
  };

  // Determine company statuses (mock logic)
  const getCompanyStatus = () => {
    const statuses = ['active'];
    if (company.employees > 500) statuses.push('verified');
    if (company.employees < 600 && company.employees > 300) statuses.push('hiring');
    return statuses;
  };

  // Toggle action menu on touch/click for mobile
  const handleCardTap = (e) => {
    if (e.target.closest('.quick-actions') || e.target.closest('button')) return;
    setShowActions(!showActions);
  };

  return (
    <>
      <div 
        className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 stagger-animation overflow-hidden relative cursor-default"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onTouchStart={handleCardTap}
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 group-active:scale-150 transition-transform duration-500 pointer-events-none" />

        {/* Status Badges */}
        <StatusBadges 
          statuses={getCompanyStatus()} 
          growthTrend={getGrowthTrend()}
        />

        {/* Quick Actions Menu */}
        <div className="quick-actions">
          <QuickActionsMenu 
            show={showActions}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onShare={handleShare}
            copiedId={copiedId}
            companyId={company.id}
          />
        </div>

        {/* Company Header */}
        <div className="relative flex items-start justify-between mb-4 mt-2 cursor-pointer">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 group-active:text-blue-600 dark:group-active:text-blue-400 transition-colors">
              {company.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Founded {company.founded}</span>
            </div>
          </div>

          {/* Logo Initial */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 group-active:scale-110 group-active:rotate-6 transition-all duration-300 cursor-default">
            <span className="text-white font-bold text-lg sm:text-xl">
              {company.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Company Details */}
        <div className="space-y-2.5 mb-4 cursor-default">
          <CompanyDetail 
            icon={<LocationIcon />} 
            text={company.location}
            color="text-green-600 dark:text-green-400"
          />
          <CompanyDetail 
            icon={<IndustryIcon />} 
            text={company.industry}
            color="text-purple-600 dark:text-purple-400"
          />
          <CompanyDetail 
            icon={<EmployeesIcon />} 
            text={`${company.employees.toLocaleString()} employees`}
            color="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 border-t border-gray-200 dark:border-gray-700 pt-4 line-clamp-3 cursor-default">
          {company.description}
        </p>

        {/* View Details Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 dark:active:from-blue-700 dark:active:to-blue-800 text-white py-2.5 sm:py-3 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2 group/btn cursor-pointer"
          aria-label={`View details for ${company.name}`}
        >
          <span>View Details</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Company Details Modal */}
      <CompanyDetailsModal 
        company={company}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

// Reusable company detail row
function CompanyDetail({ icon, text, color }) {
  return (
    <div className="flex items-center text-gray-700 dark:text-gray-300 cursor-default">
      <span className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 flex-shrink-0 ${color}`}>
        {icon}
      </span>
      <span className="text-xs sm:text-sm truncate">{text}</span>
    </div>
  );
}

// Icons
const LocationIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IndustryIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const EmployeesIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default CompanyCard;
