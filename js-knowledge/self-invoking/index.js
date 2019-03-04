// An immediate function is one that executes as soon as it is defined.
// Creating an immediate function is simple: 
// you add the open/close parentheses after the closing curly bracket, 
// and then wrap the entire function in parentheses. That's it
let temp = (function () {
  var x = "Hello!!"; // I will invoke myself
  return x
})();
console.log(temp)