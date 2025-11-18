import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useFilter(items) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300); // 300ms delay
  const [selectedLocation, setSelectedLocation] = useState('');  // Changed from 'all' to ''
  const [selectedIndustry, setSelectedIndustry] = useState('');  // Changed from 'all' to ''
  const [sortOrder, setSortOrder] = useState('name-asc');  // More descriptive default

  // Get unique values for filters (without 'all')
  const locations = useMemo(() => 
    [...new Set(items.map(item => item.location))].sort(),  // Removed 'all', added sort
    [items]
  );

  const industries = useMemo(() => 
    [...new Set(items.map(item => item.industry))].sort(),  // Removed 'all', added sort
    [items]
  );

  // Apply filters and sorting
  const filteredItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesLocation = selectedLocation === '' || item.location === selectedLocation;  // Changed 'all' to ''
      const matchesIndustry = selectedIndustry === '' || item.industry === selectedIndustry;  // Changed 'all' to ''
      return matchesSearch && matchesLocation && matchesIndustry;
    });

    // Enhanced sorting with multiple options
    filtered.sort((a, b) => {
      switch(sortOrder) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'employees-asc':
          return a.employees - b.employees;
        case 'employees-desc':
          return b.employees - a.employees;
        case 'founded-asc':
          return a.founded - b.founded;
        case 'founded-desc':
          return b.founded - a.founded;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [items, debouncedSearch, selectedLocation, selectedIndustry, sortOrder]);

  return {
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
  };
}
