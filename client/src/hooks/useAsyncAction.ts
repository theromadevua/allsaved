import { useState } from 'react';

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(action: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await action();
      return result;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Action failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute, setError };
};