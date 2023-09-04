import { useState, useRef, useEffect } from 'react'

export const useThrottle = (value, ms) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const restTime = useRef(0)

    useEffect(() => {
        const delay = Math.max(0, restTime.current - Date.now())
        const timeoutID = setTimeout(() => {
            setThrottledValue(value)
            restTime.current = Date.now() + ms
        }, delay);
        return () => clearTimeout(timeoutID)
    }, [value, ms]);

    return throttledValue;
}