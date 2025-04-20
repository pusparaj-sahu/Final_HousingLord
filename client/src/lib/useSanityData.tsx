import { useState, useEffect } from 'react';
import { getProperties } from './sanityApi';

type SanityDataHook = {
  properties: any[];  // Replace 'any' with your property type interface
  loading: boolean;
  error: Error | null;
}

export const useSanityData = (): SanityDataHook => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
        setError(null);
      } catch (err: unknown) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { properties, loading, error };
};