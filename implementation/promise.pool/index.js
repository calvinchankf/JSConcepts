

var promisePool = async function(functions, n) {
    const res = []
    const worker = async () => {
        if (functions.length === 0) {
            return
        }
        const fn = functions.shift()
        const temp = await fn()
        res.push(temp)
        await worker()
    }
    const nPromises = []
    for (let i = 0; i < n; i++) {
        nPromises.push(worker())
    }
    await Promise.all(nPromises)
    return res
};

const start = performance.now()

promisePool([
    () => new Promise((resolve, _rej) => setTimeout(() => resolve(1), 3000)),
    () => new Promise((resolve, _rej) => setTimeout(() => resolve(2), 200)),
    () => new Promise((resolve, _rej) => setTimeout(() => resolve(3), 3000)),
], 2).then((data) => {
    const end = performance.now()
    console.log(`Executed functions and return ${JSON.stringify(data)} within ${end - start}ms`)
})
// Executed functions and return [2,1,3] within 3207.1921259984374ms