import { useState, useRef, useEffect } from 'react'

export const useThrottle = (value, ms) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const expiredAt = useRef(0)

    useEffect(() => {
        const delay = Math.max(0, expiredAt.current - Date.now())
        const timeoutID = setTimeout(() => {
            setThrottledValue(value)
            expiredAt.current = Date.now() + ms
        }, delay);
        return () => clearTimeout(timeoutID)
    }, [value, ms]);

    return throttledValue;
}