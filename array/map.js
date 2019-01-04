/*
  classic interivew question
  Implementation the Array Map
  here is my least implementation to extend the Array class using protoype
*/
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback) {
    if (typeof callback !== 'function') {
      throw new Error(callback + ' is not a function');
    }
    const result = []
    let i = 0
    for (i; i < this.length; i++) {
      const temp = callback(this[i], i)
      result.push(temp)
    }
    return result
  }
}

const a = [1, 2, 3]
const result = a.myMap((item, idx) => {
  return item * 2
});

console.log(result)