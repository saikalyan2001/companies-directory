import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(url) {
  // Initialize data from cache or empty array
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem('companiesData');
    return cached ? JSON.parse(cached) : [];
  });

  // Always start with loading=true on mount (to show loading UI)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const companies = response.data.companies || response.data;
        setData(companies);
        localStorage.setItem('companiesData', JSON.stringify(companies));
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
