Callback vs Promise vs Generator vs Async/wait
===

Callback
---
A callback function is executed after the current effect is 100% finished. JS is single-threaded, but we can use it for async tasks. JS basically puts the callback functions into the async task queue, and executes the items in the task queue when the callstack becomes empty.

```js
function first(){
  setTimeout(function(){
    console.log(1);
  }, 0);
}
function second(){
  console.log(2);
}
first();
second();
```
Even though the time=0, it got printed after second
it is because the function is placed into the task queue, it will only be called after the callstack is empty.
```
print
---
2
1
```

Promise
---
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

```js
let p = new Promise((resolve, reject) => {
  // resolve for success
  // reject for fail
  setTimeout(function () {
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

p.then((successMessage) => {
  // successMessage from resolve
  console.log("Yay! " + successMessage);
}, (errorMessage) => {
  // errorMessage from reject
  console.log("OH... " + errorMessage);
});

console.log(p);
```

Async/await
---
Async/await is createed to simplify the work-flow of promise chains, it allows the code to be declared as if it was synchronous.

e.g.1
```js
const fetchData = () => {
  return Promise.resolve('hi, i am from promise')
}

const runit = async () => {
  tr
  const result = await fetchData()
  console.log(result)
}

runit() // print => hi, i am from promise
```

e.g.2
```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hi, i am from promise");
    }, 250);
  });
}

const runit = async () => {
  try {
    const result = await fetchData()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

runit() // print => hi, i am from promise
```

Generator
---
Generators abstract the use case where you would call a **series of async operations** that depend on each other and eventually will be in a **done** state

e.g.1
```js
function* gen(param) {
  yield 1 * param
  yield 2 * param
  yield 3 * param
  return 4 * param
}

var g = gen(2); // "Generator { }"
console.log(g.next()) // 2 false
console.log(g.next()) // 4 false
console.log(g.next()) // 6 false
console.log(g.next()) // 8 true
```

e.g.2
```js
// generator
function* loadImages(users) {
  for (let user of users) {
    yield getUserImage()
  }
  return
}

// once at a time
async function loadImages(users) {
  const images = []
  for (let user of users) {
    images.push(await getUserImage(user))
  }
}

// in parallel
async function loadImages(users) {
  const ps = users.map(user => getUserImage(user))
  const images = await Promise.all(ps)
}
```

Generator vs Promise
---
- Await can only wait for promises sequentially, not in parallel
- Async functions always return a promise
- 

Reference
---
- https://medium.com/front-end-weekly/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433