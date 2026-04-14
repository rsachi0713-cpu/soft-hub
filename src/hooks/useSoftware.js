import { useState } from 'react';

// Mock hook for now since Firestore needs populated data
export const useSoftware = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSoftware = async () => {
    setLoading(true);
    try {
      // Intended implementation:
      // const snapshot = await getDocs(collection(db, 'software'));
      // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchSoftware, loading, error };
};
