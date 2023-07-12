const hourHand = document.getElementById('hour')
const minuteHand = document.getElementById('minute')
const secondHand = document.getElementById('second')

const floor = Math.floor

setInterval(() => {

    const d = new Date()
    const hh = d.getHours()
    const mm = d.getMinutes()
    const ss = d.getSeconds()

    const rotation_hh = (hh%12) * floor(360/12)
    const rotation_mm = mm * floor(360/60)
    const rotation_ss = ss * floor(360/60)
    
    hourHand.style.transform = `rotate(${rotation_hh}deg)`
    minuteHand.style.transform = `rotate(${rotation_mm}deg)`
    secondHand.style.transform = `rotate(${rotation_ss}deg)`
}, 1000)