// classic interivew question
// Implementation the Array Map
// here is my least implementation to extend the Array class using protoype
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (callback) {
    if (typeof callback !== 'function') {
      throw new Error(callback + ' is not a function')
    }
    const result = []
    let i = 0
    for (i; i < this.length; i++) {
      const temp = callback(this[i], i)
      if (typeof temp !== 'boolean') {
        throw new Error(callback + ' is not a boolean')
      }
      if (temp == true) {
        result.push(this[i])
      }
    }
    return result
  }
}

const a = [1, 2, 3, 4]
const result = a.myFilter((item, idx) => {
  return item % 2 == 0
});

console.log(result)