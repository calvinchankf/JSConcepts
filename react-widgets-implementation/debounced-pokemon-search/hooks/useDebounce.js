import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        return () => clearTimeout(timeoutID)
    }, [value, delay]);

    return debouncedValue;
};