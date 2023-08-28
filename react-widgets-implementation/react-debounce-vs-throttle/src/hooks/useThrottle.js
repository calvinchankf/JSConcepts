import { useState, useRef, useEffect } from 'react'

export const useThrottle = (value, ms) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const nextTime = useRef(0)

    useEffect(() => {
        const diff = Math.max(0, nextTime.current - Date.now())
        const timeoutID = setTimeout(() => {
            setThrottledValue(value)
            nextTime.current = Date.now() + ms
        }, diff);
        return () => clearTimeout(timeoutID)
    }, [value, ms]);

    return throttledValue;
} 