import { useState, useEffect } from 'react';
import { getApplications } from './index';
import type { FormApplication } from '../../types';

export function useApplications() {
  const [applications, setApplications] = useState<FormApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load applications'));
    } finally {
      setLoading(false);
    }
  }

  return {
    applications,
    loading,
    error,
    refresh: loadApplications
  };
}