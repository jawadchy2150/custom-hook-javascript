import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value) //Inside the timeout handler, it updates the debouncedValue to the current value after the specified delay.
        }, delay)
        return () => {
            clearTimeout(handler); //he cleanup function clears the timeout if value or delay changes before the timeout completes, ensuring only the latest value is used.
        }
    }, [value, delay])
    return debouncedValue;
};

export default useDebounce;