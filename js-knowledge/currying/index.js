/*
  e.g.1
*/
var add = function (a) {
  return function (b) {
    return a + b
  }
}

var addToFive = add(5)
console.log(addToFive)
/*
  it prints a function. it just consumed the outer function, so it becomes
  function (b) {
    return 5 + b
  }
*/
var result = addToFive(2)
console.log(result)

/*
  e.g.2
*/
var saySomething = function (a) {
  return function (b) {
    return function (c) {
      return "Say " + a + " to " + b + " from " + c
    }
  }
}
console.log(saySomething("Hi")("Bob")("Hong Kong"))