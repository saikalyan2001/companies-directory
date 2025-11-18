import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CompanyDetailsModal({ company, isOpen, onClose, isFavorite, onToggleFavorite }) {
  if (!company) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={company.name}
      size="lg"
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    >
      <div className="space-y-6">
        {/* Company Header */}
        <div className="flex items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-3xl">{company.name.charAt(0)}</span>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                {company.industry}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Founded {company.founded}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoItem icon={<LocationIcon />} label="Location" value={company.location} />
              <InfoItem icon={<EmployeesIcon />} label="Employees" value={company.employees.toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs company={company} />
      </div>
    </Modal>
  );
}

// Modal Component - reusable, accessible with keyboard focus trap
function Modal({ isOpen, onClose, children, title, size = 'md', isFavorite, onToggleFavorite }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4',
  };

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300 animate-scale-in focus:outline-none`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>

              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isFavorite 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-soft-gray dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                  } cursor-pointer`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-soft-gray dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Tabs Component
function Tabs({ company }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
    { id: 'contact', label: 'Contact', icon: <ContactIcon /> },
    { id: 'stats', label: 'Statistics', icon: <StatsIcon /> },
  ];

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && <OverviewTab company={company} />}
        {activeTab === 'contact' && <ContactTab company={company} />}
        {activeTab === 'stats' && <StatsTab company={company} />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ company }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About the Company
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {company.description}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Company Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HighlightCard 
            icon="🏆"
            title="Industry Leader"
            description="Recognized as a top performer in the industry"
          />
          <HighlightCard 
            icon="🌍"
            title="Global Presence"
            description="Operating in multiple countries worldwide"
          />
          <HighlightCard 
            icon="💼"
            title="Career Growth"
            description="Excellent opportunities for professional development"
          />
          <HighlightCard 
            icon="🎯"
            title="Innovation"
            description="Committed to cutting-edge technology and solutions"
          />
        </div>
      </div>
    </div>
  );
}

// Contact Tab
function ContactTab({ company }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactCard
          icon={<EmailIcon />}
          title="Email"
          value="contact@company.com"
          action="Send Email"
          href="mailto:contact@company.com"
        />
        <ContactCard
          icon={<PhoneIcon />}
          title="Phone"
          value="+1 (555) 123-4567"
          action="Call Now"
          href="tel:+15551234567"
        />
        <ContactCard
          icon={<WebsiteIcon />}
          title="Website"
          value="www.company.com"
          action="Visit Website"
          href="https://www.company.com"
        />
        <ContactCard
          icon={<LocationIcon />}
          title="Address"
          value={company.location}
          action="View on Map"
          href="#"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Social Media
        </h3>
        <div className="flex gap-3">
          <SocialButton icon={<LinkedInIcon />} href="#" label="LinkedIn" />
          <SocialButton icon={<TwitterIcon />} href="#" label="Twitter" />
          <SocialButton icon={<FacebookIcon />} href="#" label="Facebook" />
          <SocialButton icon={<InstagramIcon />} href="#" label="Instagram" />
        </div>
      </div>
    </div>
  );
}

// Stats Tab
function StatsTab({ company }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Employees"
          value={company.employees.toLocaleString()}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          label="Years in Business"
          value={new Date().getFullYear() - company.founded}
          trend="Since " 
          trendUp={null}
        />
        <StatCard
          label="Active Projects"
          value="24"
          trend="+8%"
          trendUp={true}
        />
      </div>

      <div className="bg-ghost-white dark:bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Employee Distribution
        </h3>
        <div className="space-y-3">
          <ProgressBar label="Engineering" percentage={45} color="blue" />
          <ProgressBar label="Sales & Marketing" percentage={25} color="green" />
          <ProgressBar label="Operations" percentage={20} color="purple" />
          <ProgressBar label="Management" percentage={10} color="orange" />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 text-gray-400 dark:text-gray-500">{icon}</span>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, description }) {
  return (
    <div className="flex gap-3 p-4 bg-ghost-white dark:bg-gray-900/50 rounded-lg hover:bg-soft-gray dark:hover:bg-gray-900/70 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value, action, href }) {
  return (
    <div className="p-4 bg-ghost-white dark:bg-gray-900/50 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
          {icon}
        </span>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      <a
        href={href}
        className="block w-full text-center py-2 px-4 bg-white dark:bg-gray-800 hover:bg-soft-gray dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium text-sm rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
      >
        {action}
      </a>
    </div>
  );
}

function SocialButton({ icon, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-12 h-12 flex items-center justify-center bg-soft-gray dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg transition-colors"
    >
      {icon}
    </a>
  );
}

function StatCard({ label, value, trend, trendUp }) {
  return (
    <div className="p-4 bg-ghost-white dark:bg-gray-900/50 rounded-lg">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
      {trend && (
        <p className={`text-sm flex items-center gap-1 ${
          trendUp === true ? 'text-green-600 dark:text-green-400' : 
          trendUp === false ? 'text-red-600 dark:text-red-400' : 
          'text-gray-500 dark:text-gray-400'
        }`}>
          {trendUp === true && '↑'}
          {trendUp === false && '↓'}
          {trend}
        </p>
      )}
    </div>
  );
}

function ProgressBar({ label, percentage, color }) {
  const colorClasses = {
    blue: 'bg-blue-600 dark:bg-blue-500',
    green: 'bg-green-600 dark:bg-green-500',
    purple: 'bg-purple-600 dark:bg-purple-500',
    orange: 'bg-orange-600 dark:bg-orange-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Icon Components
const OverviewIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ContactIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const StatsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const LocationIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmployeesIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
