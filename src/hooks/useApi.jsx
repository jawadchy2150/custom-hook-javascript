import React, { useEffect, useState } from 'react';

const useApi = ({method = 'GET', url}) => {
    // console.clear();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch (url, { method });
            if (!response.ok) {
                throw new Error("Can't Post the Data");
            }
            const responseData = await response.json();
            setData(responseData);
            setError(null);
        }
        catch(error) {
            setError(error)
        }
        finally {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, [url])
    
    const apiCall = () => {
        fetchData()
    };


    return { data, error, isLoading, apiCall}
};

export default useApi;