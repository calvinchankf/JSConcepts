let shouldMove = false
let shouldResize = false

const onDrag = event => {
    const x = event.x;
	const y = event.y;
    if (shouldMove) {
        const rect = document.getElementById("box").getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2
		document.getElementById("box").style.left = `${x - centerX}px`;
		document.getElementById("box").style.top = `${y - centerY}px`;
    } else if (shouldResize) {
        const rect = document.getElementById("box").getBoundingClientRect()
        document.getElementById("box").style.width = `${x - rect.x}px`
        document.getElementById("box").style.height = `${y - rect.y}px`
    }
}

const dragToggle = () => {
    shouldMove = !shouldMove;
    console.log(`shouldMove = ${shouldMove}`)
}

const resizeToggle = e => {
    e.stopPropagation() // whereas preventDefault() is used for Form
    shouldResize = !shouldResize
    console.log(`shouldResize = ${shouldResize}`)
}

document.body.addEventListener("mousemove", onDrag)

document.getElementById("box").addEventListener("mousedown", dragToggle)
document.getElementById("box").addEventListener("mouseup", dragToggle)
document.getElementById("resize").addEventListener("mousedown", resizeToggle)
document.getElementById("resize").addEventListener("mouseup", resizeToggle)