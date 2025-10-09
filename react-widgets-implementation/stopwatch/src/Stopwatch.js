import { useEffect, useRef, useState } from "react";

const calculateDiffInHhmmssms = (ms) => {
    const floating = ms % 1000
    ms = Math.floor(ms / 1000)
    const ss = ms % 60
    ms = Math.floor(ms / 60)
    const mm = ms % 60
    ms = Math.floor(ms / 60)
    const hh = ms % 24
    return `${hh} hrs: ${mm} mins: ${ss} sec: ${floating}`
}

/*
    This question looks simple on first glance but is actually more complex than it seems. 
    setInterval's delay parameter is unreliable. 
    The actual amount of time that elapses between calls to the callback may be longer than 
    the given delay due to various reasons 
    - nested timeouts, inactive tabs, throttling (firefox), timeouts in Web Extension
    https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_delays_longer_than_specified

    So, the reliable strategy is for every timeOnterval call, calculate the time delta, add it to the total duration
*/
export default function Stopwatch() {

    const [duration, setDuration] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const timerRef = useRef(null)
    const lastTickTime = useRef(null);

    useEffect(() => {
        if (isPaused) {
            return window.clearInterval(timerRef.current)
        }
        // initial tick
        lastTickTime.current = Date.now()

        timerRef.current = window.setInterval(() => {

            // find the delta between now and the last Tick
            const now = Date.now()
            const delta = now - lastTickTime.current;
            setDuration((prev) => prev + delta)
            
            // record every last tick for the next interval call 
            lastTickTime.current = now;
        }, 50) // 50ms looks the same as 1ms for human eyes, but it is less demanding for react rendering

        return () => {
            window.clearInterval(timerRef.current)
        }
    }, [isPaused])

    return (
      <div>
        <p>{calculateDiffInHhmmssms(duration)}</p>
        <div>
            <button onClick={() => setIsPaused((prev) => !prev)}>{ isPaused ? 'start' : 'pause' }</button>
            <button onClick={() => {
                setDuration(0)
                setIsPaused(true)
            }}>Reset</button>
        </div>
      </div>
    );
  }
  