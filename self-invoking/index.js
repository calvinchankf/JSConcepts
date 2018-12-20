let temp = (function () {
  var x = "Hello!!"; // I will invoke myself
  return x
})();
console.log(temp)