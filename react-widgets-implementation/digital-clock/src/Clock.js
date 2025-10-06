import { useEffect, useState } from "react";

const formatTimeDigits = (x) => {
    if (x < 10) {
        return `0${x}`
    }
    return `${x}`
}

export default function Clock() {

    const [timeStr, setTimeStr] = useState()

    useEffect(() => {
        const timer = window.setInterval(() => {
            const now = new Date()
            const hh = formatTimeDigits(now.getHours())
            const mm = formatTimeDigits(now.getMinutes())
            const ss = formatTimeDigits(now.getSeconds())
            setTimeStr(`${hh}:${mm}:${ss}`)
        }, 1000)

        return () => {
            window.clearInterval(timer);
        };

    }, [])
    
    return <div>{timeStr}</div>;
}
