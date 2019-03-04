// If a function is called as a method,
// this is the object that the function is a property of
var obj = {
  value: 5,
  printThis: function () {
    console.log(this);
  }
};

obj.printThis(); // { value: 5, printThis: [Function: printThis] }