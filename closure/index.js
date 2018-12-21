// what is closure

// 1 sentence:
// Closure can be used in JavaScript for object data privacy, 
// it basically enables functions to have "private" variables within a scope,(a container function)

/*
1 sentence:
Closure can be used in JavaScript for object data privacy, 
it basically enables functions to have "private" variables within a scope,(a container function)
*/

/*
detail:
1. closure only allows the 'counter' to be accessed with 'add'
2. closure blocks any attempt to access the 'counter' outside the scope of 'add'
3. the variable's state persists
4. due to 3) we can create a singleton using closure
*/
var add = (function () {
  var counter = 0;
  var temp = function () {
    counter += 1;
    return counter
  }
  return temp;
})();

// print 1, 2, 3
console.log(add());
console.log(add());
console.log(add());

// cant access the variable outside the scope
console.log(add.counter); // undefined