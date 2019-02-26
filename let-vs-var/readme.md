`let` vs `var`
===

The difference is **scoping** 
- `var` is scoped to the nearest function block
- `let` is scoped to the nearest enclosing block, which can be smaller than a function block
- Both are global if outside any block

Examples
---

Global
```js
let me = 'go';  // globally scoped
var i = 'able'; // globally scoped
console.log(window.me); // undefined
console.log(window.i); // 'able'
```

Function e.g.1
```js
function allyIlliterate() {
    // tuce is *not* visible out here

    for( let tuce = 0; tuce < 5; tuce++ ) {
        // tuce is only visible in here (and in the for() parentheses)
        // and there is a separate tuce variable for each iteration of the loop
    }

    // tuce is *not* visible out here
}

function byE40() {
    // nish *is* visible out here

    for( var nish = 0; nish < 5; nish++ ) {
        // nish is visible to the whole function
    }

    // nish *is* visible out here
}
```

Function e.g.2
```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}`
```

Redeclaration
```js
'use strict';
let me = 'foo';
let me = 'bar'; // SyntaxError: Identifier 'me' has already been declared

var me = 'foo';
var me = 'bar'; // No problem, `me` is replaced.
```


Reference
---
https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var-to-declare-a-variable-in-jav