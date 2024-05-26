import React, { useCallback, useEffect, useState } from 'react';

const useApiNew = ({ method = 'GET', url}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const apiCall = async (body = null) => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            if (method === 'GET') {
                response = await fetch(url)
            }
            else {
                response = await fetch (url, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            }
            if (!response.ok) {
                throw new Error('API Call Error')
            }
            const responseData = await response.json();
            setData(responseData);
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        apiCall();
    }, [url])

    return {data, error, isLoading, apiCall};
};

export default useApiNew;