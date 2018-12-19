/*
If apply, call, or bind are used to call a function, 
'this' inside the function is the object that is passed in as the argument.
*/
function fn() {
  console.log(this);
}

var obj = {
  value: 5
};

var boundFn = fn.bind(obj);

boundFn(); // -> { value: 5 }
fn.call(obj); // -> { value: 5 }
fn.apply(obj); // -> { value: 5 }