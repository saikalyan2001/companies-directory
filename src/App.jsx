import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { useFilter } from './hooks/useFilter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeProvider } from './context/ThemeContext';
import { API_URL, ITEMS_PER_PAGE, VIEW_MODES } from './utils/constants';
import { exportToCSV } from './utils/helpers';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StatsDashboard from './components/dashboard/StatsDashboard';
import Filters from './components/filters/Filters';
import CompanyList from './components/company/CompanyList';
import Pagination from './components/pagination/Pagination';
import LoadingState from './components/ui/LoadingState';
import ErrorState from './components/ui/ErrorState';
import { ScrollToTop } from './components/ui/ScrollToTop';
import BrandedLoadingState from './components/ui/BrandedLoadingState';

function AppContent() {
  const { data: companies, loading: fetchLoading, error } = useFetch(API_URL);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useLocalStorage('viewMode', VIEW_MODES.CARD);
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = sessionStorage.getItem('currentPage');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites] = useLocalStorage('favoriteCompanies', []);

  const {
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
    selectedIndustry,
    setSelectedIndustry,
    sortOrder,
    setSortOrder,
    filteredItems,
    locations,
    industries,
  } = useFilter(companies);

  const displayedItems = showFavoritesOnly 
    ? filteredItems.filter(company => favorites.includes(company.id))
    : filteredItems;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayedItems.length / ITEMS_PER_PAGE);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
    sessionStorage.setItem('currentPage', '1');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
    sessionStorage.setItem('currentPage', '1');
  }, [showFavoritesOnly]);

   useEffect(() => {
    let timer;
    if (fetchLoading) {
      setLoading(true);
    } else {
      // Enforce a minimum loading display time
      timer = setTimeout(() => setLoading(false), 1500); // 1.5s minimum
    }
    return () => clearTimeout(timer);
  }, [fetchLoading]);


  // if (loading) return <LoadingState />;
  if (loading) return <BrandedLoadingState />;


  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-ghost-white dark:bg-gray-900 transition-colors pt-[72px] sm:pt-[88px]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsDashboard 
          companies={companies}
          locations={locations}
          industries={industries}
          filteredItems={filteredItems}
        />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={handleFilterChange(setSearchTerm)}
          selectedLocation={selectedLocation}
          setSelectedLocation={handleFilterChange(setSelectedLocation)}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={handleFilterChange(setSelectedIndustry)}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          locations={locations}
          industries={industries}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={displayedItems.length}
          onExport={() => exportToCSV(displayedItems)}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={handleFilterChange(setShowFavoritesOnly)}
          favoritesCount={favorites.length}
        />

        <CompanyList 
          companies={currentItems} 
          viewMode={viewMode}
          isEmpty={displayedItems.length === 0}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
