AMD vs CommonJS vs ES2015(or above)
====
AMD and CommonJS are to implement a module system, which was not natively present in JavaScript until ES2015. 

AMD(Asynchronous Module Definition)
---
- async
- designed for browsers
- actually its being obsolete now

e.g. export
```js
// lib.js
define(["package/lib"], function (lib) {
  function foo() {
      console.log( "hello foo!" );
  }
  // export (expose) foo
  return {
    foo: foo
  }
});
```
import
```js
// in another file
require(["package/lib"], function(myModule) {
  myModule.foo();
});
```

CommonJS
---
- sync
- designed for server side

e.g. export
```js
// lib.js
function foo(){
  console.log("hello foo!");
}

// export (expose) foo
exports.foo = foo;
```
import
```js
// in another file
var lib = require("package/lib");
lib.foo()
```

ES2015(or above)
---
- commonly used on both server and client sides
- static

e.g. export
```js
//lib.js
export function foo() {
  consol.log("hello foo!")
}
```
import
```js
import lib, { foo } from 'package/lib'
lib.foo()
foo() // or just import { foo } so that we can just use it without "lib."
```

P.S. since the syntax keeps changing, i use the es2015 for the example. e.g. from es6, we can use arrow function to define a function
