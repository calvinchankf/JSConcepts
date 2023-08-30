import { useState, useEffect } from 'react'

export const useDebounce = (value, ms) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedValue(value)
        }, ms);
        return () => clearTimeout(timeoutID)
    }, [value, ms]);

    return debouncedValue;
};