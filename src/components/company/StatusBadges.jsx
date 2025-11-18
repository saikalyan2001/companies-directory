import { BADGE_COLORS } from '../../utils/constants';

export default function StatusBadges({ statuses, growthTrend }) {
  const badges = {
    active: { label: 'Active', icon: '✓' },
    inactive: { label: 'Inactive', icon: '○' },
    hiring: { label: "We're Hiring!", icon: '💼' },
    verified: { label: 'Verified', icon: '✓' },
  };

  const trendIcons = {
    growing: { icon: '↑', color: 'text-green-600 dark:text-green-400' },
    stable: { icon: '→', color: 'text-blue-600 dark:text-blue-400' },
    declining: { icon: '↓', color: 'text-orange-600 dark:text-orange-400' },
  };

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
      {statuses.map(status => (
        <span
          key={status}
          className={`px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border flex items-center gap-1 ${BADGE_COLORS[status]} animate-fade-in backdrop-blur-sm`}
        >
          <span>{badges[status].icon}</span>
          <span className="hidden sm:inline">{badges[status].label}</span>
        </span>
      ))}
      
      {growthTrend && (
        <span
          className={`px-2 py-0.5 text-xs font-bold rounded-full bg-white/90 dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 ${trendIcons[growthTrend].color} animate-fade-in backdrop-blur-sm`}
          title={`Employee count ${growthTrend}`}
        >
          {trendIcons[growthTrend].icon}
        </span>
      )}
    </div>
  );
}
