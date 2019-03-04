/*
If the function is an ES2015 arrow function,
it ignores all the rules above 
and receives the this value of its surrounding scope at the time it’s created
*/

// e.g. 1
let obj = {
  value: 'abc',
  createArrowFn: () => {
    console.log(this);
  }
};
let arrowFn = obj.createArrowFn(); // {}

// e.g. 2
obj = {
  value: 'abc',
  createArrowFn: function () {
    return () => console.log(this);
  }
};
arrowFn = obj.createArrowFn();
arrowFn(); // -> { value: 'abc', createArrowFn: ƒ }