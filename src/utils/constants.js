export const ITEMS_PER_PAGE = 6;

export const VIEW_MODES = {
  CARD: 'card',
  TABLE: 'table',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const API_URL = '/data/companies.json';

// New constants for enhanced features
export const COMPANY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  HIRING: 'hiring',
  VERIFIED: 'verified',
};

export const BADGE_COLORS = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  inactive: 'bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
  hiring: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  verified: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
};

export const GROWTH_TRENDS = {
  GROWING: 'growing',
  STABLE: 'stable',
  DECLINING: 'declining',
};
