/*
What is Closure?

1 sentence:
Closure is all about scope. Closure can be used in JavaScript for object data privacy, 
it basically enables functions to have "private" variables within a scope (a container function)
*/

/*
detail:
1. closure only allows the 'counter' to be accessed with 'add'
2. closure blocks any attempt to access the 'counter' outside the scope of 'add'
3. the variable's state persists
4. due to 3) we can create a singleton using closure
*/

// e.g.1
var add = (function () {
  var counter = 0;
  return function (val) {
    counter += val;
    return counter
  }
})();

// print 1, 3, 6
console.log(add(1));
console.log(add(2));
console.log(add(3));

// cant access the variable outside the scope
console.log(add.counter); // undefined

// e.g.2
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log("i: " + i);
  }, i * 100);
}
// it prints 66666

// but when we change using closure,
for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log("i: " + i);
    }, i * 100);
  })(i);
}
// it prints 1 2 3 4 5 because the states preserve within in closures for each i