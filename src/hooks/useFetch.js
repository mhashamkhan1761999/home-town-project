import { useState, useEffect } from 'react';
import { getRequest } from '../api';

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getRequest(endpoint);
            console.log('API Successfully Run:', response);
            setData(response?.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {


        fetchData();
    }, [endpoint]); // Re-run if endpoint changes

    return { data, loading, error };
};

export default useFetch;