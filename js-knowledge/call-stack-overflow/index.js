/*
    RangeError: Maximum call stack size exceeded
    9136
*/
const f = (num) => {
    try {
        f(num+1)
    } catch (error) {
        console.log(error)
        console.log(num)
    }
}
f(0)